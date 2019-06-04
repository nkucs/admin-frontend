<template>
  <div>
    <a-card>
      <h3>职工修改</h3>
      <div class="avatar">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action="//jsonplaceholder.typicode.com/posts/"
          :beforeUpload="beforeUpload"
          @change="handleAvatarChange"
        >
          <a-avatar v-if="staffInfo.imageUrl" :size="64" :src="staffInfo.imageUrl" alt="avatar"/>
          <a-avatar v-else :size="64" :icon="loading ? 'loading' : 'user'"/>
        </a-upload>
      </div>
      <a-form>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="编号">
          <a-input id="number" type="string" placeholder="请输入编号" v-model="staffInfo.number"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="账号">
          <a-input id="account" type="string" placeholder="请输入账号" v-model="staffInfo.account"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="昵称">
          <a-input id="nickname" type="string" placeholder="请输入昵称" v-model="staffInfo.nickname"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="性别">
          <a-select v-model="staffInfo.gender">
            <a-select-option value="男性">男性</a-select-option>
            <a-select-option value="女性">女性</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="状态">
          <a-select v-model="staffInfo.status">
            <a-select-option value="正常">正常</a-select-option>
            <a-select-option value="异常">异常</a-select-option>
            <a-select-option value="关闭">关闭</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="角色">
          <a-select class="test" style="width: 100%" v-model="staffInfo.role">
            <a-select-option value="admin1">admin1</a-select-option>
            <a-select-option value="admin2">admin2</a-select-option>
            <a-select-option value="teacher1">teacher1</a-select-option>
          </a-select>
        </a-form-item> -->
      </a-form>
    </a-card>
    <div style="float: right; margin-top: 20px">
      <a-button style="margin-right: 20px;" type="primary" @click="confirm">确定</a-button>
      <a-button @click="cancel">取消</a-button>
    </div>
  </div>
</template>

<script>
import { axios } from '@/utils/request'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'StaffUpdate',
  props: {},
  data() {
    return {
      loading: false,
      staffInfo: {
        imageUrl: '',
        staffid: this.id,
        number: '',
        account: '',
        nickname: '',
        gender: '',
        status: ''
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }
  },
  mounted () {
    this.teacher_number = this.$route.query.staff
    var data = {teacher_number: this.teacher_number}
    axios({
        url: '/administrator/staff/staff_get', 
        method: 'get', 
        params: data 
    }).then(response => {
        console.log(response)       
        this.staffInfo.number=response.data.teacher_number
        this.staffInfo.nickname=response.data.name
        this.staffInfo.gender=response.data.gender
        this.staffInfo.status=response.data.status
        this.staffInfo.account=response.data.username
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {    
    handleAvatarChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl => {
          this.staffInfo.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    confirm() {
       var data = {
        'teacher_number': this.staffInfo.number,
        'name': this.staffInfo.nickname,
        'gender': this.staffInfo.gender,
        'role': this.staffInfo.role,
        'status': this.staffInfo.status,
        'account': this.staffInfo.account
      }
      axios.post('/administrator/staff/staff_update', data)
        .then(response => {
          console.log(response)
          if (response.data.state_code == 0) {
            this.$notification['success']({
              message: '创建成功！',
              duration: 2
            })
            this.$router.push({path: '/staff/list'})
          } else if (response.data.state_code == -1) {
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
    cancel() {
      this.$router.push({path: '/staff/list'})
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
