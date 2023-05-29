const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    description: String,
    start_time: {
      type: Date,
      default: Date.now,
    },
    end_time: {
      type: Date,
      default: Date.now,
    },
    location: String,
    organizer: String,
    status: String,
  },
  {
    timestamps: false,
    toObject: {
      transform: function (doc, ret, options) {
        ret.event_id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret;
      },
    },
  }
);

module.exports = mongoose.model("Event", eventSchema);
