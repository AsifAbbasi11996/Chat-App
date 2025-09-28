import express from 'express';
import authRoutes from './auth.route.js';
import messageRoutes from './message.route.js';

const appRouter = express.Router();

appRouter.use('/auth', authRoutes);
appRouter.use('/messages', messageRoutes); 


export default appRouter;