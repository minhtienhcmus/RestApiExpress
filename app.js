const express = require("express");
const eventEmitter = require("./events/emitter");
const eventHandler = require("./events/eventHandler");
const IndexRouter = require("./routes/index");
const {sequelize}  = require('./models');
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { requestLogger } = require("./middleware/logger");
// Routes
// Create an Express application
const app = express();

// Middleware to emit a custom event before processing a request

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());
 
// Use the custom request logger middleware
app.use(requestLogger);

app.use((req, res, next) => {
  // Emit the 'requestReceived' event with request information
  eventEmitter.emit("requestReceived", { method: req.method, url: req.url });
  next();
});

// Use the IndexRouter for the root path
const indexRouter = new IndexRouter();
app.use('/', indexRouter.getRouter());

// Start the Express server
// Sync the database (create tables)
sequelize.sync().then(() => {
  console.log("Database synced");
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
