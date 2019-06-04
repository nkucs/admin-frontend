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
          <a-avatar :size="64" icon="user" />
        </a-upload>
      </div>
      <a-row class="my-row">
        <a-col :span=2>
          <p>性别：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择性别" v-model="gender">
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
          <a-input ref="number_input" placeholder="请输入编号" v-model="student_number"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>账号：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="account_input" placeholder="请输入账号" v-model="account"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>昵称：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="nickname_input" placeholder="请输入昵称" v-model="nick_name"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>状态：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择状态" v-model="status">
            <a-select-option value="normal">正常</a-select-option>
            <a-select-option value="error">异常</a-select-option>
            <a-select-option value="closed">关闭</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>班级：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择班级" v-model="class_name">
            <a-select-option value="class_1">一班</a-select-option>
            <a-select-option value="class_2">二班</a-select-option>
            <a-select-option value="class_3">三班</a-select-option>
            <a-select-option value="class_4">四班</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>寝室：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="room_input" placeholder="请输入寝室" v-model="room"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>省份：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择省份" v-model="province">
            <a-select-option value="1">山东</a-select-option>
            <a-select-option value="2">天津</a-select-option>
            <a-select-option value="3">河北</a-select-option>
            <a-select-option value="4">贵州</a-select-option>
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
import { axios } from '@/utils/request'
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
        gender:'',
        student_number:'',
        account:'',
        nick_name:'',
        status:'',
        class_name:'',
        room:'',
        province:''
      }
  },
  methods: {
    cancelCreation(){
      this.$router.push({path: '/student/list'})
    },
    submitCreation(){
      var data = {
          'name': this.nick_name,
          'gender': this.gender,
          'account': this.account,
          'student_number': this.student_number,
          'room': this.room,
          'province': this.province,
          'status': this.status,
          'class_name': this.class_name,
        }
      axios.post('/administrator/role/student_create', data)
          .then(response => {
            console.log(response)
            if (response.data.state_code == 0) {
              //success
              this.$notification['success']({
                message: '创建成功！',
                duration: 2
              })
              this.$router.push({path: '/student/list'})
            } else if (response.data.state_code == -1) {
              //fail
              this.$notification['error']({
                message: '创建失败！',
                description: response.error
              })
            }
          })
          .catch(error => {
            console.log(error)
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