# 1.vue3初步使用

## vue的本质还是JS库

#### 初体验引用封装好的库即可.

#### 1.通过CDN引入

    什么是CDN
        通过相互链接的网络系统,
        利用最靠近每个用户端服务器更快更可靠的将网络资源发送给用户,
        以便提供高性能、可扩展性以及低成本的网络内容传递给用户

#### 2.下载Vue的js文件手动引入

#### 3.通过npm包管理工具来安装(webpack)

#### 4.通过vue-cli等脚手架安装

#### 抽离template写法

    1.通过script标签
    script type="x-template" id="app"
    vueCreate({template:'#app'})

    2.通过html  template标签 不会被页面渲染

#### 为什么methods中声明的函数不能使用箭头函数

    1.为什么不能使用?  
        箭头函数是不会绑定this的,此时的this指向的上层作用域中的script标签即window, 
        window中不能拿到data中返回的对象数据

        所以只能使用普通函数,this才会根据绑定规则进行绑定
        
    2.不使用箭头函数的情况下,this指向的是什么
        按照绑定规则,谁调用指向谁, 
        但在vue中底层会通过bind函数将this动态绑定到当前实例的proxy中

# 2.vue基本指令

#### 复习指令

    v-once:标签只渲染一次,不会进行更新, -- 多用于优化性能
    v-text:更新元素的textCount 等同与{{}}
    v-html:将文本解析成html标签
    v-pre :不解析Mustache语法
    v-clock:保持在元素上知道关联组件实例结束编译, -- 与css [v-clock]{display:none}配合使用,隐藏未编译Mustache标签直到组件实例准备完毕.
    v-bind:动态绑定属性 语法糖 :style 、 :class 等
    v-on:监听事件绑定 语法糖 @
        修饰符:
            @click.stop - event.stopPropagation();
                  .prevent - 调用 event.preventDefault()。
                  .capture - 添加事件侦听器时使用 capture 模式。
                  .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
                  .{keyAlias} - 仅当事件是从特定键触发时才触发回调。
                  .once - 只触发一次回调。
                  .left - 只当点击鼠标左键时触发。
                  .right - 只当点击鼠标右键时触发。
                  .middle - 只当点击鼠标中键时触发。
                  .passive - { passive: true } 模式添加侦听器
            
    v-if、v-else、v-else-if、v-show、v-for
        v-if与v-for可以搭配template元素使用，可以当做不可见的包裹元素，并且在v-if上使用，但是最终template不会被渲染出来
    v-for中绑定的key用于底层判断是否使用diff算法对VNodes进行处理,以及其处理的方式

#### 数组更新检测

    会改变原有数组
    push、pop、shift、unshift、splice、sort、revrse
    不会替换原有数组,而是新生成数组
    filter、concat、slice、map

# 3.vue基本api

### 计算属性 component

    对于任何包含响应式数据的复杂逻辑,都应该使用计算属性,计算属性将呗混入到组件实例中.所有的getter和setter的this上下文自动绑定为组件实例
    计算属性基于依赖关系会进行缓存

```javascript
    const App = {
    computed: {
        //简写getter写法
        fullName() {
            return this.firstName + '' + this.lastName;
        },
        //完整写法
        fullsName: {
            get: function () {
                return this.firstName + '' + this.lastName;
            },
            set: function (newValue) {
                console.log(newValue)
            }
        }
    }
}

```

### 监听器 watch

```javascript
    const App = {
    watch: {

        fullName(newValue, oldValue) {
            console.log(newValue)
            console.log(oldValue)
        },

        //深度监听
        fullName: {
            handler: function (newValue, oldValue) {
                console.log(newValue)
                console.log(oldValue)
            },
            deep: true,//深度监听:可以监听到属性的改变
            immediate: true,//立即执行
        },

        //字符串方法名
        fullName: "someMethod",//methods中的方法

        //数组 监听时需要有多个方法逐一调用时
        fullName: [
            "someMethod",
            function handle2(newValue, oldValue) {
                console.log(newValue, oldValue)
            },
            function handle3(newValue, oldValue) {
                console.log(newValue, oldValue)
            }
        ],

        //字符串表达式 监听具体的属性
        'fullName.firstName': function (newValue, oldValue) {
            console.log(newValue, oldValue)
        }
    },


    //通过$watch监听
    created() {
        const unwatch = this.$watch("info", function (newInfo, oldInfo) {
            console.log(newInfo, valueInfo);
        }, {
            deep: true,
            immediate: true
        })
        //通过$watch监听可以取消
        unwatch();
    }
}
```

