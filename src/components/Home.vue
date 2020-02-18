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
                    path: '/Ball',
                    name: 'Ball',
                    label: '查看球队'
                },
                {
                    path: '/AddBall',
                    name: 'AddBall',
                    label: '添加球队'
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