import express, {Router} from "express";
import PostController from "../server/postController.js";
import bodyParser from 'body-parser';
import path from "path";
import {fileURLToPath} from 'url';

const router = new Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use('/public', express.static('./public/'));
router.use('/admin', express.static('./admin/'));
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/', (request, response) => {
    if(!request) return response.status(400).send("Not found");
    response.sendFile(path.join(__dirname, '../public/index.html'));
});
router.get('/admin', (request, response) => {
    if(!request) return response.status(400).send('Not found');
    response.sendFile(path.join(__dirname, '../admin/admin-index.html'));
});
router.post('/posts', PostController.create);
router.get('/posts', PostController.getAll);
router.get('/posts/:id', PostController.getOne);
router.put('/posts', PostController.update);
router.delete('/posts/:id', PostController.delete);

export default router;