import { Router } from "express";
import { userAuthentication } from "../middlewares/userAuthentication";
import { deleteUser, getAllUser, getUser, signIn, signUp, updateUser } from "../controllers/user.controller";
import { userValidation } from "../middlewares/userValidation";
import { userAuthorization } from "../middlewares/UserAuthorization";

export const router = Router()

router.post('/signup', userValidation, signUp);
router.post('/signin', userAuthentication, signIn);
router.get('/', getAllUser);
router.get('/:id', getUser);
router.put('/:id', userAuthorization, updateUser);
router.delete('/:id', userAuthorization, deleteUser);