<template>
  <a-card :bordered="false">
    <template>
      <div style="margin-bottom: 16px">
        ID:
        <a-input style="width: 10%; margin-right: 5%;" placeholder="请输入" v-model="studentId"/>
        昵称:
        <a-input style="width: 10%; margin-right: 5%;" placeholder="请输入" v-model="studentNickName"/>
        账号：
        <a-input style="width: 10%; margin-right: 5%;" placeholder="请输入" v-model="studentAccount"/>状态：
        <a-select defaultValue="normal" v-model="studentState">
          <a-select-option value="normal">正常</a-select-option>
          <a-select-option value="abnormal">异常</a-select-option>
          <a-select-option value="closed">关闭</a-select-option>
        </a-select>&nbsp&nbsp
        性别:
        <a-select defaultValue="male" v-model="studentGender">
          <a-select-option value="male">男</a-select-option>
          <a-select-option value="female">女</a-select-option>
        </a-select>&nbsp&nbsp
        <a-button type="primary" style="margin-right: 2%;" @click="inquire">查询</a-button>
        <a-button @click="cancelSearch">取消</a-button>
      </div>
    </template>
    <template>
      <div>
        <div style="margin-bottom: 16px">
          <a-button @click="toCreate" style="margin-right: 2%;" type="primary">新建用户</a-button>
          <a-button style="margin-right: 2%;">批量导入</a-button>
          <a-button @click="toDelete" :disabled="!hasSelected" :loading="loading">批量删除</a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">{{ `已选择 ${selectedRowKeys.length} 项` }}</template>
          </span>
          <a-modal
            title="确认框"
            v-model="visibleDelete"
            okText="删除"
            @ok="studentDelete"
          >
            <p> {{ `确认删除选中的 ${selectedRowKeys.length} 个角色？` }}</p>
          </a-modal>
          <a-modal
            title="确认框"
            v-model="visibleDeleteOne"
            okText="删除"
            @ok="studentDeleteOne"
          >
            <p> {{ `确认删除该角色？` }}</p>
          </a-modal>
        </div>
        <a-table
          rowKey='id'
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :columns="columns"
          :dataSource="data"
          :pagination="false"
        >
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="toDetail(record.id)">详情</a>
            <a-divider type="vertical"/>
            <a href="javascript:;" @click="toEdit(record.id)">修改</a>
            <a-divider type="vertical"/>
            <a href="javascript:;" @click="toDeleteOne(record.id)">删除</a>
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
const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '昵称',
    dataIndex: 'name'
  },
  {
    title: '账号',
    dataIndex: 'account'
  },
  {
    title: '状态',
    dataIndex: 'user_status'
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

{/* const data = []
for (let i = 0; i < 30; i++) {
  data.push({
    ID: i + 1,
    number: `abd`,
    account: 10000 + i,
    state: `关闭`,
    gender: '男'
  })
} */}

import {student_list,student_delete} from '@api/student'

export default {
  data() {
    return {
      data:[],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      studentId:'',
      studentNickName:'',
      studentAccount:'',
      studentState:'',
      studentGender:'',
      page:1,
      total:10,
      visibleDelete: false,
      visibleDeleteOne: false,
      deleteId: 0
    }
  },
  mounted: function(){
    console.log('call inquire')
    this.inquire()
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
    toCreate(){
      this.$router.push({path: '/student/creation'})
    },
    toDetail(studentId){
      this.$router.push({path: '/student/detail',query: {id:studentId}})
    },
    toEdit(studentId){
      this.$router.push({path: '/student/modification',query: {student_number:studentId}})
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    
    inquire(){
      var data = {'items_per_page': 10,
              'page': this.page,
              'search_items': {
                'id':this.studentId,
                'nick_name':this.studentNickName,
                'account':this.studentAccount,
                'state':this.studentState,
                'gender':this.studentGender
                // 'id':"",
                // 'nick_name':"",
                // 'account':"",
                // 'state':"",
                // 'gender':""
                }
              }
      console.log(data)               
      student_list(data)
        .then(response => {
          this.data = response.data.students
          this.total = response.data.total_pages * 10
        })
        .catch(error => {
          console.error(error)
        })     
    },
    cancelSearch(){
      this.studentId = ''
      this.studentNickName = ''
      this.studentAccount = ''
      this.studentGender = ''
      this.studentState = ''
    },
    pageChange (page) {
      console.log(page)
      this.page = page
      this.search()
    },
    toDelete () {
      this.visibleDelete = true
    },
    studentDelete () {
      var selectedRowKeys = this.selectedRowKeys
      var successnum = 0
      for (let i = 0; i < selectedRowKeys.length; i++) {
        var data = {'id': selectedRowKeys[i]}
        student_delete(data)
          .then(response => {
            if (response.data.state_code == 0) {
              //success
              successnum += 1
              if (i == selectedRowKeys.length-1) {
                this.inquire()
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
                this.inquire()
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
    toDeleteOne (studentId) {
      this.deleteId = studentId
      this.visibleDeleteOne = true
    },
    studentDeleteOne(){
      var data = {'id': this.deleteId}
      student_delete(data)
        .then(response => {
          if (response.data.state_code == 0) {
            //success
            this.inquire()
            this.$notification['success']({
              message: '删除成功！',
              duration: 2
            })
          } else if (response.data.state_code == -1) {
            //fail
            this.inquire()
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
  }
}
</script>
