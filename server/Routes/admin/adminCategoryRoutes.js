import express from 'express';
import categoryController from '../../controllers/admin/categoryController.js';
import upload from '../../middleware/fileUpload.js';

const router = express.Router();

router.post('/', upload.single("image"), categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', upload.single("image"), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
