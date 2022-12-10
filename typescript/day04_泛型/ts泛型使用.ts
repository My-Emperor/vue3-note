//类型参数化
function bar<type>(arg:type){
    return arg
}

//完整写法
const res1 = bar<number>(123)
const res2 = bar<string>('aaa')
const res3 = bar<{name:string}>({name:'zhangsan'});

//省略写法 自动类型推倒
const res4 = bar(123123);
const res5 = bar('aaaa');


function foo<T,E>(arg1:T,arg2:E){
    return null;
}
foo<number,number>(19,20)

export {}