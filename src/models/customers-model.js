import mongoose from "mongoose";

const { Schema } = mongoose;

const customersSchema = new Schema();

export default mongoose.model("Customers", customersSchema);
