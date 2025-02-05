import express from 'express';
import AnimeCtrl from './controller/animeCtrl.js';
const animeCtrl = new AnimeCtrl();

const app = express();
const host = 'localhost';
const port = 5000;

app.use(express.json());
app.post('/', animeCtrl.gravar);
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})