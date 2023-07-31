import { Sequelize} from "sequelize";

const sequelize = new Sequelize({
    username: "postgres",
    database: "test_db",
    password: "jasur001",
    host: "localhost",
    dialect: "postgres",
  });
  
  !(async function () {
    try {
      sequelize.authenticate();
      console.log("connect");
    } catch (error) {}
  })();
  

  
  export {sequelize}