<template>
  <div>
    <a-card title="角色信息">
      <a-row>
        <p>
          角色ID： {{ roleId }}
        </p>
      </a-row>
      <a-row>
        <p>
          角色名称： {{ roleName }}
        </p>
      </a-row>
      <a-row>
        <p>
          角色描述： {{ roleDescription }}
        </p>
      </a-row>
    </a-card>
    <a-card title="权限信息">
      <a-checkbox-group :value="options">
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
  </div>
</template>

<script>
import { role_detail } from '@/api/permission'
  export default {
    data() {
      return {
        roleId: '',
        roleName: '',
        roleDescription: '',
        options: [],
      }
    },
    mounted () {
      this.roleId = this.$route.query.id_role
      var data = {id_role: this.roleId}
      role_detail(data)
        .then(response => {
          this.roleName = response.data.name
          this.roleDescription = response.data.description
          var permission = response.data.permission
          var options = []
          for (let i = 0; i < permission.length; i++) {
            const element = permission[i]
            options.push(element.toString())
          }
          this.options = options
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
</script>

<style lang="scss" scoped>

</style>