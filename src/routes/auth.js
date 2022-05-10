import { Router } from "express";
import AuthController from "../controllers/AuthController";
import Validate from "../middleware/Validate";
import Authorize from "../middleware/Authorize";
import authSchemas from "../schemas/auth";

const router = Router();

router.post(
  "/authSaga/signIn",
  // Validate.prepare(authSchemas.signIn),
  AuthController.signIn
);

// test api
// router.post("/upload", upload.single("file"), async (req, res) => {
//   console.log("image res data in the backend - test API", req.file);
//   console.log(
//     "object with user input data - test API",
//     JSON.parse(req.body.userInfo)
//   );
// });

// original registration request
router.post(
  "/authSaga/signUp",
  // Validate.prepare(authSchemas.signUp),
  AuthController.signUp
);

router.post(
  "/authSaga/refresh-tokens",
  Validate.prepare(authSchemas.refreshTokens),
  AuthController.refreshTokens
);
router.post("/authSaga/logout", Authorize.check, AuthController.logout);
router.post(
  "/authSaga/restore-password",
  Validate.prepare(authSchemas.restorePassword),
  AuthController.restorePassword
);
router.post(
  "/authSaga/confirm-restore-password",
  Validate.prepare(authSchemas.confirmRestorePassword),
  AuthController.confirmRestorePassword
);

export default router;
