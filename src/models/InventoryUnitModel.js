import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Double from "@mongoosejs/double";

const InventoryUnitSchema = new Schema(
  {
    fullName: String,
    formOfWork: String,
    inventoryNumber: String,
    equipmentName: String,
    modelNumber: String,
    CPU: String,
    RAM: String,
    GPU: String,
    vendorType: String,
    price: Double,
    conditionType: String,
    addingDate: Date,
    receivingDate: Date,
    comment: String,
  },
  { collection: "warehouse" }
);

mongoose.set("useCreateIndex", true);
InventoryUnitSchema.plugin(uniqueValidator);

export default mongoose.model("InventoryUnit", InventoryUnitSchema);
