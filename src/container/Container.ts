import {IContainer, LazyValue, Token} from "./IContainer";

type Registry<T> = {
    singleton: boolean;
    initializer: LazyValue<T>;
    value?: T;
};

export class Container implements IContainer {
    private readonly _registries: Map<Token<any>, Registry<any>> = new Map<Token<any>, Registry<any>>();

    register<T>(token: Token<T>, value: LazyValue<T>): void {
        this._registries.set(token, {
            singleton: false,
            initializer: value,
        });
    }

    registerLazySingleton<T>(token: Token<T>, value: LazyValue<T>): void {
        this._registries.set(token, {
            singleton: true,
            initializer: value,
        });
    }

    registerSingleton<T>(token: Token<T>, value: any): void {
        this._registries.set(token, {
            singleton: true,
            initializer: () => value,
            value: value,
        });
    }

    resolve<T>(token: Token<T>): T {
        const registry = this._registries.get(token);

        if (!registry) {
            throw new Error(`Type ${token} is unregistered`);
        }

        if (registry.singleton) {
            if (registry.value) return registry.value;

            registry.value = registry.initializer(this);

            this._registries.set(token, registry);

            return registry.value;
        }

        return registry.initializer(this);
    }
}
