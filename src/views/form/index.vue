<template>
  <div style="display: flex;justify-content: center;margin-top: 40px;margin-bottom: 40px">
    <el-card style="width: 95%;height: 840px;">

      <el-row style="margin-top: 40px">
        <el-col :span="11">
          <el-form ref="form" :model="form" style="margin-left: 30px">
            <el-form-item label="MQ端口号:" style="display: flex;justify-items: center;">
              <div>
                <span class="text-shenglue">{{blackEndUrl}}</span>
                <el-button type="primary" style="margin-left: 10px" @click="isEndUrlVisible=true">修改</el-button>
                <!--   弹窗-->
                <el-dialog title="修改MQ端口号" :visible.sync="isEndUrlVisible" center :width="formLabelWidth">
                  <span >MQ端口号</span>
                  <el-input v-model="blackEndUrl" autocomplete="off" type="text" maxlength="5" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isEndUrlVisible = false" style="margin-right: 20px">取 消</el-button>
                    <el-button type="primary" @click="dialog_mq_port">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-form-item>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 40px;"></div>
            <!--  ------------------------------------------------------->
            <el-row style="margin-top: 40px">
              <el-col :span="8">
                <span style="font-size: 15px;color: #666666;margin-right: 30px"><strong>{{isLiving===true?'活体验证打开':'活体验证关闭'}}</strong></span>
              </el-col>
              <el-col :span="4" :offset="12">
                <el-switch v-model="isLiving" :disabled="isLivingDisabled" @change="isLivingChang"></el-switch>
              </el-col>
            </el-row>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 40px;"></div>
            <!--  ------------------------------------------------------->
            <el-form-item label="门禁密码:" style="display: flex;justify-items: center;margin-top: 40px">
              <div>
                <span class="text-shenglue">{{doorPassword}}</span>
                <el-button type="primary" style="margin-left: 16px" @click="isDoorPassword=true">修改</el-button>
                <!--   弹窗-->
                <el-dialog title="修改门禁密码" :visible.sync="isDoorPassword" center :width="formLabelWidth">
                  <span >门禁密码</span>
                  <el-input v-model="doorPassword" autocomplete="off" type="text" maxlength="8"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isDoorPassword = false" style="margin-right: 20px">取 消</el-button>
                    <el-button type="primary" @click="dialog_password">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-form-item>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 40px;"></div>
            <!--  ------------------------------------------------------->
            <el-form-item label="摄像头方向:" style="margin-top: 40px;">
              <div>
                <span class="text-shenglue">摄像头ID:{{form.caneraId}}</span>
                <span class="text-shenglue" style="margin-left: 12.5%;margin-top: 0">摄像头预览方向:{{form.previewDirection}}</span>
                <span class="text-shenglue" style="margin-left: 12.5%;margin-top: 0">摄像头算法方向:{{form.algorithmDirection}}</span>
                <span class="text-shenglue" style="margin-left: 12.5%;margin-top: 0">红外摄像头预览方向:{{form.hyPreviewDirection}}</span>
                <span class="text-shenglue" style="margin-left: 12.5%;margin-top: 0">红外摄像头算法方向:{{form.hyAlgorithmDirection}}</span>
                <span class="text-shenglue" style="margin-left: 12.5%;margin-top: 0">陌生人抓拍图片方向:{{form.strangerDirection}}</span>
                <p>
                  <el-button type="primary" style="margin-left: 82%" @click="isDirection=true">修改</el-button>
                </p>

                <!--   弹窗-->
                <el-dialog title="修改摄像头方向" :visible.sync="isDirection" center :width="formLabelWidth">
                  <strong style="margin-left: 30px">
                    <span>摄像头id:</span>
                  </strong>
                  <el-radio-group v-model="form.caneraId" style="margin-left: 91px">
                    <el-radio :label=0>前置</el-radio>
                    <el-radio :label=1>后置</el-radio>
                  </el-radio-group>

                  <p style="margin-left: 30px">
                    <strong>
                      <span>摄像头预览方向:</span>
                    </strong>
                    <el-radio-group v-model="form.previewDirection" style="margin-left: 48px;">
                      <el-radio :label=0>0</el-radio>
                      <el-radio :label=90>90</el-radio>
                      <el-radio :label=180>180</el-radio>
                      <el-radio :label=270>270</el-radio>
                    </el-radio-group>
                  </p>

                  <p style="margin-left: 30px">
                    <strong>
                      <span>摄像头算法方向:</span>
                    </strong>
                    <el-radio-group v-model="form.algorithmDirection" style="margin-left: 48px">
                      <el-radio :label=0>0</el-radio>
                      <el-radio :label=90>90</el-radio>
                      <el-radio :label=180>180</el-radio>
                      <el-radio :label=270>270</el-radio>
                    </el-radio-group>
                  </p>

                  <p style="margin-left: 30px">
                    <strong>
                      <span>红外摄像头预览方向:</span>
                    </strong>
                    <el-radio-group v-model="form.hyPreviewDirection" style="margin-left: 20px">
                      <el-radio :label=0>0</el-radio>
                      <el-radio :label=90>90</el-radio>
                      <el-radio :label=180>180</el-radio>
                      <el-radio :label=270>270</el-radio>
                    </el-radio-group>
                  </p>

                  <p style="margin-left: 30px">
                    <strong>
                      <span>红外摄像头算法方向:</span>
                    </strong>
                    <el-radio-group v-model="form.hyAlgorithmDirection" style="margin-left: 20px">
                      <el-radio :label=0>0</el-radio>
                      <el-radio :label=90>90</el-radio>
                      <el-radio :label=180>180</el-radio>
                      <el-radio :label=270>270</el-radio>
                    </el-radio-group>
                  </p>

                  <p style="margin-left: 30px">
                    <strong>
                      <span>陌生人抓拍图片方向:</span>
                    </strong>
                    <el-radio-group v-model="form.strangerDirection" style="margin-left: 20px">
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
          <div style="border:1px solid;float:left;height: 722px;color: rgba(0,0,0,0.07)"></div>
        </el-col>

        <el-col :span="11" >
          <el-form ref="form" :model="form">
            <el-form-item label="识别阈值:" style="display: flex;justify-items: center;">
              <div>
                  <span class="text-shenglue">{{recognitionThreshold}}</span>
                <el-button type="primary" style="margin-left: 20px" @click="isRecognitionThreshold=true">修改</el-button>
                <!--   弹窗-->
                <el-dialog title="修改识别阈值" :visible.sync="isRecognitionThreshold" center :width="formLabelWidth">
                  <span >识别阈值</span>
                  <el-input v-model="recognitionThreshold" autocomplete="off" type="text" maxlength="3" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isRecognitionThreshold = false" style="margin-right: 20px">取 消</el-button>
                    <el-button type="primary" @click="dialog_recognitionThreshold">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-form-item>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 40px;"></div>
            <!--  ------------------------------------------------------->
            <el-row style="margin-top: 40px">
              <el-col :span="8">
                <span style="font-size: 15px;color: #666666;margin-right: 30px"><strong>{{isPassword===true?'门禁密码打开':'门禁密码关闭'}}</strong></span>
              </el-col>
              <el-col :span="4" :offset="11">
                <el-switch v-model="isPassword" :disabled="isPasswordDisabled" @change="isPasswordChang" style="margin-left: 6px"></el-switch>
              </el-col>
            </el-row>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 40px;"></div>
            <!--  ------------------------------------------------------->
            <el-form-item label="公司名称:" style="display: flex;justify-items: center;margin-top: 40px">
              <div>
                <span class="text-shenglue">{{companyName}}</span>
                <el-button type="primary" style="margin-left: 16px" @click="isCompanyName=true">修改</el-button>
                <!--   弹窗-->
                <el-dialog title="修改公司名称" :visible.sync="isCompanyName" center :width="formLabelWidth">
                  <span >公司名称</span>
                  <el-input v-model="companyName" autocomplete="off" type="text" maxlength="18"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isCompanyName = false" style="margin-right: 20px">取 消</el-button>
                    <el-button type="primary" @click="dialog_companyName">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-form-item>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 40px;"></div>
            <!--  ------------------------------------------------------->
            <el-form-item label="入库阈值:" style="display: flex;justify-items: center;margin-top: 40px">
              <div>
                <span class="text-shenglue">入库最小人脸:{{faceSize}}; 入库模糊度:{{faceFuzzy}}</span>
                <el-button type="primary" style="margin-left: 16px" @click="isStorageThreshold=true">修改</el-button>
                <!--   弹窗-->
                <el-dialog title="修改入库阈值" :visible.sync="isStorageThreshold" center :width="formLabelWidth">
                  <span >人脸大小</span>
                  <el-input v-model="faceSize" autocomplete="off" type="text" maxlength="3" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
                  <span >人脸模糊度</span>
                  <el-input v-model="faceFuzzy" autocomplete="off" type="text" maxlength="3" oninput = "value=value.replace(/[^1234567890.]+/g,'')"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isStorageThreshold = false" style="margin-right: 20px">取 消</el-button>
                    <el-button type="primary" @click="dialog_isStorageThreshold">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </el-form-item>
            <div style="border:1px solid;float:bottom;width: 35vw;height: 1px;color: rgba(0,0,0,0.07);margin-top: 40px;"></div>
            <!--  ------------------------------------------------------->
            <el-form-item label="选择机型:" style="display: flex;justify-items: center;margin-top: 40px">
              <div>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>

            <!--  ------------------------------------------------------->

          </el-form>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blackEndUrl:5672,//端口
      recognitionThreshold:72,//识别阈值
      isEndUrlVisible:false,//修改端口的显示隐藏的控制值
      isRecognitionThreshold:false,//修改识别阈值的显示隐藏的控制值
      isLiving:false,//活体开关
      isLivingDisabled:false,//活体开关启用控制 注意： false是启用
      isPassword:false,//活体开关
      isPasswordDisabled:false,//活体开关启用控制 注意： false是启用
      doorPassword:123456,//门禁密码
      isDoorPassword:false,//门禁密码控制值
      companyName:'请设置公司名称',//公司名称
      isCompanyName:false,//控制修改公司名称的弹窗显示
      isDirection:false,//控制方向的弹窗显示
      faceSize:70,//入库脸大小
      faceFuzzy:0.6,//模糊度
      isStorageThreshold:false,//控制入库阈值的弹窗显示隐藏

      form:{
        caneraId:0,//摄像头id
        previewDirection:0,//预览方向
        algorithmDirection:0,//算法方向
        hyPreviewDirection:0,//红外预览方向
        hyAlgorithmDirection:0,//红外算法方向
        strangerDirection:0,//陌生人抓拍方向
      },
      formLabelWidth: '40vw',
      options: [{
        value: '0',
        label: 'ZL001' //智连
      }, {
        value: '1',
        label: 'LZ001' //亮钻
      }, {
        value: '2',
        label: 'TY001'
      }],
      value: ''
    }
  },
  methods: {
    urlBlur(){
      console.log("fsdfsfdsfffff")
    },
    dialog_mq_port(){//端口确定按钮
      this.isEndUrlVisible=false;
      console.log("修改端口点击确定")
    },
    dialog_recognitionThreshold(){//识别阈值确定按钮
      this.isRecognitionThreshold=false;

    },
    isLivingChang(){//是否开启活体
      this.isLiving===!this.isLiving;
      console.log("是否开启活体")

    },
    isPasswordChang(){//是否开启门禁密码
      this.isPassword===!this.isPassword;
    },
    dialog_password(){//门禁密码确定键
      this.isDoorPassword=false;
      console.log("门禁密码确定键")

    },
    dialog_companyName(){//公司名称确定键
      this.isCompanyName=false;
      console.log("公司名称确定键")

    },
    dialog_Direction(){//方向确定键
      this.isDirection=false;

    },
    dialog_isStorageThreshold(){
      this.isStorageThreshold=false;

    },

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
    width: 25vw;

  }

.line{
  text-align: center;
}
</style>

