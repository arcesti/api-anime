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
                    imagemPaisagem VARCHAR(250),
                    CONSTRAINT pk_anime PRIMARY KEY (id)
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
                    INSERT INTO anime ("titulo", "episodios", "sinopse", "ano", "popularidade", "imagemRetrato", "imagemPaisagem")
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
}