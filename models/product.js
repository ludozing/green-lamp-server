// models 안에 파일이 추가되면 sequelize는 이를 읽어 테이블과 컬럼을 생성합니다.
// mysql의 create문을 대신한다고 생각하시면 됩니다.
module.exports = function (sequelize, DataTypes) {
    const product = sequelize.define('Products',{
        // 컬럼
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        imgUrl: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        seller: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    });
    return product;
}