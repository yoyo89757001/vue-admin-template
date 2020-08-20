<template>
  <div style="margin-top: 40px;margin-bottom: 40px">
    <el-card style="width: 100vw;height: 232vw;" v-loading.fullscreen.lock="loading">
      <el-row style="margin-top: 1vw" ref="multipleTable">
        <el-col :span="11">
          <el-form ref="form" :model="form" style="margin-left: 30px;position: relative">
            <el-form-item label="MQ端口号:">
              <div>
                <span class="text-shenglue">{{form.mqProt}}</span>
                <el-button type="primary" style="margin-left: 10px" @click="isEndUrlVisible=true">修改</el-button>
                <!--   弹窗-->
                <el-dialog title="修改MQ端口号" :visible.sync="isEndUrlVisible" center :width="formLabelWidth">
                  <span >MQ端口号</span>
                  <el-input v-model="form.mqProt" autocomplete="off" type="text" maxlength="5" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isEndUrlVisible = false" style="margin-right: 20px">取 消</el-button>
                    <el-button type="primary" @click="dialog_mq_port">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-form-item>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 1vw;"></div>
            <!--  ------------------------------------------------------->
            <el-row style="margin-top: 5vw">
                <span style="font-size: 15px;color: #666666;"><strong>{{form.huoTi===true?'活体验证打开':'活体验证关闭'}}</strong></span>
                <el-switch v-model="form.huoTi" :disabled="isLivingDisabled" @change="isLivingChang" style="margin-left: 1vw"></el-switch>
            </el-row>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 5vw;"></div>
            <!--  ------------------------------------------------------->
            <el-form-item label="门禁密码:">
              <div>
                <span class="text-shenglue">{{form.mima}}</span>
                <el-button type="primary" style="margin-left: 16px" @click="isDoorPassword=true">修改</el-button>
                <!--   弹窗-->
                <el-dialog title="修改门禁密码" :visible.sync="isDoorPassword" center :width="formLabelWidth">
                  <span >门禁密码</span>
                  <el-input v-model="form.mima" autocomplete="off" type="text" maxlength="8"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isDoorPassword = false" style="margin-right: 20px">取 消</el-button>
                    <el-button type="primary" @click="dialog_password">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-form-item>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 1vw;"></div>
            <!--  ------------------------------------------------------->
            <el-form-item label="摄像头方向:" style="margin-top: 1vw;">
              <div>
                <span class="text-shenglue" style="font-size: 12px">摄像头ID:{{form.cameraId}}</span>
                <span class="text-shenglue" style="font-size: 12px">摄像头预览方向:{{form.cameraPreviewRotation}}</span>
                <span class="text-shenglue" style="font-size: 12px">摄像头算法方向:{{form.faceRotation}}</span>
                <span class="text-shenglue" style="font-size: 12px">红外摄像头预览方向:{{form.cameraPreviewRotation2}}</span>
                <span class="text-shenglue" style="font-size: 12px">红外摄像头算法方向:{{form.faceRotation2}}</span>
                <span class="text-shenglue" style="font-size: 12px">陌生人抓拍图片方向:{{form.msrBitmapRotation}}</span>
                <p>
                  <el-button type="primary" style="margin-left: 10px" @click="isDirection=true">修改</el-button>
                </p>

                <!--   弹窗-->
                <el-dialog title="修改摄像头方向" :visible.sync="isDirection" center :width="formLabelWidth">
                  <strong style="margin-left: 1vw">
                    <span>摄像头id:</span>
                  </strong>
                  <el-radio-group v-model="form.cameraId" style="margin-left: 4.5vw">
                    <el-radio :label=0>前置</el-radio>
                    <el-radio :label=1>后置</el-radio>
                  </el-radio-group>

                  <p style="margin-left: 1vw">
                    <strong>
                      <span>摄像头预览方向:</span>
                    </strong>
                    <el-radio-group v-model="form.cameraPreviewRotation" style="margin-left: 2.2vw;">
                      <el-radio :label=0>0</el-radio>
                      <el-radio :label=90>90</el-radio>
                      <el-radio :label=180>180</el-radio>
                      <el-radio :label=270>270</el-radio>
                    </el-radio-group>
                  </p>

                  <p style="margin-left: 1vw">
                    <strong>
                      <span>摄像头算法方向:</span>
                    </strong>
                    <el-radio-group v-model="form.faceRotation" style="margin-left: 2.2vw">
                      <el-radio :label=0>0</el-radio>
                      <el-radio :label=90>90</el-radio>
                      <el-radio :label=180>180</el-radio>
                      <el-radio :label=270>270</el-radio>
                    </el-radio-group>
                  </p>

                  <p style="margin-left: 1vw">
                    <strong>
                      <span>红外摄像头预览方向:</span>
                    </strong>
                    <el-radio-group v-model="form.cameraPreviewRotation2" style="margin-left: 0.8vw">
                      <el-radio :label=0>0</el-radio>
                      <el-radio :label=90>90</el-radio>
                      <el-radio :label=180>180</el-radio>
                      <el-radio :label=270>270</el-radio>
                    </el-radio-group>
                  </p>

                  <p style="margin-left: 1vw">
                    <strong>
                      <span>红外摄像头算法方向:</span>
                    </strong>
                    <el-radio-group v-model="form.faceRotation2" style="margin-left: 0.8vw">
                      <el-radio :label=0>0</el-radio>
                      <el-radio :label=90>90</el-radio>
                      <el-radio :label=180>180</el-radio>
                      <el-radio :label=270>270</el-radio>
                    </el-radio-group>
                  </p>

                  <p style="margin-left: 1vw">
                    <strong>
                      <span>陌生人抓拍图片方向:</span>
                    </strong>
                    <el-radio-group v-model="form.msrBitmapRotation" style="margin-left: 0.8vw">
                      <el-radio :label=0>0</el-radio>
                      <el-radio :label=90>90</el-radio>
                      <el-radio :label=180>180</el-radio>
                      <el-radio :label=270>270</el-radio>
                    </el-radio-group>
                  </p>

                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isDirection = false" style="margin-right: 20px">取 消</el-button>
                    <el-button type="primary" @click="dialog_Direction">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-form-item>
