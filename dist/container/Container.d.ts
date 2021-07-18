import { IContainer, LazyValue, Token } from "./IContainer";
export declare class Container implements IContainer {
    private readonly _registries;
    register<T>(token: Token<T>, value: LazyValue<T>): void;
    registerLazySingleton<T>(token: Token<T>, value: LazyValue<T>): void;
    registerSingleton<T>(token: Token<T>, value: any): void;
    resolve<T>(token: Token<T>): T;
}
