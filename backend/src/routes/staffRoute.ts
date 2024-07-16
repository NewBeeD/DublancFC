import express from 'express'
import * as staffController from '../controllers/staffController'


const router = express.Router()

router.get("/", staffController.getStaffMembers)
router.get("/:staffId", staffController.getSingleStaff)
router.post("/", staffController.addStaff)
router.patch("/:staffId", staffController.updateStaff)
router.delete("/:staffId", staffController.deleteStaff)

export default router;