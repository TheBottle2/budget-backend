import mongoose from 'mongoose';
import { baseSchemaFields, baseSchemaOptions } from '../../base/BaseModel.js';

const userSchema = new mongoose.Schema({
  ...baseSchemaFields,
  email: {
    type: String,
    required: [true, 'E-posta zorunludur'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  sifre: {
    type: String,
    required: [true, 'Şifre zorunludur'],
    minlength: 8,
    select: false,
  },
  rol: {
    type: String,
    enum: ['admin', 'kullanici'],
    default: 'kullanici',
  },
}, baseSchemaOptions);

userSchema.index({ email: 1, silindi_mi: 1 });

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export default UserModel;
