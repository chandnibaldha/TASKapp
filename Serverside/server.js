const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json())
const conectdb = require('./db');
conectdb()

app.use('/api/task/',require('./routes/user'))

app.listen(port, () => {
  console.log(`Task-app Listen on the ${port}`);
});
