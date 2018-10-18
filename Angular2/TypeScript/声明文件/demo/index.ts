// 使用babel-node执行index.ts，否则会提示找不到export（如果用ts-node的话，因为引用的文件里面有export的js）
// import a  from './type1';
// a.call('chenji');

// 下面如果需要执行应该在ts中，所以要用ts-node进行
// type2是放在node_module下面的(可以删掉types查看效果，没有提示)
import b =  require('type2');
b.call('Pwcong');