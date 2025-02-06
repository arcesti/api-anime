import AnimeDAO from "../persistencia/animeDAO.js";

export default class Anime {
    #id;
    #titulo;
    #episodios;
    #sinopse;
    #ano;
    #popularidade;
    #imagemRetrato;
    #imagemPaisagem;

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get titulo() {
        return this.#titulo;
    }

    set titulo(value) {
        this.#titulo = value;
    }

    get episodios() {
        return this.#episodios;
    }

    set episodios(value) {
        this.#episodios = value;
    }

    get sinopse() {
        return this.#sinopse;
    }

    set sinopse(value) {
        this.#sinopse = value;
    }

    get ano() {
        return this.#ano;
    }

    set ano(value) {
        this.#ano = value;
    }

    get popularidade() {
        return this.#popularidade;
    }

    set popularidade(value) {
        this.#popularidade = value;
    }

    get imagemRetrato() {
        return this.#imagemRetrato;
    }

    set imagemRetrato(value) {
        this.#imagemRetrato = value;
    }

    get imagemPaisagem() {
        return this.#imagemPaisagem;
    }

    set imagemPaisagem(value) {
        this.#imagemPaisagem = value;
    }

    constructor(titulo="", episodios=0, sinopse="", ano=0, popularidade=0, imagemRetrato="", imagemPaisagem="") {
        this.#titulo = titulo;
        this.#episodios = episodios;
        this.#sinopse = sinopse;
        this.#ano = ano;
        this.#popularidade = popularidade;
        this.#imagemRetrato = imagemRetrato;
        this.#imagemPaisagem = imagemPaisagem;
    }

    toJSON() {
        return {
            id: this.#id,
            titulo: this.#titulo,
            episodios: this.#episodios,
            sinopse: this.#sinopse,
            ano: this.#ano,
            popularidade: this.#popularidade,
            imagemRetrato: this.#imagemRetrato,
            imagemPaisagem: this.#imagemPaisagem
        }
    }

    async incluir() {
        const animeDAO = new AnimeDAO();
        await animeDAO.incluir(this);
    }
}