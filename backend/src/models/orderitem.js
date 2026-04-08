import { DataTypes, Model } from "sequelize";

class OrderItem extends Model {
    // static associate(models) {}
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