import {
  Config,
  Readiness,
  Liviness,
  Integrations,
  getDeltaTime
} from './interfaces/types'

export class HealthChecker {
  private config: Config
  constructor(config: Config) {
    this.config = config
  }
  public liveness(): Liviness {
    return {
      status: 'fully functional',
      version: this.config.version
    }
  }
  public async readiness(): Promise<Readiness> {
    const promisesList: Promise<Integrations>[] = [];
    const start = new Date().getTime();
    this.config.integrations.forEach((item) => {
      promisesList.push(item.check())
    })
    const results = await Promise.all(promisesList)
    return {
      name: this.config.name,
      status: !results.some(({ status }) => status === false),
      version: this.config.version,
      duration: getDeltaTime(start),
      integrations: results
    }
  }
}
