<template>
  <div>
    <a-card title="教师列表">
      <a-row class="my-row">
        <a-col :span=2>
          <p class="my-para">ID：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="id_input" placeholder="请输入" v-model="userId"></a-input>
        </a-col>
        <a-col :span=1>
        </a-col>
        <a-col :span=2>
          <p class="my-para">账号：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="account_input" placeholder="请输入" v-model="teacherNumber"></a-input>
        </a-col>
        <a-col :span=1>
        </a-col>
        <a-col :span=2>
          <p class="my-para">昵称：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="name_input" placeholder="请输入" v-model="userName"></a-input>
        </a-col>
        <a-col :span=3>
        </a-col>
        <a-col :span=2>
          <a-button type="primary" @click="makeQuery">查询</a-button>
        </a-col>
        <a-col :span=2>
          <a-button class="right-btn" @click="cancelQuery">取消</a-button>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <span v-if="hasSelected">
          <a-col :span=3>
            <p class="select-item">
              {{ `已选择 ${selectedRowKeys.length} 项` }}
            </p>
          </a-col>
          <a-col :span=3>
            <p class="clear-item" @click="clearSelection">清空</p>
          </a-col>
        </span>
      </a-row>
      <a-row class="my-row">
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" class="my-table" :pagination="false">
        </a-table>
        <div style="margin-top: 16px">
          <a-pagination style="float:right" :current="page" :total="total" :pageSize="pageSize" />
        </div>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { role_add_teacher_list } from '@/api/permission'
  export default {
  name: 'RoleImport',
  data () {
    return {
      selectedRowKeys: [],
      columns: [{
        title: '角色ID',
        dataIndex: 'id',
      }, {
        title: '编号',
        dataIndex: 'number',
      }, {
        title: '账号',
        dataIndex: 'accountId',
      }, {
        title: '昵称',
        dataIndex: 'name',
      }, {
        title: '状态',
        dataIndex: 'status',
      }, {
        title: '性别',
        dataIndex: 'gender',
      }],
      data: [],
      roleId: '',
      page: 1,
      pageSize: 10,
      total: 10,
      userId: 0,
      teacherNumber: '',
      userName: ''
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  mounted () {
    this.roleId = this.$route.query.id_role
    this.makeQuery()
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    cancelQuery () {
      this.$refs.id_input.$data.stateValue = ''
      this.$refs.account_input.$data.stateValue = ''
      this.$refs.name_input.$data.stateValue = ''
    },
    clearSelection () {
      this.selectedRowKeys = []
    },
    makeQuery () {
      const data = {
        'id': this.roleId,
        'page': this.page,
        'page_size': this.pageSize,
        'name': this.userName,
        'user_id': this.userId,
        'teacher_number': this.teacherNumber
      }
      console.log('data', data)
      role_add_teacher_list(data)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.right-btn {
  float: right;
}

.my-para {
  margin-top: 5px;
}

.my-table,
.my-row {
  margin-top: 10px;
}

.clear-item,
.select-item {
  margin-top: 5px;
  margin-bottom: -5px;
}

.clear-item {
  color: blue;
  cursor: pointer;
}
</style>