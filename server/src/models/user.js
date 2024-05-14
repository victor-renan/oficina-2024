import sequelize from '../database/database.js'
import { DataTypes, Model } from 'sequelize'

class User extends Model { }

User.init({
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    profile: { type: DataTypes.INTEGER, allowNull: false },
}, { sequelize })

User.sync()

export default User