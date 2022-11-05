import { container } from 'tsyringe';
import { Container } from '@/adapters/ports';

export abstract class TSyringeContainer implements Container {
  abstract loadProviders(): Record<string, any>;

  abstract loadConfigs(): Record<string, any>;

  async loadContainer(): Promise<void> {
    this.registerProviders();
    await this.registerConfigs();
  }

  private registerProviders(): void {
    const providers = this.loadProviders();
    for (const key in providers) {
      const currentProviders = providers[key];

      if (key) {
        container.register(key, { useClass: currentProviders });
      }
    }
  }

  private async registerConfigs(): Promise<void> {
    const configs = await this.loadConfigs();

    for (const key in configs) {
      if (key) {
        container.register(key, { useValue: configs[key] });
      }
    }
  }
}
