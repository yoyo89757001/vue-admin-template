<template>
  <div style="margin-top: 2vw">
    <el-card style="width: 100vw;margin-bottom: 2vw">
      <el-row >
        <!--     1大块 el-row 用来分左右两大块 el-col每个子小块-->
        <el-col :span="12" :offset="6">
          <!--         el-container 用来分上下块，也可以用来分左右块  里面有el-header就是上下块-->
          <el-container style="height: 300vw">
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


              <el-form ref="formUp" :model="formUp"  :rules="rules" style="position: absolute;text-align: center;margin-left: -8vw" v-loading="loading">
                <el-form-item label="姓名:" prop="name">
                  <el-input v-model="formUp.name" placeholder="请填写姓名"></el-input>
                </el-form-item>


                <el-form-item label="性别:" prop="sex" style="margin-top: -20px">
                  <el-select v-model="formUp.sex" placeholder="-请选择-" style="width: 100%">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="出生日期:" style="margin-top: -20px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="formUp.birthday" style="width: 100%;"></el-date-picker>
                </el-form-item>

                <el-form-item label="IC卡号:" style="margin-top: -20px">

                  <el-input v-model="formUp.icCard" placeholder="点击绑定按钮后,再到机器刷卡" style="font-size: 12px"></el-input>

                  <el-button type="primary" :loading="loadingBD" style="width: 100px;height: 40px;text-align: center;margin-top: 8px" @click="onBind">绑定</el-button>

                </el-form-item>

                <el-form-item label="手机号码:" style="margin-top: -20px">
                  <el-input v-model="formUp.phone" placeholder="请填写手机号码" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11"></el-input>
                </el-form-item>

                <el-form-item label="过期时间:" required  :hidden="pepoleTypeDisabled" style="margin-top: -20px">

                  <el-date-picker type="datetime" placeholder="开始日期" v-model="formUp.startTime" style="width: 100%"></el-date-picker>
                  <el-date-picker  type="datetime" placeholder="结束时间" v-model="formUp.endTime" style="width: 100%;margin-top: 6px;" ></el-date-picker>

                </el-form-item>

                <el-form-item label="备注信息:" style="margin-top: -20px">
                  <el-input type="textarea" v-model="formUp.remarks" placeholder="请输入备注信息"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center;margin-top: 20px" >
                  <el-button type="danger" style="margin-right: 10px;width: 20vw;height: 40px;font-size: 14px" @click="onCancel">取消</el-button>
                  <el-button type="primary"  style="width: 20vw;height: 40px;font-size:14px;" @click="onSubmit('formUp')">提交</el-button>
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
        orient:'',
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
        const isLt2M = file.size / 1024 / 1024 < 2.5;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('图片不能超过 2.5MB 请裁剪后上传');
          return false;
        }
        this.file=file;
        this.imageUrl = URL.createObjectURL(file);
        var myth=this;
        return new Promise((resolve) => {
          fileUtils.getOrientation(file).then((orient) => {
            myth.orient=orient;
            console.log(orient,'方向');
            resolve();
          })
        });

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
            fd.append('orient', this.orient);
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
    width: 30vw;
    height: 30vw;
    line-height: 30vw;
    text-align: center;
  }
  .avatar {
    width: 30vw;
    height: 30vw;
    display: block;
  }

</style>

