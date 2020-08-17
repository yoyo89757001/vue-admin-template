<template>
  <div style="display: flex;justify-content: center;margin-top: 2vw">
    <el-card style="width: 80vw;margin-bottom: 2vw">
      <el-row >
        <!--     1大块 el-row 用来分左右两大块 el-col每个子小块-->
        <el-col :span="12" :offset="6">
          <!--         el-container 用来分上下块，也可以用来分左右块  里面有el-header就是上下块-->
          <el-container style="height: 50vw">
            <el-header>
              <div style="margin-top: 3vw;width: 32vw;display: flex;justify-content: center;">
                <div style="text-align: center;z-index: 2">
                  <el-upload
                    class="avatar-uploader"
                    action=""
                    :headers="myHeaders"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <p style="font-size: 18px;color: #409EFF">上传底库</p>
                </div>
                <!--              <div style="position: absolute;z-index: 99;margin-top: -5%" v-show="loading">-->
                <!--                <el-avatar v-loading="loading"></el-avatar>-->
                <!--              </div>-->
              </div>


              <el-form ref="formUp" :model="formUp" label-width="4vw" :rules="rules" style="position: absolute;margin-top: 1vw">
                <el-form-item label="姓名:" prop="name">
                  <el-input v-model="formUp.name" placeholder="请填写姓名"></el-input>
                </el-form-item>


                <el-form-item label="性别:" prop="sex">
                  <el-col :span="9">
                    <el-select v-model="formUp.sex" placeholder="-请选择-">
                      <el-option label="男" value="1"></el-option>
                      <el-option label="女" value="2"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="13" :offset=2>
                    <el-form-item label="出生日期:">
                      <el-date-picker type="date" placeholder="选择日期" v-model="formUp.birthday" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item label="IC卡号:">
                  <el-row >
                    <el-col :span="18">
                      <el-input v-model="formUp.icCard" placeholder="点击绑定按钮后,再到机器刷卡" ></el-input>
                    </el-col>
                    <el-col :span="6">
                      <el-button type="primary" :loading="loadingBD" style="width: 100px;height: 40px;text-align: center;margin-left: 24px" @click="onBind">绑定</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item label="手机号码:">
                  <el-input v-model="formUp.phone" placeholder="请填写手机号码" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11"></el-input>
                </el-form-item>

                <el-form-item label="过期时间:" required label-width="4.4vw">
                  <el-row >
                    <el-col :span="11">
                      <el-date-picker type="datetime" placeholder="开始日期" v-model="formUp.startTime" style="width: 100%"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                    <el-col :span="11">
                      <el-date-picker  type="datetime" placeholder="结束时间" v-model="formUp.endTime" style="width: 100%" ></el-date-picker>
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item label="备注信息">
                  <el-input type="textarea" v-model="formUp.remarks" placeholder="请输入备注信息"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center;margin-top: 20px">
                  <el-button type="danger" style="margin-right: 30px;width: 100px;height: 50px" @click="onCancel">取消</el-button>
                  <el-button type="primary"  style="width: 100px;height: 50px" @click="onSubmit('formUp')">提交</el-button>
                </el-form-item>
              </el-form>

            </el-header>
          </el-container>
        </el-col>

      </el-row>

    </el-card>

  </div>
</template>

