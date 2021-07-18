export interface IContainer {
    register<T>(token: Token<T>, value: LazyValue<T>): void;
    registerSingleton<T>(token: Token<T>, value: any): void;
    registerLazySingleton<T>(token: Token<T>, value: LazyValue<T>): void;
    resolve<T>(token: Token<T>): T;
}
export declare type LazyValue<T> = (container: IContainer) => T;
export declare type Constructor<T> = new (...args: any[]) => T;
export declare type Token<T> = string | Constructor<T>;
