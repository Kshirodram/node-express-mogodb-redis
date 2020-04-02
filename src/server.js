import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import "./models/customers-model";
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

customersRoutes(app);

// app.post("/user/", (req, res) => {
//   const username = "kshirodra";
//   const password = "123";
//   console.log(req);
//   if (req.body.username === username && req.body.password === password) {
//     res
//       .status(200)
//       .send(
//         `provided username: ${req.body.username} & password: ${req.body.password}`
//       );
//   } else {
//     res
//       .status(400)
//       .send(`Bad user input. Either username/passowrd not macthing.`);
//   }
// });

app.listen(3000, () => {
  console.log(`App is running on localhost:3000`);
});
