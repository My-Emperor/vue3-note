interface ILength{
    length:number;
}
function getInfo<T extends ILength>(args:T):T{
    return args;
}
const info1 = getInfo("aaaa");
const info2 = getInfo([1,3,2,45,5]);
const info3 = getInfo({length:100});
// const info4 = getInfo(123);//报错


export {}