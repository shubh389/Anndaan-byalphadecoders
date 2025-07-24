const serverless = require("serverless-http");
const { createServer } = require("../dist/server/node-build.mjs");

const app = createServer();

module.exports = serverless(app);
