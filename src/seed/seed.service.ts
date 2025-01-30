import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

const logger = new Logger('SeedService')

@Injectable()
export class SeedService {
  private isProd: boolean

  constructor(private readonly configService: ConfigService) {
    this.isProd = configService.get('STATE') === 'prod'
  }

  async executeSeed(): Promise<boolean> {
    if (this.isProd) {
      throw new UnauthorizedException('We cannot run SEED on production.')
    }
    // * Limpiar la base de datos BORRANDO TODO

    await this.deleteAll()
    // * Crear los datos de ejemplo
    await this.createData()

    return true
  }

  deleteAll() {
    throw new Error('Method not implemented.')
  }

  createData() {
    // * Crear usuarios
    // * Crear Items
  }
}
