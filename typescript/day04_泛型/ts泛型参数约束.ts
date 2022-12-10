//要求传入的key是Obj对象中的key之一
//extends keyof
function getObjectProperty<O,K extends keyof O>(obj:O,key:K){
    return obj[key];
}
const info = {
    name:"kun",
    age:19,
    height:1.99,
}

const name1 = getObjectProperty(info,"name");
// const name2 = getObjectProperty(info,"address");//报错


interface IKun{
    name:string,
    age:number
}
//keyof 获取对象中的所有key并生成联合类型返回
type IKunKeys = keyof IKun;
//IKunKeys: "name"|"age"


export {}