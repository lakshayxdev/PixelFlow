const rateLimit = require("express-rate-limit");

const uploadLimiter = rateLimit({

    windowMs: 60 * 1000, 

    max: 20,

    message: {
        success:false,
        message:"Upload limit exceeded. Try again later."
    },

    standardHeaders:true,

    legacyHeaders:false,
});

module.exports = uploadLimiter;
