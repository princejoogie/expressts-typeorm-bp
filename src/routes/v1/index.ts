import { Router } from "express";
import users from "./users";
import auth from "./auth";

const router = Router();

router.use("/users", users);
router.use("/auth", auth);

export default router;