<!--            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 40px;"></div>-->
            <!--  ------------------------------------------------------->

          </el-form>
        </el-col>
        <!--   中间分割线-->
        <el-col :span="2" style="text-align: center;display: flex;justify-content: center;margin-top: 0">
          <div style="border:1px solid;float:left;height: 240vw;color: rgba(0,0,0,0.07)"></div>
        </el-col>

        <el-col :span="11" >
          <el-form ref="form" :model="form">
            <el-form-item label="识别阈值:">
              <div>
                  <span class="text-shenglue">{{form.shibieFaZhi}}</span>
                <el-button type="primary" style="margin-left: 20px" @click="isRecognitionThreshold=true">修改</el-button>
                <!--   弹窗-->
                <el-dialog title="修改识别阈值" :visible.sync="isRecognitionThreshold" center :width="formLabelWidth">
                  <span >识别阈值</span>
                  <el-input v-model="form.shibieFaZhi" autocomplete="off" type="text" maxlength="3" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isRecognitionThreshold = false" style="margin-right: 20px">取 消</el-button>
                    <el-button type="primary" @click="dialog_recognitionThreshold">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-form-item>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 1vw;"></div>
            <!--  ------------------------------------------------------->
            <el-row style="margin-top: 5vw">
                <span style="font-size: 15px;color: #666666"><strong>{{form.openCard===true?'刷卡模式打开':'刷卡模式关闭'}}</strong></span>
                <el-switch v-model="form.openCard" :disabled="isPasswordDisabled" @change="isPasswordChang" style="margin-left: 1vw"></el-switch>
            </el-row>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 5vw;"></div>
            <!--  ------------------------------------------------------->
            <el-form-item label="公司名称:">
              <div>
                <span class="text-shenglue">{{form.companyName}}</span>
                <el-button type="primary" style="margin-left: 16px" @click="isCompanyName=true">修改</el-button>
                <!--   弹窗-->
                <el-dialog title="修改公司名称" :visible.sync="isCompanyName" center :width="formLabelWidth">
                  <span >公司名称</span>
                  <el-input v-model="form.companyName" autocomplete="off" type="text" maxlength="18"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isCompanyName = false" style="margin-right: 20px">取 消</el-button>
                    <el-button type="primary" @click="dialog_companyName">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-form-item>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 1vw;"></div>
            <!--  ------------------------------------------------------->
            <el-form-item label="入库阈值:">
              <div>
                <span style="color: #99a9bf;font-size: 14px;">入库最小人脸:{{form.ruKuFaceSize}}; 入库模糊度:{{form.ruKuMoHuDu}}</span>
                <el-button type="primary" style="margin-left: 16px" @click="isStorageThreshold=true">修改</el-button>
                <!--   弹窗-->
                <el-dialog title="修改入库阈值" :visible.sync="isStorageThreshold" center :width="formLabelWidth">
                  <span >人脸大小</span>
                  <el-input v-model="form.ruKuFaceSize" autocomplete="off" type="text" maxlength="3" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
                  <span >人脸模糊度</span>
                  <el-input v-model="form.ruKuMoHuDu" autocomplete="off" type="text" maxlength="3" oninput = "value=value.replace(/[^1234567890.]+/g,'')"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isStorageThreshold = false" style="margin-right: 20px">取 消</el-button>
                    <el-button type="primary" @click="dialog_isStorageThreshold">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-form-item>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 1vw;"></div>
            <!--  ------------------------------------------------------->
            <el-form-item label="选择机型:">
              <div>
                <el-select v-model="form.dangqianChengShi2" placeholder="请选择" @change="jiqileixng">
                  <el-option
                    v-for="item in options"
                    :key="item.dangqianChengShi2"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <!--  ------------------------------------------------------->
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 1vw;"></div>

            <el-row style="margin-top: 5vw">

                <el-button type="primary" @click="isMiMa=true" style="margin-bottom: 5vw;margin-left: 1vw">修改登录密码</el-button>
                <!--   弹窗-->
                <el-dialog title="修改登录密码" :visible.sync="isMiMa" center :width="formLabelWidth">
                  <span>旧登录密码</span>
                  <el-input v-model="form.mima1" autocomplete="off" type="text" maxlength="12" style="margin-top: 10px;margin-bottom: 10px"></el-input>
                  <span >新登录密码</span>
                  <el-input v-model="form.mimanew" autocomplete="off" type="text" maxlength="12" style="margin-top: 10px;"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isMiMa = false" style="margin-right: 20px">取 消</el-button>
                    <el-button type="primary" @click="xiugaimima">确 定</el-button>
                  </div>
                </el-dialog>

                <el-popover
                  placement="top"
                  width="172"
                  visible-arrow="true">
                  <p style="text-align: center;margin-top: 1vw;margin-bottom: 1vw">您确定要重启设备吗？</p>
                  <div style="text-align: center;">
                    <el-button size="mini" type="text" @click="handleClick(1,3)">取消</el-button>
                    <el-button type="danger" size="mini" @click="handleClick(1,2)">确定</el-button>
                  </div>
                  <el-button type="danger" slot="reference" style="margin-left: 1vw">重启设备</el-button>
                </el-popover>

            </el-row>

          </el-form>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
