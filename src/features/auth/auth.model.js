import mongoose from 'mongoose';
import { baseSchemaFields, baseSchemaOptions } from '../../base/BaseModel.js';

const userSchema = new mongoose.Schema({
  ...baseSchemaFields,
  email: {
    type:      String,
    required:  [true, 'E-posta zorunludur'],
    unique:    true,
    lowercase: true,
    trim:      true,
  },
  sifre: {
    type:      String,
    required:  [true, 'Şifre zorunludur'],
    minlength: 6,
  },
  rol: {
    type:    String,
    enum:    ['admin', 'kullanici'],
    default: 'kullanici',
  },
}, baseSchemaOptions);

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export default UserModel;