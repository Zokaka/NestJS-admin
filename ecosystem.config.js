// PM2 配置管理
module.exports = {
  apps: [
    {
      name: 'nest-api',                 // PM2 列表中显示的名称
      script: 'dist/main.js',           // 启动脚本路径（Nest 打包后的入口文件）

      // 运行与控制
      instances: 1,                     // 实例数量。如果你的服务器是多核，可以设为 'max' 开启集群模式
      autorestart: true,                // 发生异常崩溃时自动重启
      watch: false,                     // 生产环境建议关闭 watch（监听文件变化重启），避免性能损耗
      max_memory_restart: '1G',         // 内存超限自动重启，防止 Node.js 内存泄漏导致服务器卡死

      // 日志管理 (可选：让 PM2 把日志单独存放在项目目录下，方便查看)
      // error_file: './logs/pm2-error.log',
      // out_file: './logs/pm2-out.log',
      // merge_logs: true,

      // 【默认环境变量】
      // 当你执行: pm2 start ecosystem.config.js 时生效
      env: {
        NODE_ENV: 'development',
      },

      // 【生产环境变量】
      // 当你执行: pm2 start ecosystem.config.js --env production 时生效
      env_production: {
        NODE_ENV: 'production',
        // 如果你不想用 .env 文件，甚至可以直接把 DB_HOST 等变量写在这里（但不推荐明文写密码）
      },
    },
  ],
};