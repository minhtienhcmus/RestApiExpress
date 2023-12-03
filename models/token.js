'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Token.belongsTo(models.User,{foreignKey:'userId'})
    }
    static createToken = async function ( token, userId) {
      try {
        // console.log("user=====")
        return await Token.create({ token:token, userId:userId });
        // console.log('User created:', user);
      } catch (error){
        console.log("loi ui ban oi",error);
      }
     
    };
  }
  Token.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};