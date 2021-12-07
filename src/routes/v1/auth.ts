import validate from "src/middleware/validators/validator";
import { Router } from "express";
import { login, register } from "src/controllers/auth";
import {
  loginSchema,
  registerSchema,
} from "src/middleware/validators/auth.schema";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);

export default router;