<script>
  import  ax from 'axios'
  import {getPeopleInfo,openCard} from '@/api/people'
  //import Moment from "moment";


  export default {
    created() {

    },
    mounted() {
      console.log(this.myId,"员工传过来的ID");
      if (this.myId!==undefined){
        var mythis=this;
        getPeopleInfo(this.myId).then(response => {
          mythis.loading=false;
          console.log("个人信息返回",response);
          const  {data} =response;
          mythis.formUp =JSON.parse(data);
          mythis.imageUrl=mythis.formUp.photo;
          console.log(mythis.formUp,"人员信息");

        }).catch((err) => {
          mythis.loadingBD=false;
          console.log("请求失败:"+err)
        });

      }else {
        this.$message.error('获取人员信息失败')
      }

    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请检查你的用户名'))
        } else {
          callback()
        }
      };
      return {
        myId:this.$route.query.id,//拿到上个界面传过来的参数
        imageUrl:'',
        myHeaders: {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST','Access-Control-Allow-Headers':'x-requested-with,content-type'},
        widthP:100,
        loading:true,
        loadingBD:false,
        file:'',
        formUp: {
          name: '',
          department: '',
          sex:'',
          birthday: '',
          peopleType:2,
          startTime: '',
          endTime:'',
          remarks: '',
          phone:'',
          icCard:'',
          sid:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入人员姓名', trigger: 'blur' },
            { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
          ],
          sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        }
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(res,"自带的上传成功回调");//自带的上传成功回调,暂时不用他

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('图片不能超过 2MB 请裁剪后上传');
          return false;
        }
        this.file=file;
        this.imageUrl = URL.createObjectURL(file);

        return false;
      },
      onSubmit(formName){//提交
        this.$refs[formName].validate((valid) => {
          // console.log(this.formUp.startTime);
          // console.log( Date.parse(this.formUp.startTime));//转成时间戳
          // console.log( Date.parse(new Date()));//转成时间戳

          if (this.formUp.peopleType===2){
            if (this.formUp.startTime==='' || this.formUp.endTime===''){
              this.$message.error("过期时间不能为空");
              return
            }else {
              if (Date.parse(this.formUp.endTime)<=Date.parse(this.formUp.startTime)){
                this.$message.error("开始时间不能大于等于结束时间");
                return
              }
              // if (Date.parse(this.formUp.startTime)<=Date.parse(new Date)){
              //   this.$message.error("开始时间不能小于当前时间");
              //   return
              // }
            }
          }
          if (valid) {

            let fd = new FormData();//转成FormData格式上传

            //console.log('生日', Date.parse(this.formUp.birthday));
            fd.append('file', this.file);
            fd.append('sid',this.formUp.sid);
            fd.append('name',this.formUp.name);
            fd.append('department', this.formUp.department);
            fd.append('sex', this.formUp.sex);
            fd.append('peopleType', this.formUp.peopleType);
            fd.append('birthday', Date.parse(this.formUp.birthday));
            fd.append('startTime', Date.parse(this.formUp.startTime));
            fd.append('endTime', Date.parse(this.formUp.endTime));
            fd.append('phone', this.formUp.phone);
            fd.append('remarks', this.formUp.remarks);
            fd.append('icCard', this.formUp.icCard);
            this.loading=true;
            var mthis=this;
            ax({
              method: 'post',
              url: '/app/person/updata2',
              timeout:30000,
              data:fd,
            }).then(function(res) {
              console.log(res.data,"上传成功");
              const {errorCode,errorMsg,data} = res.data;
              if (errorCode===200){
                const {code,msg} = JSON.parse(data);
                if (code===1){
                  mthis.$message.success('修改成功');
                  if (mthis.formUp.peopleType===1){
                    mthis.$router.push('/table')
                  }else {
                    mthis.$router.push('/tree')
                  }

                }else {
                  mthis.$message.error(msg);
                }
              }else {
                mthis.$message.error(errorMsg);
              }
            }).catch(function (error) {
              console.log("error调用",error);
              mthis.$message.error('上传失败:'+error.message)
              console.log(window.location.host)

            }).finally(function () {
              console.log("finally调用");
              mthis.loading=false;
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onCancel(){//取消
        this.$router.replace('/table')
      },
      onBind(){//绑定ic卡
        this.loadingBD=true;
        var mythis=this;
        openCard().then(response => {
          mythis.loadingBD=false;
          console.log("卡信息返回",response);
          const  {data} =response;
          const  {code,card,msg} =JSON.parse(data);
          console.log(code,card,msg,"读取卡信息");
          if (code===1){
            mythis.formUp.icCard=card;
          }else {
            mythis.$message.error(msg)
          }
        }).catch((err) => {
          mythis.loadingBD=false;
          console.log("请求失败:"+err)
        });

      }
    }
  }
</script>

<style>

  .avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 22px;
    color: #8c939d;
    width: 8.4vw;
    height: 8.4vw;
    line-height: 8.4vw;
    text-align: center;
  }
  .avatar {
    width: 8.4vw;
    height: 8.4vw;
    display: block;
  }

</style>

