const express = require('express');


module.exports = (Article) => {
const router = express.Router();


router.get('/', async (req, res) => {
const list = await Article.findAll({ order: [['generatedAt', 'DESC']], limit: 100 });
res.json(list);
});


router.get('/:id', async (req, res) => {
const a = await Article.findByPk(req.params.id);
if (!a) return res.status(404).json({ message: 'Not found' });
res.json(a);
});


router.post('/generate', async (req, res) => {
const ai = require('../services/aiClient');
const { title, body } = await ai.generateArticle();
const created = await Article.create({ title, body });
res.json(created);
});


return router;
};