module.exports = {
  apps: [
    {
      name: 'ai-wordpress-automation',
      script: 'npm',
      args: 'start',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
