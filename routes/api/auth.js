const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const {
  validate,
  authenticate,
  isValidId,
  upload,
} = require("../../middlewares");

const { schemas } = require("../../models/users");

router.post(
  "/register",
  validate(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationCode", ctrlWrapper(ctrl.verify));

router.post(
  "/verify",
  validate(schemas.emailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post("/login", validate(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/:id/subscription",
  isValidId,
  validate(schemas.updateSubscription),
  ctrlWrapper(ctrl.updateStatusSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
