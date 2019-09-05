<template>
    <div class="wrap">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="m-form demo-ruleForm">
            <el-form-item label="username" prop="username">
                <el-input v-model.number="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="password" prop="pass">
                <el-input :show-password="true" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="confirmpassword" prop="checkPass">
                <el-input :show-password="true" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('The user name is cannot empty'));
        }
        
         callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter password'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter password again'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('The two passwords do not match!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          username: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          username: [
            { validator: validateName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.user.registry({
                username:this.ruleForm.username,
                password:this.ruleForm.pass
            }).then(res=>{
                console.log(res)
                if(res.data.code==1){
                    this.$message({
                        message: 'login success',
                        type: 'success'
                    });
                    this.$router.replace('/music')
                }
            })
          } else {
            this.$message.error('Please enter the correct username and password');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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