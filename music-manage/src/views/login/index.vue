<template>
  <div class="wrap">
      <el-form size="medium" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm m-form">
          <el-form-item label="username" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="pass">
            <el-input :show-password="true" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Login...</el-button>
            <el-button type="primary" @click="jumpRegistry">Registry</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
    export default {
      data() {
      var validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('The user name cannot be empty'));
        }else{
            //这里一定要执行callbalk 来结束规则验证
            callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
            //如果密码值为空
          callback(new Error('The password cannot be empty'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          //这里一定要执行callbalk 来结束规则验证
          callback();
        }
      };
      
      return {
        ruleForm: {
          pass: '',//密码
          name: ''//用户名
        },
        rules: {
            //验证密码规则
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          //验证用户名规则
          name: [
            { validator: validateName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        //提交时 验证用户名和密码
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) { //如果验证成功
              this.$api.user.login({
                  username:this.ruleForm.name,
                  password:this.ruleForm.pass
              }).then(res=>{
                  if(res.data.code==1){//当请求成功的时候
                    //   this.setName(this.ruleForm.name)
                    //弹框提示成功
                    this.$message({
                        message: 'login success',
                        type: 'success'
                    });
                    //本地存储 储存用户名
                    localStorage.setItem('username',this.ruleForm.name)
                    //本地存储 储存后台请求回来的token
                    localStorage.setItem('token',res.data.token)
                    //后台验证成功跳转到  /music 路由
                    this.$router.replace('/music')
                  }
              })
          } else {//如果验证不通过
             this.$message.error('Please enter the correct username and password');
            return false;
          }
        });
      },
      jumpRegistry(){
        this.$router.push('/registry')
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
    width: 100%;
    height: 100%;
    .m-form{
       width: 500px;
       margin: 150px auto; 
       background: rgb(226, 222, 222);
       border-radius: 15px;
       padding: 50px;
    }
}
    
</style>