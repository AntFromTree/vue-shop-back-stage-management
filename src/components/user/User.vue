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
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区 -->
            <el-table :data="userList" :border="true" stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="userName"></el-table-column>
                <el-table-column label="账号" prop="account"></el-table-column>
                <el-table-column label="性别" prop="sex"></el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template>
                        <el-tooltip effect="dark" content="修改用户信息" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页条 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.current" :page-sizes="[1, 2, 3, 10]" :page-size="queryInfo.size"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加用户对话框 -->
        <el-dialog title="提示" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="addForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passWord">
                    <el-input v-model="addForm.passWord"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="addForm.phone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        //校验邮箱的规则
        var checkEmail = (rule, value, cb) =>{
           const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
           if(regEmail.test(value)){return cb()}
           cb(new Error("请输入合法的邮箱"))
        }
        //校验手机号的规则
        var checkPhone = (rule, value, cb) =>{
            const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/
            if(regPhone.test(value)){return cb()}
            cb(new Error("请输入合法的电话号码"))
        }
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
                    state: false
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
            total: 4,
            addDialogVisible: false,
            addForm: {
                userName: "",
                passWord: "",
                email: "",
                phone: ""
            },
            addFormRules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 11, message: '用户名长度在3~10个字符之间', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '密码长度在6~15个字符之间', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: checkPhone, trigger: 'blur' }
                ]
            }
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
        },
        handleSizeChange(newSize) {

        },
        handleCurrentChange(newCurrent) {

        },
        addDialogClosed(){
            this.$refs.addFormRef.resetFields()
        },
        addUser(){
            this.$refs.addFormRef.validate(valid => {
                if(!valid) return
                this.addDialogVisible = false
                this.getUserList
        })
    },
    created() {
        this.getUserList()
    }
}}
</script>
<style lang="less" scoped>

</style>