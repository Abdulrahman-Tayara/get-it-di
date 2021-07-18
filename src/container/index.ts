import {IContainer} from "./IContainer";
import {Container} from "./Container";

export class ContainerFactory {
    static create(): IContainer {
        return new Container()
    }
}