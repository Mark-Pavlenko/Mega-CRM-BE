import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";
import InventoryUnitModel from "../models/InventoryUnitModel";
import EmployeeModel from "../models/EmployeeModel";

class WarehouseController {
  @TryCatchErrorDecorator
  static async getInventoryUnitsList(req, res) {
    const inventoryUnitsList = await InventoryUnitModel.find({});
    res.status(200).json(inventoryUnitsList);
  }

  @TryCatchErrorDecorator
  static async addInventoryUnit(req, res) {
    // console.log("req body to add new inventoryItem for a user", req.body);

    const newInventoryUnit = new InventoryUnitModel(req.body);

    console.log("formatted with Modal inventoryUnit", newInventoryUnit);

    await newInventoryUnit
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  @TryCatchErrorDecorator
  static async createGetInventoryRequest(req, res) {
    console.log("createGetEquipmentRequest body", req.body);

    EmployeeModel.updateOne(
      { _id: req.body.employeeId },
      { $addToSet: { requests: { ...req.body } } },
      { upsert: true, new: true }
    )
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  @TryCatchErrorDecorator
  static async processGetInventoryRequest(req, res, next) {
    // console.log("createGetEquipmentRequest body", req.body);

    let necessaryUser = await EmployeeModel.find({
      "requests._id": req.body.requestId,
    });

    let selectedRequest = necessaryUser[0].requests.find((request) => {
      return request._id == req.body.requestId;
    });

    let test1 = JSON.parse(JSON.stringify(selectedRequest));
    console.log({
      ...test1,
      requestStatus: "Accepted",
    });
  }
}

export default WarehouseController;
