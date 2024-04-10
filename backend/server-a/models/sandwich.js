import mongoose from "mongoose";

const sandwichSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (n) {
        return n > 0;
      },
      message: "Price of items must be greater than zero",
    },
  },
  image: {
    type: String,
    required: true,
  },
  breadType: {
    type: String,
    enum: ["oat", "rye", "wheat"],
    default: "oat",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  originCity: {
    type: String,
    required: true,
  }
});

const Sandwich = mongoose.model("Sandwich", sandwichSchema);

export default Sandwich;
