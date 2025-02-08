import { Router } from "express";
import AnimeCtrl from "../controller/animeCtrl.js";

const animeCtrl = new AnimeCtrl();
const rotaAnime = Router();

rotaAnime.post('/', animeCtrl.gravar);
rotaAnime.get('/anime', animeCtrl.consultar);
rotaAnime.get('/anime/:id', animeCtrl.consultar);

export default rotaAnime;