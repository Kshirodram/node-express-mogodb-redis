import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import "./models/customers-model";
import "./services/cache";
import customersRoutes from "./routes/customers-routes";

mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://admin:${encodeURIComponent(
    "welcome@123"
  )}@cluster0-e6ksx.mongodb.net/sample_analytics?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();
app.use(bodyParser());

// customer route
customersRoutes(app);

app.listen(3000, () => {
  console.log(`App is running on localhost:3000`);
});
