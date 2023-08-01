export interface CRUDRepository<E, I, R> {
  findById(id: I): Promise<R | null>;
  create(item: E): Promise<R>;
  update(id: I, item: E): Promise<R>;
  delete(id: I): Promise<void>;
}
