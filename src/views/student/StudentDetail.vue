<template>
  <div>
    <a-card title="学生信息" class="my-card">
      <div class="img">
        <img :src="imgUrl">
      </div>
      <a-row>
        <a-col :span=2>
          <p>学生ID：</p>
        </a-col>
        <a-col :span=3>
          <p>{{ student_number }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span=2>
          <p>性别：</p>
        </a-col>
        <a-col :span=3>
          <p>{{ gender }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span=2>
          <p>账号：</p>
        </a-col>
        <a-col :span=3>
          <p>{{ account }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span=2>
          <p>昵称：</p>
        </a-col>
        <a-col :span=3>
          <p>{{ nick_name }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span=2>
          <p>状态：</p>
        </a-col>
        <a-col :span=3>
          <p>{{ status }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span=2>
          <p>班级：</p>
        </a-col>
        <a-col :span=3>
          <p>{{ class_name }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span=2>
          <p>房间：</p>
        </a-col>
        <a-col :span=3>
          <p>{{ room }}</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span=2>
          <p>省份：</p>
        </a-col>
        <a-col :span=3>
          <p>{{ province }}</p>
        </a-col>
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