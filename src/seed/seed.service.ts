import { Injectable, Logger } from '@nestjs/common'

const logger = new Logger('SeedService')

@Injectable()
export class SeedService {
  constructor() {}

  async executeSeed(): Promise<boolean> {
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
