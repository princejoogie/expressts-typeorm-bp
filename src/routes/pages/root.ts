import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  return res.status(404).send({ success: true, message: "jookey-api" });
});

export default router;
