const { createProxyMiddleware } = require('http-proxy-middleware');
//import {backend_netloc} from './utils/constants';

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
}