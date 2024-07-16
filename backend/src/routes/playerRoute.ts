import express from 'express'
import * as playerController from '../controllers/playerController'


const router = express.Router()

router.get("/", playerController.getPlayers)
router.get("/:playerId", playerController.getPlayer)
router.post("/", playerController.addPlayer)
router.patch("/:playerId", playerController.updatePlayer)
router.delete("/:playerId", playerController.deletePlayer)

export default router;