import { Router } from "express";
import { deleteUserById, getUsers, getUserById } from "src/controllers/users";
import { checkJwt } from "src/middleware/checkJwt";
import { checkRole } from "src/middleware/checkRole";

const router = Router();

router.get("/", [checkJwt, checkRole(["ADMINISTRATOR"])], getUsers);

router.get("/:id", [checkJwt, checkRole(["ADMINISTRATOR"], true)], getUserById);

router.delete(
  "/:id",
  [checkJwt, checkRole(["ADMINISTRATOR"], true)],
  deleteUserById
);

export default router;
