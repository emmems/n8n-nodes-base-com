/** Small validators for the parameter shapes used by the Base operations. */
type Validator<T> = (value: unknown, path: string) => T;
interface Schema<T> {
  validate: Validator<T>;
  optional(): Schema<T | undefined>;
  nullish(): Schema<T | null | undefined>;
  nonnegative(): Schema<T>;
  gt(value: number, options?: { message?: string }): Schema<T>;
  email(options?: { message?: string }): Schema<T>;
  transform<U>(fn: (value: T) => U): Schema<U>;
  parse(value: unknown): T;
}
type Parsed<S> = S extends Schema<infer T> ? T : never;
type Shape = Record<string, Schema<unknown>>;
type ParsedShape<S extends Shape> = { [K in keyof S]: S[K] extends Schema<infer T> ? T : never };
// Preserve the email format accepted by the previous parameter validator.
const emailPattern = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
function schema<T>(validate: Validator<T>): Schema<T> {
  return {
    validate,
    optional() { return schema((v, p) => v === undefined ? undefined : validate(v, p)); },
    nullish() { return schema((v, p) => v == null ? v : validate(v, p)); },
    nonnegative() { return schema((v, p) => { const n = validate(v, p); if ((n as number) < 0) throw new Error(`${p} must be nonnegative`); return n; }); },
    gt(min, options) { return schema((v, p) => { const n = validate(v, p); if ((n as number) <= min) throw new Error(options?.message ?? `${p} must be greater than ${min}`); return n; }); },
    email(options) { return schema((v, p) => { const s = validate(v, p); if (!emailPattern.test(s as string)) throw new Error(options?.message ?? `${p} must be a valid email`); return s; }); },
    transform(fn) { return schema((v, p) => fn(validate(v, p))); },
    parse(v) { return validate(v, 'input'); },
  };
}
function fail(path: string, expected: string): never { throw new Error(`${path} must be ${expected}`); }
function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
const validation = {
  string: () => schema((v, p) => typeof v === 'string' ? v : fail(p, 'a string')),
  number: () => schema((v, p) => typeof v === 'number' && Number.isFinite(v) ? v : fail(p, 'a finite number')),
  boolean: () => schema((v, p) => typeof v === 'boolean' ? v : fail(p, 'a boolean')),
  null: () => schema((v, p) => v === null ? v : fail(p, 'null')),
  union: <S extends Schema<unknown>[]>(schemas: S) => schema((v, p): Parsed<S[number]> => {
    for (const s of schemas) { try { return s.validate(v, p) as Parsed<S[number]>; } catch { /* Try the next accepted type. */ } }
    return fail(p, 'an accepted value');
  }),
  array: <T>(inner: Schema<T>) => schema((v, p) => Array.isArray(v) ? v.map((item, i) => inner.validate(item, `${p}[${i}]`)) : fail(p, 'an array')),
  object: <S extends Shape>(shape: S) => schema((v, p): ParsedShape<S> => {
    if (!isRecord(v)) return fail(p, 'an object');
    const output: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(shape)) {
      const parsed = item.validate(v[key], `${p}.${key}`);
      if (parsed !== undefined) Object.defineProperty(output, key, { value: parsed, enumerable: true, writable: true, configurable: true });
    }
    return output as ParsedShape<S>;
  }),
  record: <T>(key: Schema<string>, inner: Schema<T>) => schema((v, p) => {
    if (!isRecord(v)) return fail(p, 'an object');
    return Object.fromEntries(Object.entries(v).map(([k, val]) => [key.validate(k, p), inner.validate(val, `${p}.${k}`)]));
  }),
};
export default validation;
