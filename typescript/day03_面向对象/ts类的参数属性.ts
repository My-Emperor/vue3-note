class Person{
    // 底层操作1
    // name:string;
    // age:number;

    //参数属性语法糖
    //在参数钱加上修饰符 其中底层做了两件事情
    //底层操作1.在类中自动声明同名同类型的属性
    //底层操作2.将构造形参的值传入给自动声明的属性中
    //当属性很多时,可以使用参数属性语法糖
    constructor(public name: string, private age: number) {
        // 底层操作2
        // this.name = name;
        // this.age = age;
    }
}