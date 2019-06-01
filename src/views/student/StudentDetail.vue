<template>
  <div>
    <a-card title="学生信息" class="my-card">
      <div class="img">
        <img :src="imgUrl">
      </div>
      <a-row>
        <p>学生ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ student_number }}</p>
      </a-row>
      <a-row v-model="gender">
        <p>性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ gender }}</p>
      </a-row>
      <a-row>
        <p>编号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
      </a-row>
      <a-row>
        <p>账号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ account }}</p>
      </a-row>
      <a-row>
        <p>昵称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ nick_name }}</p>
      </a-row>
      <a-row>
        <p>状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ status }}</p>
      </a-row>
      <a-row>
        <p>班级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ class_name }}</p>
      </a-row>
      <a-row>
        <p>寝室&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ room }}</p>
      </a-row>
      <a-row>
        <p>省份&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ province }}</p>
      </a-row>
    </a-card>
    <a-row style="margin-top: 20px;">
      <a-col :span="20"></a-col>
      <a-col :span="2">
        <a-button type="primary" >重置密码</a-button>
      </a-col>
      <a-col :span="2">
        <a-button class="modify" type="primary" @click="toEdit">修改信息</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import { student_get } from '@/api/student'
import { axios } from '@/utils/request'
export default {
  name: 'StudentDetail',
  props:{},
  data() {
    return {
      imgUrl: require('../../../public/avatar2.jpg'),
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
  mounted (){
    this.student_number = this.$route.query.id
    
    var data = {student_number: this.student_number}
    // student_get(data)
    //   .then(response => {
    //     this.gender = response.data.gender
    //     this.account = response.data.name
    //     this.nick_name = response.data.username
    //     this.class_name = response.data.class_name
    //     this.room = response.data.room
    //     this.province = response .data.province
    //     this.status = response.data.status
    //     })
    //     .catch(error => {
    //       console.error(error)
    //     })
    console.log(data)
    axios({
        url: '/administrator/role/student_get', 
        method: 'get', 
        params: data 
    }).then(response => {
      this.gender = response.data.gender
      this.account = response.data.name
      this.nick_name = response.data.username
      this.class_name = response.data.class_name
      this.room = response.data.room
      this.province = response .data.province
      this.status = response.data.status
      })
      .catch(error => {
        console.error(error)
      })


  }, 
  methods: {
    toEdit(){
      this.$router.push({path: '/student/modification',query: {student_number:this.student_number}})
    }
  }
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