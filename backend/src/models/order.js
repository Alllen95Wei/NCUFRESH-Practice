import { DataTypes, Model } from "sequelize";

class Order extends Model {
    static associate(models) {
        Order.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });

        Order.belongsToMany(models.Product, {
            through: models.OrderItem,
            foreignKey: "orderId",
            otherKey: "productId",
            as: "products",
        });
    }

    async addItem(product, quantity, price, transaction = null) {
        await this.addProduct(product, {
            through: {
                quantity: quantity,
                price: price,
            },
            transaction: transaction,
        });

        this.totalAmount += quantity * price;

        await this.save({ transaction: transaction });
    }
}

function initModel(sequelize) {
    Order.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.ENUM("pending", "completed", "cancelled"),
            allowNull: false,
            defaultValue: "pending",
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED,
            allowNull: false,
            defaultValue: 0.00,
        },
        shippingAddress: {
            type: DataTypes.TEXT("medium"),
            allowNull: false,
        }
    }, {
        sequelize: sequelize
    });

    return Order;
}

export { Order, initModel };