const express = require("express");
const routes = require("./routes");
const server = require("./servidor");

server.use("/contas", routes);
