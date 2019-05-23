<template>
  <a-card :bordered="false">
    <template>
      <div style="margin-bottom: 16px">
        ID:
        <a-input style="width: 10%; margin-right: 5%;" placeholder="请输入"/>
        账号:
        <a-input style="width: 10%; margin-right: 5%;" placeholder="请输入"/>
        昵称:
        <a-input style="width: 10%; margin-right: 5%;" placeholder="请输入"/>
        状态:
        <a-dropdown-button style="width: 10%; margin-right: 5%;" >
          请选择
          <a-menu slot="overlay"  >
          <a-menu-item key="1"><a-icon type="user" />正常</a-menu-item>
          <a-menu-item key="2"><a-icon type="user" />关闭</a-menu-item>
          <a-menu-item key="3"><a-icon type="user" />异常</a-menu-item>
          </a-menu>
        </a-dropdown-button>
        
        性别:
        <a-dropdown-button style="width: 10%; margin-right: 5%;" >
          请选择
          <a-menu slot="overlay" >
          <a-menu-item key="1"><a-icon type="user" />男</a-menu-item>
          <a-menu-item key="2"><a-icon type="user" />女</a-menu-item>
          </a-menu>
        </a-dropdown-button>

        <a-button type="primary" style="margin-right: 2%;">查询</a-button>
        <a-button>取消</a-button>
      </div>
    </template>
    <template>
      <div>
        <div style="margin-bottom: 16px">
          <a-button
            style="margin-right: 2%;"
            type="primary"
          >
            新建用户
          </a-button>
          <a-button
            style="margin-right: 2%;"
          >
            批量导入
          </a-button>
          <a-button
            @click="start"
            :disabled="!hasSelected"
            :loading="loading"
          >
            批量操作
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{`已选择 ${selectedRowKeys.length} 项`}}
            </template>
          </span>
        </div>
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data">
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;">详情</a>
            <a-divider type="vertical" />
            <a href="javascript:;">修改</a>
            <a-divider type="vertical" />
            <a href="javascript:;">删除</a>
          </span>
        </a-table>
      </div>
    </template>
  </a-card>
</template>
<script>
const columns = [{
  title: 'ID',
  dataIndex: 'key',
}, {
  title: '编号',
  dataIndex: 'number',
}, {
  title: '账号',
  dataIndex: 'account',
}, {
  title: '状态',
  dataIndex: 'state',
}, {
  title: '性别',
  dataIndex: 'gender',
}, {
  title: 'Action',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

const data = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: i,
    number: `abd`,
    account: 10000+i,
    state: `关闭`,
    gender: '男',
    
  });
}

export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    start () {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    }
  },
}
</script>
