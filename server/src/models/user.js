import sequelize from '../database/database.js'
import { DataTypes, Model } from 'sequelize'

const profiles = {
    1: "Normal",
    2: "Avançado"
}

class User extends Model {
    getProfileType() {
        return profiles[this.profile] ?? "N/D"
    }
}

User.init({
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    profile: { type: DataTypes.INTEGER, allowNull: false },
}, { sequelize })

User.sync()

export default User