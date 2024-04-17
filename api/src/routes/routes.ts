import { Router } from "express";
import { router as userRouter } from './user.route'

export const router = Router()

router.use('/user', userRouter)

