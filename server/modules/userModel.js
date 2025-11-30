const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    // Personal Info
    name: {type: String, required: true},
    phoneNo: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, default: 'https://placehold.co/400x400?text=User'},
    
    // Auth & Security
    createdAt: {type: Date, default: Date.now},
    verifyOtp:{type: String, default: ''},
    verifyOtpExpireAt:{type: Number,default: 0},
    isAccountVerified:{type: Boolean, default: false},
    resetOtp:{type: String,default: ''},
    resetOtpExpiredAt:{type: Number,default: 0},

    // Financial Data (Added)
    totalEarnings: { type: Number, default: 0 },
    totalSpending: { type: Number, default: 0 },
    totalSavings: { type: Number, default: 0 },
    // Note: totalBalance is calculated on the fly, not stored.
});

const UserModel = model('User', userSchema);
module.exports = UserModel;