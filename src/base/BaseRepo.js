import { addSoftDeleteFilter } from './BaseModel.js';

export class BaseRepo {
  constructor(model) {
    this.model = model;
  }

  async getOne(id) {
    return await this.model.findOne(addSoftDeleteFilter({ _id: id }));
  }

  async getMany({ filter = {}, sortBy = 'olusturulma_tarihi', sortOrder = -1, page = 1, limit = 10 } = {}) {
    const queryFilter = addSoftDeleteFilter(filter);
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.find(queryFilter).sort({ [sortBy]: sortOrder }).skip(skip).limit(Number(limit)),
      this.model.countDocuments(queryFilter),
    ]);
    return {
      data,
      total,
      page:       Number(page),
      limit:      Number(limit),
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(data) {
    return await this.model.create(data);
  }

  async patch(id, data) {
    return await this.model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
  }

  async softDelete(id, cascadeModels = []) {
    const result = await this.model.findByIdAndUpdate(
      id,
      { $set: { silindi_mi: true, aktif_mi: false } },
      { new: true }
    );
    for (const { model: childModel, foreignKey } of cascadeModels) {
      await childModel.updateMany(
        { [foreignKey]: id },
        { $set: { silindi_mi: true, aktif_mi: false } }
      );
    }
    return result;
  }

  async hardDelete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}