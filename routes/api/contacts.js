const express = require("express");

const ctrl = require("../../controllers/contact");

const { ctrlWrapper } = require("../../helpers");

const { validate, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validate(schemas.addSchema),
  ctrlWrapper(ctrl.add)
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validate(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validate(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
