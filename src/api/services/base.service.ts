import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityTarget, getRepository, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseService<T> {
  protected baseRepository: Repository<T>;

  constructor(model: EntityTarget<T>) {
    this.baseRepository = getRepository(model);
  }

  findAll() {
    return this.baseRepository.find();
  }

  async findOne(id: number) {
    const element = await this.baseRepository.findOne(id);
    if (element) {
      return element;
    }
    throw new HttpException('Element not found', HttpStatus.NOT_FOUND);
  }

  async updateElement(id: number, element: QueryDeepPartialEntity<T>) {
    await this.baseRepository.update(id, element);
    const updatedElement = await this.baseRepository.findOne(id);
    if (updatedElement) {
      return updatedElement;
    }
    throw new HttpException('Element not found', HttpStatus.NOT_FOUND);
  }

  async deleteElement(id: number) {
    const deleteResponse = await this.baseRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Element not found', HttpStatus.NOT_FOUND);
    }
  }
}
