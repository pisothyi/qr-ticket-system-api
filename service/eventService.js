const Event = require("../database/models/eventModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");

module.exports.createEvent = async (serviceData) => {
  try {
    let event = new Event({ ...serviceData });
    let result = await event.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createEvent", error);
    throw new Error(error);
  }
};

module.exports.getAllEvents = async ({ skip = 0, limit = 10 }) => {
  try {
    let events = await Event.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return formatMongoData(events);
  } catch (error) {
    console.log("Something went wrong: Service: getAllEvents", error);
    throw new Error(error);
  }
};

module.exports.getEventById = async ({ id }) => {
  try {
    checkObjectId(id);
    let event = await Event.findById(id);
    if (!event) {
      throw new Error(constants.eventMessage.EVENT_NOT_FOUND);
    }
    return formatMongoData(event);
  } catch (error) {
    console.log("Something went wrong: Service: getEventById", error);
    throw new Error(error);
  }
};

module.exports.updateEvent = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let event = await Event.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!event) {
      throw new Error(constants.eventMessage.EVENT_NOT_FOUND);
    }
    return formatMongoData(event);
  } catch (error) {
    console.log("Something went wrong: Service: updateEvent", error);
    throw new Error(error);
  }
};

module.exports.deleteEvent = async ({ id }) => {
  try {
    checkObjectId(id);
    let event = await Event.findByIdAndDelete(id);
    if (!event) {
      throw new Error(constants.eventMessage.EVENT_NOT_FOUND);
    }
    return formatMongoData(event);
  } catch (error) {
    console.log("Something went wrong: Service: deleteEvent", error);
    throw new Error(error);
  }
};