import ax from "axios";
import {getConfig,getchongqi} from '@/api/people'

export default {
  data() {
    return {

      isEndUrlVisible:false,//修改端口的显示隐藏的控制值
      isRecognitionThreshold:false,//修改识别阈值的显示隐藏的控制值
      isLivingDisabled:false,//活体开关启用控制 注意： false是启用
      isPasswordDisabled:false,//活体开关启用控制 注意： false是启用
      isDoorPassword:false,//门禁密码控制值
      isCompanyName:false,//控制修改公司名称的弹窗显示
      isDirection:false,//控制方向的弹窗显示
      isStorageThreshold:false,//控制入库阈值的弹窗显示隐藏
      loading:false,
      isMiMa:false,//控制修改密码弹窗显示隐藏
      form:{
        mqProt:8090,//端口
        shibieFaZhi:72,//识别阈值
        huoTi:false,//活体开关
        openCard:true,//是否刷卡开关
        mima:123456,//门禁密码
        companyName:'请设置公司名称',//公司名称
        ruKuFaceSize:72,//入库脸大小
        ruKuMoHuDu:0.6,//模糊度
        cameraId:0,//摄像头id
        cameraPreviewRotation:0,//预览方向
        faceRotation:0,//算法方向
        cameraPreviewRotation2:0,//红外预览方向
        faceRotation2:0,//红外算法方向
        msrBitmapRotation:0,//陌生人抓拍方向
        dangqianChengShi2:'ZL001',//当前机型 0，亮钻，1，智连，2涂鸦
        mima1:'',
        mimanew:'',
      },
      formLabelWidth: '80vw',
      options: [{
        dangqianChengShi2: '0',
        label: 'ZL001' //智连
      }, {
        dangqianChengShi2: '1',
        label: 'LZ001' //亮钻
      }, {
        dangqianChengShi2: '2',
        label: 'TY001'
      }],
      value: ''
    }
  },
  mounted() {//
    var mythis=this;
    this.loading=true;
    getConfig().then(response => {
      mythis.loading=false;
      console.log("设置信息返回",response);
      const  {data} =response;
      mythis.form =JSON.parse(data);
      console.log(mythis.form,"设置信息");
    }).catch((err) => {
      mythis.loading=false;
      mythis.$message.error(err);
      console.log("请求设置失败:"+err)
    });
  },
  methods: {
    xiugaimima(){
      let fd = new FormData();//转成FormData格式上传
      if (this.form.mimanew.length<6){
        this.$message.error('密码不能小于6位数');
        return;
      }
      fd.append('mima1', this.form.mima1);
      fd.append('mimanew', this.form.mimanew);
      this.loading=true;
      var mthis=this;
      ax({
        method: 'post',
        url: '/app/xiugaimima',
        timeout:10000,
        data:fd,
      }).then(function(res) {
        console.log(res.data,"修改密码成功");
        const {errorCode,errorMsg,data} = res.data;
        if (errorCode===200){
          const {code,msg} = JSON.parse(data);
          if (code===1){
            mthis.$message.success(msg);
          }else {
            mthis.$message.error(msg);
          }
        }else {
          mthis.$message.error(errorMsg);
        }
      }).catch(function (error) {
        console.log("error调用",error);
        mthis.$message.error(error.message)

      }).finally(function () {
        console.log("finally调用");
        mthis.loading=false;
        mthis.isMiMa=false;
      });
    },
    handleClick(row,type) {//
      var mythis=this;
      if (type===2 || type===3){//2确定 3取消
        this.$refs.multipleTable.$el.click(); //因为el-popover在列表中会有点击不消失的坑，所以用这个方式来模拟点击让弹窗消失。
        if (type===2){
          mythis.loading=true;
          getchongqi().then(response => {
            mythis.loading=false;
            const  {data} =response;
            const  {code,msg} =JSON.parse(data);
            mythis.$message.error(msg)
          }).catch((err) => {
            mythis.loading=false;
            console.log("请求失败:"+err)
          });
        }
      }
    },
    dialog_mq_port(){//端口确定按钮
      this.isEndUrlVisible=false;
      let fd = new FormData();//转成FormData格式上传
      fd.append('mqProt', this.form.mqProt);
      this.submit(fd);
      console.log("修改端口点击确定")
    },
    dialog_recognitionThreshold(){//识别阈值确定按钮
      this.isRecognitionThreshold=false;
      let fd = new FormData();//转成FormData格式上传
      fd.append('shibieFaZhi',this.form.shibieFaZhi);//识别阈值
      this.submit(fd);
    },
    isLivingChang(){//是否开启活体
      this.form.huoTi===!this.form.huoTi;
      console.log("是否开启活体")
      let fd = new FormData();//转成FormData格式上传
      fd.append('isLive', this.form.huoTi);//活体开关
      this.submit(fd);
    },
    isPasswordChang(){//是否开启刷卡模式
      this.form.openCard===!this.form.openCard;
      let fd = new FormData();//转成FormData格式上传
      fd.append('isOpenCard', this.form.openCard);//是否打开刷卡模式
      this.submit(fd);
    },
    dialog_password(){//门禁密码确定键
      this.isDoorPassword=false;
      let fd = new FormData();//转成FormData格式上传
      fd.append('mima', this.form.mima);//门禁密码
      this.submit(fd);
      console.log("门禁密码确定键")

    },
    dialog_companyName(){//公司名称确定键
      this.isCompanyName=false;
      console.log("公司名称确定键");
      let fd = new FormData();//转成FormData格式上传
      fd.append('companyName', this.form.companyName);//公司名称
      this.submit(fd);
    },
    dialog_Direction(){//方向确定键
      this.isDirection=false;
      let fd = new FormData();//转成FormData格式上传
      fd.append('cameraId', this.form.cameraId);
      fd.append('cameraPreviewRotation', this.form.cameraPreviewRotation);//预览方向
      fd.append('cameraPreviewRotation2', this.form.cameraPreviewRotation2);//红外预览方向
      fd.append('faceRotation', this.form.faceRotation);//算法方向
      fd.append('faceRotation2', this.form.faceRotation2);//红外算法方向
      fd.append('msrBitmapRotation', this.form.msrBitmapRotation);//预览方向
      this.submit(fd);
    },
    dialog_isStorageThreshold(){
      let fd = new FormData();//转成FormData格式上传
      fd.append('ruKuFaceSize', this.form.ruKuFaceSize);//入库脸大小
      fd.append('ruKuMoHuDu', this.form.ruKuMoHuDu);//入库模糊度
      this.isStorageThreshold=false;
      this.submit(fd);
    },
    submit(fd){
      this.loading=true;
      var mthis=this;
      ax({
        method: 'post',
        url: '/app/setConfig',
        timeout:10000,
        data:fd,
      }).then(function(res) {
        console.log(res.data,"设置成功");
        const {errorCode,errorMsg,data} = res.data;
        if (errorCode===200){
          const {code,msg} = JSON.parse(data);
          if (code===1){
            mthis.$message.success(msg);
          }else {
            mthis.$message.error(msg);
          }
        }else {
          mthis.$message.error(errorMsg);
        }
      }).catch(function (error) {
        console.log("error调用",error);
        mthis.$message.error('设置失败:'+error.message);
        console.log(window.location.host)

      }).finally(function () {
        console.log("finally调用");
        mthis.loading=false;
      });
    },
    jiqileixng(vue){
      console.log(vue);
      this.form.dangqianChengShi2=vue;
      let fd = new FormData();//转成FormData格式上传
      fd.append('dangqianChengShi2', this.form.dangqianChengShi2);//
      this.submit(fd);
    }

  }
}
</script>

<style scoped>
  .text-shenglue{
    vertical-align: middle;
    display:inline-block;
    word-break:keep-all;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    color: #99a9bf;
    size: 16px;
    width: 40vw;

  }

.line{
  text-align: center;
}
</style>

