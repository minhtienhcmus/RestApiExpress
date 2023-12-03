// models/user.js
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Token, { foreignKey: 'userId' });
    }

    static findAllUsers = async function () {
      return await User.findAll();
    };
    static createUser = async function (username, password) {
      try {
        // console.log("user=====")
        const user = await User.create({
          username: username,
          password: password,
        });
        // console.log('User created:', user);
       return user;
      } catch (error){
        console.log("loi ui ban oi",error);
      }
      
    };
    async comparePassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
      },
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};