import { Router } from "express";
import { deleteUserById, getUsers, getUserById } from "src/controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);

export default router;
