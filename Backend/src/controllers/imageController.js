const Image=require("../models/Image");
const imageQueue = require("../queue/imageQueue");
const fs = require("fs");
const path = require("path");


// Uplaod Image
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image",
            });
        }

         console.log("Saved path:", req.file.path);

    console.log("Exists:", fs.existsSync(req.file.path));

        const image = await Image.create({
    user: req.user._id,
    originalImage: `uploads/original/${req.file.filename}`,
    originalSize: req.file.size,
    status: "pending",
});

console.log("Adding job to queue...");

try {
    const job = await imageQueue.add("compress-image", {
        imageId: image._id,
    });

    console.log("Job added successfully");
    console.log(job);

} catch (err) {
    console.error("BullMQ Error:", err);
}

res.status(201).json({
    success: true,
    message: "Image uploaded successfully. Processing started.",
    image,
});

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Image
const getAllImages = async(req,res) => {
    try {
        const images=await Image.find({
            user: req.user._id
        }).sort({createdAt: -1});

        res.status(200).json({
            success: true,
            count: images.length,
            images,
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// Delete Image
const deleteImage = async (req,res) => {
    try {
        const image=await Image.findOne({
            user: req.user._id,
            _id: req.params.id,
        });

        if (!image) {
    return res.status(404).json({
        success: false,
        message: "Image not found",
    });
}

 const originalPath = path.join(
            __dirname,
            "..",
            image.originalImage
        );

        if (fs.existsSync(originalPath)) {
            fs.unlinkSync(originalPath);
        }

        if (image.processedImage) {

            const processedPath = path.join(
                __dirname,
                "..",
                image.processedImage
            );

            if (fs.existsSync(processedPath)) {
                fs.unlinkSync(processedPath);
            }
        }

        await image.deleteOne();
        res.status(200).json({
            success: true,
            message: "Image Deleted Successfully",
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Dahsboard Stats
const getStats = async (req,res) => {
    try {
        const images = await Image.find({
        user: req.user._id,
});

const totalImages=images.length;
const averageCompression =
    totalImages > 0
        ? images.reduce((sum, image) => sum + image.compressionRatio, 0) / totalImages
        : 0;

      const totalSpaceSaved = images.reduce(
    (sum, image) => sum + (image.originalSize - image.processedSize),
    0
);

const totalSpaceSavedMB = Number(
    (totalSpaceSaved / (1024 * 1024)).toFixed(2)
);

const averageProcessingTime =
    totalImages > 0
        ? images.reduce((sum, image) => sum + image.processingTime, 0) / totalImages
        : 0;

        res.status(200).json({
    success: true,
    totalImages,
    avgCompression: Number(averageCompression.toFixed(2)),
    spaceSaved: totalSpaceSavedMB,
    avgProcessingTime: Number(averageProcessingTime.toFixed(2)),
});
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Get single image
const getImageById = async (req, res) => {
  try {
    const image = await Image.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      success: true,
      image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    uploadImage, getAllImages, deleteImage, getStats, getImageById
};