const express = require("express");
//node module to deal with file paths
const path = require("path");
const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");

//initialize a variable with express
const app = express();

//initialize middleware
app.use(logger);

//handlebars middleware (for templating)
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body parser middleware
//.json() can handle raw json
app.use(express.json());
//handle url encoded data
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//Members API routes
app.use("/api/members", require("./routes/api/members"));

//process.env -> looks at environment variable
//when we deploy, server will be on a diff port in environment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
