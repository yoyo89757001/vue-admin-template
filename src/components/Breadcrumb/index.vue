<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
       // console.log('添加了1什么')
        //matched = [{ path: '/dashboard', meta: { title: '主页' }}].concat(matched)
      }
      if (this.isPepoleinfo(first)) {//二级界面 ，最笨的方法，当当前路由是人员详情的时候，在前面添加人员管理面包屑
       // console.log('添加了2什么')
        matched = [{ path: '/table', meta: { title: '人员管理' }}].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      console.log(name)
      return name.trim().toLocaleLowerCase() === '主页'.toLocaleLowerCase()
    },
    isPepoleinfo(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (name.trim().toLocaleLowerCase() === '员工详情'.toLocaleLowerCase() || name.trim().toLocaleLowerCase() === '访客详情'.toLocaleLowerCase() || name.trim().toLocaleLowerCase() === '新增人员'.toLocaleLowerCase())
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
