<template>
  <!-- <a-table :columns="columns" :data-source="data.dataSource">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">
        <a>{{ text }}</a>
      </template>
    </template>
  </a-table>
  <div>{{ store.state.username }}</div>
  <a-button @click="btn">改变</a-button>
  <div>{{name}}</div>
  <son :name="name" @change="change"></son>
  <div>{{time}}</div> -->
  <router-view></router-view>
</template>
<script setup lang="ts">
import { defineComponent, reactive, ref, Ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import son from "./components/son.vue"
import  dayjs from "dayjs"

const store = useStore();
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 80,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address 1",
    ellipsis: true,
  },
  {
    title: "Long Column Long Column Long Column",
    dataIndex: "address",
    key: "address 2",
    ellipsis: true,
  },
  {
    title: "Long Column Long Column",
    dataIndex: "address",
    key: "address 3",
    ellipsis: true,
  },
  {
    title: "Long Column",
    dataIndex: "address",
    key: "address 4",
    ellipsis: true,
  },
];

type TDataSource = {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: Array<string>;
};
interface IReactive {
  dataSource: TDataSource[]
}
const data: IReactive = reactive({
 dataSource: []
});
const time:Ref<dayjs.ConfigType> = ref(dayjs().format('YYYY-MM-DD'))
const name: Ref<string> = ref('1')
const btn = (): void => {
  store.commit("setName", "liao");
  name.value += 1
};
const getDatasource = (): void => {
  axios.get("data.json").then((res) => {
    if (res.status == 200) {
      data.dataSource = res.data
    }
  });
};
getDatasource()
const change = (data: string):void => {
  name.value = data
}
</script>

