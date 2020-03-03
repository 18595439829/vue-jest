<template>
  <div :class="$style['container']">
    <Input
      v-model="value"
      placeholder=""
      style="width: 300px"
      @on-enter="search"
    />
    <Button @click="search" type="primary" :class="$style['button']">搜索</Button>
    <Button @click="add" type="success">添加</Button>
    <Table :columns="columns" :data="data" :class="$style['table']" border>
      <template slot="action" slot-scope="{ row }">
        <Button type="success" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
        <Button type="error" size="small" @click="remove(row)">删除</Button>
      </template>
    </Table>
    <Page :total="total" show-elevator show-sizer @on-change="pageChange" @on-page-size-change="sizeChange"/>
    <Modal v-model="modal"
        title="添加球队信息"
        draggable>
      <AddBall :data="formData" @on-ok="ok" @on-cancel="cancel"/>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script>
import AddBall from '@/views/AddBall.vue';
import axios from 'axios';
import {format} from 'date-fns';

export default {
  name: "Ball",
  components: {
    AddBall,
  },
  data() {
    return {
      value: "",
      modal: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      formData: {},
      columns: [
        {
          title: "序号",
          key: "no",
          width: 100,
        },
        {
          title: "内容",
          key: "content"
        },
        {
          title: "时间",
          key: "time",
          width: 200,
        },
        {
          title: "操作",
          slot: "action",
          width: 150
        },
      ],
      data: []
    };
  },
  methods: {
    search() {
      axios.get('/search', {
        params: {
          query: this.value,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      }).then(res => {
        this.total = res.data.total;
        this.data = res.data.data.map((item, index) => {
          item.no = index + 1
          item.time = format(new Date(item.time), "yyyy-MM-dd HH:mm:ss")
          return item;
        });
      })
    },
    add() {
      this.formData = {};
      this.modal = true
    },
    edit(row) {
      this.formData = { ...row}
      this.modal = true
    },
    pageChange(page) {
      this.pageNum = page;
      this.search();
    },
    sizeChange(size) {
      this.pageSize = size;
      this.pageChange(1);
    },
    remove(row) {
      this.$Modal.warning({
        title: '警告',
        content: '此操作不可逆,你确定要删除吗?',
        closable: true,
        onOk: () => {
          axios.get('/delete', {
            params: {
              id: row.id
            }
          }).then(() => {
            this.search();
            this.$Message.success({
                  content: "删除成功",
                  duration: 3,
                  closable: true
                });
          })
        }
      })
    },
    ok () {
      this.modal = false;
      this.search();
    },
    cancel () {
      this.modal = false;
    }
  },
  created () {
    this.search();
  }
};
</script>

<style lang="scss" module>
.container {
  padding: 10px;
  .button {
    margin: 0 10px;
  }
  .table {
    margin: 10px 0;
  }
}
</style>
