import { expect } from 'chai'
import { IterateAnything, TargetType, itany } from '../src'

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

    it('IterateAnything number', () => {
        const ita = new IterateAnything(12);

        for (let item of ita) {
            expect([12, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything bigint', () => {
        const target = BigInt(12);
        const ita = new IterateAnything(target);

        for (let item of ita) {
            expect([target, 0, undefined, TargetType.SCALAR])
                .deep.equal(item)
        }
    });

    it('IterateAnything boolean', () => {
        const ita = new IterateAnything(true);

        for (let item of ita) {
            expect([true, 0, undefined, TargetType.SCALAR])
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

    it('IterateAnything String', () => {
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

    it('IterateAnything Array', () => {
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


    it('IterateAnything Map', () => {
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

    it('IterateAnything Iterator', () => {
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
    });

    it('IterateAnything Object', () => {
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