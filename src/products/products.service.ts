import { log } from 'console'
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { PaginationDto } from 'src/common/dto/pagination.dto'
import type { Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService')
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
      this.handleDBExceptions(error)
    }
  }

  // TODO: Pagination
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto
    log(`This action returns a product`)

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      // TODO: Relaciones
    })
    return products
  }

  async findOne(id: string) {
    log(`This action returns a #${id} product`)

    const product = await this.productRepository.findOneBy({ id })
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found.`)

    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  async remove(id: string) {
    log(`This action removes a #${id} product`)
    const product = await this.findOne(id)
    await this.productRepository.remove(product)

    return
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail)

    this.logger.error(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs'
    )
  }
}
