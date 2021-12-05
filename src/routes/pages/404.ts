import { Router } from "express";

const router = Router();

router.get("*", (_, res) => {
  return res.status(404).send({ success: false, message: "404 Not Found" });
});

export default router;
