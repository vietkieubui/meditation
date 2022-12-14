import { IBaseService } from './base.service.interface';
import {
  Model,
  ObjectId,
  Document,
  FilterQuery,
  Callback,
  ClientSession,
} from 'mongoose';
import { HttpException } from '../exceptions';
import { BaseQuery } from '../dto';
export class BaseService<T> implements IBaseService<T> {
  constructor(private readonly model: Model<T>) {}

  async count(entity?: Callback<number>): Promise<number> {
    return this.model.count(entity);
  }

  async findAndCount(
    entity?: FilterQuery<T>,
  ): Promise<[(T & Document)[], number]> {
    const results = await this.model.find(entity);
    return [results, results.length];
  }

  async find(
    entity?: FilterQuery<T>,
    query?: BaseQuery,
  ): Promise<(T & Document)[]> {
    if (query) {
      const { page = 0, pageSize = 20 } = query;
      return this.model
        .find(entity)
        .limit(pageSize)
        .skip(page * pageSize);
    }
    return this.model.find(entity);
  }

  async findOne(
    entity?: FilterQuery<T>,
    query?: BaseQuery,
  ): Promise<T & Document> {
    if (query) {
      const { page = 0, pageSize = 20 } = query;
      return this.model
        .findOne(entity)
        .limit(pageSize)
        .skip(page * pageSize);
    }
    return this.model.findOne(entity);
  }

  async delete(
    entity?: FilterQuery<T>,
    session?: ClientSession,
  ): Promise<void> {
    const model = this.model.findOne(entity);
    await model.remove({ session });
  }

  async findByIdAndDelete(
    _id: string | ObjectId,
    session?: ClientSession,
  ): Promise<void> {
    await this.model.findByIdAndRemove(_id).session(session);
  }

  async create(
    entity?: FilterQuery<T>,
    session?: ClientSession,
  ): Promise<T & Document> {
    const newModel = new this.model({ ...entity });
    await newModel.save({ session });
    return newModel;
  }

  async update(
    entity?: FilterQuery<T>,
    newEntity?: FilterQuery<T>,
  ): Promise<void> {
    await this.model.updateOne(entity, newEntity);
  }

  async findById(id: ObjectId | string, ...res): Promise<T & Document> {
    return this.model.findById(id, ...res);
  }

  async findByIdOrFail(id: string | ObjectId, ...res): Promise<T & Document> {
    const document = await this.findById(id, ...res);
    if (!document) {
      throw HttpException.notFound();
    }
    return document;
  }
}
