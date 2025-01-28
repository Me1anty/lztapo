const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  // Перенаправление всех запросов на api.zelenka.guru
  const proxy = createProxyMiddleware({
    target: 'https://api.lzt.market', // Целевой домен
    changeOrigin: true, // Изменяет origin запроса на целевой домен
    onProxyReq: (proxyReq, req) => {
      // Обновляем заголовки, если нужно
      proxyReq.setHeader('host', 'api.lzt.market');
    },
  });

  proxy(req, res, (err) => {
    if (err) {
      res.status(500).json({ error: 'Proxy Error', details: err.message });
    }
  });
};
