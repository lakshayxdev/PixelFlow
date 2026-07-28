const { Queue } = require("bullmq");

const imageQueue = new Queue("image-processing", {
    connection: {
        url: process.env.REDIS_URL,
    },
});

module.exports = imageQueue;