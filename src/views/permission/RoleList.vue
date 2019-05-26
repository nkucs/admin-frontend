<template>
  <a-card :bordered="false">
    <template>
      <div style="margin-bottom: 16px">
        角色ID:
        <a-input style="width: 15%; margin-right: 5%;" placeholder="请输入角色ID" v-model="roleId"/>
        角色名称:
        <a-input style="width: 15%; margin-right: 5%;" placeholder="请输入角色名称" v-model="roleName"/>
        角色描述:
        <a-input style="width: 15%; margin-right: 5%;" placeholder="请输入角色描述" v-model="roleDescription"/>
        <a-button type="primary" style="margin-right: 2%;" @click="search">查询</a-button>
        <a-button @click="cancelSearch">取消</a-button>
      </div>
    </template>
    <template>
      <div>
        <div style="margin-bottom: 16px">
          <a-button
            @click="toCreate"
            style="margin-right: 2%;"
            type="primary"
          >
            新建角色
          </a-button>
          <a-button
            @click="toDelete"
            :disabled="!hasSelected"
            :loading="loading"
          >
            删除成员
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{ `已选择 ${selectedRowKeys.length} 项` }}
            </template>
          </span>
          <a-modal
            title="确认框"
            v-model="visibleDelete"
            okText="删除"
            @ok="roleDelete"
          >
            <p> {{ `确认删除该 ${selectedRowKeys.length} 项？` }}</p>
          </a-modal>
        </div>
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" :pagination="false">
          <span slot="action">
            <a href="javascript:;">详情</a>
            <a-divider type="vertical" />
            <a href="javascript:;">修改</a>
            <a-divider type="vertical" />
            <a href="javascript:;">删除</a>
          </span>
        </a-table>
        <div style="margin-top: 16px">
          <a-pagination style="float:right" v-model="page" :total="total" :change="pageChange" />
        </div>
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
}]

const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `管理员 ${i}`,
    description: `这是管理员 ${i+1}的介绍`,
    number: 30+i,
  })
}

export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      roleId: '',
      roleName: '',
      roleDescription: '',
      page: 1,
      total: 10,
      visibleDelete: false,
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    toCreate () {
      this.$router.push({path: '/permission/create'})
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    search () {
      console.log('ID: ', this.roleId)
      console.log('Name: ', this.roleName)
      console.log('Description: ', this.roleDescription)
    },
    cancelSearch () {
      this.roleId = ''
      this.roleName = ''
      this.roleDescription = ''
      this.search()
    },
    pageChange (page) {
      this.page = page
      this.search()
    },
    toDelete () {
      this.visibleDelete = true
    },
    roleDelete () {
      this.visibleDelete = false
    }
  },
}
</script>
