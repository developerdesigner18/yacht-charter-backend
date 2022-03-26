import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan"
// import connect from "./config/db.js"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import colors from "colors";
import { appConfig } from "./config/index.js"
import { restRouter } from "./api/restRouter.js"

var config = appConfig();

const app = express()
let server = null;
// require("dotenv").config()

app.use(cors())
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(helmet());

app.use('/api', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Al" +
        "low-Methods"
    )
    res.header("X-Frame-Options", "deny")
    res.header("X-Content-Type-Options", "nosniff")
    next();
})

app.use('/api', restRouter)


if (config.NODE_ENV === "development") {
    console.log("This is the development environment".yellow)
    server = http.createServer(app)
} else {
    console.log("This is the production environment".yellow)
    server = http.createServer(app)
}

app.get('/', (req, res) => {
    res.send('Yacht-Charter App server is alive!');
})

mongoose.connect(
    config.DB_URL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
)
.then(() => {
    console.log('DB Connected Successfully!'.green.inverse)
})
.catch((err) => {
    console.log(`Error: ${err}`.red.inverse);
})

let PORT = config.PORT || 8080;
server.listen(PORT, async () => {
    try {
        console.log(`Server listening on port ${PORT}`.green)
    } catch (err) {
        console.log("Server init error".red, err)
    }
})