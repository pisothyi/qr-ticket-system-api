const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    issue_date: {
      type: Date,
      default: Date.now,
    },
    status: String,
  },
  {
    timestamps: false,
    toObject: {
      transform: function (doc, ret, options) {
        ret.ticket_id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret;
      },
    },
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
