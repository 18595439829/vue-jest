<template>
  <div>
      <ul>
          <li v-for="(item, key) in menu" :key="key">
              <router-link :to="{path: item.path}">{{item.label}}</router-link>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'Menu',
    props: {
        menus: {
            type: Array,
            required: true
        }
    },
    computed: {
        menu() {
            return this.menus;
        }
    }
}
</script>

<style>

</style>