import { Router } from "express";
import { show, list } from "src/controllers/users";

const router = Router();

router.get("/", list);

router.get("/:id", show);

export default router;
