import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js'
import { uploadToCloudinary } from '../middleware/cloudinaryUpload.middleware.js'

const router = express.Router()

router.get("/users", protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getMessages)

router.post("/send/:id", protectRoute, uploadToCloudinary("chat_messages", "image"), sendMessage);


export default router