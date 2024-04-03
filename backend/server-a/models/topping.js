import mongoose from "mongoose";

const toppingSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ["meat", "veggies", "cheese", "sauce"],
    default: "meat",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Topping = mongoose.model("Topping", toppingSchema);

export default Topping;
