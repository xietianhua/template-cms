<template>
  <div class="main">
    <div class="login_content">
      <p>用户登陆</p>
      <el-form :model="loginForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="账号">
            <i slot="prefix" class="icon iconfont icon-yonghu"></i>
          </el-input>
        </el-form-item>

        <el-form-item prop="checkpass">
          <el-input v-model="loginForm.checkpass" placeholder="密码" type="password">
            <i slot="prefix" class="icon iconfont icon-mima"></i>
          </el-input>
        </el-form-item>
        <el-checkbox checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {requestLogin} from '../api/api'

  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          account: "",
          checkpass: "",
        },
        rules: {
          account: [
            {required: true, message: '账号不能为空', trigger: 'blur'},
          ],
          checkpass: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm.validate((valid) => {
          console.log(valid);
          if (valid) {
            this.logining = true;
            var loginParams = {username: this.loginForm.account, password: this.loginForm.checkpass};
            requestLogin(loginParams).then(data => {
              console.log(data);
              this.logining = false;
              //NProgress.done();
              if (data.data.ErrorCode) {
                this.$message({
                  message: data.data.ErrorInfo,
                  type: 'error'
                });
              } else {
                let user = data.data.username;
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({path: '/table'});
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

    }
  }
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image: url("../../static/image/bg.jpg");
    background-size: cover;
    .login_content {
      width: 480px;
      height: 350px;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 8px;
      box-sizing: border-box;
      padding: 50px 60px;
      P {
        text-align: center;
        font-size: 20px;
        margin-bottom: 20px;
        letter-spacing: 5px;
        color: #ffffff;
      }
    }
  }

</style>
<!--这一份css样式是为了覆盖原来的Element-ui的样式，去掉了scoped样式暴露出去了-->
<style lang="scss">
  .login_content {
    .el-input__inner {
      background-color: transparent;
      color: #ffffff;
      font-size: 16px;
    }
    .el-input__prefix {
      .icon-yonghu {
        font-size: 24px;
      }
    }
    .el-input__prefix {
      .icon-mima {
        font-size: 24px;
      }
    }
    .el-checkbox {
      margin-bottom: 10px;
      .el-checkbox__label {
        color: #ffffff;
      }
    }
  }
</style>
