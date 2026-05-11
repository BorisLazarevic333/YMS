const Trailer = require("../models/Trailer");

// INGATE
exports.ingate = async (req, res) => {
  try {
    const newTrailer = new Trailer(req.body);
    await newTrailer.save();
    res.json(newTrailer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// OUGATE
exports.outgate = async (req, res) => {
  try {
    const trailer = await Trailer.findById(req.params.id);

    if (!trailer) {
      return res.status(404).json({ message: "Not found" });
    }

    trailer.status = "OUT";
    trailer.outgateTime = new Date();

    await trailer.save();

    res.json(trailer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL (pool)
exports.getAll = async (req, res) => {
  try {
    const trailers = await Trailer.find({ status: "IN_YARD" });
    res.json(trailers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTrailer = async (req, res) => {
  try {
    await Trailer.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const trailers = await Trailer.find().sort({ ingateTime: -1 });
    res.json(trailers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
