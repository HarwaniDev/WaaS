
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model KeyShare3
 * 
 */
export type KeyShare3 = $Result.DefaultSelection<Prisma.$KeyShare3Payload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more KeyShare3s
 * const keyShare3s = await prisma.keyShare3.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more KeyShare3s
   * const keyShare3s = await prisma.keyShare3.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.keyShare3`: Exposes CRUD operations for the **KeyShare3** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KeyShare3s
    * const keyShare3s = await prisma.keyShare3.findMany()
    * ```
    */
  get keyShare3(): Prisma.KeyShare3Delegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.5.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    KeyShare3: 'KeyShare3'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db3?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "keyShare3"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      KeyShare3: {
        payload: Prisma.$KeyShare3Payload<ExtArgs>
        fields: Prisma.KeyShare3FieldRefs
        operations: {
          findUnique: {
            args: Prisma.KeyShare3FindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyShare3Payload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KeyShare3FindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyShare3Payload>
          }
          findFirst: {
            args: Prisma.KeyShare3FindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyShare3Payload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KeyShare3FindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyShare3Payload>
          }
          findMany: {
            args: Prisma.KeyShare3FindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyShare3Payload>[]
          }
          create: {
            args: Prisma.KeyShare3CreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyShare3Payload>
          }
          createMany: {
            args: Prisma.KeyShare3CreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KeyShare3CreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyShare3Payload>[]
          }
          delete: {
            args: Prisma.KeyShare3DeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyShare3Payload>
          }
          update: {
            args: Prisma.KeyShare3UpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyShare3Payload>
          }
          deleteMany: {
            args: Prisma.KeyShare3DeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KeyShare3UpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KeyShare3UpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyShare3Payload>[]
          }
          upsert: {
            args: Prisma.KeyShare3UpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyShare3Payload>
          }
          aggregate: {
            args: Prisma.KeyShare3AggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKeyShare3>
          }
          groupBy: {
            args: Prisma.KeyShare3GroupByArgs<ExtArgs>
            result: $Utils.Optional<KeyShare3GroupByOutputType>[]
          }
          count: {
            args: Prisma.KeyShare3CountArgs<ExtArgs>
            result: $Utils.Optional<KeyShare3CountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    keyShare3?: KeyShare3Omit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model KeyShare3
   */

  export type AggregateKeyShare3 = {
    _count: KeyShare3CountAggregateOutputType | null
    _avg: KeyShare3AvgAggregateOutputType | null
    _sum: KeyShare3SumAggregateOutputType | null
    _min: KeyShare3MinAggregateOutputType | null
    _max: KeyShare3MaxAggregateOutputType | null
  }

  export type KeyShare3AvgAggregateOutputType = {
    index: number | null
  }

  export type KeyShare3SumAggregateOutputType = {
    index: number | null
  }

  export type KeyShare3MinAggregateOutputType = {
    id: string | null
    solWalletId: string | null
    index: number | null
    share: Uint8Array | null
    createdAt: Date | null
  }

  export type KeyShare3MaxAggregateOutputType = {
    id: string | null
    solWalletId: string | null
    index: number | null
    share: Uint8Array | null
    createdAt: Date | null
  }

  export type KeyShare3CountAggregateOutputType = {
    id: number
    solWalletId: number
    index: number
    share: number
    createdAt: number
    _all: number
  }


  export type KeyShare3AvgAggregateInputType = {
    index?: true
  }

  export type KeyShare3SumAggregateInputType = {
    index?: true
  }

  export type KeyShare3MinAggregateInputType = {
    id?: true
    solWalletId?: true
    index?: true
    share?: true
    createdAt?: true
  }

  export type KeyShare3MaxAggregateInputType = {
    id?: true
    solWalletId?: true
    index?: true
    share?: true
    createdAt?: true
  }

  export type KeyShare3CountAggregateInputType = {
    id?: true
    solWalletId?: true
    index?: true
    share?: true
    createdAt?: true
    _all?: true
  }

  export type KeyShare3AggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KeyShare3 to aggregate.
     */
    where?: KeyShare3WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KeyShare3s to fetch.
     */
    orderBy?: KeyShare3OrderByWithRelationInput | KeyShare3OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KeyShare3WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KeyShare3s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KeyShare3s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KeyShare3s
    **/
    _count?: true | KeyShare3CountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KeyShare3AvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KeyShare3SumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KeyShare3MinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KeyShare3MaxAggregateInputType
  }

  export type GetKeyShare3AggregateType<T extends KeyShare3AggregateArgs> = {
        [P in keyof T & keyof AggregateKeyShare3]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKeyShare3[P]>
      : GetScalarType<T[P], AggregateKeyShare3[P]>
  }




  export type KeyShare3GroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KeyShare3WhereInput
    orderBy?: KeyShare3OrderByWithAggregationInput | KeyShare3OrderByWithAggregationInput[]
    by: KeyShare3ScalarFieldEnum[] | KeyShare3ScalarFieldEnum
    having?: KeyShare3ScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KeyShare3CountAggregateInputType | true
    _avg?: KeyShare3AvgAggregateInputType
    _sum?: KeyShare3SumAggregateInputType
    _min?: KeyShare3MinAggregateInputType
    _max?: KeyShare3MaxAggregateInputType
  }

  export type KeyShare3GroupByOutputType = {
    id: string
    solWalletId: string
    index: number
    share: Uint8Array
    createdAt: Date
    _count: KeyShare3CountAggregateOutputType | null
    _avg: KeyShare3AvgAggregateOutputType | null
    _sum: KeyShare3SumAggregateOutputType | null
    _min: KeyShare3MinAggregateOutputType | null
    _max: KeyShare3MaxAggregateOutputType | null
  }

  type GetKeyShare3GroupByPayload<T extends KeyShare3GroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KeyShare3GroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KeyShare3GroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KeyShare3GroupByOutputType[P]>
            : GetScalarType<T[P], KeyShare3GroupByOutputType[P]>
        }
      >
    >


  export type KeyShare3Select<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    solWalletId?: boolean
    index?: boolean
    share?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["keyShare3"]>

  export type KeyShare3SelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    solWalletId?: boolean
    index?: boolean
    share?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["keyShare3"]>

  export type KeyShare3SelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    solWalletId?: boolean
    index?: boolean
    share?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["keyShare3"]>

  export type KeyShare3SelectScalar = {
    id?: boolean
    solWalletId?: boolean
    index?: boolean
    share?: boolean
    createdAt?: boolean
  }

  export type KeyShare3Omit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "solWalletId" | "index" | "share" | "createdAt", ExtArgs["result"]["keyShare3"]>

  export type $KeyShare3Payload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KeyShare3"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      solWalletId: string
      index: number
      share: Uint8Array
      createdAt: Date
    }, ExtArgs["result"]["keyShare3"]>
    composites: {}
  }

  type KeyShare3GetPayload<S extends boolean | null | undefined | KeyShare3DefaultArgs> = $Result.GetResult<Prisma.$KeyShare3Payload, S>

  type KeyShare3CountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KeyShare3FindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KeyShare3CountAggregateInputType | true
    }

  export interface KeyShare3Delegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KeyShare3'], meta: { name: 'KeyShare3' } }
    /**
     * Find zero or one KeyShare3 that matches the filter.
     * @param {KeyShare3FindUniqueArgs} args - Arguments to find a KeyShare3
     * @example
     * // Get one KeyShare3
     * const keyShare3 = await prisma.keyShare3.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KeyShare3FindUniqueArgs>(args: SelectSubset<T, KeyShare3FindUniqueArgs<ExtArgs>>): Prisma__KeyShare3Client<$Result.GetResult<Prisma.$KeyShare3Payload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KeyShare3 that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KeyShare3FindUniqueOrThrowArgs} args - Arguments to find a KeyShare3
     * @example
     * // Get one KeyShare3
     * const keyShare3 = await prisma.keyShare3.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KeyShare3FindUniqueOrThrowArgs>(args: SelectSubset<T, KeyShare3FindUniqueOrThrowArgs<ExtArgs>>): Prisma__KeyShare3Client<$Result.GetResult<Prisma.$KeyShare3Payload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KeyShare3 that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyShare3FindFirstArgs} args - Arguments to find a KeyShare3
     * @example
     * // Get one KeyShare3
     * const keyShare3 = await prisma.keyShare3.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KeyShare3FindFirstArgs>(args?: SelectSubset<T, KeyShare3FindFirstArgs<ExtArgs>>): Prisma__KeyShare3Client<$Result.GetResult<Prisma.$KeyShare3Payload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KeyShare3 that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyShare3FindFirstOrThrowArgs} args - Arguments to find a KeyShare3
     * @example
     * // Get one KeyShare3
     * const keyShare3 = await prisma.keyShare3.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KeyShare3FindFirstOrThrowArgs>(args?: SelectSubset<T, KeyShare3FindFirstOrThrowArgs<ExtArgs>>): Prisma__KeyShare3Client<$Result.GetResult<Prisma.$KeyShare3Payload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KeyShare3s that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyShare3FindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KeyShare3s
     * const keyShare3s = await prisma.keyShare3.findMany()
     * 
     * // Get first 10 KeyShare3s
     * const keyShare3s = await prisma.keyShare3.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const keyShare3WithIdOnly = await prisma.keyShare3.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KeyShare3FindManyArgs>(args?: SelectSubset<T, KeyShare3FindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KeyShare3Payload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KeyShare3.
     * @param {KeyShare3CreateArgs} args - Arguments to create a KeyShare3.
     * @example
     * // Create one KeyShare3
     * const KeyShare3 = await prisma.keyShare3.create({
     *   data: {
     *     // ... data to create a KeyShare3
     *   }
     * })
     * 
     */
    create<T extends KeyShare3CreateArgs>(args: SelectSubset<T, KeyShare3CreateArgs<ExtArgs>>): Prisma__KeyShare3Client<$Result.GetResult<Prisma.$KeyShare3Payload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KeyShare3s.
     * @param {KeyShare3CreateManyArgs} args - Arguments to create many KeyShare3s.
     * @example
     * // Create many KeyShare3s
     * const keyShare3 = await prisma.keyShare3.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KeyShare3CreateManyArgs>(args?: SelectSubset<T, KeyShare3CreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KeyShare3s and returns the data saved in the database.
     * @param {KeyShare3CreateManyAndReturnArgs} args - Arguments to create many KeyShare3s.
     * @example
     * // Create many KeyShare3s
     * const keyShare3 = await prisma.keyShare3.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KeyShare3s and only return the `id`
     * const keyShare3WithIdOnly = await prisma.keyShare3.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KeyShare3CreateManyAndReturnArgs>(args?: SelectSubset<T, KeyShare3CreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KeyShare3Payload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KeyShare3.
     * @param {KeyShare3DeleteArgs} args - Arguments to delete one KeyShare3.
     * @example
     * // Delete one KeyShare3
     * const KeyShare3 = await prisma.keyShare3.delete({
     *   where: {
     *     // ... filter to delete one KeyShare3
     *   }
     * })
     * 
     */
    delete<T extends KeyShare3DeleteArgs>(args: SelectSubset<T, KeyShare3DeleteArgs<ExtArgs>>): Prisma__KeyShare3Client<$Result.GetResult<Prisma.$KeyShare3Payload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KeyShare3.
     * @param {KeyShare3UpdateArgs} args - Arguments to update one KeyShare3.
     * @example
     * // Update one KeyShare3
     * const keyShare3 = await prisma.keyShare3.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KeyShare3UpdateArgs>(args: SelectSubset<T, KeyShare3UpdateArgs<ExtArgs>>): Prisma__KeyShare3Client<$Result.GetResult<Prisma.$KeyShare3Payload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KeyShare3s.
     * @param {KeyShare3DeleteManyArgs} args - Arguments to filter KeyShare3s to delete.
     * @example
     * // Delete a few KeyShare3s
     * const { count } = await prisma.keyShare3.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KeyShare3DeleteManyArgs>(args?: SelectSubset<T, KeyShare3DeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KeyShare3s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyShare3UpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KeyShare3s
     * const keyShare3 = await prisma.keyShare3.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KeyShare3UpdateManyArgs>(args: SelectSubset<T, KeyShare3UpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KeyShare3s and returns the data updated in the database.
     * @param {KeyShare3UpdateManyAndReturnArgs} args - Arguments to update many KeyShare3s.
     * @example
     * // Update many KeyShare3s
     * const keyShare3 = await prisma.keyShare3.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KeyShare3s and only return the `id`
     * const keyShare3WithIdOnly = await prisma.keyShare3.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KeyShare3UpdateManyAndReturnArgs>(args: SelectSubset<T, KeyShare3UpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KeyShare3Payload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KeyShare3.
     * @param {KeyShare3UpsertArgs} args - Arguments to update or create a KeyShare3.
     * @example
     * // Update or create a KeyShare3
     * const keyShare3 = await prisma.keyShare3.upsert({
     *   create: {
     *     // ... data to create a KeyShare3
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KeyShare3 we want to update
     *   }
     * })
     */
    upsert<T extends KeyShare3UpsertArgs>(args: SelectSubset<T, KeyShare3UpsertArgs<ExtArgs>>): Prisma__KeyShare3Client<$Result.GetResult<Prisma.$KeyShare3Payload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KeyShare3s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyShare3CountArgs} args - Arguments to filter KeyShare3s to count.
     * @example
     * // Count the number of KeyShare3s
     * const count = await prisma.keyShare3.count({
     *   where: {
     *     // ... the filter for the KeyShare3s we want to count
     *   }
     * })
    **/
    count<T extends KeyShare3CountArgs>(
      args?: Subset<T, KeyShare3CountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KeyShare3CountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KeyShare3.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyShare3AggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KeyShare3AggregateArgs>(args: Subset<T, KeyShare3AggregateArgs>): Prisma.PrismaPromise<GetKeyShare3AggregateType<T>>

    /**
     * Group by KeyShare3.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyShare3GroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KeyShare3GroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KeyShare3GroupByArgs['orderBy'] }
        : { orderBy?: KeyShare3GroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KeyShare3GroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKeyShare3GroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KeyShare3 model
   */
  readonly fields: KeyShare3FieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KeyShare3.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KeyShare3Client<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the KeyShare3 model
   */ 
  interface KeyShare3FieldRefs {
    readonly id: FieldRef<"KeyShare3", 'String'>
    readonly solWalletId: FieldRef<"KeyShare3", 'String'>
    readonly index: FieldRef<"KeyShare3", 'Int'>
    readonly share: FieldRef<"KeyShare3", 'Bytes'>
    readonly createdAt: FieldRef<"KeyShare3", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KeyShare3 findUnique
   */
  export type KeyShare3FindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyShare3
     */
    select?: KeyShare3Select<ExtArgs> | null
    /**
     * Omit specific fields from the KeyShare3
     */
    omit?: KeyShare3Omit<ExtArgs> | null
    /**
     * Filter, which KeyShare3 to fetch.
     */
    where: KeyShare3WhereUniqueInput
  }

  /**
   * KeyShare3 findUniqueOrThrow
   */
  export type KeyShare3FindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyShare3
     */
    select?: KeyShare3Select<ExtArgs> | null
    /**
     * Omit specific fields from the KeyShare3
     */
    omit?: KeyShare3Omit<ExtArgs> | null
    /**
     * Filter, which KeyShare3 to fetch.
     */
    where: KeyShare3WhereUniqueInput
  }

  /**
   * KeyShare3 findFirst
   */
  export type KeyShare3FindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyShare3
     */
    select?: KeyShare3Select<ExtArgs> | null
    /**
     * Omit specific fields from the KeyShare3
     */
    omit?: KeyShare3Omit<ExtArgs> | null
    /**
     * Filter, which KeyShare3 to fetch.
     */
    where?: KeyShare3WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KeyShare3s to fetch.
     */
    orderBy?: KeyShare3OrderByWithRelationInput | KeyShare3OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KeyShare3s.
     */
    cursor?: KeyShare3WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KeyShare3s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KeyShare3s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KeyShare3s.
     */
    distinct?: KeyShare3ScalarFieldEnum | KeyShare3ScalarFieldEnum[]
  }

  /**
   * KeyShare3 findFirstOrThrow
   */
  export type KeyShare3FindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyShare3
     */
    select?: KeyShare3Select<ExtArgs> | null
    /**
     * Omit specific fields from the KeyShare3
     */
    omit?: KeyShare3Omit<ExtArgs> | null
    /**
     * Filter, which KeyShare3 to fetch.
     */
    where?: KeyShare3WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KeyShare3s to fetch.
     */
    orderBy?: KeyShare3OrderByWithRelationInput | KeyShare3OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KeyShare3s.
     */
    cursor?: KeyShare3WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KeyShare3s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KeyShare3s.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KeyShare3s.
     */
    distinct?: KeyShare3ScalarFieldEnum | KeyShare3ScalarFieldEnum[]
  }

  /**
   * KeyShare3 findMany
   */
  export type KeyShare3FindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyShare3
     */
    select?: KeyShare3Select<ExtArgs> | null
    /**
     * Omit specific fields from the KeyShare3
     */
    omit?: KeyShare3Omit<ExtArgs> | null
    /**
     * Filter, which KeyShare3s to fetch.
     */
    where?: KeyShare3WhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KeyShare3s to fetch.
     */
    orderBy?: KeyShare3OrderByWithRelationInput | KeyShare3OrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KeyShare3s.
     */
    cursor?: KeyShare3WhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KeyShare3s from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KeyShare3s.
     */
    skip?: number
    distinct?: KeyShare3ScalarFieldEnum | KeyShare3ScalarFieldEnum[]
  }

  /**
   * KeyShare3 create
   */
  export type KeyShare3CreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyShare3
     */
    select?: KeyShare3Select<ExtArgs> | null
    /**
     * Omit specific fields from the KeyShare3
     */
    omit?: KeyShare3Omit<ExtArgs> | null
    /**
     * The data needed to create a KeyShare3.
     */
    data: XOR<KeyShare3CreateInput, KeyShare3UncheckedCreateInput>
  }

  /**
   * KeyShare3 createMany
   */
  export type KeyShare3CreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KeyShare3s.
     */
    data: KeyShare3CreateManyInput | KeyShare3CreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KeyShare3 createManyAndReturn
   */
  export type KeyShare3CreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyShare3
     */
    select?: KeyShare3SelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KeyShare3
     */
    omit?: KeyShare3Omit<ExtArgs> | null
    /**
     * The data used to create many KeyShare3s.
     */
    data: KeyShare3CreateManyInput | KeyShare3CreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KeyShare3 update
   */
  export type KeyShare3UpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyShare3
     */
    select?: KeyShare3Select<ExtArgs> | null
    /**
     * Omit specific fields from the KeyShare3
     */
    omit?: KeyShare3Omit<ExtArgs> | null
    /**
     * The data needed to update a KeyShare3.
     */
    data: XOR<KeyShare3UpdateInput, KeyShare3UncheckedUpdateInput>
    /**
     * Choose, which KeyShare3 to update.
     */
    where: KeyShare3WhereUniqueInput
  }

  /**
   * KeyShare3 updateMany
   */
  export type KeyShare3UpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KeyShare3s.
     */
    data: XOR<KeyShare3UpdateManyMutationInput, KeyShare3UncheckedUpdateManyInput>
    /**
     * Filter which KeyShare3s to update
     */
    where?: KeyShare3WhereInput
    /**
     * Limit how many KeyShare3s to update.
     */
    limit?: number
  }

  /**
   * KeyShare3 updateManyAndReturn
   */
  export type KeyShare3UpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyShare3
     */
    select?: KeyShare3SelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KeyShare3
     */
    omit?: KeyShare3Omit<ExtArgs> | null
    /**
     * The data used to update KeyShare3s.
     */
    data: XOR<KeyShare3UpdateManyMutationInput, KeyShare3UncheckedUpdateManyInput>
    /**
     * Filter which KeyShare3s to update
     */
    where?: KeyShare3WhereInput
    /**
     * Limit how many KeyShare3s to update.
     */
    limit?: number
  }

  /**
   * KeyShare3 upsert
   */
  export type KeyShare3UpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyShare3
     */
    select?: KeyShare3Select<ExtArgs> | null
    /**
     * Omit specific fields from the KeyShare3
     */
    omit?: KeyShare3Omit<ExtArgs> | null
    /**
     * The filter to search for the KeyShare3 to update in case it exists.
     */
    where: KeyShare3WhereUniqueInput
    /**
     * In case the KeyShare3 found by the `where` argument doesn't exist, create a new KeyShare3 with this data.
     */
    create: XOR<KeyShare3CreateInput, KeyShare3UncheckedCreateInput>
    /**
     * In case the KeyShare3 was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KeyShare3UpdateInput, KeyShare3UncheckedUpdateInput>
  }

  /**
   * KeyShare3 delete
   */
  export type KeyShare3DeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyShare3
     */
    select?: KeyShare3Select<ExtArgs> | null
    /**
     * Omit specific fields from the KeyShare3
     */
    omit?: KeyShare3Omit<ExtArgs> | null
    /**
     * Filter which KeyShare3 to delete.
     */
    where: KeyShare3WhereUniqueInput
  }

  /**
   * KeyShare3 deleteMany
   */
  export type KeyShare3DeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KeyShare3s to delete
     */
    where?: KeyShare3WhereInput
    /**
     * Limit how many KeyShare3s to delete.
     */
    limit?: number
  }

  /**
   * KeyShare3 without action
   */
  export type KeyShare3DefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyShare3
     */
    select?: KeyShare3Select<ExtArgs> | null
    /**
     * Omit specific fields from the KeyShare3
     */
    omit?: KeyShare3Omit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const KeyShare3ScalarFieldEnum: {
    id: 'id',
    solWalletId: 'solWalletId',
    index: 'index',
    share: 'share',
    createdAt: 'createdAt'
  };

  export type KeyShare3ScalarFieldEnum = (typeof KeyShare3ScalarFieldEnum)[keyof typeof KeyShare3ScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'Bytes[]'
   */
  export type ListBytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type KeyShare3WhereInput = {
    AND?: KeyShare3WhereInput | KeyShare3WhereInput[]
    OR?: KeyShare3WhereInput[]
    NOT?: KeyShare3WhereInput | KeyShare3WhereInput[]
    id?: StringFilter<"KeyShare3"> | string
    solWalletId?: StringFilter<"KeyShare3"> | string
    index?: IntFilter<"KeyShare3"> | number
    share?: BytesFilter<"KeyShare3"> | Uint8Array
    createdAt?: DateTimeFilter<"KeyShare3"> | Date | string
  }

  export type KeyShare3OrderByWithRelationInput = {
    id?: SortOrder
    solWalletId?: SortOrder
    index?: SortOrder
    share?: SortOrder
    createdAt?: SortOrder
  }

  export type KeyShare3WhereUniqueInput = Prisma.AtLeast<{
    id?: string
    solWalletId_index?: KeyShare3SolWalletIdIndexCompoundUniqueInput
    AND?: KeyShare3WhereInput | KeyShare3WhereInput[]
    OR?: KeyShare3WhereInput[]
    NOT?: KeyShare3WhereInput | KeyShare3WhereInput[]
    solWalletId?: StringFilter<"KeyShare3"> | string
    index?: IntFilter<"KeyShare3"> | number
    share?: BytesFilter<"KeyShare3"> | Uint8Array
    createdAt?: DateTimeFilter<"KeyShare3"> | Date | string
  }, "id" | "solWalletId_index">

  export type KeyShare3OrderByWithAggregationInput = {
    id?: SortOrder
    solWalletId?: SortOrder
    index?: SortOrder
    share?: SortOrder
    createdAt?: SortOrder
    _count?: KeyShare3CountOrderByAggregateInput
    _avg?: KeyShare3AvgOrderByAggregateInput
    _max?: KeyShare3MaxOrderByAggregateInput
    _min?: KeyShare3MinOrderByAggregateInput
    _sum?: KeyShare3SumOrderByAggregateInput
  }

  export type KeyShare3ScalarWhereWithAggregatesInput = {
    AND?: KeyShare3ScalarWhereWithAggregatesInput | KeyShare3ScalarWhereWithAggregatesInput[]
    OR?: KeyShare3ScalarWhereWithAggregatesInput[]
    NOT?: KeyShare3ScalarWhereWithAggregatesInput | KeyShare3ScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KeyShare3"> | string
    solWalletId?: StringWithAggregatesFilter<"KeyShare3"> | string
    index?: IntWithAggregatesFilter<"KeyShare3"> | number
    share?: BytesWithAggregatesFilter<"KeyShare3"> | Uint8Array
    createdAt?: DateTimeWithAggregatesFilter<"KeyShare3"> | Date | string
  }

  export type KeyShare3CreateInput = {
    id?: string
    solWalletId: string
    index: number
    share: Uint8Array
    createdAt?: Date | string
  }

  export type KeyShare3UncheckedCreateInput = {
    id?: string
    solWalletId: string
    index: number
    share: Uint8Array
    createdAt?: Date | string
  }

  export type KeyShare3UpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    solWalletId?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    share?: BytesFieldUpdateOperationsInput | Uint8Array
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KeyShare3UncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    solWalletId?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    share?: BytesFieldUpdateOperationsInput | Uint8Array
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KeyShare3CreateManyInput = {
    id?: string
    solWalletId: string
    index: number
    share: Uint8Array
    createdAt?: Date | string
  }

  export type KeyShare3UpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    solWalletId?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    share?: BytesFieldUpdateOperationsInput | Uint8Array
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KeyShare3UncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    solWalletId?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    share?: BytesFieldUpdateOperationsInput | Uint8Array
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BytesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Uint8Array
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type KeyShare3SolWalletIdIndexCompoundUniqueInput = {
    solWalletId: string
    index: number
  }

  export type KeyShare3CountOrderByAggregateInput = {
    id?: SortOrder
    solWalletId?: SortOrder
    index?: SortOrder
    share?: SortOrder
    createdAt?: SortOrder
  }

  export type KeyShare3AvgOrderByAggregateInput = {
    index?: SortOrder
  }

  export type KeyShare3MaxOrderByAggregateInput = {
    id?: SortOrder
    solWalletId?: SortOrder
    index?: SortOrder
    share?: SortOrder
    createdAt?: SortOrder
  }

  export type KeyShare3MinOrderByAggregateInput = {
    id?: SortOrder
    solWalletId?: SortOrder
    index?: SortOrder
    share?: SortOrder
    createdAt?: SortOrder
  }

  export type KeyShare3SumOrderByAggregateInput = {
    index?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Uint8Array
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BytesFieldUpdateOperationsInput = {
    set?: Uint8Array
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBytesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Uint8Array
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
    in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Uint8Array
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}