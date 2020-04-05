import { expect } from 'chai'
import { IterateAnything, TargetType, itany } from '../src'
import { isScalar, isString, isFunction, isArray, isSet, isMap, isIterable, isObject } from '../src/utilities';

describe("IterateAnything Class", () => {
    it('IterateAnything null', () => {
        const ita = new IterateAnything(null);

        for (let item of ita) {
            expect([null, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });
    it('IterateAnything undefined', () => {
        const ita = new IterateAnything(undefined);

        for (let item of ita) {
            expect([undefined, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything NaN', () => {
        const ita = new IterateAnything(NaN);

        for (let item of ita) {
            expect([NaN, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything number 12', () => {
        const ita = new IterateAnything(12);

        for (let item of ita) {
            expect([12, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything number 0', () => {
        const ita = new IterateAnything(0);

        for (let item of ita) {
            expect([0, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything bigint 12n', () => {
        const target = BigInt(12);
        const ita = new IterateAnything(target);

        for (let item of ita) {
            expect([target, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything bigint 0n', () => {
        const target = BigInt(0);
        const ita = new IterateAnything(target);

        for (let item of ita) {
            expect([target, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything boolean true', () => {
        const ita = new IterateAnything(true);

        for (let item of ita) {
            expect([true, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything boolean false', () => {
        const ita = new IterateAnything(false);

        for (let item of ita) {
            expect([false, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything function', () => {
        const target = () => {};
        const ita = new IterateAnything(target);

        for (let item of ita) {
            expect([target, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything Regex', () => {
        const ita = new IterateAnything(/regex/);

        for (let item of ita) {
            expect([/regex/, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything WeakMap', () => {
        const target = new WeakMap();
        const ita = new IterateAnything(target);

        for (let item of ita) {
            expect([target, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything WeakSet', () => {
        const target = new WeakSet();
        const ita = new IterateAnything(target);

        for (let item of ita) {
            expect([target, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything Promise', () => {
        const target = new Promise(() => {});
        const ita = new IterateAnything(target);

        for (let item of ita) {
            expect([target, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything String "Sam"', () => {
        const target = "Sam";
        const ita = new IterateAnything(target);

        const observe = [];
        for (let item of ita) {
            observe.push(item);
        }

        expect(observe).deep.equal([
            ['S', 0, undefined, TargetType.LIST],
            ['a', 1, undefined, TargetType.LIST],
            ['m', 2, undefined, TargetType.LIST],
        ]);
    });

    it('IterateAnything String ""', () => {
        const target = "";
        const ita = new IterateAnything(target);

        const observe = [];
        for (let item of ita) {
            observe.push(item);
        }

        expect(observe).deep.equal([]);
    });

    it('IterateAnything Array [10, 11, 12]', () => {
        const target = [10, 11, 12];
        const ita = new IterateAnything(target);

        const observe = [];
        for (let item of ita) {
            observe.push(item);
        }

        expect(observe).deep.equal([
            [10, 0, undefined, TargetType.LIST],
            [11, 1, undefined, TargetType.LIST],
            [12, 2, undefined, TargetType.LIST],
        ]);
    });

    it('IterateAnything Array []', () => {
        const target: any[] = [];
        const ita = new IterateAnything(target);

        const observe = [];
        for (let item of ita) {
            observe.push(item);
        }

        expect(observe).deep.equal([]);
    });

    it('IterateAnything Set', () => {
        // cannot test for more than 1 item, since set items do not have order
        const target = new Set();
        target.add(10);
        const ita = new IterateAnything(target);

        const observe = [];
        for (let item of ita) {
            observe.push(item);
        }

        expect(observe).deep.equal([
            [10, 0, undefined, TargetType.SET],
        ]);
    });


    it('IterateAnything Map {myKey: 10}', () => {
        // cannot test for more than 1 item, since Map items do not have order
        const target = new Map();
        target.set('myKey', 10);
        const ita = new IterateAnything(target);

        const observe = [];
        for (let item of ita) {
            observe.push(item);
        }

        expect(observe).deep.equal([
            [10, 'myKey', undefined, TargetType.MAP],
        ]);
    });

    it('IterateAnything Map {}', () => {
        // cannot test for more than 1 item, since Map items do not have order
        const target = new Map();
        const ita = new IterateAnything(target);

        const observe = [];
        for (let item of ita) {
            observe.push(item);
        }

        expect(observe).deep.equal([]);
    });

    it('IterateAnything Iterator [10,11,12]', () => {
        // cannot test for more than 1 item, since Object items do not have order
        const target = function* () {
            yield 10;
            yield 11;
            yield 12;
        };

        const iterator = new IterateAnything(target())[Symbol.iterator]();
        expect(iterator.next(100)).deep.contain({ value: [10, 0, 100, TargetType.ITERATOR] });
        expect(iterator.next(101)).deep.contain({ value: [11, 1, 101, TargetType.ITERATOR] });
        expect(iterator.next(102)).deep.contain({ value: [12, 2, 102, TargetType.ITERATOR] });
        expect(iterator.next(102)).deep.contain({ value: [] });
    });

    it('IterateAnything Iterator []', () => {
        // cannot test for more than 1 item, since Object items do not have order
        const target = function* () {};

        const iterator = new IterateAnything(target())[Symbol.iterator]();
        expect(iterator.next(100)).deep.contain({ value: [] });
    });

    it('IterateAnything Object {myKey: 10}', () => {
        // cannot test for more than 1 item, since Object items do not have order
        const target = { myKey: 10 };
        const ita = new IterateAnything(target);

        const observe = [];
        for (let item of ita) {
            observe.push(item);
        }

        expect(observe).deep.equal([
            [10, 'myKey', undefined, TargetType.MAP],
        ]);
    });

    it('IterateAnything Object {}', () => {
        // cannot test for more than 1 item, since Object items do not have order
        const target = {};
        const ita = new IterateAnything(target);

        const observe = [];
        for (let item of ita) {
            observe.push(item);
        }

        expect(observe).deep.equal([]);
    });
});

describe("Utilities", () => {
    it("isScalar null", () => {
        expect(isScalar(null)).equal(true);
    });
    
    it("isScalar undefined", () => {
        expect(isScalar(undefined)).equal(true);
    });

    it("isScalar NaN", () => {
        expect(isScalar(NaN)).equal(true);
    });

    it("isScalar number 12", () => {
        expect(isScalar(12)).equal(true);
    });

    it("isScalar number 12.3", () => {
        expect(isScalar(12.3)).equal(true);
    });

    it("isScalar number 12n", () => {
        const target = BigInt(12);
        expect(isScalar(target)).equal(true);
    });

    it("isScalar number 0n", () => {
        const target = BigInt(0);
        expect(isScalar(target)).equal(true);
    });

    it("isScalar boolean true", () => {
        expect(isScalar(true)).equal(true);
    });

    it("isScalar number false", () => {
        expect(isScalar(false)).equal(true);
    });

    it("isScalar Regex", () => {
        expect(isScalar(/Sam/)).equal(true);
    });

    it("isScalar WeakMap", () => {
        expect(isScalar(new WeakMap)).equal(true);
    });

    it("isScalar WeakSet", () => {
        expect(isScalar(new WeakSet)).equal(true);
    });

    it("isScalar Promise", () => {
        expect(isScalar(new Promise(() => {}))).equal(true);
    });

    it("isScalar Object is not scalar", () => {
        expect(isScalar({})).equal(false);
    });

    it("isString 'Sam'", () => {
        expect(isString("Sam")).equal(true);
    });

    it("isString ''", () => {
        expect(isString("")).equal(true);
    });

    it("isArray [10, 11, 12]", () => {
        expect(isArray([10, 11, 12])).equal(true);
    });

    it("isArray []", () => {
        expect(isArray([])).equal(true);
    });

    it("isSet", () => {
        expect(isSet(new Set())).equal(true);
    });

    it("isMap", () => {
        expect(isMap(new Map())).equal(true);
    });

    it("isIterable [1, 2, 3]", () => {
        expect(isIterable([1, 2, 3])).equal(true);
    });

    it("isIterable 'Sam'", () => {
        expect(isIterable("Sam")).equal(true);
    });

    it("isIterable null", () => {
        expect(isIterable(null)).equal(false);
    });

    it("isIterable undefined", () => {
        expect(isIterable(undefined)).equal(false);
    });

    it("isIterable NaN", () => {
        expect(isIterable(NaN)).equal(false);
    });
    
    it("isIterable 0", () => {
        expect(isIterable(0)).equal(false);
    });
    
    it("isIterable false", () => {
        expect(isIterable(false)).equal(false);
    });

    it("isFunction () => {}", () => {
        expect(isFunction(() => {})).equal(true);
    });

    it("isFunction function(){}", () => {
        expect(isFunction(function(){})).equal(true);
    });

    it("isObject {myKey: 12}", () => {
        expect(isObject({myKey: 12})).equal(true);
    });

    it("isObject {}", () => {
        expect(isObject({})).equal(true);
    });

})

describe("itany Function", () => {
    it('itany smoke test', () => {
        const ita = itany(12);
        
        for (let item of ita) {
            expect([12, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    })
});