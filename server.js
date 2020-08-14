const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");

//server setup
const app = require("./server/app");
dotenv.config({ path: "./config.env" });

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

//database and server configuration
const PORT = process.env.PORT || 5000;
const DB = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);

//databse connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log(chalk.red.bgWhiteBright(`database connected successfully!`));
  })
  .catch((err) => console.log(chalk.red(`database connection failed`, err)));

//server connection
app.listen(PORT, () => {
  console.log(
    chalk.whiteBright.bgBlackBright(
      `server is running on http://localhost:${PORT}`
    )
  );
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});