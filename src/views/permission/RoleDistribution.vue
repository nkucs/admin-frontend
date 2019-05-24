<template>
  <div>
    <a-card title="角色列表">
      <a-row class="my-row">
        <a-col :span=2>
          <p class="my-para">ID：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="id_input" placeholder="请输入"></a-input>
        </a-col>
        <a-col :span=1>
        </a-col>
        <a-col :span=2>
          <p class="my-para">账号：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="account_input" placeholder="请输入"></a-input>
        </a-col>
        <a-col :span=1>
        </a-col>
        <a-col :span=2>
          <p class="my-para">昵称：</p>
        </a-col>
        <a-col :span=3>
          <a-input ref="name_input" placeholder="请输入"></a-input>
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
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" class="my-table">
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="dataInfo(record)">详情</a>
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
  data () {
    return {
      loading: false,
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
      }, {
        key: 2,
        id: 1,
        number: 1,
        accountId: 10,
        name: 'John Brown',
        status: 'login',
        gender: '男',
      }, {
        key: 3,
        id: 1,
        number: 1,
        accountId: 10,
        name: 'John Brown',
        status: 'login',
        gender: '男',
      }]
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    dataInfo (record) {
      record
    },
    dataModify () {

    },
    dataDelete () {
      
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
    makeQuery () {

    },
    importMember () {
      
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