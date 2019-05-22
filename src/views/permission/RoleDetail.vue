<template>
  <div>
    <a-card title="角色信息">
      <a-row>
        <p>
          角色ID： {{ id }}
        </p>
      </a-row>
      <a-row>
        <p>
          角色名称： {{ roleName }}
        </p>
      </a-row>
      <a-row>
        <p>
          角色描述： {{ description }}
        </p>
      </a-row>
    </a-card>
    <a-card title="权限信息">
      
       <a-row type="flex">
          <a-col :span="12">
            <a-icon type="check-square" theme="twoTone"/> 教师管理权限
          </a-col>
          <a-col :span="12">
            <a-icon type="close-square"/> 学生管理权限
          </a-col>
          <a-col :span="12">
            <a-icon type="check-square" theme="twoTone"/> 课程系列管理权限
          </a-col>
          <a-col :span="12">
            <a-icon type="check-square" theme="twoTone"/> 课程管理权限
          </a-col>
          <a-col :span="12">
            <a-icon type="close-square"/> 考试管理权限
          </a-col>
          <a-col :span="12">
            <a-icon type="close-square"/> 考试密码管理权限
          </a-col>
          <a-col :span="12">
            <a-icon type="check-square" theme="twoTone"/> 消息管理权限
          </a-col>
          <a-col :span="12">
            <a-icon type="close-square"/> 编程题目管理权限
          </a-col>
          <a-col :span="12">
            <a-icon type="check-square" theme="twoTone"/> 标签管理权限
          </a-col>
          <a-col :span="12">
            <a-icon type="check-square" theme="twoTone"/> 报告题目管理权限
          </a-col>
          <a-col :span="12">
           <a-icon type="check-square" theme="twoTone"/> 课程资源管理权限
          </a-col>
          <a-col :span="12">
            <a-icon type="close-square"/> 实验题目管理权限
          </a-col>
          <a-col :span="12">
            <a-icon type="check-square" theme="twoTone"/> 权限管理权限
          </a-col>
          <a-col :span="12">
            <a-icon type="check-square" theme="twoTone"/> 角色管理权限
          </a-col>
        </a-row>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'RoleModify',
    props: {
      id: {
        type: String,
        default: '0'
      },
      roleName: {
        type: String,
        default: 'admin'
      },
      description: {
        type: String,
        default: 'Description'
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>