import { Router } from "express";
import { VotingController } from "../controllers/voting.controller";
const router = Router();

router.post("/", VotingController.createProposal);
router.get("/", VotingController.getAllProposals);
router.post("/:id/vote", VotingController.castVote);
router.patch("/:id/status", VotingController.updateStatus);

export const VotingRoutes = router;