### Webpack复习

    安装webpack webpack-cli -g全局安装
    npm install webpack webpack-cli -g 

    局部安装  --save-dev  / -D
        npm init 生成package.json
    
    直接 webpack命令 还是使用的是全局的webpack    
     1.npx webpack 优先寻找本地
     2.使用package.json中的脚本命令

    npx wenpack / npm run build 默认找index.js为入口
    指定入口与导出出口:
        --entry  --output-path
        npx webpack --entry ./src/main.js --output-path .build
    
    webpack配置文件 默认为 webpack.config.js 
        否则需要使用--config指定配置文件 webpack --config name.config.js

# 4.vue3-component

### 非父子孙 组件之间共享数据

#### provide Inject

    无论层级结构有多深,父组件都可以作为其所有子组件的依赖提供者
    父组件有一个Provide选项来提供数据
    子组件有一个inject选项来开始使用这些数据

    提供的父组件、兄弟组件不能够使用provide中的数据,复杂则需要使用Vuex

```javascript
//father.vue
//写法一 对象
provide:{
    name:'张三', 
    age:19
}
//写法二 函数 需要使用到当前组件实例中的数据 如data vue底层会给provide中的this动态绑定当前组件实例对象
provide()
{
    name:"张三",
    age:19,
    length:this.names,
}

//son.vue
inject:["name", "age"]
```

### 兄弟组件之间的通信

#### mitt库全局事件总线

    Vue3从实例中移除了$on,$off,$once方法,如果希望继续使用全局事件总线,要通过第三方的库实现
    推荐库:mitt , tiny-emitter

```javascript
import emitter

form
"@/utils/eventbus.js"
//监听事件
created()
{
    //通过mitt对象监听事件 type:监听事件名称
    emitter.on("why", (info) => {
        console.log("event", info)
    })
}
//触发事件
emitter.emit("why", {name: 'zhangsan', age: 19})
```

### 动态组件

    component

```javascript
    <component is="home">

    <component
    :is="currentTab">

    export default{
    data(){
    return {
    currentTab:"home"
}
},
    component:{
    Home
}
}   
```

### 异步组件

    常用语代码分包,优化首屏渲染速度 异步组件基于webpack分包特性

```javascript

//异步组件结合suspense使用
<template>
    <div>
        App组件
        <home></home>

        <suspense>
            <!-- 默认插槽展示异步组件预期内容 -->
            <template
            #default>
            <async-category></async-category>
</template>

<!-- 回调插槽展示失败后的内容 -->
<template #fallback>
<loading></loading>
</template>

</suspense>
</div>

</template>

import {defineAsyncComponent} from "vue";

import Loading from './Loading.vue'

const AsyncCategory = defineAsyncComponent({
    loader: () => import("./AsyncCategory.vue"),
    loadingComponent: Loading,
    //errorComponent,
    //在显示loadingComponent组件之前,等待多长事件
    delay: 2000,
    /**
     *
     * @param err 错误信息
     * @param retry 函数,调用retry尝试重新加载
     * @param attempts 记录尝试的次数
     */
    onError: function (err, retry, attempts) {

    }
})
```

### Mixin 混入

    合并规则/全局混入

### vue-compositionApi VCA

    vue2 -> options Api 
        OptionsApi:在对应的属性中编写对应的功能模块; 如data定义数据,methods定义方法,等
        弊端:实现某一功能时,需要把对应的代码逻辑拆分到各个属性中.

    setup()
    
    import {ref,reactive ,readonly ,isProxy ,isReactive ,isReadonly ,toRaw} from 'vue' 
    定义响应式数据:
        ref():定义简单数据类型使用,如Number,String等 
        reactive():定义复杂类型时使用,如Object,Array等 
        readonly():只读 不能够进行修改 
        
        isProxy:检查对象是否是由reactive或readonly创建的Proxy响应式对象 
        isRef:判断是ref对象
        isReactive:
            检查对象是否是由reactive创建的响应式代理 
            如果该代理是readonly创建的,但包裹了由reactive创建的另一个代理,则也会返回true 
        isReadonly:是否由readonly创建的只读代理 
        toRaw:返回reactive或readonly代理的原始对象
            
        浅响应式
        shallowRef:创建浅层的ref对象
        shallowReactive:创建一个响应式对象,他跟踪其自身property的响应式,但不执行嵌套对象的深层响应式转换(深层还是原始对象)
        shallowReadonly:创建一个proxy,使其自身property为只读,但不执行嵌套对象的深度只读转换(深层还是可读,可写的)。

    toRef(obj,key)
        obj:reactive定义的响应式代理
        key:属性名
        return :
        将reactive代理中的一个对应key属性单独转成ref
    
    toRefs();
        将reactive返回的对象中的属性都转成ref;
        配合es6结构语法获得的属性都是ref的;
    ```javascript
        import {reqactive,toRefs} from 'vue';
        const state = reactive({
            name:"zhangsan",
            age:19,
        })

        const {name,age} = toRefs
    ```
    computed 返回值为ref对象

