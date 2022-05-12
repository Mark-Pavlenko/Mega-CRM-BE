import express from "express";
import CandidatesController from "../controllers/CandidatesController";
const candidatesRouter = express.Router();

candidatesRouter.get(
  "/hr/getCandidatesList",
  CandidatesController.getCandidatesList
);

candidatesRouter.get(
  "/hr/getCandidate/:id",
  CandidatesController.getCandidateById
);

candidatesRouter.post("/hr/addCandidate", CandidatesController.addNewCandidate);

export default candidatesRouter;
