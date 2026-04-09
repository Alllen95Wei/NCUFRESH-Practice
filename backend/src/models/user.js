import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {
    static associate(models) {
        User.hasMany(models.Order, {
            foreignKey: "orders",
            as: "orders",
        })
    }

    async verifyPassword(inputPassword) {
        return await bcrypt.compare(inputPassword, this.password);
    }
}

function initModel(sequelize) {
    User.init(
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
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
                set(value) {
                    const salt = bcrypt.genSaltSync(10);
                    this.setDataValue("password", bcrypt.hashSync(value, salt));
                }
            },
            roles: {
                type: DataTypes.JSON,
                defaultValue: ["customer"],
            }
        },
        {
            sequelize: sequelize,
            // hooks: {
            //     beforeCreate: async (user) => {
            //         if (user.password) {
            //             const salt = await bcrypt.genSalt(10);
            //             user.password = await bcrypt.hash(user.password, salt);
            //         }
            //     },
            //     beforeUpdate: async (user) => {
            //         if (user.changed("password")) {
            //             const salt = await bcrypt.genSalt(10);
            //             user.password = await bcrypt.hash(user.password, salt);
            //         }
            //     }
            // }
        }
    );

    return User;
}

export { User, initModel };
