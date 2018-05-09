<template>
    <div class="CarLoanManagement">
        <el-card class="box-card">
          <!-- 卡片头部 -->
          <div slot="header" class="card-header clearfix">
            <span><i class="fa fa-search"></i> 搜索条件</span>
            <el-button-group>
                <el-button type="primary" icon="el-icon-search">查询</el-button>
                <el-button type="primary" icon="el-icon-refresh">重置</el-button>
                <el-button type="primary" icon="el-icon-download">导出</el-button>
            </el-button-group>
          </div>
          <el-form :inline="true" :model="formInline" class="hongte-form">
            <el-form-item label="业务编号：">
              <el-input v-model="formInline.user" placeholder="业务编号"></el-input>
            </el-form-item>
             <el-form-item label="客户姓名：">
              <el-input v-model="formInline.user" placeholder="客户姓名"></el-input>
            </el-form-item>
             <el-form-item label="车牌号：">
              <el-input v-model="formInline.user" placeholder="车牌号"></el-input>
            </el-form-item>
             <el-form-item label="车辆型号：">
              <el-input v-model="formInline.user" placeholder="车辆型号"></el-input>
            </el-form-item>
            <el-form-item label="区域：">
              <el-select v-model="formInline.region" placeholder="区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分公司：">
              <el-select v-model="formInline.region" placeholder="分公司">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="拖车日期：">
              <el-date-picker
                   v-model="value7"
                   type="daterange"
                   align="right"
                   unlink-panels
                   range-separator="至"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期"
                   :picker-options="pickerOptions2">
                 </el-date-picker>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="formInline.region" placeholder="状态">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
    </div>
</template>

<script>
export default {

  name: 'CarLoanManagement',

  data () {
    return {
        formInline: {
            user: '',
            region: ''
        },
        value7: '',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
      }
    }
  }
}
</script>

<style lang="scss">
.CarLoanManagement {
    /**
     * 美化card头部的样式
     */
    .card-header {
       display: flex;
       justify-content: space-between;
       align-items: center;
    }

        .el-card__header {
            padding: 10px 20px;
        }

        .el-card__body {
            padding-bottom: 10px;
        }

    
    /**
     * 鸿特典型的查询条件表单
     */
    .hongte-form {
        display: flex;
        flex-wrap: wrap;
    }

        .el-form-item {
            display: flex;
            margin-right: 0px;
            padding-right: 30px;
            width: 25%;
        }

            .el-form-item__label {
                flex: 1;
            }

            .el-form-item__content {
                flex: 3;
            }

            .el-select {
                width: 100%;
            }

            .el-date-editor .el-range-separator {
                width: 20px;
            }

            .el-range-editor.el-input__inner {
                width: 100%;
            }
}
</style>