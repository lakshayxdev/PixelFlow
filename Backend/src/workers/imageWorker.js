
const { Worker } = require("bullmq");
const Image = require("../models/Image");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const startWorker = async () => {


    const worker = new Worker(
        "image-processing",
        async (job) => {

            try {

                const startTime = Date.now();

                console.log("Job Received");
            const image = await Image.findById(job.data.imageId);


            if (!image) {
                throw new Error("Image not found");
            }

            const inputPath = path.join(__dirname, "..", image.originalImage);
            console.log(inputPath);

            const outputFileName = `compressed-${path.basename(image.originalImage)}`;
            const outputPath = path.join(
                 __dirname,
                 "..",
                 "uploads",
                 "processed",
                 outputFileName
                );

                console.log("Input:", inputPath);
                console.log("Output:", outputPath);

                console.log("Input Path:", inputPath);
console.log("Worker sees file:", fs.existsSync(inputPath));

                await sharp(inputPath)
    .jpeg({ quality: 60 })
    .toFile(outputPath);
    

    const processedSize = fs.statSync(outputPath).size;
   

    const compressionRatio =
    ((image.originalSize - processedSize) / image.originalSize) * 100;

    const processingTime = Date.now() - startTime;

    image.processedImage = `uploads/processed/${outputFileName}`;

image.processedSize = processedSize;

image.compressionRatio = Number(compressionRatio.toFixed(2));

image.processingTime = processingTime;

image.status = "completed";

await image.save();

console.log("Compressed Image Saved");
console.log("Original Size:", image.originalSize);
console.log("Processed Size:", processedSize);
console.log("Compression Ratio:", compressionRatio.toFixed(2) + "%");
console.log("Processing Time:", processingTime + " ms");

console.log("MongoDB Updated Successfully");
console.log("Compressed Image Saved");
console.log(outputPath);

            }
            catch(error) {
                console.log(error);
                throw error;
            }

        },
        {
            connection: {
                url: process.env.REDIS_URL,
            },
        }
    );

    worker.on("completed", (job) => {
        console.log(`Job ${job.id} completed`);
    });

    worker.on("failed", (job, err) => {
        console.log(`Job ${job?.id} failed`);
        console.error(err);
    });

    console.log("Worker Started");

    worker.on("error", (err) => {
    console.error("Worker Error:", err);
});

worker.on("ready", () => {
    console.log("Worker Ready");
});
};

module.exports = startWorker;
