<template>
<!--主页面开始 -->
    <el-container>
        <!-- 头部header开始 -->
        <el-header>
            <span>{{username}}</span>
            <el-button type="primary" @click="exit" class="m-login-btn">{{flag?"退出登录":"登陆"}}</el-button>
        </el-header>
        <!-- 头部 header 结束-->
        <el-container>
            <!-- 侧边栏开始 -->
            <el-aside width="200px">Aside</el-aside>
                <!-- 侧边栏结束 -->
                <el-main>
                    <!-- 添加按钮 -->
                    <el-button class="m-add-btn" type="button" @click="dialogVisible = true">添加</el-button>
                    <!-- 列表表格开始 -->
                    <el-table
                    ref="singleTable"
                    :data="musicList"
                    style="width: 100%">
                    <el-table-column
                    label="序号"
                    type="index"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    property="music_name"
                    label="歌名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="图片"
                    width="120">
                        <template slot-scope="scope">
                            <img :src="scope.row.pic" :title="scope.row.pic" class="m-img">
                        </template>
                    </el-table-column>
                    <el-table-column
                    property="singer_name"
                    label="歌手"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    label="是否上架">
                        <template slot-scope="scope">
                            <span>
                                {{scope.row.isup*1}} 
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{row}">
                            <el-button
                            size="mini"
                            @click="handleEdit(row.id)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 列表表格结束 -->

                <!--添加按钮 弹框组件开始 -->
                <el-dialog
                    title="Add the songs"
                    :visible.sync="dialogVisible"
                    width="30%"
                    >
                    <!--  弹框组件中的表单开始  -->
                    <el-form size="mini" :model="musicForm" status-icon :rules="rules" ref="musicForm" label-width="130px" class="demo-ruleForm m-form">
                        <el-form-item label="music_name" prop="music_name">
                            <el-input v-model="musicForm.music_name"></el-input>
                        </el-form-item>
                        <el-form-item label="singer_name" prop="singer_name">
                            <el-input v-model="musicForm.singer_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="uploading pic">
                            <input type="file" @change="fileChange">
                            <img :src="musicForm.pic" class="m-img"/>
                        </el-form-item>
                        <el-checkbox v-model="musicForm.isup">putaway</el-checkbox>
                    </el-form>
                    <el-button @click="handleAddClidk($event,'musicForm')" >添 加</el-button>
                    <!--  弹框组件中的表单结束  -->
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            <!--添加按钮 弹框组件结束 -->
            <!-- 修改按钮弹框开始 -->
                 <el-dialog
                    title="Edit the songs"
                    :visible.sync="addDialogVisible"
                    width="30%"
                    >
                    <!--  弹框组件中的表单开始  -->
                    <el-form size="mini" :model="musicForm" status-icon :rules="rules" ref="musicForm" label-width="130px" class="demo-ruleForm m-form">
                        <el-form-item label="music_name" prop="music_name">
                            <el-input v-model="musicForm.music_name"></el-input>
                        </el-form-item>
                        <el-form-item label="singer_name" prop="singer_name">
                            <el-input v-model="musicForm.singer_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="uploading pic">
                            <input type="file" @change="fileChange">
                            <img :src="musicForm.pic" class="m-img"/>
                        </el-form-item>
                        <el-checkbox v-model="musicForm.isup">putaway</el-checkbox>
                    </el-form>
                    <el-button @click="handleAddClidk($event,'musicForm')">修 改</el-button>
                    <!--  弹框组件中的表单结束  -->
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="addDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
                <!-- 修改按钮弹框 结束 -->

                <!-- 分页组件开始 -->
                <el-pagination
                    @current-change="handleCurrentChange"
                    :background="true"
                    layout="prev, pager, next"
                    :page-size="limit"
                    :total="total"
                    class="m-page-list"
                    >
                </el-pagination>
                <!-- 分页组件结束 -->
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
    export default {
        name: '',
        data() {
            var validateMusicName = (rule, value, callback) => {
                if (!value) {
                return callback(new Error('The input cannot be empty'));
                }else{
                    //这里一定要执行callbalk 来结束规则验证
                    callback();
                }
            };
            return {
                buttonCont:this.flag?"退出登录":"登录",//按钮的名字内容
                musicList: [],//音乐列表数据
                dialogVisible: false,//添加控制弹框的属性
                addDialogVisible:false,//修改控制弹框的属性
                checked:false,//弹窗表单的复选框状态
                pagenum:1,//默认页数
                limit:5,//默认一页有5条数据
                total:0,//默认总数居数量
                musicForm: {
                    music_name: '',//歌曲名称
                    singer_name: '',//歌手,
                    pic:'',//图片地址
                    isup:''//是否上架
                    },
                rules: {
                    //验证歌曲名称规则
                    music_name: [
                        { validator: validateMusicName, trigger: 'blur' }
                    ],
                    //验证歌手名称规则
                    singer_name: [
                        { validator: validateMusicName, trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            ...mapMutations(['setName','setFlag']),
            //获取music列表的方法
            getMusicList(){
                //请求音乐数据列表
                this.$api.music.querymusic({
                    pagenum:this.pagenum,
                    limit:this.limit,
                }).then(res=>{
                    if(res.data.code==1){
                        this.musicList=res.data.data;
                        this.total=res.data.total
                    }
                })
            },
            //退出按钮事件
            exit(){
                if(this.flag){
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    this.verifyLocalStorageName();
                }else{
                    this.$router.push({path:'/login'})
                }
                this.setFlag(!this.flag)
            },
            //验证本地存储有没有用户名，根据本地存储的用户名来设置 vuex 中的username
            verifyLocalStorageName(){
                let username=localStorage.username;
                if(username){
                    this.setName('欢迎： '+username)
                }else{
                    this.setName('请登录')
                }
            },
            //上传图片
           async fileChange(e){
                // console.dir(e.target.files)
                //获取到input file 对象
                let file=e.target.files[0];
                //实例一个fromdata 空对象
                let formData=new FormData();
                //fromdata 添加子项 file
               await formData.append('file',file);
                this.$api.music.lodingImg(formData).then(res=>{
                    if(res.data.code==1){
                        this.musicForm.pic='http://localhost:3000'+res.data.url;
                    }
                })
            },
            
            //点击弹框中的添加按钮
            handleAddClidk(e,formName) {
                //将添加按钮的事件源的innerHTML值拿出来，用来判断发送相应的请求
                let value=e.target.innerHTML;
                
                this.$refs[formName].validate((valid) => {
                if (valid) { //如果验证成功
                    if(value=='添 加'){
                            this.$api.music.addmusic(this.musicForm).then(res=>{
                            if(res.data.code==1){//请求成功的情况下
                                this.$message({
                                    message: 'Add success',
                                    type: 'success'
                                });
                                //更新UI界面
                                this.getMusicList()
                                //添加完成以后清空form表单的值
                                for(let k in this.musicForm){
                                    this.musicForm[k]=''
                                }
                            }else{//请求失败的情况下
                                this.$message.error('Please try again later');
                            }
                        })
                    }else if(value=='修 改'){
                        //触发修改列表的接口
                        this.$api.music.updatemusic(this.musicForm).then(res=>{
                            if(res.data.code==1){//请求成功的情况下
                                this.$message({
                                    message: 'Edit success',
                                    type: 'success'
                                });
                                //更新UI界面
                                this.getMusicList()
                                //添加完成以后清空form表单的值
                                for(let k in this.musicForm){
                                    this.musicForm[k]='';
                                }
                            }else{
                                //请求失败的情况下
                                this.$message.error('Please try again later');
                            }
                        })
                    }
                } else {//如果验证不通过
                    this.$message.error('The input cannot be empty');
                    return false;
                }
                });
            },
            //点击修改按钮执行的事件
            handleEdit(id){
                //让弹框出现
                this.addDialogVisible=true;
                //给musicFormsh属性添加id
                this.musicForm.id=id;
            },
            //点击删除按钮执行的事件
            handleDelete(id){
                //触发删除列表接口
                this.$api.music.deletemusic({id}).then(res=>{
                    if(res.data.code==1){
                        this.$message({
                                message: 'Delete success',
                                type: 'success'
                        });
                        //重新获取数据，更新数据
                        this.getMusicList();
                    }
                })
            },
            //点击分页和左右按钮触发的事件
            handleCurrentChange(val){
                this.pagenum=val;
                this.getMusicList();
            }
            
        },

        computed:{
            ...mapState({
                "username":(state)=>state.user.name,
                'flag':(state)=>state.user.flag
            }),
        },
        created(){
            //修改vuex中的name
            this.verifyLocalStorageName();
            //调用获取music列表的方法
            this.getMusicList()
        }
    }
</script>

<style lang="scss" scoped>
    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: right;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: right;
   
  }
  
  .el-container {
    width: 100%;
    height: 100%;
  }
  .m-img{
      width: 50px;
      height: 50px;
      border: none
  }
  .m-add-btn{
      margin: 10px 10px;
  }
  .m-page-list{
      margin: 10px 10px;
  }
  .m-login-btn{
      margin-left: 20px
  }
</style>