import { Router } from "express";
import { deleteUserById, getUsers, getUserById } from "src/controllers/users";
import { checkJwt, checkRole } from "src/middleware";

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMINISTRATOR"])], getUsers);

router.get("/:id", [checkJwt, checkRole(["ADMINISTRATOR"], true)], getUserById);

router.delete(
  "/:id",
  [checkJwt, checkRole(["ADMINISTRATOR"], true)],
  deleteUserById
);

export default router;
