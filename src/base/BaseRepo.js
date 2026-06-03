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
    const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);
    const safePage = Math.max(Number(page) || 1, 1);
    const skip = (safePage - 1) * safeLimit;
    const [data, total] = await Promise.all([
      this.model.find(queryFilter).sort({ [sortBy]: sortOrder }).skip(skip).limit(safeLimit),
      this.model.countDocuments(queryFilter),
    ]);
    return {
      data,
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    };
  }

  async create(data) {
    return await this.model.create(data);
  }

  async patch(id, data) {
    return await this.model.findOneAndUpdate(
      addSoftDeleteFilter({ _id: id }),
      { $set: data },
      { new: true, runValidators: true }
    );
  }

  async softDelete(id, cascadeModels = []) {
    const result = await this.model.findOneAndUpdate(
      addSoftDeleteFilter({ _id: id }),
      { $set: { silindi_mi: true, aktif_mi: false } },
      { new: true }
    );
    for (const { model: childModel, foreignKey } of cascadeModels) {
      await childModel.updateMany(
        { [foreignKey]: id, silindi_mi: false },
        { $set: { silindi_mi: true, aktif_mi: false } }
      );
    }
    return result;
  }

  async hardDelete(id) {
    return await this.model.findOneAndDelete(addSoftDeleteFilter({ _id: id }));
  }
}
