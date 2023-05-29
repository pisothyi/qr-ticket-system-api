const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    occupation: String,
    telegram_number: String,
  },
  {
    timestamps: false,
    toObject: {
      transform: function (doc, ret, options) {
        ret.user_id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
