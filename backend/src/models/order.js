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

    async addItem(productId, quantity, price) {
        await this.addProducts(productId, {
            through: {
                quantity: quantity,
                price: price,
            }
        });

        this.totalAmount = Number(this.totalAmount) + quantity * price;

        await this.save();
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
        },
        recipientName: {
            type: DataTypes.TEXT("tiny"),
            allowNull: false,
        },
        recipientEmail: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        recipientPhone: {
            type: DataTypes.TEXT("tiny"),
            allowNull: false,
        }
    }, {
        sequelize: sequelize
    });

    return Order;
}

export { Order, initModel };