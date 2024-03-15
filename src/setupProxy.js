const { createProxyMiddleware } = require('http-proxy-middleware');
//import {backend_netloc} from './utils/constants';

module.exports = function(app) {
  app.use(
    '/simulation',
    createProxyMiddleware({
      pathRewrite: {'^/api' : ''}, //so that the requests in the backend doesn't have /api prefix
      target: 'http://localhost:8000',
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
      }
    })
  );
}