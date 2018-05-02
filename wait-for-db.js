const { exec } = require("child_process");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("library", "root", "", {
  host: process.env.NODE_ENV === "development" ? "mysql" : "127.0.0.1",
  dialect: "mysql",
  pool: {
    max: 5
  }
});

const command = process.argv.reduce((cmd, arg, i) => {
  if (i > 2) cmd = cmd + ` ${arg}`;
  return cmd;
}, process.argv[2]);

const i = setInterval(() => {
  sequelize
    .authenticate()
    .then(() => {
      clearInterval(i);
      return exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(stdout);
        console.log(stderr);
        return;
      });
    })
    .catch(() => {
      console.log("unreachable");
    });
}, 1000);
