<template>
  <h2>This is Home</h2>
  <home-component></home-component>
  <button @click="triggerEvent">mitt button</button>
</template>


<script>
import HomeComponent from "@/components/HomeComponent";
import emitter from "@/utils/eventbus";
export default {
  name: "Home",
  components:{
    HomeComponent
  },
  methods:{
    triggerEvent(){
      //发送事件 type:事件名称,event 参数
      emitter.emit("why",{name:'zhangsan',age:18});
    }
  }
}
</script>

<style scoped>

</style>