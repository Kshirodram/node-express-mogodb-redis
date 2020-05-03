import mongoose from "mongoose";

const { Schema } = mongoose;

const customersSchema = new Schema({
  username: String,
  name: String,
  address: String,
  birthdate: String,
  email: String,
  active: Boolean,
  accounts: Array,
  tier_and_details: Object,
});

export default mongoose.model("Customers", customersSchema);
