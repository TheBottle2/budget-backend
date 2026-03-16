import { BaseRepo } from '../../base/BaseRepo.js';
import UserModel from './auth.model.js';

export class AuthRepo extends BaseRepo {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email, silindi_mi: false });
  }

  async emailVarMi(email) {
    return await UserModel.exists({ email });
  }
}