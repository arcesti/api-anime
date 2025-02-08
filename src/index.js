import express from 'express';
import rotaAnime from './Routes/animeRoute.js';

const app = express();
const host = 'localhost';
const port = 5000;

app.use(express.json());

app.use(rotaAnime);

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})