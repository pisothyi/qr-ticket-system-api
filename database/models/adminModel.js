const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: String,
  },
  {
    timestamps: false,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret;
      },
    },
  }
);

module.exports = mongoose.model("Admin", adminSchema);
