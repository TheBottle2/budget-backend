import bcrypt from 'bcryptjs';
import { BaseManager } from '../../base/BaseManager.js';
import { toUserResponseDTO } from './auth.dto.js';

export class AuthManager extends BaseManager {
  constructor(authRepo) {
    super(authRepo);
  }

  async register(data) {
    console.log('[AuthManager] Register başladı:', data.email);
    const emailMevcut = await this.repo.emailVarMi(data.email);
    console.log('[AuthManager] Email var mı:', emailMevcut);
    if (emailMevcut) throw new Error('Bu e-posta adresi zaten kayıtlı!');

    console.log('[AuthManager] Şifre hashleniyor...');
    const hashedSifre = await bcrypt.hash(data.sifre, 10);
    console.log('[AuthManager] Şifre hashlendi, kullanıcı oluşturuluyor...');
    const yeniKullanici = await this.repo.create({
      ad:    data.ad,
      email: data.email,
      sifre: hashedSifre,
      rol:   'kullanici',
    });
    console.log('[AuthManager] Kullanıcı oluşturuldu:', yeniKullanici.email);

    return toUserResponseDTO(yeniKullanici);
  }

  async login(data) {
    const kullanici = await this.repo.findByEmail(data.email);
    if (!kullanici) throw new Error('E-posta veya şifre hatalı!');

    const sifreEslesiyor = await bcrypt.compare(data.sifre, kullanici.sifre);
    if (!sifreEslesiyor) throw new Error('E-posta veya şifre hatalı!');

    return toUserResponseDTO(kullanici);
  }
}