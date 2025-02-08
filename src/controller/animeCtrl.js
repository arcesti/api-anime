import Anime from "../model/anime.js";

export default class AnimeCtrl {
    gravar(req, res) {
        res.type("application/json");
        if (req.method === "POST") {
            const titulo = req.body.titulo;
            const episodios = req.body.episodios;
            const sinopse = req.body.sinopse;
            const ano = req.body.ano;
            const popularidade = req.body.popularidade;
            const imagemRetrato = req.body.imagemRetrato;
            const imagemPaisagem = req.body.imagemPaisagem;
            if (titulo && episodios && sinopse && ano && popularidade) {
                const anime = new Anime(titulo, episodios, sinopse, ano, popularidade, imagemRetrato, imagemPaisagem);
                anime.incluir()
                    .then(() => {
                        res.status(200).json({
                            message: "Anime incluido com sucesso!",
                            status: true
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: "Não foi possível incluir o anime! " + err.message,
                            status: false
                        })
                    })
            }
            else {
                res.status(400).json({ message: "Dados inválidos!", status: "false" });
            }
        }
        else {
            res.status(400).json({ message: "Requisição inválida!", status: false });
        }
    }

    consultar(req, res) {
        res.type("Application/json");
        if (req.method === "GET") {
            let id = req.params.id;
            if (isNaN(id)) {
                id = "";
            }
            const anime = new Anime();
            anime.consultar(id)
                .then((listaAnimes) => {
                    res.status(200).json({
                        status: true,
                        listaAnimes
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: `Não foi possível recuperar os animes! Erro : ${err.message}`
                    })
                })
        }
        else {
            res.status(400).json({
                status: false,
                message: "Requisição inválida!"
            })
        }
    }
}