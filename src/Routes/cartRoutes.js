const express = require("express");
const {
  createCartHandler,
  updateCartHandler,
  deleteCartHandler,
  getAllCartsHandler,
  getCartByIdHandler,
} = require("../handlers/cartHandlers");

const router = express.Router();

router.post("/", createCartHandler);
router.put("/:id", updateCartHandler);
router.delete("/:id", deleteCartHandler);
router.get("/", getAllCartsHandler);
router.get("/:id", getCartByIdHandler);

module.exports = router;
