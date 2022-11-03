<template>
    <div id="login" class="login_container">
        <div class="login_box">
            <div class="avater_box"><img src="@/assets/logo.png" alt=""></div>
            <el-form  ref="loginFormRef" label-width="0px" class="login_form" :model="loginForm" :rules="loginRules">
                <el-form-item  prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-Customermanagement-fill"></el-input>
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-password" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return{
            loginForm: {
                username: "15086654342",
                password: "123456"
            },
            loginRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 11, max: 11, message: '用户名格式错误，请输入正确的用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '密码长度在6到15之间', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        },
        login(){
            this.$refs.loginFormRef.validate(async (boolean, object)=> {
                console.log(boolean);
                if(!boolean) return;
                // const {data: res} = await this.$http.post("login", this.loginForm);
                // console.log(res);
                // if(res.meta.status != 200) return this.$message.error("登录失败");
                this.$message.success("登录成功")
                window.sessionStorage.setItem("token","502674883")
                this.$router.push("/home")
            });
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
}

.avater_box {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    padding: 10px;
    border: 1px solid #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 0 0 10px #ddd;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>