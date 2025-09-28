import cloudinary from "../lib/cloudinary.js";

/**
 * Middleware to upload image to Cloudinary
 * @param {string} folderName - Cloudinary folder name
 * @param {string} fieldName - Field in req.body containing image
 */
export const uploadToCloudinary = (folderName, fieldName) => {
  return async (req, res, next) => {
    try {
      const file = req.body[fieldName];
      if (!file) return next(); // no file provided, skip

      const uploadResponse = await cloudinary.uploader.upload(file, {
        folder: folderName,
        resource_type: "image",
      });

      // Attach uploaded URL to request body
      req.body[`${fieldName}Url`] = uploadResponse.secure_url;

      next();
    } catch (err) {
      console.error("Cloudinary upload error:", err.message);
      res.status(400).json({ error: "Image upload failed" });
    }
  };
};
