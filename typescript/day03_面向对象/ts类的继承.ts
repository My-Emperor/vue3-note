class Person {
    private _name: string;
    private _age: number;

    constructor(name:string, age:number) {
        this._name = name;
        this._age = age
    }

    eating(){
        console.log(this._name + "eating");
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }
}

class Student extends Person {
    sid: number


    constructor(name:string, age:number, sid: number) {
        super(name, age);
        this.sid = sid;
    }

    studying() {
        console.log(this.name + "studying")
    }

    eating() {
        super.eating();
        console.log('student' + this.sid + '---' + this.name + ' eating')
    }
}

const s1 = new Student('张三', 18, 2022);
s1.studying()
s1.eating()
