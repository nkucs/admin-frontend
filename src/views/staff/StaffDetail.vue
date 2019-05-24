<template>
  <div>
    <a-card>
      <h3>
        职工详情
      </h3>
      <div class="avatar">
        <a-avatar :size="64" :src="imageUrl" alt="avatar" />
      </div>
      <div class='info'>
        <div class='info-label'>
          <p>职工ID</p>     
          <p>编号</p>       
          <p>账号</p>        
          <p>昵称</p>        
          <p>性别</p>       
          <p>状态</p>      
          <p>角色</p>
        </div>
        <div class='info-content'>
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
  function getBase64 (img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  export default {
    name: 'StaffCreation',
    props: {
      id: {
        type: String,
        default: '0'
      },
      imageUrl: {
        type: String,
        default: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      },
      number: {
        type: Number,
        default: 123456
      },
      account: {
        type: String,
        default: 'nankai123'
      },
      nickname: {
        type: String,
        default: 'nankai'
      },
      gender: {
        type: String,
        default: '男性'
      },
      status: {
        type: String,
        default: '正常'
      },
      role: {
        type: String,
        default: 'admin1'
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

.info {
  display: flex;
  flex-wrap: nowrap;
}

.info-content {
  margin-left: 40px;
}
</style>