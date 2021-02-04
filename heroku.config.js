module.exports = {
  apps: [
    {
      name: 'Waves Grants',
      script: 'serve',
      instances: process.env.INSTANCES || "1",
      max_memory_restart: process.env.MEMORY || "256M",
      cwd: './dist/dapp',
      env: {
        NODE_ENV: 'production',
        PM2_SERVE_PATH: '.',
        PM2_SERVE_PORT: process.env.PORT,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html'
      }
    }
  ]
}
