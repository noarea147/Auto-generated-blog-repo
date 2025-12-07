const cron = require('node-cron');
const aiClient = require('./aiClient');


async function ensureInitialArticles(ArticleModel) {
const count = await ArticleModel.count();
if (count >= 3) return;
const missing = 3 - count;
for (let i = 0; i < missing; i++) {
const { title, body } = await aiClient.generateArticle();
await ArticleModel.create({ title, body });
}
console.log('Ensured initial articles:', missing);
}


function scheduleDailyArticle(ArticleModel) {
cron.schedule('0 2 * * *', async () => {
try {
const { title, body } = await aiClient.generateArticle();
await ArticleModel.create({ title, body });
console.log('Daily article generated', new Date().toISOString());
} catch (e) {
console.error('Daily generation failed', e.message);
}
}, { timezone: 'Etc/UTC' });
console.log('Article scheduler registered');
}


module.exports = { ensureInitialArticles, scheduleDailyArticle };