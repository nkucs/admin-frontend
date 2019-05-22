<template>
  <a-card :bordered="false">
    <template>
      <div style="margin-bottom: 16px">
        角色ID:
        <a-input style="width: 15%; margin-right: 5%;" placeholder="请输入角色ID"/>
        角色名称:
        <a-input style="width: 15%; margin-right: 5%;" placeholder="请输入角色名称"/>
        角色描述:
        <a-input style="width: 15%; margin-right: 5%;" placeholder="请输入角色描述"/>
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
            新建角色
          </a-button>
          <a-button
            @click="start"
            :disabled="!hasSelected"
            :loading="loading"
          >
            删除成员
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
  title: '角色ID',
  dataIndex: 'key',
}, {
  title: '角色名称',
  dataIndex: 'name',
}, {
  title: '描述',
  dataIndex: 'description',
}, {
  title: '成员人数',
  dataIndex: 'number',
}, {
  title: 'Action',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

const data = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: i,
    name: `管理员 ${i}`,
    description: `这是管理员 ${i+1}的介绍`,
    number: 30+i,
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
