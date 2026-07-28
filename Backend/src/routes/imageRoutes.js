const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");
const { uploadImage, getAllImages, deleteImage, getStats, getImageById} = require("../controllers/imageController");
const uploadLimiter=require("../middleware/uploadLimiter");
const apiLimiter=require("../middleware/apiLimiter");

router.post("/upload", protect, uploadLimiter, upload.single("image"), uploadImage);

router.get("/", protect, getAllImages);
router.get("/stats", protect, apiLimiter, getStats);
router.get("/:id", protect, apiLimiter, getImageById);

router.delete("/:id", protect, apiLimiter, deleteImage);


module.exports = router;