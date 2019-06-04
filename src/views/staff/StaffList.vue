<template>
  <a-card title="职工列表">
    <div class='addButton' >
      <a-button type='primary' @click="gotoCreate()"><a-icon type="plus" />新建职工</a-button>
    </div>
    <a-table :columns="columns" :dataSource="datalist" @change="handleTableChange" bordered>
      <span slot="order" slot-scope="text, record, index">{{ (current - 1) * 10 + index + 1 }}</span>
      <span slot="status" slot-scope="text">
        <div v-if="text==='normal'"><a-badge status="success" />正常</div>
        <div v-if="text==='abnormal'"><a-badge status="error" />异常</div>
        <div v-else><a-badge status="default" />{{ text }}</div>
      </span>
      <span slot="action" slot-scope="text, record, index">
        <a href="javascript:;" @click="gotodetails(record)">详情</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="gotomodify(record)">修改</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="deletedata(record, index)">删除</a>
      </span>
    </a-table>
  </a-card>
</template>
<script> 
  import { getstafflist, deletestaff } from '@/api/staff'
  import store from '../../store/stafflist.js'
  const columns = [
    {
      title: '序号',
      key: 'order',
      scopedSlots: { customRender: 'order' }
    },
    {
      title: '编号',
      dataIndex: 'number',
      key: 'number',
    }, 
    {  
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    },  
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    }, 
    {
      title: '状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' },
      filters: [
        {
          text: '正常',
          value: '正常',
        }, {
          text: '异常',
          value: '异常',
        }, {
          text: '关闭',
          value: '关闭',
        }],
      onFilter: (value, record) => record.state.indexOf(value) === 0,
    }, 
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    }, 
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    }
  ]

  export default {
    data() {
      return {
        datalist: [],
        columns,
        current: 1,
      }
    },
    store,
    methods: {

      gotoCreate() {
        this.$router.push({ path: '/staff/creation' })
      },

      getData() {
     
        getstafflist({}).then((response) => {
          var staffList = response.data
          var dataSource = []
          dataSource = staffList
          this.datalist = dataSource
          store.commit('addList', dataSource)
        })
      },

      gotodetails(record) {
        this.$router.push({
          path: '/staff/detail',
          query: {
            id: record.key,
            role: record.role,
            staff: record.number,
          }
        })
      },

      handleTableChange (current) {
        console.log(current)
        this.current = current.current
      },

      gotomodify(record) {
        this.$router.push({
          path: '/staff/modification',
          query: {
            id: record.key,
            role: record.role,
            staff: record.number,
          }
        })
      },

      deletedata(record, index) {
        var currentIndex = (this.current - 1) * 10 + index

        deletestaff({
          id: record.key,
          role: record.role,
          staff: record.number
        }).then((response) => {
          console.log(response)
          if (response.error) {
            this.$message.error('删除职工失败' + response.error)
          } else {
            this.datalist.splice(currentIndex, 1)
            store.commit('addList', this.datalist)
            this.$message.success('删除职工成功')
          }
        }).catch((error) => {
          this.$notification['error']({
              message: '删除职工失败',
              description: '原因：' + error,
            })
        })
        
      }

    },
    mounted() {
      console.log('mounted')
      var dataList = store.state.list
      if (dataList.length > 0) {
        console.log(dataList.length)
        this.datalist = dataList
      } else {
        console.log(dataList.length)
        this.getData()
      }

    }
  }
</script>

<style scoped>
  .addButton {
    margin: 10px 0 30px 0;
  }

</style>