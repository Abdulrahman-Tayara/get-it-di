# get-it-di

Typescript Dependency Injection Library

## Installation

Install by npm:

```
npm install get-it-di
```

Install by yarn:

```
yarn add get-it-di
```

## Api:

### Create Container:

```ts
import {ContainerFactory} from "get-it-di";

const container = ContainerFactory.create();
```

### register:

```ts
class Car {
    constructor(public name: string) {
    }
}

container.register<Car>(Car, () => new Car("Car1"))

// or you can register by Key
container.register<Car>("CAR_KEY", () => new Car("Car2"))

const resolvedCar = container.resolve(Car)
console.log(resolvedCar.name)
// output: Car1

const resolvedCarByKey = container.resolve<Car>("CAR_KEY")
console.log(resolvedCarByKey.name)
// output: Car2
```

By using this method, you'll get a **new instance** of the class in each resolving call

### registerSingleton:

```ts
class Car {
    constructor(public name: string) {
    }
}

container.registerSingleton<Car>(Car, new Car("1"))

const resolvedCar = container.resolve(Car)
console.log(resolvedCar.name)
// output: Car1
```

By using this method, you'll get **the same instance** of the class in each resolving call.
**This method requires a direct object/value.**

### registerSingleton:

```ts
class Car {
    constructor(public name: string) {
    }
}

container.registerLazySingleton<Car>(Car, () => new Car("1"))

const resolvedCar = container.resolve(Car)
console.log(resolvedCar.name)
// output: Car1
```

By using this method, you'll get **the same instance** of the class in each resolving call.

## Interfaces:
```ts
class ApiClient {
    
}

interface IUserRepository {
    get(id: string): User;
}

class UserRepository implements IUserRepository {

    constructor(private api: ApiClient) {
    }

    get(id: string): User {
    }
}


// Register
container.registerLazySingleton<ApiClient>(ApiClient, () => new ApiClient())

container.registerLazySingleton<IUserRepository>(
    "USER_REPOSITORY",
    (c) => {
        return new UserRepository(c.resolve<ApiClient>(ApiClient))
    }
)


// Resolve
const userRepository = container.resolve<IUserRepository>("USER_REPOSITORY")
```
