export class BaseManager {
  constructor(repo) {
    this.repo = repo;
  }

  async getOne(id) {
    const kayit = await this.repo.getOne(id);
    if (!kayit) throw new Error('Kayıt bulunamadı!');
    return kayit;
  }

  async getMany(params) {
    return await this.repo.getMany(params);
  }

  async create(data) {
    return await this.repo.create(data);
  }

  async patch(id, data) {
    await this.getOne(id);
    return await this.repo.patch(id, data);
  }

  async softDelete(id, cascadeModels) {
    await this.getOne(id);
    return await this.repo.softDelete(id, cascadeModels);
  }

  async hardDelete(id) {
    return await this.repo.hardDelete(id);
  }
}