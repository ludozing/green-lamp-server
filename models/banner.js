module.exports = function(sequelize,DataTypes){
    const banner = sequelize.define('Banners',{
        imgUrl: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        href : {
            type: DataTypes.STRING(200),
            allowNull: false
        }
    })
    return banner;
}