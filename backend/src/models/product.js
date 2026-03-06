import { DataTypes, Model } from "sequelize";

class Product extends Model {
    static associate(models) {
        Product.belongsToMany(models.Category, {
            through: "ProductCategories",
            foreignKey: "productId",
            otherKey: "categoryId",
            as: "categories",
        });

        Product.belongsToMany(models.Order, {
            through: models.OrderItem,
            foreignKey: "productId",
            otherKey: "orderId",
            as: "orders"
        });
    }
}

function initModel(sequelize) {
    Product.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2).UNSIGNED,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: "https://placeholder.co/400"
            },
            stock: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            }
        },
        {
            sequelize: sequelize
        }
    );

    return Product;
}

export { Product, initModel };