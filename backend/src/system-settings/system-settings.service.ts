import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSetting } from './system-setting.entity';

@Injectable()
export class SystemSettingsService {
  constructor(
    @InjectRepository(SystemSetting)
    private readonly settingsRepository: Repository<SystemSetting>,
  ) {}

  async getNtzCounter(): Promise<number> {
    const setting = await this.settingsRepository.findOneBy({
      key: 'ntzCounter',
    });

    if (!setting) {
      throw new Error('ntzCounter not found');
    }

    return Number(setting.value);
  }

  async incrementNtzCounter(): Promise<number> {
    const setting = await this.settingsRepository.findOneBy({
      key: 'ntzCounter',
    });

    if (!setting) {
      throw new Error('ntzCounter not found');
    }

    const nextValue = Number(setting.value) + 1;

    setting.value = String(nextValue);

    await this.settingsRepository.save(setting);

    return nextValue;
  }
}
