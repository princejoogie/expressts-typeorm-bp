import { Router } from "express";
import { getUserById, getUsers } from "src/controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
