import Anime from "../model/anime.js";
import conexao from "./conexao.js";

export default class AnimeDAO {
    constructor() {
        this.init();
    }

    async init(){
        try {
            const conn = await conexao.connect();
            const sql = `
                CREATE TABLE IF NOT EXISTS anime(
                    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                    titulo VARCHAR(45) NOT NULL,
                    episodios INTEGER NOT NULL,
                    sinopse VARCHAR(45),
                    ano INTEGER,
                    popularidade REAL NOT NULL,
                    imagemRetrato VARCHAR(250),
                    imagemPaisagem VARCHAR(250)
                )
            `
            await conn.query(sql);
            conn.release();
        }
        catch(e) {
            console.log("Não foi possível conectar ao banco de dados! " + e.message);
        }
    }

    async incluir(anime) {
        if(anime instanceof Anime) {
            try {
                const conn = await conexao.connect();
                const sql = `
                    INSERT INTO anime ("titulo", "episodios", "sinopse", "ano", "popularidade", "imagemretrato", "imagempaisagem")
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING id
                `;
                let params = [
                    anime.titulo,
                    anime.episodios,
                    anime.sinopse,
                    anime.ano,
                    anime.popularidade,
                    anime.imagemRetrato,
                    anime.imagemPaisagem
                ]
                const res = await conn.query(sql, params);
                if(res.rows.length > 0)
                    anime.id = res.rows[0].id;
                conn.release();
            }
            catch(e) {
                console.log("Nao foi possível incluir este anime! Erro: "+ e.message);
            }
        }
    }

    async consultar(id) {
        let sql = "";
        let params = [];
        const conn = await conexao.connect();
        console.log(id);
        if(id) {
            sql = "SELECT * FROM anime WHERE id = $1";
            params = [id];
        }
        else {
            sql = "SELECT * FROM anime"
        }

        console.log(sql);
        const res = await conn.query(sql, params);
        const linhas = res.rows;
        let listaAnimes = [];
        linhas.map((anime2) => {
            const anime = new Anime(anime2.id,
                                    anime2.titulo,
                                    anime2.episodios,
                                    anime2.sinopse,
                                    anime2.ano,
                                    anime2.popularidade,
                                    anime2.imagemretrato,
                                    anime2.imagempaisagem,
                                    anime2.idapimal);
            listaAnimes.push(anime);
        })
        conn.release();
        return listaAnimes;
    }
}