import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  sandwichId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sandwich",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["ordered", "received", "inQueue", "ready", "failed"],
    default: "ordered",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function (n) {
        return n > 0;
      },
      message: "Amount of items must be greater than zero",
    },
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
  addOnNote: {
    type: String,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
