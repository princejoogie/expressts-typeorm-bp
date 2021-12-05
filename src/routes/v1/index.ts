import { Router } from "express";

const router = Router();

router.use("/hello", (_, res) => {
  res.status(200).send({ success: true, message: "Hello World" });
});

export default router;
