<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
            <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <!-- 用户搜索区 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getAdminList">
                        <el-button slot="append" icon="el-icon-search" @click="getAdminList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加管理员</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区 -->
            <el-table :data="adminList" :border="true" stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="fullName"></el-table-column>
                <el-table-column label="账号" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-tooltip effect="dark" content="修改用户信息" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="small"
                                @click="showEditDialog(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="small"
                                @click="deleteAdmin(scope.row.id)"></el-button>
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
        <el-dialog title="添加管理员" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="姓名" prop="fullName">
                    <el-input v-model="addForm.fullName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
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
                <el-button type="primary" @click="addAdmin">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户对话框 -->
        <el-dialog title="修改管理员信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="fullName">
                    <el-input v-model="editForm.fullName"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="editForm.phone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editAdmin">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        //校验邮箱的规则
        var checkEmail = (rule, value, cb) => {
            const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
            if (regEmail.test(value)) { return cb() }
            cb(new Error("请输入合法的邮箱"))
        }
        //校验手机号的规则
        var checkPhone = (rule, value, cb) => {
            const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/
            if (regPhone.test(value)) { return cb() }
            cb(new Error("请输入合法的电话号码"))
        }
        return {
            queryInfo: {
                query: '',
                current: 1,
                size: 2
            },
            adminList: [],
            total: 4,
            addDialogVisible: false,
            editDialogVisible: false,
            addForm: {
                fullName: "",
                password: "",
                email: "",
                phone: ""
            },
            editForm: {},
            addFormRules: {
                fullName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 11, message: '用户名长度在3~10个字符之间', trigger: 'blur' }
                ],
                password: [
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
            },
            editFormRules: {
                fullName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 11, message: '用户名长度在3~10个字符之间', trigger: 'blur' }
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
        async getAdminList() {
            const { data: res } = await this.$http.get('admin/page', {
                params: this.queryInfo
            })
            if (res.code != 200) {
                return this.$message.error("数据请求失败")
            }
            console.log(res)
            this.adminList = res.body.list
            this.total = res.body.total
        },
        handleSizeChange(newSize) {
            this.queryInfo.size = newSize;
            this.getAdminList()

        },
        handleCurrentChange(newCurrent) {
            this.queryInfo.current = newCurrent;
            this.getAdminList()
        },
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()
        },
        async showEditDialog(id) {
            const { data: res } = await this.$http.get('admin/id', {
                params: {
                    id: id
                }
            })
            if (res.code != 200) {
                return this.error("查询管理员信息失败")
            }
            this.editForm = res.body
            this.editDialogVisible = true
        },
        addAdmin() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$http.post('admin/save', this.addForm)
                if (res.code != 200) {
                    return this.$message.error("添加失败")
                }
                this.addDialogVisible = false
                this.getAdminList()
            })
        },
        editAdmin(){
            this.$refs.editFormRef.validate(async valid => {
                if(!valid) return
                const { data : res } = await this.$http.put('admin/update',{
                    email: this.editForm.email,
                    fullName: this.editForm.fullName,
                    id: this.editForm.id,
                    phone: this.editForm.phone
                })
                if(res.code != 200){return this.$message.error("修改管理员信息失败")}
                this.$message.success("修改管理员信息成功")
                this.getAdminList()
                this.editDialogVisible = false
            })
        },
        async deleteAdmin(id) {
            const { data: res } = await this.$http.delete('admin/delete', {
                params: {
                    id: id
                }
            })
            if (res.code != 200) {
                return this.$message.error("删除失败")
            }
            this.$message.success("删除成功")
            this.getAdminList()
        }
    },
    created() {
        this.getAdminList()
    }
}
</script>
<style lang="less" scoped>

</style>