export interface Liviness {
  status: string
  version: string
}
export interface Readiness {
  name: string
  version: string
  status: boolean
  duration: number
  integrations: Integrations[]
}
export interface Config {
  name: string
  version: string
  integrations: Checkers[]
}

export interface Checkers {
  check(): Promise<Integrations>
}
export interface Integrations {
  name: string;
  kind: kinds;
  status: boolean;
  response_time: number;
  url: string;
  error?: any;
}
export enum kinds {
  Redis = "Redis DB integration",
  Mencached = "Memcached integraton",
  WebAPI = "Web integrated API",
  AwsDynamoDB = "AWS Dynamo DB",
  Database = "Database integration",
}
/**
 * Used to calculate all time deltas
 * @param time is a Date().getTime()
 */
export function getDeltaTime(time: number): number {
  return (new Date().getTime() - time) / 1000;
}
// DefaultTimeOuts define all integration default timeouts
export enum Defaults {
  RedisTimeout = 2 * 1000,
  RedisDB = 0,
  RedisPort = 6379,
  MemcachedTimeout = 1000,
  MemcachePort = 11211,
  WebTimeout = 10 * 1000,
}
export interface HTTPHeader {
  key: string;
  value: string;
}
