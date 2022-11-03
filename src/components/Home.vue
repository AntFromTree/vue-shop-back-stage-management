<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>书小二后台管理系统</span>
      </div>
      <el-button type='info' @click='logOut'>退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409aff" :collapse="isCollapse"
        :collapse-transition="false" router :default-active="activePath">
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-Customermanagement-fill"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user" @click="saveNavState('/user')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>会员列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/admin" @click="saveNavState('/admin')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>管理员列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-product"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/goods" @click="saveNavState('/goods')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/goodsType" @click="saveNavState('/goodsType')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品分类</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-order-fill"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order" @click="saveNavState('/order')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>

export default ({
  data(){
    return {
      isCollapse: false,
      activePath: ""
    }
  },
  created(){
    this.activePath = window.sessionStorage.getItem("activePath")
  },
  methods: {
    logOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse(){
       this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath){
      window.sessionStorage.setItem("activePath",activePath)
      this.activePath = activePath 
    }
  }
})
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;

  >div {
    display: flex;
    align-items: center;

    img {
      border-radius: 50%;
      width: 40PX;
      height: 40PX;
      background-color: white;
    }

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.home-container {
  height: 100%;
}

.iconfont {
  margin-right: 10px;
}
.toggle-button{
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
