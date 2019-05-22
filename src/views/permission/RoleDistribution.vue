<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item>权限管理</a-breadcrumb-item>
      <a-breadcrumb-item><a href="">角色列表</a></a-breadcrumb-item>
      <a-breadcrumb-item><a href="">admin1</a></a-breadcrumb-item>
      <a-breadcrumb-item>角色分配</a-breadcrumb-item>
    </a-breadcrumb>
    <p style="font-size: 20px;">
      角色分配
    </p>
    <a-card title="角色列表">
      <a-row class="my-row">
        <a-col :span=2>
          <p>ID：</p>
        </a-col>
        <a-col :span=3>
          <a-input placeholder="请输入"></a-input>
        </a-col>
        <a-col :span=1>
        </a-col>
        <a-col :span=2>
          <p>账号：</p>
        </a-col>
        <a-col :span=3>
          <a-input placeholder="请输入"></a-input>
        </a-col>
        <a-col :span=1>
        </a-col>
        <a-col :span=2>
          <p>昵称：</p>
        </a-col>
        <a-col :span=3>
          <a-input placeholder="请输入"></a-input>
        </a-col>
        <a-col :span=1>
        </a-col>
        <a-col :span=2>
          <p>状态：</p>
        </a-col>
        <a-col :span=3>
          <a-input placeholder="请输入"></a-input>
        </a-col>
        <a-col :span=1>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>性别：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </a-col>
        <a-col :span=13>
        </a-col>
        <a-col :span=3>
          <a-button type="primary">查询</a-button>
        </a-col>
        <a-col :span=2>
          <a-button class="right-btn">取消</a-button>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=4>
          <a-button type="primary">+导入成员</a-button>
        </a-col>
        <a-col :span=4>
          <a-button>批量操作</a-button>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-table :columns="columns" :dataSource="data" class="my-table">
          <span slot="action" slot-scope="text">
            <a href="javascript:;">详情{{ text.key }}</a>
            <a-divider type="vertical" />
            <a href="javascript:;">修改</a>
            <a-divider type="vertical" />
            <a href="javascript:;">删除</a>
          </span>
        </a-table>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'RoleDistribution',
    props: {
    },
    data () {
      return {
        columns: [{
          title: '角色ID',
          dataIndex: 'id',
          key: 'id',
          }, {
          title: '编号',
          dataIndex: 'number',
          key: 'number',
          }, {
          title: '账号',
          dataIndex: 'accountId',
          key: 'accountId',
          }, {
          title: '昵称',
          key: 'name',
          dataIndex: 'name',
          }, {
          title: '状态',
          key: 'status',
          dataIndex: 'status',
          }, {
          title: '性别',
          key: 'gender',
          dataIndex: 'gender',
          }, {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          }],
        data: [{
            key: 1,
            id: 1,
            number: 1,
            accountId: 10,
            name: 'John Brown',
            status: 'login',
            gender: '男',
            amounts: 20,
          }, {
            key: 2,
            id: 1,
            number: 1,
            accountId: 10,
            name: 'John Brown',
            status: 'login',
            gender: '男',
            amounts: 20,
          }, {
            key: 3,
            id: 1,
            number: 1,
            accountId: 10,
            name: 'John Brown',
            status: 'login',
            gender: '男',
            amounts: 20,
          }]
        }
    }
  }
</script>

<style lang="scss" scoped>
.right-btn {
  float: right;
}

.my-row {
  margin-top: 10px;
}

.my-table {
  margin-top: 10px;
}
</style>