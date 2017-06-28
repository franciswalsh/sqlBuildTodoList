'use strict';
module.exports = function(sequelize, DataTypes) {
  var TodoList = sequelize.define('TodoList', {
    listItem: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TodoList;
};