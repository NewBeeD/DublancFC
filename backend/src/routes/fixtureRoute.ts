import express from 'express'
import * as fixtureController from '../controllers/fixtureContoller'


const router = express.Router()

router.get("/", fixtureController.getFixtures)
router.get("/:fixtureId", fixtureController.getFixture)
router.post("/", fixtureController.addFixture)
router.patch("/:fixtureId", fixtureController.updateFixture)
router.delete("/:fixtureId", fixtureController.deleteFixture)

export default router;