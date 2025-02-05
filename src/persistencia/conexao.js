import pkg from 'pg';

const { Pool } = pkg;

const conexao = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'apiAnime',
    password: 'postgres123',
    port: 5432
});

export default conexao;