```javascript
    setup()
{
    const firstName = ref("first")
    const lastName = ref("last")
    //用法1 传入getter函数
    // const fullName = computed(() => firstName.value + '--'  + lastName.value)
    //用法2 传入对象,对象包含getter和setter
    const fullName = computed(() => {
        get:() => firstName.value + '--' + lastName.value,
            set(newValue)
        {
            const names = newValue.split(" ");
            firstName.value = names[0];
            lastName.value = names[1];
        }
    })
    const changeName = () => {
        fullName.value = "zhang san"
    }

    return {
        fullName
    }
}   
```

    watch监听器
        watch
            特点:惰性,监听源发生变化才会执行
        watchEffect,第一次监听就执行 类似immder...配置
            配置 flush: dom挂载完毕后在监听 默认值为pre, 修改为post 
        对比:
            watch懒执行副作用
            更具体的说明当前那个状态发生了变化,
            访问侦听状态变化前后的值

    自定义指令(代码的复用和抽象主要还是通过组件)
        当需要对DOM元素进行底层操作时可能会用到自定义指令
        1.自定义局部指令:组件提供过directives选项,只能在当前组件使用
        2.自定义全局指令:app的directive方法,可以在任意组件中被使用
            demo:当某个元素挂载完成后可以自动获取焦点 v-focus

```javascript
export default {
    //局部指令
    directives: {
        focus: {
            //el:当前DOM实例
            //bindings:修饰符以及参数
            mounted(el, bindings, vnode, preVnode) {
                console.log("v-focus mounted")//自定义指令的mounted先执行 ,组件的mounted后执行
                el.focus();
            }
        }
    }
}

//全局指令 app.vue
const app = createApp(App);
app.directive("focus", {
    mounted(el, bindings, vnode, preVnode) {
        el.focus();
    }
})


```

    Vue生命周期
        created(setup)
        beforeMount
        mounted
        beforeUpdate
        updated
        beforeUnmount
        unmounted

# 5.router

    1.hash模式  
    2.h5的history模式

# 6.vuex / pinia
###vuex
state
```javascript

// app.vue
import {useState} from '../hooks/useState'

export default {
    setup() {
        
        //方式为optionsApi中的mapState
        /*
        * computed:{
        *   fullName(){
        *       return "joke";
        *   }
        * 
        *   ...mapState(["counter","name","age","height"])
        * 
        * }
        * 
        * */
        
        
        //方式一 数组
        const storeState = useState(["counter", "name", "age", "height"]);
        //方式二 别名对象
        const storeState2 = useState({
            sCounter: state => state.counter,
            sName: state => state.name
        })
        return {
            ...storeState,
            ...storeState2
        }
    }
}

// useState.js
import {computed} from 'vue'
import {mapState, useStore} from 'vue'

export function useState(mapper) {
    //拿到store对象
    const store = useStore();

    //获取到对应的对象fn ({name:function,age:function}) 
    const storeStateFns = mapState(mapper)

    //对数据进行转换
    const storeState = {}
    Object.keys(storeStateFns).forEach(fnKey => {
        //动态将this绑定为$store
        const fn = storeStateFns[fnKey].bind({$store: store});
        //通过computed进行转换返回对应的值
        storeState[fnKey] = computed(fn)
    })
    return storeState
}

```

getter 同上

mutation / action

###pinia
pinia更符合vue3 componentAPI

npm install pinia
```txt
-- stores
  - counter.js (vuex -> state) //用于保存状态
  - index.js 
```

```javascript
//stores/index.js
import {createPinia} from "pinia"
const pinia = createPinia();
export default pinia
```


```javascript
//counter.js
//导入pinia

store

import { defineStore } from 'pinia'

//通过defineStore创建需要共享的数据
// defineStore(key,data) : fn
const useCounter = defineStore("counter",{
    // state(){
    //     return {
    //         count:99
    //     }
    // }
  state : () => ({
    count:99
  })
})

export default useCounter;
```

```vue
//App.vue
<template>
  <div class="home">
    <h2>count:{{counterStore.count}}</h2>
  </div>
</template>
<script setup>
import useCounter from "@/stores/counter";
import {toRef} from "vue";
import {storeToRefs} from "pinia";

const counterStore = useCounter;
//可以进行结构但需要经过toRefs或者 pinia提供的storeTorefs进行处理才是响应式的
// const { count } = toRef(counterStore);
const { count } = storeToRefs(counterStore);
</script>
```

