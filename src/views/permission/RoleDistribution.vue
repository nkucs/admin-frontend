<template>
  <div>
    <a-card title="角色列表">
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
        <a-col :span=1>
        </a-col>
        <a-col :span=2>
          <p class="my-para">状态：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="status_input" placeholder="请输入"></a-input>
        </a-col>
        <a-col :span=1>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p class="my-para">性别：</p>
        </a-col>
        <a-col :span=3>
          <a-select ref="gender_select" style="width: 100%;">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </a-col>
        <a-col :span=13>
        </a-col>
        <a-col :span=3>
          <a-button type="primary" @click="makeQuery">查询</a-button>
        </a-col>
        <a-col :span=2>
          <a-button class="right-btn" @click="cancelQuery">取消</a-button>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=3>
          <a-button type="primary" @click="importMember">+导入成员</a-button>
        </a-col>
        <a-col :span=3>
          <a-button
            @click="batchDelete"
            :disabled="!hasSelected"
            :loading="loading">
            批量删除
          </a-button>
        </a-col>
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
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="toDetail(record.id)">详情</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="toEdit(record.id)">修改</a>
            <a-divider type="vertical" />
            <a href="javascript:;">删除</a>
          </span>
        </a-table>
        <div style="margin-top: 16px">
          <a-pagination style="float:right" :current="page" :total="total" :pageSize="pageSize" />
        </div>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { role_teacher_list } from '@/api/permission'
export default {
  name: 'RoleDistribution',
  data () {
    return {
      loading: false,
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
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
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
    toDetail (staffId) {
      // 参数为用户id， 非教师表内id
      this.$router.push({path: '/staff/detail', query: {id_staff: staffId}})
    },
    toEdit (staffId) {
      this.$router.push({path: '/staff/modification', query: {id_staff: staffId}})
    },
    batchDelete () {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    cancelQuery () {
      this.$refs.id_input.$data.stateValue = ''
      this.$refs.account_input.$data.stateValue = ''
      this.$refs.name_input.$data.stateValue = ''
      this.$refs.status_input.$data.stateValue = ''
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
      role_teacher_list(data)
        .then(response => {
          console.log(response.data)
          this.page = response.data.page
          this.total = response.data.total_pages
          this.getData(response.data.contents)
        })
        .catch(error => {
          console.error(error)
        })
    },
    importMember () {
      console.log(this.roleId)
      this.$router.push({path: '/permission/import', query: {id_role: this.roleId}})
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