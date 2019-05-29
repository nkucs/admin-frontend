<template>
  <div>
    <a-card title="学生信息修改">
      <div class="user-head">
        <a-avatar :size="64" icon="user" />
      </div>
      <a-row class="my-row">
        <a-col :span=2>
          <p>学生ID：</p>
        </a-col>
        <a-col :span=3>
          <p style="margin: 0">{{ 1 }}</p>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>性别：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择性别">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>编号：</p>
        </a-col>
        <a-col :span=3>
          <a-input placeholder="请输入编号"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>账号：</p>
        </a-col>
        <a-col :span=3>
          <a-input placeholder="请输入账号"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>昵称：</p>
        </a-col>
        <a-col :span=3>
          <a-input placeholder="请输入昵称"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>状态：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择状态">
            <a-select-option value="正常">正常</a-select-option>
            <a-select-option value="异常">异常</a-select-option>
            <a-select-option value="关闭">关闭</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>班级：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择班级">
            <a-select-option value="一班">一班</a-select-option>
            <a-select-option value="二班">二班</a-select-option>
            <a-select-option value="三班">三班</a-select-option>
            <a-select-option value="四班">四班</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>寝室：</p>
        </a-col>
        <a-col :span=3>
          <a-input placeholder="请输入寝室"></a-input>
        </a-col>
      </a-row>
      <a-row class="my-row">
        <a-col :span=2>
          <p>省份：</p>
        </a-col>
        <a-col :span=3>
          <a-select style="width: 100%;" placeholder="请选择省份">
            <a-select-option value="山东">山东</a-select-option>
            <a-select-option value="天津">天津</a-select-option>
            <a-select-option value="河北">河北</a-select-option>
            <a-select-option value="贵州">贵州</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </a-card>

    <a-row class="my-row">
      <a-col :span=20>
      </a-col>
      <a-col :span=2>
        <a-button>取消</a-button>
      </a-col>
      <a-col :span=2>
        <a-button type="primary">确认</a-button>
      </a-col>
    </a-row>
  </div>
</template> 

<script>
export default {
  name: 'StudentChange',
  props: {},
}
</script>

<style lang="scss" scoped>
.my-row {
  margin-top: 30px;
}
.user-head {
  text-align: center;
}
</style> 