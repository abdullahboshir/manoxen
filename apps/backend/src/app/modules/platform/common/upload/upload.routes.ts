import { Router } from 'express';
import { upload } from "#core/utils/file-upload";
import { UploadController } from "./upload.controller";

const router = Router();

router.post('/image', upload.single('image'), UploadController.uploadImage);

export const UploadRoutes = router;


















