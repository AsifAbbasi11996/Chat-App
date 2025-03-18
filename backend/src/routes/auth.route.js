import express from 'express'
import { checkAuth, login, logout, signup, updateProfilePic } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.put('/update-pic', protectRoute, updateProfilePic)
router.get('/check', protectRoute, checkAuth)

export default router