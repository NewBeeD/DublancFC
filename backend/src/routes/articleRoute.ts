import express from 'express'
import * as articleController from '../controllers/articleContoller'



const router = express.Router()

// router.get("/", articleController.getArticles)
// router.get("/:articleId", articleController.getArticle)
// router.post("/", articleController.addArticle)
// router.patch("/:articleId", articleController.updateArticle)
// router.delete("/:articleId", articleController.deleteArticle)

router
  .route('/')
  .get(articleController.getAllArticles)
  .post(articleController.createArticle);

router
  .route('/:id')
  .get(articleController.getArticle)
  .patch(articleController.updateArticle)
  .delete(articleController.deleteArticle);

export default router;