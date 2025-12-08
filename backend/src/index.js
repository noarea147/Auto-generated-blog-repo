const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const articleRoutes = require("./routes/articles");
const articleJob = require("./services/articleJob");

const DB_URL =
  process.env.DATABASE_URL || "postgres://postgres:postgres@db:5432/blogdb";

const sequelize = new Sequelize(DB_URL, { logging: false });

const Article = sequelize.define("Article", {
  title: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false },
  generatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/articles", articleRoutes(Article));

const PORT = process.env.PORT || 4000;

(async () => {
  await sequelize.sync();
  await articleJob.ensureInitialArticles(Article);
  articleJob.scheduleDailyArticle(Article);
  app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
})();
