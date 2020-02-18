<template>
  <div :class="$style['container']">
    <Form :model="formItem" :label-width="80">
      <FormItem label="内容">
        <Input
          v-model="formItem.content"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="Enter something..."
        />
      </FormItem>
      <FormItem label="时间">
        <DatePicker
          type="date"
          placeholder="Select date"
          v-model="formItem.time"
        ></DatePicker>
      </FormItem>
      <FormItem>
        <Button @click="add">确定</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: "AddBall",
  data() {
    return {
      formItem: {
        content: "",
        time: new Date()
      }
    };
  },
  methods: {
    add() {
      if (this.formItem.content) {
        let arr = localStorage.getItem("ball")
          ? JSON.parse(localStorage.getItem("ball"))
          : [];
        arr.push(this.formItem);
        localStorage.setItem("ball", JSON.stringify(arr));
        this.$Message.success({
          content: "添加成功",
          duration: 10,
          closable: true
        });
      } else {
        this.$Message.error({
          content: "内容为空,无法添加",
          duration: 10,
          closable: true
        });
      }
    }
  }
};
</script>

<style module>
.container {
}
</style>
