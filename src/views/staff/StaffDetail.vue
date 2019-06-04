<template>
  <div>
    <a-card title="职工详情">
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
          <p>{{ staffInfo.id }}</p>
          <p>{{ staffInfo.number }}</p>
          <p>{{ staffInfo.account }}</p>
          <p>{{ staffInfo.nickname }}</p>
          <p>{{ staffInfo.gender }}</p>
          <p>{{ staffInfo.status }}</p>
          <p>{{ staffInfo.role }}</p>
        </div>
      </div>
    </a-card>
    <div style="float: right; margin-top: 20px">
      <a-button style="margin-right: 20px;" type="primary" @click="showModal">重置密码</a-button>
      <a-modal
      title="Basic Modal"
      v-model="visible"
      @ok="handleOk"
      >
        <p>确定为该职工重置密码吗</p>
      </a-modal>
      <a-button type="primary" @click="gotoModify()">修改信息</a-button>
    </div>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
import { getstaffdetail, resetpwd } from '@/api/staff'
import { error } from 'util';
export default {
  name: 'StaffCreation',
  data() {
    return {
      imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
      staffInfo: {
        id: '',
        number: '',
        account: '',
        nickname: '',
        gender: '',
        status: '',
        role: '',
      },
      visible: false,
    }
  },

  methods: {
    getDetailData() {

      getstaffdetail(this.$route.query).then((response) => {
        console.log(response)
        this.staffInfo = response.data
      }).catch((error) => {
        console.log(error)
      })
    },

    gotoModify() {
      this.$router.push({
        path: '/staff/modification',
        query: {
          id: this.id,
          number: this.number,
          account: this.account,
          nickname: this.nickname,
          gender: this.gender,
          status: this.status,
          role: this.role,
        }
      })
    },

    showModal() {
      this.visible = true
    },
     
    handleOk() {
      this.visible = false
      console.log(this.$route.query)
      resetpwd(this.$route.query).then((response) => {
        console.log(response)
        if (response.error) {
          this.$message.error('重置失败')
        } else {
          this.$message.success('重置成功，密码为0000')
        }
      }).catch((error) => {
        this.$notification['error']({
          message: '删除职工失败',
          description: '原因：' + error,
        })
      })

    },

  },
  mounted() {
    console.log(this.$route.query)
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