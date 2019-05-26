<template>
  <div>
    <a-card title="角色信息" class="my-card">
      <a-row>
        <a-col :span=3>
          <p>
            角色名称：
          </p>
        </a-col>
        <a-col :span=4>
          <a-input placeholder="请输入角色名称" v-model="roleName"/>
        </a-col>
      </a-row>
      <a-row>
        <p>
          角色描述： 
        </p>
      </a-row>
      <a-row>
        <a-textarea placeholder="请输入角色描述..." :rows="4" v-model="roleDescription"/>
      </a-row>
    </a-card>
    <a-card title="权限信息" class="my-card">
      <a-checkbox-group :value="rolePermission" @change="onPermissionChange">
        <a-row type="flex">
          <a-col :span="12">
            <a-checkbox value="1">教师管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="2">学生管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="3">课程系列管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="4">课程管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="5">考试管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="6">考试密码管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="7">消息管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="8">编程题目管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="9">标签管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="10">报告题目管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="11">课程资源管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="12">实验题目管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="13">权限管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="14">角色管理权限</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-card>
    <a-row style="margin-top: 20px;">
      <a-col :span=20></a-col>
      <a-col :span=2>
        <a-button type="primary" @click="submit">确定</a-button>
      </a-col>
      <a-col :span=2>
        <a-button :span=4 class="cancel-btn" @click="cancel">取消</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        roleName: '',
        roleDescription: '',
        rolePermission: [],
      }
    },
    methods: {
      onPermissionChange (rolePermission) {
        console.log(rolePermission)
        this.rolePermission = rolePermission
      },
      cancel () {
        this.$router.push({path: '/permission/list'})
      },
      submit () {
        var permission = []
        for (let i = 0; i < this.rolePermission.length; i++) {
          const element = this.rolePermission[i]
          permission.push(parseInt(element))
        }
        var data = {
          'name': this.roleName,
          'description': this.roleDescription,
          'permission': permission
        }
        console.log(data)
        axios.post('/administrator/role/role_create', data)
          .then(function (response) {
            if (response.data.state_code == 0) {
              //success
            } else if (response.data.state_code == -1) {
              //fail
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
.cancel-btn {
  float: right;
}

.my-card {
  margin-top: 20px;
}
</style>