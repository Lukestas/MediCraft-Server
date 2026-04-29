export type Query = Record<string, unknown>;

export interface Repository<T = unknown> {
  create(data: T): Promise<T>;
  find(type: string): Promise<T[] | null>;
  findById(id: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  findDNI(DNI: number): Promise<T | null>;
  findEmail(email: string): Promise<T | null>;
}
