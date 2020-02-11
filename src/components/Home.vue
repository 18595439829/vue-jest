<template>
  <div :class="$style['container']">
      Home
      <Menu :menus="menus" />
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
export default {
    name: 'Home',
    components: {
        Menu,
    },
    data() {
        return {
            menus:[
                {
                    path: '/Index',
                    name: 'Index',
                    label: '主页'
                }
            ]
        }
    }
}
</script>

<style module>
.container {
    
}
</style>