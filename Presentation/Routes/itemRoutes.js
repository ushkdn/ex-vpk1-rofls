const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/AuthMiddleware");
const itemController = require("../Controllers/itemController");

router.get("/", authMiddleware, itemController.getItems);
router.post("/", authMiddleware, itemController.addItem);
router.put("/:id", authMiddleware, itemController.updateStatus);
router.delete("/", authMiddleware, itemController.clearItems);
router.get("/transfer", authMiddleware, itemController.transferList);

module.exports = router;
