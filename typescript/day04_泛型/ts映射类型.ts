//泛型传入对象
type MapPerson<T> = {
    //通过keyof遍历并拷贝生成键值对
    [property in keyof T]: T[property]
}

interface IPerson {
    name:string;
    age:number;
}


type newPerson = MapPerson<IPerson>
//newPerson{
// name:string,
// age:number
// }
const obj:newPerson = {
    name:'zhangsan',
    age:19
};
export {}