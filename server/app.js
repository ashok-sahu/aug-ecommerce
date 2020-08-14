const path = require("path");
const express = require("express");
// const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");

//routes paths
const userAuthRoute = require("./routes/userAuthRoute");
const adminAuthRoute = require("./routes/admin/adminAuthRoute");
const catagoryRoute = require("./routes/catagoryRoute");

//express setup
const app = express();

//middlewares
app.enable("trust proxy");

//middlewares
// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))
app.options("*", cors());

// Set security HTTP headers
app.use(helmet());
app.use(express.json());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);
app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

//viewpath
app.use(express.static(path.join(__dirname,'../../frontend',"public")))

//routes use
app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello world",
  });
});
app.use("/api", userAuthRoute);
app.use("/api", adminAuthRoute);
app.use("/api", catagoryRoute);

module.exports = app;
