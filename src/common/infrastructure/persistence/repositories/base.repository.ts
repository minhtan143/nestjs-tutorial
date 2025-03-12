import {
  DataSource,
  DeepPartial,
  EntityTarget,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseDomain } from '../domain/base.domain';
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

  create(domain: DeepPartial<Domain>) {
    const entity = this.toEntity(domain as Domain);
    const createdEntity = this.repository.create(entity);
    return this.toDomain(createdEntity);
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
}
