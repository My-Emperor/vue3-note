class Person {
    name: string;
    age: number;
    //默认为any 可以设置默认值
    sex = 0;
    //Parameter 'sex' implicitly has an 'any' type. sex具有隐性的any类型
    constructor(name: string, age: number, sex:any) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
}

const p1 = new Person('why', 18, 1);

console.log(p1)
console.log(p1.name, p1.age, p1.sex);
