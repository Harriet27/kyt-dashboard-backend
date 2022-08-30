module.exports = (sequelize, type) => {
  return sequelize.define('posts', {
    post_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: type.STRING,
    image_name: type.STRING,
    title: type.STRING,
    description: type.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  })
}
