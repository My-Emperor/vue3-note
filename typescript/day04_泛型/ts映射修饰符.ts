//泛型传入对象
type MapPerson<T> = {
    //通过keyof遍历并拷贝生成键值对
    // [property in keyof T]: T[property]

    //使用修饰符 默认符号 +
    //+号 添加修饰符
    //-号 删除修饰符

    //属性即是只读的(readonly) 也是可选类型?
    // +readonly [property in keyof T]+?: T[property]
    // readonly [property in keyof T]?: T[property]

    //-号 删除属性中的readonly只读与可选类型?
    -readonly [property in keyof T]-?: T[property]


}

interface IPerson {
    name:string;
    readonly age:number;
    height?:number
}


type newPerson = MapPerson<IPerson>
//newPerson{
// name:string,
// age:number
// }
const obj:newPerson = {
    name:'zhangsan',
    age:19,
    height:1.75
};

export {}