<template>
  <div>
    <a-card title="学生信息" class="my-card">
      <div class="img">
        <img :src="imgUrl">
      </div>
      <a-row>
        <p>
          学生ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ id }}
        </p>
      </a-row>
      <a-row>
        <p>
          性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ sex }}
        </p>
      </a-row>
      <a-row>
        <p>
          编号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ number }}
        </p>
      </a-row>
      <a-row>
        <p>
          账号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ account }}
        </p>
      </a-row>
      <a-row>
        <p>
          昵称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ nickname }}
        </p>
      </a-row>
      <a-row>
        <p>
          状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ state }}
        </p>
      </a-row>
      <a-row>
        <p>
          班级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ class_number }}
        </p>
      </a-row>
      <a-row>
        <p>
          寝室&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ dormitory }}
        </p>
      </a-row>
      <a-row>
        <p>
          省份&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ province }}
        </p>
      </a-row>
    </a-card>
    <a-row style="margin-top: 20px;">
      <a-col :span=20></a-col>
      <a-col :span=2>
        <a-button type="primary" @click="resetPwd">重置密码</a-button>
      </a-col>
      <a-col :span=2>
        <a-button class="modify" type="primary" @click="resetInfo">修改信息</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: 'StudentDetail',
    data(){
    return {
      imgUrl:require('../../../public/avatar2.jpg')
      }
    },
    props: {
      id: {
        type: String,
        default: '0'
      },
      sex: {
        type: String,
        default: '男'
      },
      number: {
        type: String,
        default: '0'
      },
      account: {
        type: String,
        default: '0'
      },
      nickname: {
        type: String,
        default: '小明'
      },
      state: {
        type: String,
        default: '正常'
      },
      classNumber: {
        type: String,
        default: '2班'
      },
      dormitory: {
        type: String,
        default: '429'
      },
      province: {
        type: String,
        default: '山东'
      }
    },
    methods:{
      resetPwd (account) {
        this.account=account
        console.log('Received Account: ', account)
      },
      resetInfo (account){
        this.account=account
        console.log('Received Account: ', account)
      },
    },
  }
</script>

<style lang="scss" scoped>
.modify {
  float: right;
}

.my-card {
  margin-top: 20px;
}

.img {
  margin-left: 50%;
  img {
    height: 100px;
    width: 100px;
  }
}
</style>