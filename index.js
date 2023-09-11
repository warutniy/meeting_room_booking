const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const serviceRouter = require('./router/service-router');

const port = process.env.VITE_BACKEND_PORT;
const ipAddress = process.env.VITE_BACKEND_URL;
const app = express();
app.use(cors());

// body-parser
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});
app.use('/service', serviceRouter);

const connect = async () => {

    try {
        await mongoose.connect(process.env.DATABASE_URI, {
          dbName: process.env.DATABASE_NAME,
          writeConcern: "majority",
          retryWrites: true,
          user: process.env.DATABASE_USER,
          pass: process.env.DATABASE_PASS,
        });

        console.log('connected');
      
        app.listen(port || 3000, () => {
            console.log(`Web Application Server is running on ${ipAddress} port ${port}`);
            console.log(`Address: http://${ipAddress}:${port}`);
        });
      
    } catch (error) {
        console.error("Error connecting to the database or starting the server:", error);
    }
};

connect();