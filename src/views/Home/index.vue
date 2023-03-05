<template>
  <div class="home">
    <header class="header"></header>
    <div class="content">
      <div class="side">
        <a-menu
          v-model:openKeys="state.openKeys"
          v-model:selectedKeys="state.selectedKeys"
          style="width: 100%; height: 100%"
          mode="inline"
        >
          <a-sub-menu v-for="menu in state.menu" :key="menu.id">
            <template #icon>
              <SettingOutlined />
            </template>
            <template #title>{{ menu.title }}</template>
            <a-menu-item
              v-for="c in menu.children"
              :key="c.id"
              @click="changePage(menu.name, c.name)"
              >{{ c.title }}</a-menu-item
            >
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="detail">
        <div class="bar"></div>
        <div class="main"><router-view></router-view></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { $http } from "../../main";
import store from "../../store/index"

const state = reactive({
  selectedKeys: [] as (number | undefined)[],
  openKeys: [] as number[],
  menu: [] as IMenu[],
});
const router = useRouter()
const initMenu = (): void => {
  state.menu = store.state.menus;
  state.openKeys = [store.state.menus[0].id];
  state.selectedKeys = [store.state.menus[0].children?.[0]?.id]
  changePage(store.state.menus[0].name, store.state.menus[0].children?.[0]?.name)
};

const changePage = (pName, cName):void => {
  console.log(pName, cName)

  router.push(`/${pName}/${cName}`)
}
onMounted(() => {
  initMenu()
});

</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    height: 60px;
  }
  .content {
    width: 100%;
    flex: 1;
    display: flex;
    .side {
      width: 300px;
      height: 100%;
    }
    .detail {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      .bar {
        width: 100%;
        height: 60px;
      }
      .main {
        width: 100%;
        flex: 1;
      }
    }
  }
}
</style>

