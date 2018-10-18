
// 不添加d.ts在index.ts中就看不到提示了
declare namespace a {
    function call(who: string): void;
}

export default a;