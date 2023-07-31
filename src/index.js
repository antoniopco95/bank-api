const express = require("express");
const routes = require("./routes");
const server = require("./servidor");
const port = process.env.PORT || 3001;
server.use("/contas", routes);
