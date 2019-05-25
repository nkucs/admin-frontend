<template>
  <a-card :bordered="false">
  <template>
        <a-form layout="inline" @submit="handleSubmit">
          <a-form-item
          label="ID"
          >
            <a-input placeholder="请输入" v-decorator="['ID']"/>
          </a-form-item>
          <a-form-item label="编号">
            <a-input placeholder="请输入" v-decorator="['number']"/>
          </a-form-item>
          <a-form-item label="账号">
            <a-input placeholder="请输入" v-decorator="['account']"/>
          </a-form-item>
          <a-form-item label="状态">
            <a-select v-decorator="['state']" placeholder="请选择">
                <a-select-option value="正常">正常</a-select-option>
                <a-select-option value="异常">异常</a-select-option>
                <a-select-option value="关闭">关闭</a-select-option>
                </a-select>
          </a-form-item>
          <a-form-item label="性别">
            <a-select v-decorator="['gender']" placeholder="请选择">
                <a-select-option value="male">男</a-select-option>
                <a-select-option value="female">女</a-select-option>
                </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" style="margin-right: 2%;" @html-type="submit">查询</a-button>
          </a-form-item>
          <a-form-item>
            <a-button>取消</a-button>
          </a-form-item>
        </a-form>
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
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
}
</script>
