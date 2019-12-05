const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({

    type: String,

    rel_id: mongoose.Types.ObjectId,
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;