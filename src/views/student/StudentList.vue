<template>
  <a-card :bordered="false">
    <template>
      <div style="margin-bottom: 16px">
        ID:
        <a-input style="width: 10%; margin-right: 5%;" placeholder="请输入"/>编号:
        <a-input style="width: 10%; margin-right: 5%;" placeholder="请输入"/>账号：
        <a-input style="width: 10%; margin-right: 5%;" placeholder="请输入"/>状态：
        <a-select defaultValue="normal">
          <a-select-option value="normal">正常</a-select-option>
          <a-select-option value="abnormal">异常</a-select-option>
          <a-select-option value="closed">关闭</a-select-option>
        </a-select>&nbsp&nbsp
        性别:
        <a-select defaultValue="male">
          <a-select-option value="male">男</a-select-option>
          <a-select-option value="female">女</a-select-option>
        </a-select>&nbsp&nbsp
        <a-button type="primary" style="margin-right: 2%;" @click="inquire">查询</a-button>
        <a-button>取消</a-button>
      </div>
    </template>
    <template>
      <div>
        <div style="margin-bottom: 16px">
          <a-button style="margin-right: 2%;" type="primary">新建用户</a-button>
          <a-button style="margin-right: 2%;">批量导入</a-button>
          <a-button @click="start" :disabled="!hasSelected" :loading="loading">批量操作</a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">{{ `已选择 ${selectedRowKeys.length} 项` }}</template>
          </span>
        </div>
        <a-table
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columns"
          :dataSource="data"
        >
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;">详情</a>
            <a-divider type="vertical"/>
            <a href="javascript:;">修改</a>
            <a-divider type="vertical"/>
            <a href="javascript:;">删除</a>
          </span>
        </a-table>
      </div>
    </template>
  </a-card>
</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'ID'
  },
  {
    title: '编号',
    dataIndex: 'number'
  },
  {
    title: '账号',
    dataIndex: 'account'
  },
  {
    title: '状态',
    dataIndex: 'state'
  },
  {
    title: '性别',
    dataIndex: 'gender'
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
for (let i = 0; i < 30; i++) {
  data.push({
    ID: i + 1,
    number: `abd`,
    account: 10000 + i,
    state: `关闭`,
    gender: '男'
  })
}

export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    start() {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    inquire(ID, number, account, state, gender) {
      this.ID = ID
      this.account = account
      this.number = number
      this.state = state
      this.gender = gender
      console.log('Received ID: ', ID)
      console.log('Received Account: ', account)
      console.log('Received Number: ', number)
      console.log('Received State: ', state)
      console.log('Received Gender: ', gender)
    }
  }
}
</script>
