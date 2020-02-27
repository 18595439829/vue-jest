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
          type="datetime"
          placeholder="Select date"
          v-model="formItem.time"
        ></DatePicker>
      </FormItem>
      <FormItem :class="$style['buttons']">
        <Button @click="cancel" :class="$style['cancel']">取消</Button>
        <Button @click="add" type="primary">确定</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AddBall",
  props: {
    data: {
      type: Object,
      required: false,
      default: undefined,
    }
  },
  data() {
    return {
      formItem: {
        content: "",
        time: new Date()
      }
    };
  },
  watch: {
    data(v) {
      this.formItem = {...v};
    }
  },
  methods: {
    add () {
      if (this.formItem.content) {
        if (this.formItem.id) {
          axios.post('/update', this.formItem).then(res => {
            // eslint-disable-next-line no-console
            console.log(res);
            this.$Message.success({
              content: "修改成功",
              duration: 3,
              closable: true
            });
            this.$emit('on-ok', false)
          });
        } else {
          axios.post('/add', this.formItem).then(res => {
            // eslint-disable-next-line no-console
            console.log(res);
            this.$Message.success({
              content: "新增成功",
              duration: 3,
              closable: true
            });
            this.$emit('on-ok', false)
          });
        }
        
      } else {
        this.$Message.error({
          content: "内容为空,无法添加",
          duration: 10,
          closable: true
        });
      }
    },
    cancel() {
      this.$emit('on-cancel', false)
    }
  }
};
</script>
<style lang="scss" module>
.container {
  .buttons {
    text-align: right;
    .cancel {
      margin-right: 10px;
    }
  }
}
</style>
