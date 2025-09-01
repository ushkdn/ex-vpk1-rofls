const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const orm = require("./infrastructure/persistence/orm");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", require("./presentation/routes/authRoutes"));
app.use("/api/items", require("./presentation/routes/itemRoutes"));

const PORT = 8080;

orm.sync().then(() =>
{
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

