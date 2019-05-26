<template>
  <div>
    <a-card title="学生新建">
      <div class="user-head">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action="//jsonplaceholder.typicode.com/posts/"
          :beforeUpload="beforeUpload"
          @change="handleAvatarChange"
        >
          <a-avatar v-if="studentInfo.imageUrl" :size="64" :src="studentInfo.imageUrl" alt="avatar" />
          <a-avatar v-else :size="64" :icon="loading ? 'loading' : 'user'" />
          <!-- <a-avatar :size="64" icon="user" /> -->
        </a-upload>
      </div>
      <a-row class="my-row">
        <a-col :span=2>
          <p>学生ID：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="id_input" placeholder="请输入"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>性别：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择性别">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>编号：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="number_input" placeholder="请输入编号"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>账号：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="account_input" placeholder="请输入账号"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>昵称：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="nickname_input" placeholder="请输入昵称"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>状态：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择状态">
            <a-select-option value="正常">正常</a-select-option>
            <a-select-option value="异常">异常</a-select-option>
            <a-select-option value="关闭">关闭</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>班级：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择班级">
            <a-select-option value="一班">一班</a-select-option>
            <a-select-option value="二班">二班</a-select-option>
            <a-select-option value="三班">三班</a-select-option>
            <a-select-option value="四班">四班</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>寝室：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="room_input" placeholder="请输入寝室"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>省份：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择省份">
            <a-select-option value="山东">山东</a-select-option>
            <a-select-option value="天津">天津</a-select-option>
            <a-select-option value="河北">河北</a-select-option>
            <a-select-option value="贵州">贵州</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </a-card>
    
    <a-row class="my-row">
      <a-col :span=20>
      </a-col>
      <a-col :span=2>
        <a-button @click="cancelCreation">取消</a-button>
      </a-col>
      <a-col :span=2>
        <a-button @click="submitCreation" type="primary">确认</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'StudentCreation',
  props: {},
  data () {
      return {
        loading: false,
        studentInfo: {
          imageUrl: '',
        },
      }
  },
  methods: {
    cancelCreation(){
      this.$refs.id_input.$data.stateValue = ''
      this.$refs.account_input.$data.stateValue = ''
      this.$refs.number_input.$data.stateValue = ''
      this.$refs.room_input.$data.stateValue = ''
      this.$refs.nickname_input.$data.stateValue = ''
    },
    submitCreation(){
      this.axios.get('/vue-demo/api/getdata').then((response)=>{
                console.log(response.data)
            }).catch((response)=>{
                console.log(response)
            })
    },
    beforeUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        if (!isJPG) {
          this.$message.error('You can only upload JPG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!')
        }
        return isJPG && isLt2M
      },
      handleAvatarChange (info) {
        if (info.file.status === 'uploading') {
          this.loading = true
          return
        }
        if (info.file.status === 'done') {
          getBase64(info.file.originFileObj, (imageUrl) => {
            this.studentInfo.imageUrl = imageUrl
            this.loading = false
          })
        }
      }
  },
}
</script>

<style lang="scss" scoped>
.my-row {
  margin-top: 30px;
}
.user-head {
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
</style>