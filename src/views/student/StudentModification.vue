<template>
  <div>
    <a-card title="学生信息修改">
      <div class="user-head">
        <a-avatar :size="64" icon="user" />
      </div>
      <a-row class="my-row">
        <a-col :span=2>
          <p>性别：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择性别" v-model="gender">
            <a-select-option value="male" >男</a-select-option>
            <a-select-option value="female" >女</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>编号：</p>
        </a-col>
        <a-col :span=3>
          <p style="margin: 0">{{ student_number }}</p>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>账号：</p>
        </a-col>
        <a-col :span=3>
          <a-input placeholder="请输入账号" v-model="account"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>昵称：</p>
        </a-col>
        <a-col :span=3>
          <a-input placeholder="请输入昵称" v-model="nick_name"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>状态：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择状态" v-model="user_status">
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
            <a-select-option value="1">一班</a-select-option>
            <a-select-option value="2">二班</a-select-option>
            <a-select-option value="3">三班</a-select-option>
            <a-select-option value="4">四班</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>寝室：</p>
        </a-col>
        <a-col :span=3>
          <a-input placeholder="请输入寝室" v-model="room"></a-input>
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
        <a-button @click="cancel">取消</a-button>
      </a-col>
      <a-col :span=2>
        <a-button type="primary" @click="submit">确认</a-button>
      </a-col>
    </a-row>
  </div>
</template> 

<script>
import { axios } from '@/utils/request'
export default {
  name: 'StudentChange',
  props: {},
  data () {
      return {
        gender:'',
        student_number:'',
        account:'',
        nick_name:'',
        user_status:'',
        class_name:'',
        room:'',
        province:''
      }
  },
  mounted () {
    this.student_number = this.$route.query.student_number
    var data = {student_number: this.student_number}
    axios({
        url: '/administrator/role/student_get', 
        method: 'get', 
        params: data 
    }).then(response => {
        console.log(response.data)
        this.gender = response.data.gender
        this.account = response.data.username
        this.nick_name = response.data.name
        this.class_name = response.data.class_name
        this.room = response.data.room
        this.province = response.data.province
        this.user_status =  response.data.status
      })
      .catch(error => {
        console.error(error)
      })
  },
  methods:{
    cancel(){
      this.$router.push({path: '/student/list'})
    },
    submit(){
      var data = {
          'name': this.nick_name,
          'gender': this.gender,
          'account': this.account,
          'student_number': this.student_number,
          'room': this.room,
          'province': this.province,
          'status': this.user_status,
          'class_name': this.class_name,
        }
      axios.post('/administrator/role/student_update', data)
          .then(response => {
            console.log(response)
            if (response.data.state_code == 0) {
              //success
              this.$notification['success']({
                message: '修改成功！',
                duration: 2
              })
              this.$router.push({path: '/student/list'})
            } else if (response.data.state_code == -1) {
              //fail
              this.$notification['error']({
                message: '修改失败！',
                description: response.error
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-row {
  margin-top: 30px;
}
.user-head {
  text-align: center;
}
</style> 