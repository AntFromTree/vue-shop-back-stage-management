<template>
  <div id="login" class="login_container">
    <div class="login_box">
        <div class="avater_box"><img src="@/assets/logo.png" alt=""></div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'login'
}
</script>

<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;
}
.avater_box{
    width: 130px;
    height: 130px;
    border-radius: 50%;
    padding: 10px;
    border: 1px solid #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;
    box-shadow: 0 0 10px #ddd;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
</style>