```javascript
import { mapMutations, mapState, mapActions } from 'vuex'

import { INCREMENT_N } from '../store/mutation-types'

export default {
    methods: {
        ...mapMutations(["increment", "decrement"]),
        ...mapMutations({
            add: "increment"
        }),
        ...mapActions(["incrementAction", "decrementAction"]),
        ...mapActions({
          add: "incrementAction",
          sub: "decrementAction"
        })
    },
    setup() {
        const storeMutations = mapMutations(["increment", "decrement"])
        const actions = mapActions(["incrementAction", "decrementAction"])
        const actions2 = mapActions({
            add: "incrementAction",
            sub: "decrementAction"
        })
        return {
            ...storeMutations,
            actions,
            actions2
        }
    }
}
```

# 7 hy-trip

通过vite创建项目 npm init vue@latest
pinia


# 8 Typescript
js缺陷
* js在es6版本之前使用var关键字关于作用域的问题
* js的数组类型不是连续的内存空间
* js没有类型检测机制

编译 tsc
ts环境

* 1.webpack搭建ts环境
* 2.全局安装ts-node

* ts-nodd依赖 tslib @types/node 两个包

`npm install ts-node -g`
`npm install tslib @types/node -g`



tm: ts-node .\hello_typescript.ts
*** 
###1.变量类型声明
```typescript
/*
*  var没有块级作用域,不推荐使用包括在tslint中
*  var / let / const 标识符: 数据类型(类型注解) = 赋值;
*  
*  string
*  number 不区分int float double等
*  boolean
*  Array 
*  Object
*  Symbol //符号
*  null 只有一个值null
*  undefined 只有一个只 undefined
*  any 任意类型 应用 类型断言 / 不想控制类型
*  unknown 不确定类型 unknown只能赋值给any 和 unknown类型
*  void 返回值为空 / return undefined
*  never 永远不会发生值的类型
*  tuple 元组 可以存放不同的数据类型,取出来的item也有明确的类型,函数中声明返回值使用最多
* 
* 
* */
//string
let message: string = "Hello World"
//number
let max: number = 100;
//boolean
let flag: boolean = 20>10;

//Array类型有两种语法
//1.常用写法  标识符: 数据类型[] = 赋值
//2.泛型写法  标识符: Array<类型> = 赋值
let arr1: string[] = ["abc","cba","bca"];
let arr2: Array<number> = [1,2,3,4,5];
// arr1.push(123); 报错 类型错误

//Object
//type别名 
//sex?  可选类型
type infoObj = {name:string,age:number,sex?:string}
const info: infoObj = {
    name:'zhangsan',
    age:19
}
//symbol

const title1 = Symbol("title")
const title2 = Symbol("title")

const teacher = {
    [title1]:"数学老师",
    [title2]:"语文老师",
}
//null / undefined
let n: null = null;
let u: undefined = undefined;

//tuple
const infoArr:[string,number,number] = ["hello",123,456];
const valueAge = infoArr[2];//type为number


```

TS的类型检测机制: 鸭子类型
```typescript

```

*** 

###2.语法细节
* 联合类型 `|` 常用于声明多种类型
* 交叉类型 `&` 两种(多种类型要同时满足) 常判断对象是否是子类或子接口
* 类型别名 `type`
* 接口声明 `interface`

`接口与别名的区别`

1.type类型使用范围更广,接口类型只能用来声明对象

2.在声明对象时,interface可以多次声明(type不支持两个相同名称的别名存在,接口可以并且会将属性合并)

3.interface支持extends继承

4.interface支持被类实例化

总结: 如果是非对象类型的定义使用type, 如果是对象类型的声明那么使用interface

* 断言 `as` 类型断言的规则: 断言只能断言成更加具体的类型, 或者 不太具体(any/unknown) 类型

`ts类型缩小的使用`

1.typeof

2.=== 或 !==

3.instanceof

4.in 判断是否有某一个属性

*** 
###3.类与面向对象

```typescript
class person {
    name: string;
    age: number;

    constructor(name:string,age:number) {
        this.name = name;
        this.age = age;
    }
}


```

类的特性作用
* 可以创建类对应的实例对象
* 类本身可以作为这个实例的类型
* 类也可以当作一个构造签名的函数

类的修饰符
* public 在任何地方可见，公有的属性或方法,默认为public
* private 仅在同一类中可见，私有的属性或方法
* protected 仅在类自身或子类中可见，受保护的属性与方法
* readonly 只读属性

