import { log } from 'console'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    log('This action adds a new product')

    try {
      const product = this.productRepository.create(createProductDto)
      await this.productRepository.save(product)

      return product
    } catch (error) {
      log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    return `This action returns all products`
  }

  async findOne(id: number) {
    return `This action returns a #${id} product`
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  async remove(id: number) {
    return `This action removes a #${id} product`
  }
}
