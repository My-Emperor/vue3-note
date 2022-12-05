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
        age
:
    19
}
//写法二 函数 需要使用到当前组件实例中的数据 如data vue底层会给provide中的this动态绑定当前组件实例对象
provide()
{
    name:"张三",
        age
:
    19,
        length
:
    this.names,
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
