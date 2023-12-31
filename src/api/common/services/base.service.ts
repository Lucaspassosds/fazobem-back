import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository, DeepPartial, BaseEntity } from 'typeorm';

export class BaseService<T extends BaseEntity> {
  public constructor(public readonly baseRepository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.baseRepository.find();
  }

  async findOne(id: string): Promise<T> {
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

  async update(id: string, entity: DeepPartial<T>): Promise<T> {
    const existingEntity = await (this.baseRepository as any).findOne({
      where: { id },
    });
    if (!existingEntity) {
      throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
    }

    const updatedEntity = this.baseRepository.merge(existingEntity, entity);
    return this.baseRepository.save(updatedEntity);
  }

  async delete(id: string): Promise<void> {
    const entity = await (this.baseRepository as any).findOne({
      where: {
        id,
      },
    });
    if (!entity) {
      throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
    }
    const deleteResponse = await this.baseRepository.remove(entity);
  }
}
