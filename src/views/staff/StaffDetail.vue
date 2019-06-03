<template>
  <div>
    <a-card>
      <h3>职工详情</h3>
      <div class="avatar">
        <a-avatar :size="64" :src="imageUrl" alt="avatar"/>
      </div>
      <div class="info">
        <div class="info-label">
          <p>职工ID</p>
          <p>编号</p>
          <p>账号</p>
          <p>昵称</p>
          <p>性别</p>
          <p>状态</p>
          <p>角色</p>
        </div>
        <div class="info-content">
          <p>{{ id }}</p>
          <p>{{ number }}</p>
          <p>{{ account }}</p>
          <p>{{ nickname }}</p>
          <p>{{ gender }}</p>
          <p>{{ status }}</p>
          <p>{{ role }}</p>
        </div>
      </div>
    </a-card>
    <div style="float: right; margin-top: 20px">
      <a-button style="margin-right: 20px;" type="primary">重置密码</a-button>
      <a-button type="primary">修改信息</a-button>
    </div>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
import store from '../../store/stafflist.js'
import { error } from 'util';
export default {
  name: 'StaffCreation',
  data() {
    return {
      id: 0,
      imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
      number: '123456',
      account: 'nankai123',
      nickname: 'nankai',
      gender: '男性',
      status: '正常',
      role: 'admin1',
    }
  },
  // props: {
  //   // id: {
  //   //   type: String,
  //   //   default: '0'
  //   // },
  //   imageUrl: {
  //     type: String,
  //     default: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
  //   },
  //   number: {
  //     type: Number,
  //     default: 123456
  //   },
  //   account: {
  //     type: String,
  //     default: 'nankai123'
  //   },
  //   nickname: {
  //     type: String,
  //     default: 'nankai'
  //   },
  //   gender: {
  //     type: String,
  //     default: '男性'
  //   },
  //   status: {
  //     type: String,
  //     default: '正常'
  //   },
  //   role: {
  //     type: String,
  //     default: 'admin1'
  //   }
  // },
  // store,
  methods: {
    getDetailData() {
       getstafflist({}).then((response) => {
          console.log(response)
          staff = response.data
          this.id = staff.user.id
          if(staff.admin_number) {
            this.number = staff.admin_number
            this.role = "admin1"
          }   
          else {
            this.number = staff.teacher_number
            this.role = "teacher"
          }
          this.account = staff.user.username
          this.nickname = staff.user.name
          if(staff.user.gender.name == 'male')
            this.sex = "男性"
          if(staff.user.gender.name == 'female')
            this.sex = "女性"
          if(staff.user.user_status.name == 'normal')
            this.state = '正常'
          if(staff.user.user_status.name == 'abnormal')
            this.state = '异常'
          if(staff.user.user_status.name == 'close')
            this.state = '关闭'
        }).catch((error) => {
          console.log(error)
        })
    }

  },
  mounted() {
    //console.log(this.$route.query)
    //console.log(store.state.list)
    this.getDetailData()
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.info {
  display: flex;
  flex-wrap: nowrap;
}

.info-content {
  margin-left: 40px;
}
</style>