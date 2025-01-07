import { Injectable, Logger } from '@nestjs/common'
import { ProductsService } from '../products/products.service'

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}
  async runSeed() {
    const seedMessage = 'SEED HAS BEEN EXECUTED'

    try {
      await this.insertNewProducts()

      Logger.log(`THE ${seedMessage} SUCCESSFULLY`)
    } catch (error) {
      Logger.error(error)
    }
    return { seedMessage }
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts()
  }
}
