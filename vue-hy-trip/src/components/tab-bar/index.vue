<template>
<!--<div class="tab-bar">-->
<!--  <template v-for="(item,index) in tabbarData" >-->
<!--    <div-->
<!--        class="tab-bar-item"-->
<!--        :class="{active:currentIndex === index}"-->
<!--        :key="index" -->
<!--        @click="changeTab(index,item.path)"-->
<!--    >-->

<!--      <img v-if="currentIndex === index" :src="getAssetsUrl(item.imageActive)">-->
<!--      <img v-else :src="getAssetsUrl(item.image)">-->
<!--      <span class="text">{{item.text}}</span>-->
<!--    </div>-->
<!--  </template>-->
<!--</div>-->
  <van-tabbar v-model="currentIndex" active-color="#ff9854">
    <van-tabbar-item
        v-for="(item,index) in tabbarData"
        :key="index"
        :to="item.path"
    >
      <span>{{ item.text }}</span>
      <template #icon="props">
        <img :src="props.active ? getAssetsUrl(item.imageActive) : getAssetsUrl(item.image)" />
      </template>
    </van-tabbar-item>

  </van-tabbar>
</template>

<script setup>
import tabbarData from "@/assets/data/tabbar";
import {getAssetsUrl} from "../../utils/load_assets"
import {ref} from "vue";

//tabbar currentIndex
const currentIndex = ref(0);


</script>

<style lang="less" scoped>
.tab-bar{
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 50px;
  background-color: #f3f3f3;
  border-top: 1px solid #ccc;
  .tab-bar-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &.active{
      color: var(--primary-color);
    }
    img{
      width: 36px;
    }
    .text{
      font-size: 14px;
      margin-top: 2px;
    }
  }
}
</style>