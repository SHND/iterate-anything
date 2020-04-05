export enum TargetType {
    SCALAR = 1,
    LIST,
    SET,
    MAP,
    ITERATOR
}

export type IteratorItemValue = [any, any, any, TargetType] | [];

export interface IteratorItem {
    value: IteratorItemValue;
    done: boolean;
}