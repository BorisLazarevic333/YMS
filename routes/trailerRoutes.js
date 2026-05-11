const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
  ingate,
  outgate,
  getAll,
  getHistory,
  deleteTrailer,
} = require("../controllers/trailerController");

router.post("/ingate", verifyToken, ingate);
router.put("/outgate/:id", verifyToken, outgate);
router.get("/", getAll);
router.delete("/:id", verifyToken, isAdmin, deleteTrailer);
router.get("/history", getHistory);

module.exports = router;
