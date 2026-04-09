import { DataTypes, Model } from "sequelize";

class OrderItem extends Model {
    static associate(models) {
        OrderItem.belongsTo(models.Order, {
            foreignKey: "orderId",
            as: "order",
        });

        OrderItem.belongsTo(models.Product, {
            foreignKey: "productId",
            as: "product",
        });
    }
}

function initModel(sequelize) {
    OrderItem.init(
        {
            productId: {
                type: DataTypes.INTEGER.UNSIGNED
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "OrderItem",
            tableName: "order_items",
            timestamps: false
        }
    );
    return OrderItem;
}

export { OrderItem, initModel };