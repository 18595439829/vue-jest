<template>
  <div :class="$style['container']">
    <Input
      v-model="value"
      placeholder="Enter something..."
      style="width: 300px"
      @on-enter="search"
    />
    <Button @click="search">搜索</Button>
    <Table :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
export default {
  name: "Ball",
  data() {
    return {
      value: "",
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
          width: 150,
        }
      ],
      data: []
    };
  },
  methods: {
    search() {
      // eslint-disable-next-line no-console
      console.log(this.value);
      let allData = localStorage.getItem('ball') ? JSON.parse(localStorage.getItem('ball')) : [];
      let data = allData.filter((item) => {
        if (item && item.content && item.content.indexOf(this.value) !== -1) {
          return item;
        } else {
          return false;
        }
        
      })
      this.data = data.map((item, index) => {
        let obj = item;
        obj.no = index + 1;
        return obj
      })
    },
  },
  created () {
    this.search();
  }
};
</script>

<style module>
.container {
}
</style>
