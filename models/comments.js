module.exports = (sequelize, type) => {
  return sequelize.define('comments', {
    comment_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: type.STRING,
    comment: type.STRING,
    date: type.DATE,
    like: type.INTEGER,
    dislike: type.INTEGER,
    post_id: type.INTEGER,
  },
  {
    timestamps: false,
    freezeTableName: true,
  })
}
