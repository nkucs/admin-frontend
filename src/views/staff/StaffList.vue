<template>
  <a-card title="职工列表">
    <div class='addButton' >
      <a-button type='primary' @click="gotoCreate()"><a-icon type="plus" />新建职工</a-button>
    </div>
    <a-table :columns="columns" :dataSource="datalist">
      <span slot="order" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="state" slot-scope="text">
        <div v-if="text==='normal'"><a-badge status="success" />正常</div>
        <div v-if="text==='abnormal'"><a-badge status="error" />异常</div>
        <div v-if="text==='close'"><a-badge status="default" />关闭</div>
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
      dataIndex: 'id',
      key: 'id',
    }, 
    {  
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    },  
    {
      title: '昵称',
      dataIndex: 'username',
      key: 'username',
    }, 
    {
      title: '状态',
      dataIndex: 'state',
      scopedSlots: { customRender: 'state' },
      filters: [
        {
          text: '正常',
          value: 'normal',
        }, {
          text: '异常',
          value: 'abnormal',
        }, {
          text: '关闭',
          value: 'close',
        }],
      onFilter: (value, record) => record.state.indexOf(value) === 0,
    }, 
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
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

  const data = [
    {
      key: '1',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'close',
      sex: '女性',
      role: 'admin1',
    },
    {
      key: '2',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'normal',
      sex: '女性',
      role: 'admin1',
    },
    {
      key: '3',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'abnormal',
      sex: '女性',
      role: 'admin1',
    },
    {
      key: '4',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'normal',
      sex: '女性',
      role: 'admin1',
    },
    {
      key: '5',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'normal',
      sex: '女性',
      role: 'admin1',
    },
    {
      key: '6',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'close',
      sex: '女性',
      role: 'admin1',
    },
    {
      key: '7',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'normal',
      sex: '女性',
      role: 'admin1',
    },
    {
      key: '8',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'abnormal',
      sex: '女性',
      role: 'admin1',
    },
    {
      key: '9',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'normal',
      sex: '女性',
      role: 'admin1',
    },
    {
      key: '10',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'normal',
      sex: '女性',
      role: 'admin1',
    },{
      key: '11',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'close',
      sex: '女性',
      role: 'admin1',
    },
    {
      key: '12',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'normal',
      sex: '女性',
      role: 'admin1',
    },
    {
      key: '13',
      id: '1111',
      account: 'admin_demo',
      username: 'admin',
      state: 'abnormal',
      sex: '女性',
      role: 'admin1',
    }
  ]

  export default {
    data() {
      return {
        data,
        datalist: [],
        columns,
      }
    },
    store,
    methods: {

      gotoCreate() {
        this.$router.push({ path: '/staff/create' })
      },

      getData() {
     
        getstafflist({}).then((response) => {
          console.log(response)
          var staffList = response.data
          var dataSource = []
          var node = {}
          for(var i = 0; i < staffList.length; i++){
            node['user_id'] = staffList[i].user.id
            node['key'] = staffList[i].user.id
            if(staffList[i].admin_number) {
              node['id'] = staffList[i].admin_number
              node['role'] = 'admin1'
            }   
            else {
              node['id'] = staffList[i].teacher_number
              node['role'] = 'teacher'
            }
            node['account'] = staffList[i].user.username
            node['username'] = staffList[i].user.username
            if(staffList[i].user.gender.name == 'male')
              node['sex'] = '男性'
            if(staffList[i].user.gender.name == 'female')
              node['sex'] = '女性'
            node['state'] = staffList[i].user.user_status.name
            // console.log(node)
            dataSource.push(node)
            node = {}
            dataSource.sort(function(a,b){
              if(a['id'] < b['id']){
                  return -1
              }
              if(a['id'] > b['id']){
                return 1
              }
              return 0
            })
          }
          console.log(dataSource)
          this.datalist = dataSource
          store.commit('addList', dataSource)
          console.log('store.state.list')
          console.log(store.state.list)
        })
      },

      gotodetails(record) {
        this.$router.push({
          path: '/staff/detail',
          query: {
            id: record.key,
            role: record.role,
            staff: record.id,
          }
        })
      },

      gotomodify(record) {
        this.$router.push({
          path: '/staff/modification',
          query: {
            id: record.key,
            role: record.role,
            staff: record.id,
          }
        })
      },

      deletedata(record, index) {

        deletestaff({
          id: record.key,
          role: record.role,
          staff: record.id
        }).then((response) => {
          console.log(response)
          if (response.error) {
            this.$notification['error']({
              message: '删除职工失败',
              description: response.error,
            })
          } else {
            this.datalist.splice(index, 1)
            store.commit('addList', this.datalist)
          }
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