import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository, DeepPartial, BaseEntity } from 'typeorm';

export abstract class BaseService<T extends BaseEntity> {
  protected constructor(private readonly baseRepository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.baseRepository.find();
  }

  async findOne(id: number): Promise<T> {
    const entity = await (this.baseRepository as any).findOne({
      where: { id },
    });
    if (entity) {
      return entity;
    }
    throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.baseRepository.create(entity);
    return this.baseRepository.save(newEntity);
  }

  async update(id: number, entity: DeepPartial<T>): Promise<T> {
    const existingEntity = await (this.baseRepository as any).findOne({
      where: { id },
    });
    if (!existingEntity) {
      throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
    }

    const updatedEntity = this.baseRepository.merge(existingEntity, entity);
    return this.baseRepository.save(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    const deleteResponse = await this.baseRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
    }
  }
}
