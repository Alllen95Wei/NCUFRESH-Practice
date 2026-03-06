import { DataTypes, Model } from "sequelize";

class Category extends Model {
    static associate(models) {
        Category.belongsToMany(models.Product, {
            through: "ProductCategories",
            foreignKey: "categoryId",
            otherKey: "productId",
            as: "products",
        });
    }
}

function initModel(sequelize) {
    Category.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            }
        },
        {
            sequelize: sequelize
        }
    );

    return Category;
}

export { Category, initModel };