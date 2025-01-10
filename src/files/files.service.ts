import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { BadGatewayException, Injectable } from '@nestjs/common'

@Injectable()
export class FilesService {
  getStaticProductImage(imageName: string) {
    const path = join(__dirname, `../../static/products, imageName`)

    if (!existsSync(path))
      throw new BadGatewayException(`No product found with image ${imageName}`)
    return path
  }
}
