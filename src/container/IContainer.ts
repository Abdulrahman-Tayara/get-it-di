export interface IContainer {
    register<T>(token: Token<T>, value: LazyValue<T>): void;

    registerSingleton<T>(token: Token<T>, value: any): void;

    registerLazySingleton<T>(token: Token<T>, value: LazyValue<T>): void;

    resolve<T>(token: Token<T>): T;
}

export type LazyValue<T> = (container: IContainer) => T;

export type Constructor<T> = new (...args: any[]) => T;

export type Token<T> = string | Constructor<T>;