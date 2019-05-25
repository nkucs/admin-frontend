<template>
  <a-card>
    <div class='addButton' >
      <a-button type='primary'><a-icon type="plus" />新建职工</a-button>
    </div>
    <a-table :columns="columns" :dataSource="data">
      <!-- <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a> -->
      <span slot="order" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="state" slot-scope="text">
        <div v-if="text==='normal'"><a-badge status="success" />正常</div>
        <div v-if="text==='abnormal'"><a-badge status="error" />异常</div>
        <div v-if="text==='close'"><a-badge status="default" />关闭</div>
      </span>
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;">详情</a>
        <a-divider type="vertical" />
        <a href="javascript:;">修改</a>
        <a-divider type="vertical" />
        <a href="javascript:;">删除</a> 
      </span>
    </a-table>
  </a-card>
</template>
<script>
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
      title: 'Action',
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
        columns,
      }
    }
  }
</script>

<style scoped>
  .addButton {
    margin: 10px 0 30px 0;
  }

</style>