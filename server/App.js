require("dotenv").config();
const express = require("express"),
  cors = require("cors"),//@@@
  { connect } = require("mongoose"),
  app = express(),
  { PORT, DB_CONNECT } = process.env,
  Route = require("./routes/route"),
  {log} = console;
app.use(express.json()); //Middleware for parsing JSON Pay-Load
app.use(cors());
app.use(Route);

connect(DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
})
  .then(async r => {
    log(await r.json());
  })
  .catch(error => log(error.message));

app.listen(PORT, () => {
  log(`Listening on port ${PORT}`);
});
