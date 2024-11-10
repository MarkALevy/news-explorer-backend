const { JWT_SECRET = "super-strong-secret" } = process.env;
const { dataBase = "mongodb://127.0.0.1:27017/newsExplorer_db" } = process.env;
module.exports = { JWT_SECRET, dataBase };
