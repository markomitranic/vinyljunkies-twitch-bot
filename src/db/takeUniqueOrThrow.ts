/**
 * A helper function allowing us to take a single row from a database query
 * and throw an error if there are more than one.
 *
 * @see https://github.com/drizzle-team/drizzle-orm/discussions/1499
 * @example
 * db.select().from(configTable).then(takeUniqueOrThrow);
 */
export function takeUniqueOrThrow<T>(values: T[]): T | undefined {
  if (values.length > 1) {
    throw new Error(`Found more than one row when exactly 1 was expected.`);
  }
  return values[0] ?? undefined;
}
