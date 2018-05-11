<template>
    <div class="CarLoanManagement">
        <el-card class="hongte-query-card" shadow="always">
            <!-- 卡片头部 -->
            <div slot="header" class="card-header">
                  <span><i class="fa fa-search"></i> 搜索条件 </span>
                  <el-button-group>
                      <el-button type="primary" icon="el-icon-search">查询</el-button>
                      <el-button type="primary" icon="el-icon-refresh">重置</el-button>
                      <el-button type="primary" icon="el-icon-download">导出</el-button>
                  </el-button-group>
            </div>

            <!-- 典型查询条件表单 -->
            <el-form :inline="true" :model="formInline" class="hongte-query-form">
                  <el-form-item label="业务编号："><el-input v-model="formInline.businessNumber" placeholder="业务编号"></el-input></el-form-item>
                  <el-form-item label="客户姓名："><el-input v-model="formInline.customerName" placeholder="客户姓名"></el-input></el-form-item>
                  <el-form-item label="车牌号："><el-input v-model="formInline.licensePlateNumber" placeholder="车牌号"></el-input></el-form-item>
                  <el-form-item label="车辆型号："><el-input v-model="formInline.vehicleModel" placeholder="车辆型号"></el-input></el-form-item>

                  <el-form-item label="区域：">
                    <el-select v-model="formInline.region" placeholder="区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="分公司：">
                    <el-select v-model="formInline.branchOffice" placeholder="分公司">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="拖车日期：">
                    <el-date-picker
                         v-model="trailerDate"
                         :picker-options="pickerOptions"
                         type="daterange"
                         align="right"
                         unlink-panels
                         range-separator="至"
                         start-placeholder="开始日期"
                         end-placeholder="结束日期">
                       </el-date-picker>
                  </el-form-item>

                  <el-form-item label="状态：">
                    <el-select v-model="formInline.state" placeholder="状态">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
            </el-form>
        </el-card>

        <el-table :data="myData" class="hongte-table">
           <el-table-column fixed prop="businessId" label="业务编号" width="220"></el-table-column>
           <el-table-column prop="districtName" label="地区" width="120"> </el-table-column>
           <el-table-column prop="companyName" label="分公司" width="120"> </el-table-column>
           <el-table-column prop="customerName" label="客户名称" width="120"> </el-table-column>
           <el-table-column prop="borrowMoney" label="借款金额" width="120"> </el-table-column>
           <el-table-column prop="repaidAmount" label="已还金额" width="120"> </el-table-column>
           <el-table-column prop="licensePlateNumber" label="车牌号" width="120"> </el-table-column>
           <el-table-column prop="model" label="车辆型号" width="120"> </el-table-column>
           <el-table-column prop="evaluationAmount" label="评估价" width="120"> </el-table-column>
           <el-table-column prop="evaluationDate" label="评估日期" width="120"> </el-table-column>
           <el-table-column prop="trailerDate" label="拖车日期" width="120"> </el-table-column>
           <el-table-column prop="status" label="状态" width="120"> </el-table-column>
           <el-table-column fixed="right" label="操作" width="220">
                <template slot-scope="scope">
                    <el-dropdown trigger="click" @command="handleCommand(arguments[0], scope.$index, scope.row)">
                         <el-button
                            size="mini"
                            type="success">详情</el-button>
                         <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">发起拍卖</el-dropdown-item>
                            <el-dropdown-item command="b">转公车申请</el-dropdown-item>
                            <el-dropdown-item command="c">拍卖记录查看</el-dropdown-item>
                            <el-dropdown-item command="d">车辆归还登记</el-dropdown-item>
                            <el-dropdown-item command="e">重新评估</el-dropdown-item>
                            <el-dropdown-item command="f">附件上传及查看</el-dropdown-item>
                            <el-dropdown-item command="g">查看信贷附件</el-dropdown-item>
                            <el-dropdown-item command="h">拍卖延时</el-dropdown-item>
                         </el-dropdown-menu>
                    </el-dropdown> 
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                 </template>
           </el-table-column>
         </el-table>

        <div class="hongte-Pagination">
             <el-pagination
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-size="10"
                   :total="total"
                   layout="total, prev, pager, next, jumper">
             </el-pagination>
        </div>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width='50%'>
          <iframe src="http://www.baidu.com" frameborder="0" class="honte-iframe"></iframe>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
export default {

  name: 'CarLoanManagement',

  data () {
    return {
        dialogFormVisible: false,
        // mock
        myData: [],
        // 当前分页
        currentPage: 1,
        // 分页总数
        total: 0,
        // 拖车日期
        trailerDate: '',
        // where
        formInline: {
            user: '',
            region: '',
            businessNumber: '',
            customerName: '',
            licensePlateNumber: '',
            vehicleModel: '',
            region: '',
            branchOffice: '',
            state: '',
        },
        pickerOptions: {
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
      },
    }
  },
  methods: {
    getData (page) {
        this.$http.get('/alms/core/car/carList', {
            params:{
              "page": page,
              "limit": "10"
            }
        }).then(result => {
            if (result.code == 0) {
              this.myData = result.data
              this.total = result.count
            } else {
              this.$message.error('接口异常：' + result.msg);
            }
        }).catch(err => {
            this.$message.error('接口异常：' + err.message);
        })
    },
    handleCurrentChange (page) {
        this.getData(page)
    },
    handleCommand () {
        console.log(arguments);
        this.dialogFormVisible = true
    }
  },
  beforeMount () {
      this.getData(1)
  }
}
</script>

<style lang="scss">


</style>