const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  // Перенаправление всех запросов на api.lzt.market
  const proxy = createProxyMiddleware({
    target: 'https://api.lzt.market',
    changeOrigin: true,
    headers: {
      host: 'api.lzt.market'
    },
    // В версии 3.x onProxyReq работает немного иначе
    onProxyReq: (proxyReq, req) => {
      proxyReq.setHeader('host', 'api.lzt.market');
    },
  });

  proxy(req, res, (err) => {
    if (err) {
      res.status(500).json({ error: 'Proxy Error', details: err.message });
    }
  });
};
