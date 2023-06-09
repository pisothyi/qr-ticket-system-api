const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
swaggerDocument = YAML.load("./swagger.yaml");
const dbConnection = require("./database/connection");
dotEnv.config();

const app = express();

// db connectivity
dbConnection();

// cors
app.use(cors());

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/product", require("./routes/productRoutes"));
app.use("/api/v1/auth/admin", require("./routes/adminRoutes"));
app.use("/api/v1/event", require("./routes/eventRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/ticket", require("./routes/ticketRoutes"));

// API Documentation
if (process.env.NODE_ENV != "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.get("/", (req, res, next) => {
  res.send("CamTech QR Ticket System");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// error handler middleware

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});
