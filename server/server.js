
const express = require("express");
const cors = require("cors");
var multer = require("multer");
const cookieParser = require("cookie-parser");

var upload = multer();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array()); 
app.use(express.static('public'));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({ message: "Multi User Server is LIVE!" });
});

// require("./routes/app.route.js")(app);
require('./routes/auth.route')(app);
require("./routes/user.route")(app);
require("./routes/report.route")(app);

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}.`);
});