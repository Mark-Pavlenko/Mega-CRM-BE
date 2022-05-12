import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";
import CandidateModel from "../models/CandidateModel";

class CandidatesController {
  @TryCatchErrorDecorator
  static async getCandidateById(req, res, next) {
    // eslint-disable-next-line consistent-return
    await CandidateModel.findById(req.params.id, (err, data) => {
      if (err) return next(err);
      res.json(data);
    });
  }

  @TryCatchErrorDecorator
  static async getCandidatesList(req, res) {
    const candidates = await CandidateModel.find({});
    res.status(200).json(candidates);
  }

  @TryCatchErrorDecorator
  static async addNewCandidate(req, res) {
    console.log("req.body to add new candidates", req.body);

    const userData = req.body;
    const noAvatar = userData.avatar === undefined;

    const candidate = {
      ...userData,
      noAvatar,
    };

    if (userData.avatar) candidate.avatar = userData.avatar;

    const newCandidate = new CandidateModel(candidate);

    console.log("formatted with Modal candidate data", newCandidate);

    await newCandidate
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export default CandidatesController;
