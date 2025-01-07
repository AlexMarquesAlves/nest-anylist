import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SeedService {
  async runSeed() {
    const seedMessage = 'SEED HAS BEEN EXECUTED'
    Logger.log(`THE ${seedMessage} SUCCESSFULLY`)

    return { seedMessage }
  }
}
