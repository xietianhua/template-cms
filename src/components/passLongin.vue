<!--<template>-->
  <!--<div class="main">-->
    <!--<div class="login_content">-->
      <!--<h3>Login to our site</h3>-->
      <!--<p>Enter you Phone number and verification code to log on </p>-->
      <!--<el-form :model="ruleForm2"-->
               <!--:rules="rules2"-->
               <!--ref="ruleForm2"-->
               <!--label-position="left"-->
               <!--label-width="0px"-->
               <!--class="demo-ruleForm login-container">-->
        <!--<el-form-item prop="mobile">-->
          <!--<el-input  v-model="ruleForm2.mobile" auto-complete="off" placeholder="请输入手机号"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item prop="imgcode" class="dif">-->
          <!--<el-input  class="vaildcode" v-model="imgcode" auto-complete="off" placeholder="请输入图形验证码"></el-input>-->
          <!--<img  v-bind:src="imageaddress" class="getImgcode" @click="getimgcode">-->
        <!--</el-form-item>-->

        <!--<el-form-item prop="checkCode">-->
          <!--<el-input  class="vaildcode" v-model="ruleForm2.checkCode" auto-complete="off" placeholder="请输入验证码"></el-input>-->
          <!--<el-button type="primary" @click="getVailcode" class="btn" :disabled="disabled">{{btntext}}</el-button>-->
        <!--</el-form-item>-->

        <!--<el-form-item style="width:100%;" @keyup.enter.native="test" >-->
          <!--<el-button type="primary" style="width:100%;"  @click.native.prevent="handleSubmit3"  :loading="logining">-->
            <!--登录-->
          <!--</el-button>-->
          <!--&lt;!&ndash;<el-button @click.native.prevent="handleReset2">重置</el-button>&ndash;&gt;-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
  <!--import {requestLogin,getImagecode,getvailcodeapi,requestLogin2} from '../api/api'-->

  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--disabled:false,-->
        <!--time:0,-->
        <!--btntext:"获取验证码",-->
        <!--imgcodeId:"",-->
        <!--imgcode:"",-->
        <!--imageaddress:"",-->
        <!--logining: false,-->
        <!--ruleForm2: {-->
          <!--account: '',-->
          <!--checkPass: '',-->
          <!--checkCode:"",-->
          <!--mobile:"",-->

        <!--},-->
        <!--rules2: {-->
          <!--account: [-->
<!--//            { required: true, message: '请输入账号', trigger: 'blur' },-->
            <!--//{ validator: validaePass }-->
          <!--],-->
          <!--checkPass: [-->
            <!--{ required: true, message: '请输入密码', trigger: 'blur' },-->
            <!--//{ validator: validaePass2 }-->
          <!--],-->
          <!--checkCode:[-->

          <!--],-->
          <!--imgCode:[-->

          <!--],-->
          <!--mobile:[-->
            <!--{ required: true, message: '请输入手机号', trigger: 'blur' },-->
          <!--]-->
        <!--},-->
        <!--checked: true-->
      <!--};-->
    <!--},-->
    <!--methods: {-->
      <!--getimgcode(){-->
        <!--getImagecode().then((res)=>{-->
          <!--this.imgcodeId=res.headers.capatchaid;-->
          <!--this.imageaddress= 'data:image/png;base64,' + btoa(-->
            <!--new Uint8Array(res.data)-->
              <!--.reduce((data, byte) => data + String.fromCharCode(byte), '')-->
          <!--);-->
          <!--//this.imageaddress="data:image/jpeg;base64,"+res.data-->
        <!--})-->
      <!--},-->
      <!--getVailcode(){-->
        <!--//逻辑1发送验证码-->
        <!--var _this = this;-->
        <!--this.$refs.ruleForm2.validate((valid)=>{-->
          <!--if(valid){-->
            <!--this.time=60;-->
            <!--this.disabled=true;-->
            <!--console.log(this);-->
            <!--this.timer();-->
<!--//                   this.loading=true;-->
            <!--let query={-->
              <!--imgcode:this.imgcode,-->
              <!--imgcodeId:this.imgcodeId,-->
              <!--mobile:this.ruleForm2.mobile-->
            <!--};-->
            <!--getvailcodeapi(query).then((res)=>{-->
              <!--if(res.data.ErrorCode==0){-->
                <!--this.$message({-->
                  <!--message:"您的短信验证码已发送，请查收",-->
                  <!--type: 'success'-->
                <!--});-->
              <!--}else{-->
                <!--this.$message({-->
                  <!--message: "获取短信验证码失败",-->
                  <!--type: 'warning'-->
                <!--});-->
              <!--}-->
            <!--})-->
          <!--}-->
        <!--});-->
      <!--},-->
      <!--timer() {-->
        <!--if (this.time > 0) {-->
          <!--this.time&#45;&#45;;-->
          <!--this.btntext=this.time+"s后重新获取";-->
          <!--setTimeout(this.timer, 1000);-->
        <!--} else{-->
          <!--this.time=0;-->
          <!--this.btntext="获取验证码";-->
          <!--this.disabled=false;-->
        <!--}-->
      <!--},-->
      <!--handleSubmit3(){-->
        <!--var loginParams = {-->
          <!--username:"hn_admin",-->
          <!--password:"root@declas#2018!",-->
          <!--mcode:this.ruleForm2.checkCode,-->
          <!--mobile:this.ruleForm2.mobile-->
        <!--};-->
        <!--requestLogin2(loginParams).then(data => {-->
          <!--this.logining = false;-->
          <!--if (data.data.ErrorCode !== 0) {-->
            <!--this.$message({-->
              <!--message:data.data.ErrorInfo,-->
              <!--type: 'error'-->
            <!--});-->
          <!--} else {-->
            <!--data.user = data.data.data.rsData[0].username;-->
            <!--data.token= data.data.data.rsData[0].accessToken;-->
            <!--data.id   = data.data.data.rsData[0].id;-->
            <!--sessionStorage.setItem('user', JSON.stringify(data.user));-->
            <!--sessionStorage.setItem('token', data.token);-->
            <!--sessionStorage.setItem('id', data.id);-->
            <!--this.$router.push({ path: '/table' });-->
          <!--}-->
        <!--});-->
      <!--},-->
    <!--},-->
    <!--mounted() {-->
      <!--this.getimgcode();-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
  <!--.main {-->
    <!--display: flex;-->
    <!--justify-content: center;-->
    <!--align-items: center;-->
    <!--width: 100%;-->
    <!--height: 100%;-->
    <!--background-image: url("../../static/image/bg2.jpg");-->
    <!--background-size: cover;-->
    <!--.login_content {-->
      <!--width: 560px;-->
      <!--height: 380px;-->
      <!--background-color: rgba(0, 0, 0, 0.3);-->
      <!--border-radius: 8px;-->
      <!--box-sizing: border-box;-->
      <!--padding: 25px  50px 25px 50px;-->
      <!--h3{-->
        <!--text-align: left;-->
        <!--font-family: sans-serif;-->
        <!--font-size: 22px;-->
        <!--margin-bottom: 15px;-->
        <!--color: #ffffff;-->
      <!--}-->
      <!--p{-->
        <!--opacity: 0.8;-->
        <!--color: #fff;-->
        <!--margin-bottom: 30px;-->
      <!--}-->
      <!--.icon-chakanyanjingshishifenxi2{-->
        <!--font-size: 20px;-->
        <!--cursor: pointer;-->
      <!--}-->
      <!--.icon-shoujihao{-->
        <!--font-size: 20px;-->
        <!--cursor: pointer;-->
      <!--}-->
    <!--}-->
  <!--}-->

<!--</style>-->
<!--&lt;!&ndash;这一份css样式是为了覆盖原来的Element-ui的样式，去掉了scoped样式暴露出去了&ndash;&gt;-->
<!--<style lang="scss">-->
  <!--.login_content {-->
    <!--.el-input__inner {-->
      <!--background-color: transparent;-->
      <!--color: #ffffff;-->
      <!--font-size: 16px;-->
    <!--}-->
    <!--.el-input__prefix {-->
      <!--.icon-yonghu {-->
        <!--font-size: 24px;-->
      <!--}-->
    <!--}-->
    <!--.el-input__prefix {-->
      <!--.icon-mima {-->
        <!--font-size: 24px;-->
      <!--}-->
    <!--}-->
     <!--.vaildcode{-->
       <!--width: 330px;-->
       <!--float: left;-->
     <!--}-->
    <!--.getImgcode{-->
      <!--width: 112px;-->
      <!--height: 40px;-->
      <!--margin-left: 15px;-->
    <!--}-->
    <!--.dif{-->
      <!--margin-bottom: 0px;-->
    <!--}-->
    <!--.btn{-->
      <!--float: left;-->
      <!--margin-left: 15px;-->
    <!--}-->

    <!--.el-checkbox {-->
      <!--margin-bottom: 10px;-->
      <!--.el-checkbox__label {-->
        <!--color: #ffffff;-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</style>-->
