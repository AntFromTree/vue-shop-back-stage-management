<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <!-- 用户搜索区 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 用户搜索区 -->
            <el-table :data="userist" :border="true" stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="userName"></el-table-column>
                <el-table-column label="账号" prop="account"></el-table-column>
                <el-table-column label="性别" prop="sex"></el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="状态" prop="state"></el-table-column>
                <el-table-column label="操作"></el-table-column>
            </el-table>
        </el-card>

    </div>
</template>
<script>
export default {
    data() {
        return {
            queryInfo: {
                query: '',
                current: 1,
                size: 2
            },
            userList: [
                {
                    userName: '张三',
                    account: '2019443647',
                    sex: '男',
                    address: '重庆',
                    email: '2778999218@qq.com',
                    phone: '123456',
                    state: true
                },
                {
                    userName: '李四',
                    account: '2019443647',
                    sex: '男',
                    address: '重庆',
                    email: '2778999218@qq.com',
                    phone: '123456',
                    state: true
                },
                {
                    userName: '王五',
                    account: '2019443647',
                    sex: '男',
                    address: '重庆',
                    email: '2778999218@qq.com',
                    phone: '123456',
                    state: true
                },
                {
                    userName: '刘六',
                    account: '2019443647',
                    sex: '男',
                    address: '重庆',
                    email: '2778999218@qq.com',
                    phone: '123456',
                    state: true
                }
            ],
            total: 0
        }
    },
    methods: {
        async getUserList() {
            // const {data : res} = await this.$http.get('users',{
            //     params: this.queryInfo
            // })
            // if (res.code == 200){
            //     return this.$message.error("数据请求失败")
            // }
            // this.useList = this.res.data.list
            // this.total = this.res.data.total
        }
    },
    created() {
        this.getUserList()
    }
}
</script>
<style>

</style>