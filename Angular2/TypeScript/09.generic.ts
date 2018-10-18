// tsc 09.generic.ts
// ts-node 09.generic.ts

// 类泛型
class MinHeap<T> {
	list: T[] = [];
	add(element: T): void {
		this.list.push(element);
		this.list.sort();
	}
	min(): T {
		return this.list.length ? this.list[0] : null;
	}
}
let heap1 = new MinHeap<number>();
heap1.add(5);
heap1.add(3);
console.log(heap1.min());

let heap2 = new MinHeap<string>();
heap2.add('a');
heap2.add('b');
console.log(heap2.min());

// 函数泛型
function Zip<T1, T2>(l1: T1[], l2: T2[]): [T1, T2][] {
	let len = Math.min(l1.length, l2.length);
	let ret = [];
	for (let i = 0; i < len; i++) {
		ret.push([l1[i], l2[i]])
	}
	return ret;
}
console.log(Zip<number, string>([1, 2, 3], ['a', 'b', 'c']));
