module.exports = {
  defaultServerResponse: {
    status: 400,
    message: "",
    body: {},
  },
  productMessage: {
    PRODUCT_CREATED: "Product Created Successfully",
    PRODUCT_FETCHED: "Product Fetched Successfully",
    PRODUCT_UPDATED: "Product Updated Successfully",
    PRODUCT_DELETED: "Product Deleted Successfully",
    PRODUCT_NOT_FOUND: "Product Not Found",
  },
  eventMessage: {
    EVENT_CREATED: "Event Created Successfully",
    EVENT_FETCHED: "Event Fetched Successfully",
    EVENT_UPDATED: "Event Updated Successfully",
    EVENT_DELETED: "Event Deleted Successfully",
    EVENT_NOT_FOUND: "Event Not Found",
  },
  ticketMessage: {
    TICKET_CREATED: "Ticket Created Successfully",
    TICKET_FETCHED: "Ticket Fetched Successfully",
    TICKET_UPDATED: "Ticket Updated Successfully",
    TICKET_DELETED: "Ticket Deleted Successfully",
    TICKET_NOT_FOUND: "Ticket Not Found",
  },
  userMessage: {
    USER_CREATED: "User Created Successfully",
    USER_FETCHED: "User Fetched Successfully",
    USER_UPDATED: "User Updated Successfully",
    USER_DELETED: "User Deleted Successfully",
    USER_NOT_FOUND: "User Not Found",
  },
  adminMessage: {
    SIGNUP_SUCCESS: "Signup Success",
    LOGIN_SUCCESS: "Login Success",
    DUPLICATED_EMAIL: "User already exists with given email",
    USER_NOT_FOUND: "User not found",
    INVALID_PASSWORD: "Invalid password",
    INVALID_REFRESH_TOKEN: "Invalid refresh token",
    REFRESH_TOKEN_MISSING: "Refresh Token is missing",
    REFRESH_SUCCESS: "Refresh Token Success",
  },
  requestValidationMessage: {
    BAD_REQUEST: "Invalid fields",
    TOKEN_MISSING: "Token missing from header",
  },
  dataBaseMessage: {
    INVALID_ID: "Invalid Id",
  },
};
