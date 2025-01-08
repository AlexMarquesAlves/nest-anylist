import { Injectable, Logger } from '@nestjs/common'
import { ProductsService } from '../products/products.service'
import { initialData } from './data/seed-data'

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

    const products = initialData.products
    const insertPromises = []

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product))
    })
    const results = await Promise.all(insertPromises)

    return Logger.debug(results)
  }
}
