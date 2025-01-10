import { BadGatewayException, Injectable } from '@nestjs/common'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

@Injectable()
export class FilesService {
  getStaticProductImage(imageName: string) {
    const path = join(__dirname, `../../static/products, imageName`)

    if (!existsSync(path))
      throw new BadGatewayException(`No product found with image ${imageName}`)
    return path
  }

  uploadProductImage() {
    // upload product image logic
    return `Hello, World!`
  }
}