其中private与setter  getter进行类的封装

TS参数属性语法糖
```typescript
class Person {
    // *底层操作1
    // name:string;
    // private _age:number;

    //参数属性语法糖: 当属性很多时,可以使用参数属性语法糖
    //在参数钱加上修饰符 其中底层做了两件事情
    //*底层操作1.在类中自动声明同名同类型的属性
    //*底层操作2.将构造形参的值传入给自动声明的属性中
    constructor(public name: string, private _age: number) {
        // *底层操作2
        // this.name = name;
        // this._age = _age;
    }
}
```

抽象类abstract 
* 抽奖类不能被实例化(new)
* 抽象类可以包含抽奖方法(也可以包含实现体方法})
* 有抽象方法的类,必须是一个抽象类
* 抽奖方法必须被子类重写实现,否则该继承的类必须是一个抽象类

接口 interface
* 接口可以被继承也可以实现接口implements(可以实现多个),但都必须实现接口的属性与方法(因为接口也是)

接口与抽象类
区别
* 抽象类是事物的抽象，抽象类用来捕捉子类的通用特性，接口通常是一些行为的描述；
* 抽象类通常用于一系列关系紧密的类之间，接口只是用来描述一个类应该具有什么行为；
* 接口可以被多层实现，而抽象类只能单一继承；
* 抽象类中可以有实现体，接口中只能有函数的声明；

关系
* 抽象类是对事物的抽象，表达的是 is a 的关系。猫是一种动物（动物就可以定义成一个抽象类）
* 接口是对行为的抽象，表达的是 has a 的关系。猫拥有跑（可以定义一个单独的接口）、爬树（可以定义一个单独的接口）
  的行为

枚举 enum
```typescript
enum Direction{
    //枚举类型中名称应都为大写 默认0开始一次递增
    UP,
    DOWN,
    LEFT,
    RIGHT
}
const up:Direction = Direction.UP;
```
***
###4.泛型
```typescript
//类型参数化
function bar<type>(arg:type){
    return arg
}
//完整写法
const res1 = bar<number>(123)
const res2 = bar<string>('aaa')
const res3 = bar<{name:string}>({name:'zhangsan'});
//省略写法 自动类型退到
const res4 = bar(123123);
const res5 = bar('aaaa');


// 支持传入多个类型
function foo<T,E>(arg1:T,arg2:E){
    
}
```

泛型常用名称:
* T: type 类型
* K、V: key、value 键值对
* E: element 元素
* O: Object 对象

泛型接口 与 泛型类
```typescript
//泛型可以初始化类型
interface IKun<T = string> {
  name: string;
  age: number;
  slogan: T;
}

class Point<T = number> {
  x: T;
  y: T;

  constructor(x:T,y:T) {
      this.x = x;
      this.y = y;
  }
}

const kun1: IKun<string> = {
  name: 'kun',
  age: 18,
  slogan: "哈哈哈"
}
const kun2: IKun<number> = {
  name: 'kun',
  age: 18,
  slogan: "13213123"
}
```

泛型约束 extends 、 keyof
```typescript
//泛型约束
interface ILength{
    length:number;
}
function getInfo<T extends ILength>(args:T):T{
    return args;
}
const info1 = getInfo("aaaa");
const info2 = getInfo([1,3,2,45,5]);
const info3 = getInfo({length:100});

//泛型参数约束 要求传入的key是Obj对象中的key之一
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

// keyof ------------------
interface IKun{
  name:string,
  age:number
}
//keyof 获取对象中的所有key并生成联合类型返回
type IKunKeys = keyof IKun;
//IKunKeys: "name"|"age"

```
映射类型
```typescript
type MapPerson<T> = {
    [property in keyof T]: T[property]
}
interface IPerson {
    name:string;
    age:number;
}
type newPerson = MapPerson<IPerson>;
```
映射修饰符
```typescript
type MapPerson<T> = {
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

const obj:newPerson = {
    name:'zhangsan',
    age:19,
    height:1.75
};
```

类型体操github

https://github.com/type-challenges/type-challenges
https://ghaiklor.github.io/type-challenges-solutions/en/

*** 
###5.tsconfig.json配置文件

[tsconfig.js配置文档](https://www.typescriptlang.org/tsconfig)

寻找指定配置,在地址后加锚点(如:target) https://www.typescriptlang.org/tsconfig#target

初始化生成 tsc --init

手动编译时直接tsc 打包所有ts文件为js，tsc指定文件时,tsconfig.json文件会被忽略


###6.ts封装axios

