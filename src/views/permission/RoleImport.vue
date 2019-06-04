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
          <p class="my-para">教师编号：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="account_input" placeholder="请输入" v-model="teacherNumber"></a-input>
        </a-col>
        <a-col :span=1>
        </a-col>
        <a-col :span=2>
          <p class="my-para">用户名：</p>
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
          <a-col :span=2>
            <a-button type="primary" @click="importUser">导入</a-button>
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
import { role_add_teacher_list, role_teacher_add } from '@/api/permission'
  export default {
  name: 'RoleImport',
  data () {
    return {
      selectedRowKeys: [],
      columns: [{
        title: '用户ID',
        dataIndex: 'id',
      }, {
        title: '教师编号',
        dataIndex: 'teacherNumber',
      }, {
        title: '用户名',
        dataIndex: 'userName'
      }, {
        title: '邮箱',
        dataIndex: 'email',
      }, {
        title: '注册时间',
        dataIndex: 'dateJoined',
      }, {
        title: '状态',
        dataIndex: 'status',
      }, {
        title: '性别',
        dataIndex: 'gender',
      }, {
        title: '上次登录时间',
        dataIndex: 'lastLogin'
      }],
      data: [],
      roleId: '',
      page: 1,
      pageSize: 10,
      total: 10,
      userId: '',
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
      this.userId = ''
      this.teacherNumber = ''
      this.userName = ''
      this.makeQuery()
    },
    clearSelection () {
      this.selectedRowKeys = []
    },
    getData (data) {
      this.data = []
      for (let i = 0; i < data.length; i++) {
        this.data.push({})
        this.data[i]['id'] = data[i].teacher.user.id
        this.data[i]['teacherNumber'] = data[i].teacher['teacher_number']
        this.data[i]['userName'] = data[i].teacher.user.name
        this.data[i]['email'] = data[i].teacher.user.email
        this.data[i]['dateJoined'] = data[i].teacher.user['date_joined'].substr(0, 10)
        this.data[i]['status'] = data[i].teacher.user.user_status.name
        this.data[i]['gender'] = data[i].teacher.user.gender.name
        this.data[i]['lastLogin'] = data[i].teacher.user['last_login'].substr(0, 10)
      }
    },
    makeQuery () {
      const data = {
        'id': this.roleId,
        'page': this.page,
        'page_size': this.pageSize,
        'name': this.userName,
        'user_id': this.userId===''?0:this.userId,
        'teacher_number': this.teacherNumber
      }
      role_add_teacher_list(data)
        .then(response => {
          this.page = response.data.page
          this.total = response.data.total_pages
          this.getData(response.data.contents)
        })
        .catch(error => {
          console.error(error)
        })
    },
    importUser () {
      const data = {
        'distribution': []
      }
      const roleId = Number(this.roleId)
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        data.distribution.push({})
        data.distribution[i]['id_user'] = Number(this.data[this.selectedRowKeys[i]].id)
        data.distribution[i]['id_role'] = roleId
      }
      role_teacher_add(data)
        .then(response => {
          if (response.data['state_code'] === 0) {
            this.$router.push({path: '/permission/distribution', query: {id_role: this.roleId}})
          }
        })
        .catch(error => {
          console.error(error)
          this.$notification['error']({
            message: '导入失败！',
            description: '未导入选中的所有成员'
          })
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