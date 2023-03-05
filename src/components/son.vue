<script lang="ts" setup>
import { Ref, ref, watch } from "vue";
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
});
// 基于类型
const emit = defineEmits<{
  (e: "change", value: string): void;
}>();
const childName: Ref<any> = ref("");

watch(
  () => props.name,
  () => {
    childName.value = props.name;
  },
  {
    immediate: true,
  }
);
const onChange = (event: Event): void => {
  console.log(event);
  // emit("change", childName.value);
    emit("change", (event.target as HTMLInputElement).value);
};
</script>



<template>
  <a-input class="in" @change="onChange" v-model:value="childName"></a-input>
</template>

<style lang="less" scoped>
.in {
  width: 200px;
}
</style>