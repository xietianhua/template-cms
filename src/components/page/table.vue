<template>
  <div>
    <v-pageTitle :msg="pathMessage"></v-pageTitle>
    <div class="list_content">
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-form @submit.native.prevent :inline="true">
          <el-form-item>
            <el-input placeholder="请输入需检索内容" v-model="filters.name" @keyup.enter.native="getUsers">
              <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
            </el-input>
          </el-form-item>

          <el-form-item class="screen">
            <el-radio-group v-model="status">
              <el-radio :label="0">申请试用</el-radio>
              <el-radio :label="1">试用审核通过</el-radio>
              <el-radio :label="2">使用审核失败</el-radio>
              <el-radio :label="3">正常</el-radio>
              <el-radio :label="4">禁止访问</el-radio>
              <el-radio :label="5">删除</el-radio>
            </el-radio-group>
            <el-button type="primary" v-on:click="getUsers">筛选</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table
        :data="messageList"
        :row-class-name="tableRowClassName"
        @selection-change="selsChange"
        style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="55">
        </el-table-column>
        <el-table-column prop="name" label="用户名">
        </el-table-column>
        <el-table-column prop="phone" label="电话">
        </el-table-column>
        <el-table-column prop="company" label="公司">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column label="状态">
          <template scope="props">
            <span> {{["申请试用", "试用审核通过", "使用审核失败", "正常", "禁止访问", "删除"][props.row.status]}}</span>
          </template>
        </el-table-column>

        <el-table-column label="更新时间">
          <template scope="props">
            <span>{{props.row.updateTime | time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页工具条-->
      <el-col :span="24" class="toolbar toolbar_page">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>

        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :total="total"
                       style="float:right;"
                       background>
        </el-pagination>
      </el-col>
      <!--编辑界面-->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="类型">
            <el-radio-group v-model="editForm.status">
              <el-radio class="radio" :label="0">申请试用</el-radio>
              <el-radio class="radio" :label="1">试用审核通过</el-radio>
              <el-radio class="radio" :label="2">试用审核失败</el-radio>
              <el-radio class="radio" :label="3">正常</el-radio>
              <el-radio class="radio" :label="4">禁止访问</el-radio>
              <el-radio class="radio" :label="5">删除</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>
      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible"  :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="addForm.sex">
              <el-radio class="radio" :label="1">男</el-radio>
              <el-radio class="radio" :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="addForm.addr"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import vPageTitle from '../commonnet/pagetitle.vue'
  import {getDatalist,getDetailmsg} from '../../api/api'

  export default {
    components: {vPageTitle},
    data() {
      return {
        //这一块是同父子间的组件将值给传递过去，给父组件使用
        pathMessage: {
          vtitle: this.$route.matched[1].name,
          subtitle: this.$route.matched[0].name
        },
        filters: {
          name: ''
        },
        status: 0,
        listLoading: false,
        total: 10,
        page: 1,
        sels: [], //列表页选中的项
        messageList: [],
        //编辑界面数据
        editFormVisible: false, //是否显示编辑界面
        editLoading: false,
        editForm: {},
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //新增界面数据
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        }
      }
    },
    //处理时间的方法，一些复杂数据格式化的处理都可以写在这里哦！
    filters: {
      time: function (inputTime) {
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d
      }
    },


    methods: {
      tableRowClassName({row, rowIndex}) {
        if (row.status === 0) {
          return 'success-row';
        } else if (row.status === 2) {
          return 'warning-row';
        }
        return '';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      selsChange(sels) {
        this.sels = sels;
      },
      //请求列表，返回检索列表页的函数
      getUsers() {
        let para = {
          pageSize: 8,
          pageNo: this.page,
          status:this.status,
        };
        //  这里是检索条件的判断
        this.filters.name = this.filters.name.trim();
        if (this.filters.name !== "") {
          if (this.filters.name.length === 11) {
            para["phone"] = this.filters.name;
          } else {
            para["name"] = this.filters.name;
          }
        }
        this.listLoading = true;
        getDatalist(para).then((res) => {
          this.messageList = res.data.data.rsData;
          this.total = res.data.data.rsCount;
          this.listLoading = false;
        })
      },
      handleClick(res) {
        console.log(res)
      },

      //批量删除触发的函数
      batchRemove: function () {
        let ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {
        });
      },
      //点击新增触发的函数
      handleAdd(){
        this.addFormVisible = true;
        // 这里面是新增界面的默认值（总有一些需要固定的默认值吗）！
        this.addForm = {
          name: '谢天华',
          sex: 1,
          age: 0,
          birth: '',
          addr: ''
        };
      },
      //编辑界面函数
      handleEdit(res, row) {
        //根据userid 来接详情页面的接口，获取详细数据（别偷懒！！！）,后台提供一定要接
        this.editFormVisible = true; //显示dialog
        this.editForm = Object.assign({}, row);
      },
      editSubmit() {
        //这里是提交的函数
//         this.$refs.editForm.validate((valid) => {
//          if (valid) {
//            this.$confirm('确认提交吗？', '提示', {}).then(() => {
//              this.editLoading = true;
//              //NProgress.start();
//              let bean= Object.assign({}, this.editForm);
////							let form={bean:JSON.stringify(bean)};
//              let query ={
//                userId:bean.userId,
//                status:bean.status,
//              };
//              editUser(query).then((res) => {
//                this.editLoading = false;
//                //NProgress.done();
//                this.$message({
//                  message: '提交成功',
//                  type: 'success'
//                });
//                this.$refs['editForm'].resetFields();
//                this.editFormVisible = false;
//                this.getUsers();
//              });
//            });
//          }
//        });
      },
      addSubmit(){
        //新增提交的逻辑
        this.$refs.addForm.validate((valid)=>{
          if(valid){
            let bean =Object.assign({},this.addForm);
            console.log(1)
            //这里面是街街口的工作。
//            addUser(para).then((res) => {
//              this.addLoading = false;
//              //NProgress.done();
//              this.$message({
//                message: '提交成功',
//                type: 'success'
//              });
//              this.$refs['addForm'].resetFields();
//              this.addFormVisible = false;
//              this.getUsers();
//            });
          }
        });
      }
    },
    mounted() {
      this.getUsers();
    },
  }
</script>

<style lang="scss">
  .list_content {
    .el-table{
      thead{
        th{
          background-color: #ddd;
        }
      }
    }
    .toolbar {
      height: 60px;
      background: #d3dce6;
      box-sizing: border-box;
      padding: 10px 30px;
      margin-bottom: 15px;
      border-radius: 8px;
      .el-input-group--append {
        width: 300px;
      }
      .screen {
        margin-left: 30px;
      }
    }
    .toolbar_page {
      background-color: #d3dce6;
      margin-top: 10px;
    }

  }
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

