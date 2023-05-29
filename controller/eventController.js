const eventService = require("../service/eventService");
const constants = require("../constants");

module.exports.createEvent = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await eventService.createEvent(req.body);
    response.status = 200;
    response.message = constants.eventMessage.EVENT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createEvent", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAllEvents = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await eventService.getAllEvents(req.query);
    response.status = 200;
    response.message = constants.eventMessage.EVENT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllEvents", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getEventById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await eventService.getEventById(req.params);
    response.status = 200;
    response.message = constants.eventMessage.EVENT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getEventById", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateEvent = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await eventService.updateEvent({
      event_id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.eventMessage.EVENT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateEvent", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteEvent = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await eventService.deleteEvent(req.params);
    response.status = 200;
    response.message = constants.eventMessage.EVENT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteEvent", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
