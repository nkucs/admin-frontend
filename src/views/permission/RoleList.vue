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
            删除角色
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
            <p> {{ `确认删除选中的 ${selectedRowKeys.length} 个角色？` }}</p>
          </a-modal>
          <a-modal
            title="确认框"
            v-model="visibleDeleteOne"
            okText="删除"
            @ok="roleDeleteOne"
          >
            <p> {{ `确认删除该角色？` }}</p>
          </a-modal>
        </div>
        <a-table rowKey='id_role' :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" :pagination="false">
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="toDetail(record.id_role)">详情</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="toEdit(record.id_role)">修改</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="toDistribute(record.id_role)">分配</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="toDeleteOne(record.id_role)">删除</a>
          </span>
        </a-table>
        <div style="margin-top: 16px">
          <a-pagination style="float:right" :current="page" :total="total" @change="pageChange" />
        </div>
      </div>
    </template>
  </a-card>
</template>

<script>
const columns = [{
  title: '角色ID',
  dataIndex: 'id_role',
}, {
  title: '角色名称',
  dataIndex: 'name',
}, {
  title: '描述',
  dataIndex: 'description',
}, {
  title: '成员人数',
  dataIndex: 'role_number',
}, {
  title: 'Action',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}]

import { role_list, role_delete } from '@/api/permission'
export default {
  data() {
    return {
      data: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      roleId: '',
      roleName: '',
      roleDescription: '',
      page: 1,
      total: 10,
      visibleDelete: false,
      visibleDeleteOne: false,
      deleteId: 0
    }
  },
  mounted: function () {
    this.search()
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    toCreate () {
      this.$router.push({path: '/permission/creation'})
    },
    toDetail (roleId) {
      console.log(roleId)
      this.$router.push({path: '/permission/detail', query: {id_role: roleId}})
    },
    toDistribute (roleId) {
      console.log(roleId)
      this.$router.push({path: '/permission/distribution', query: {id_role: roleId}})
    },
    toEdit (roleId) {
      this.$router.push({path: '/permission/modification', query: {id_role: roleId}})
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    search () {
      var data = {'items_per_page': 10,
              'page': this.page,
              'search_request': {
                'role_id': this.roleId,
                'role_name': this.roleName,
                'role_description': this.roleDescription
                }
              }
      role_list(data)
        .then(response => {
          this.data = response.data.roles
          this.total = response.data.total_pages * 10
        })
        .catch(error => {
          console.error(error)
        })
    },
    cancelSearch () {
      this.roleId = ''
      this.roleName = ''
      this.roleDescription = ''
      this.search()
    },
    pageChange (page) {
      console.log(page)
      this.page = page
      this.search()
    },
    toDelete () {
      this.visibleDelete = true
    },
    roleDelete () {
      var selectedRowKeys = this.selectedRowKeys
      var successnum = 0
      for (let i = 0; i < selectedRowKeys.length; i++) {
        var data = {'id': selectedRowKeys[i]}
        role_delete(data)
          .then(response => {
            if (response.data.state_code == 0) {
              //success
              successnum += 1
              if (i == selectedRowKeys.length-1) {
                this.search()
                if (successnum == selectedRowKeys.length) {
                  this.$notification['success']({
                    message: '删除成功！',
                    description: '成功删除选中的' + successnum + '个角色',
                    duration: 2
                  })
                } else {
                  this.$notification['error']({
                    message: '删除失败！',
                    description: '未删除选中的所有角色'
                  })
                }
              }
            } else if (response.data.state_code == -1) {
              //fail
              if (i == selectedRowKeys.length-1) {
                this.search()
                this.$notification['error']({
                  message: '删除失败！',
                  description: '未删除选中的所有角色'
                })
              }
            }
          })
          .catch(error => {
            console.error(error)
          })
      }
      this.visibleDelete = false
    },
    toDeleteOne (roleId) {
      this.deleteId = roleId
      this.visibleDeleteOne = true
    },
    roleDeleteOne () {
      var data = {'id': this.deleteId}
      role_delete(data)
        .then(response => {
          if (response.data.state_code == 0) {
            //success
            this.search()
            this.$notification['success']({
              message: '删除成功！',
              duration: 2
            })
          } else if (response.data.state_code == -1) {
            //fail
            this.search()
            this.$notification['error']({
              message: '删除失败！',
              description: response.error
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
      this.visibleDeleteOne = false
    }
  },
}
</script>
