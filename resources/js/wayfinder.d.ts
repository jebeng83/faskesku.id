export type HttpMethod = 'get' | 'head' | 'post' | 'put' | 'patch' | 'delete';

export interface RouteDefinition<M extends HttpMethod | HttpMethod[] = HttpMethod> {
  url: string;
  method?: HttpMethod;
  methods?: HttpMethod[];
}

export type RouteQueryOptions = Record<string, string | number | boolean | null | undefined>;

export declare function queryParams(options?: RouteQueryOptions): string;

export declare function applyUrlDefaults<T extends Record<string, any>>(args: T): T;

export declare function validateParameters<T extends Record<string, any>>(args: T, keys?: string[]): T;
