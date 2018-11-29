const express = require("express");

/**
 * Routers
 */
const userRouter = require("./src/routers/userRouter.js");
const organismRouter = require("./src/routers/organismRouter.js");
const servicePointRouter = require("./src/routers/servicePointRouter");
const organismReferentRouter = require("./src/routers/organismReferentRouter.js");
const serviceRouter = require("./src/routers/serviceRouter.js");
const historiqueRouter = require("./src/routers/historiqueRouter.js");
const referentRouter = require("./src/routers/referentRouter.js");

const port = process.env.port || 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.use("/api/user", userRouter);
app.use("/api/organism", organismRouter);
app.use("/api/organismReferent", organismReferentRouter);
app.use("/api/servicePoint", servicePointRouter);
app.use("/api/service", serviceRouter);
app.use("/api/historique", historiqueRouter);
app.use("/api/referent", referentRouter);

app.listen(port, "localhost", function(error) {
  if (error) {
    console.log(error);
  }

  console.log("Server is listening on port " + port + "...");
});

module.exports = app;
