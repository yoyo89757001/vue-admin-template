<template>
  <div style="display: flex;justify-content: center;margin-top: 40px">
   <el-card style="width: 80%;height: 840px;">
     <el-row >
       <!--     1大块 el-row 用来分左右两大块 el-col每个子小块-->
       <el-col :span="12" :offset="6">
<!--         el-container 用来分上下块，也可以用来分左右块  里面有el-header就是上下块-->
         <el-container style="width: 100%;height: 83vh" class="avatar-uploader">
          <el-header>
            <div style="text-align: center;margin-top: 20px">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :headers="myHeaders"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <p style="font-size: 18px;color: #409EFF">上传底库</p>
            </div>

            <el-form ref="formUp" :model="formUp" label-width="80px" :rules="rules">
              <el-form-item label="姓名:" prop="name">
                <el-input v-model="formUp.name" placeholder="请填写姓名"></el-input>
              </el-form-item>
              <el-form-item label="部门:">
                <el-input v-model="formUp.department" placeholder="请填写部门"></el-input>
              </el-form-item>

              <el-form-item label="性别:">
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

              <el-form-item label="人员类型:">
                <el-radio-group @change="pepolechange" v-model="formUp.peopleType">
                  <el-radio :label=1>内部员工</el-radio>
                  <el-radio :label=2>外部访客</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="过期时间:" required label-width="14%" :hidden="pepoleTypeDisabled">
                <el-row >
                  <el-col :span="11">
                    <el-date-picker type="datetime" placeholder="开始日期" v-model="formUp.startTime"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2" style="text-align: center">-</el-col>
                  <el-col :span="11">
                    <el-date-picker  type="datetime" placeholder="结束时间" v-model="formUp.endTime" ></el-date-picker>
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

  export default {
    created() {

    },
    mounted() {
      console.log(this.myId+"myId");
      if (this.myId==null){
        console.log('是新增人员')

      }else {//网络请求个人信息

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
        pepoleTypeDisabled:true,
        myId:this.$route.query.id,//拿到上个界面传过来的参数
        imageUrl:'',
        myHeaders: {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST','Access-Control-Allow-Headers':'x-requested-with,content-type'},
        formUp: {
          name: '',
          department: '',
          sex:"男",
          radio: 1,
          birthday: '',
          peopleType:1,
          startTime: '',
          endTime:'',
          remarks: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(res,"res");
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          return true;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return true;
        }

        let fd = new FormData();//转成FormData格式上传
        fd.append('file', file);
        ax.post('http://192.168.2.19:8080/j030_picc_ceshi/public/weixin/index/upload_img', fd).then((res) => {

        }, (res) => {
          console.log(res,"ftttttttt")
        });

        return false;
      },
      pepolechange(){//选择人员类型
        this.pepoleTypeDisabled = this.formUp.peopleType !== 2;

      },
      onSubmit(formName){//提交
        this.$refs[formName].validate((valid) => {
          console.log(this.formUp.startTime);
          console.log( Date.parse(this.formUp.startTime));//转成时间戳
          console.log( Date.parse(new Date()));//转成时间戳
          if (!this.pepoleTypeDisabled){//员工
            if (this.formUp.startTime==='' || this.formUp.endTime===''){
              this.$message.error("过期时间不能为空")
            }else {
              if (Date.parse(this.formUp.endTime)<=Date.parse(this.formUp.startTime)){
                this.$message.error("开始时间不能大于结束时间")
              }
              if (Date.parse(this.formUp.startTime)<=Date.parse(new Date)){
                this.$message.error("开始时间不能小于当前时间")
              }

            }

          }else {//访客


          }


          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onCancel(){//取消
        this.$router.replace('/table')
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
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>

