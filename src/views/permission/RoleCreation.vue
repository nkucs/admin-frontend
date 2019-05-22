<template>
  <div>
    <a-card title="角色信息" class="my-card">
      <a-row>
        <p>
          角色ID： {{ id }}
        </p>
      </a-row>
      <a-row>
        <a-col :span=3>
          <p>
            角色名称：
          </p>
        </a-col>
        <a-col :span=4>
          <a-input></a-input>
        </a-col>
      </a-row>
      <a-row>
        <p>
          角色描述： 
        </p>
      </a-row>
      <a-row>
        <a-textarea :rows="4">
        </a-textarea>
      </a-row>
    </a-card>
    <a-card title="权限信息" class="my-card">
      <a-checkbox-group>
        <a-row type="flex">
          <a-col :span="12">
            <a-checkbox value="教师管理权限">教师管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="学生管理权限">学生管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="课程系列管理权限">课程系列管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="课程管理权限">课程管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="考试管理权限">考试管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="考试密码管理权限">考试密码管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="消息管理权限">消息管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="编程题目管理权限">编程题目管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="标签管理权限">标签管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="报告题目管理权限">报告题目管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="课程资源管理权限">课程资源管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="实验题目管理权限">实验题目管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="权限管理权限">权限管理权限</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a-checkbox value="角色管理权限">角色管理权限</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-card>
    <a-row style="margin-top: 20px;">
      <a-col :span=20></a-col>
      <a-col :span=2>
        <a-button type="primary">确定</a-button>
      </a-col>
      <a-col :span=2>
        <a-button :span=4 class="cancel-btn">取消</a-button>
      </a-col>
    </a-row>
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
      }
    },
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