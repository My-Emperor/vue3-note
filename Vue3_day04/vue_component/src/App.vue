<template>
  <home></home>
</template>

<script>

import Home from "@/components/Home";
import {computed} from "vue";
import emitter from "@/utils/eventbus";
export default {
  name: 'App',
  components:{
    Home
  },
  //使用provide Inject 来共享数据
  provide(){
   return {
     name:'张三',
     age:18,
     // length:this.names.length
     //绑定响应式数据
     length:computed(() => this.names.length)
   }
  },
  data(){
    return {
      names:[1,2,3,4,5]
    }
  },
  created() {
    //通过mitt对象监听事件 type:监听事件名称
    emitter.on("why",(info)=>{
      console.log("event",info)
    })
  },
  mounted() {
    setTimeout(()=>{
      this.names.push(6);
    },1000)
  }

}
</script>

<style lang="less">
#app {
  padding: 0;
  margin: 0;
}
</style>
