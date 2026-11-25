module.exports = {
  apps: [
    {
      name: 'bj-app-1',
      script: 'server.js',
      cwd: '/home/azureuser/Business-Jordan',
      env: { PORT: 3000 },
      out_file: '/var/log/bj-pm2/app1-out.log',
      error_file: '/var/log/bj-pm2/app1-error.log'
    },
    {
      name: 'bj-app-2',
      script: 'server.js',
      cwd: '/home/azureuser/Business-Jordan',
      env: { PORT: 3001 },
      out_file: '/var/log/bj-pm2/app2-out.log',
      error_file: '/var/log/bj-pm2/app2-error.log'
    }
  ]
};
