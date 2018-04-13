// tsc 09.generic.ts
// 类泛型
var MinHeap = (function () {
    function MinHeap() {
        this.list = [];
    }
    MinHeap.prototype.add = function (element) {
        this.list.push(element);
        this.list.sort();
    };
    MinHeap.prototype.min = function () {
        return this.list.length ? this.list[0] : null;
    };
    return MinHeap;
}());
var heap1 = new MinHeap();
heap1.add(5);
heap1.add(3);
console.log(heap1.min());
var heap2 = new MinHeap();
heap2.add('a');
heap2.add('b');
console.log(heap2.min());
// 函数泛型 
