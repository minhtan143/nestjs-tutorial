import {
  DataSource,
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseDomain } from '../../../domain/base.domain';
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseRepository<
  Entity extends BaseEntity,
  Domain extends BaseDomain,
> {
  protected repository: Repository<Entity>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly entity: EntityTarget<Entity>,
  ) {
    this.repository = this.dataSource.getRepository(entity);
  }

  protected abstract toDomain(entity: Entity): Domain;
  protected abstract toEntity(domain: Domain): Entity;

  async add(domain: DeepPartial<Domain>): Promise<Domain> {
    const entity = this.toEntity(domain as Domain);
    const createdEntity = this.repository.create(entity);
    const savedEntity = await this.repository.save(createdEntity);
    return this.toDomain(savedEntity);
  }

  async findOne(options: FindOneOptions<Entity>): Promise<Domain | null> {
    const entity = await this.repository.findOne(options);
    return entity ? this.toDomain(entity) : null;
  }

  async findOneBy(
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
  ): Promise<Domain | null> {
    const entity = await this.repository.findOneBy(where);
    return entity ? this.toDomain(entity) : null;
  }

  async save(domain: Domain): Promise<Domain> {
    const entity = this.toEntity(domain);
    const savedEntity = await this.repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async exists(options?: FindManyOptions<Entity>): Promise<boolean> {
    return await this.repository.exists(options);
  }

  async delete(id: string, deletedBy?: string): Promise<void> {
    await this.dataSource.transaction(async () => {
      await this.repository.update(id, {
        deletedBy: deletedBy || 'system',
      } as unknown as QueryDeepPartialEntity<Entity>);
      await this.repository.softDelete(id);
    });
  }
}
