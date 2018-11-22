<template>
  <div class="navbar">
    <ul>
		<li :class="{cur:tabIndex==0}" @click="changeTab(0)"><router-link to="/">首页</router-link></li>
		<li :class="{cur:tabIndex==1}" @click="changeTab(1)"><router-link to="/makeplan">表单填写</router-link></li>
		<li :class="{cur:tabIndex==2}" @click="changeTab(2)"><router-link to="/build">生成计划书</router-link></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'navbar',
  data(){
    return { tabIndex: 0, cIndex: -1 };
  },
  methods: {
    changeTab(n,m){
      this.tabIndex = n;
      this.cIndex = m !== undefined ? m : -1;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{margin:0;padding:0;}
h1{
  font-weight: normal;
}
a{text-decoration: none;}
.navbar{position: fixed;left: 0;bottom: 20px;background-color: #fff;}
.navbar li.cur{background-color: red;}
.navbar li.curChild{background-color: #ddd;}
.navbar li a{display: block;width:100%;color:#000;}
p{margin-top: 20px;}
</style>
