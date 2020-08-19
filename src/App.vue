<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    //console.log(this.isMobile(),'是不是移动端')
    // if (this.isMobile()) {
    //    alert("手机端");
    //  // this.$router.replace('/m');
    // } else {
    //    alert("pc端");
    //  // this.$router.replace('/');
    // }
  },
  methods:{

    isMobile() {
      return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    }
  }

}
</script>
