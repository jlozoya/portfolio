module.exports = {
  apps: [
    {
      name: "portfolio",
      cwd: "/home/bitnami/portfolio",
      script: "npm",
      args: "run start",
      env: { NODE_ENV: "production", PORT: "3000" }
    }
  ]
};
