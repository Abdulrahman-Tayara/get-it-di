[![npm](https://img.shields.io/npm/v/get-it-di.svg)](https://www.npmjs.com/package/get-it-di)

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

const resolvedCar =  container.resolve(Car)
console.log(resolvedCar.name)
// output: Car1

const resolvedCarByKey =  container.resolve<Car>("CAR_KEY")
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

const resolvedCar =  container.resolve(Car)
console.log(resolvedCar.name)
// output: Car1
```
By using this method, you'll get **the same instance** of the class in each resolving call.
**This method requires a direct object/value.**

### registerLazySingleton:
```ts
class Car {
    constructor(public name: string) {
    }
}

container.registerLazySingleton<Car>(Car, () => new Car("1"))

const resolvedCar =  container.resolve(Car)
console.log(resolvedCar.name)
// output: Car1
```
By using this method, you'll get **the same instance** of the class in each resolving call.


## Interfaces:
```ts
interface Animal {
    walk(): void;
}

class Dog implements Animal {
    walk(): void {
        // Implementation
    }
}

// Register
container.register<Animal>("UNIQUE_KEY", () => new Dog())
// or
container.registerSingleton<Animal>("UNIQUE_KEY", new Dog())
// or
container.registerLazySingleton<Animal>("UNIQUE_KEY", () => new Dog())

// Resolve
const animal = container.resolve<Animal>("UNIQUE_KEY")
```
