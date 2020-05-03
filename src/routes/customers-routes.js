import mongoose from "mongoose";

const Customers = mongoose.model("Customers");

export default (app) => {
  app.get("/users", async (req, res) => {
    const customers = await Customers.find();
    res.send(customers);
  });

  app.get("/user", async (req, res) => {
    const searchName = req.query.username || "";
    const customer = await Customers.find({ username: searchName }).cache();
    res.send(customer);
  });
};
