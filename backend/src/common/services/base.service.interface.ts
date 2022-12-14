import { ObjectId, Document, FilterQuery, Callback } from 'mongoose';
export interface IBaseService<T> {
  find(entity?: FilterQuery<T>): Promise<T[]>;

  findOne(entity?: FilterQuery<T>): Promise<T & Document>;

  findById(id: string | ObjectId): Promise<T & Document>;

  findByIdOrFail(id: string | ObjectId): Promise<T & Document>;

  create(entity?: FilterQuery<T>): Promise<T & Document>;

  update(entity?: FilterQuery<T>, newEntity?: FilterQuery<T>): Promise<void>;

  delete(entity?: FilterQuery<T>): Promise<void>;

  count(entity?: Callback<number>): Promise<number>;

  findAndCount(entity?: FilterQuery<T>): Promise<[(T & Document)[], number]>;
}
