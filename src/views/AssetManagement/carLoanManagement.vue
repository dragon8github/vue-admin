<template>
    <div class='hongte-grid carLoanManagement'>
        <el-card class='hongte-query-card' shadow='always'>
            <!-- 卡片头部 -->
            <div slot='header' class='hongte-card-header'>
                  <span><i class='fa fa-search'></i> 搜索条件 </span>
                  <el-button-group>
                      <el-button type='primary' icon='el-icon-search' @click='getData(1)'>查询</el-button>
                      <el-button type='primary' icon='el-icon-refresh' @click='resetWhere'>重置</el-button>
                      <el-button type='primary' icon='el-icon-download'>导出</el-button>
                  </el-button-group>
            </div>
            <!-- 收缩展开的动画 -->
            <el-collapse-transition>  
                  <!-- 典型查询条件表单 -->
                  <el-form v-if="formShow" :inline='true' label-position="right" label-width="120px"  :model='where' class='hongte-query-form'>
                      <el-form-item label='业务编号：'><el-input v-model='where.businessId' placeholder='业务编号'></el-input></el-form-item>
                      <el-form-item label='客户姓名：'><el-input v-model='where.customerName' placeholder='客户姓名'></el-input></el-form-item>
                      <el-form-item label='车牌号：'><el-input v-model='where.licensePlateNumber' placeholder='车牌号'></el-input></el-form-item>
                      <el-form-item label='车辆型号：'><el-input v-model='where.model' placeholder='车辆型号'></el-input></el-form-item>

                      <el-form-item label='区域：'>
                          <el-select v-model='where.areaId' placeholder='区域'>
                              <el-option label='区域一' value='shanghai'></el-option>
                              <el-option label='区域二' value='beijing'></el-option>
                          </el-select>
                      </el-form-item>

                      <el-form-item label='分公司：'>
                          <el-select v-model='where.companyId' placeholder='分公司'>
                              <el-option label='上海' value='shanghai'></el-option>
                              <el-option label='北京' value='beijing'></el-option>
                              <el-option label='深圳' value='shenzhen'></el-option>
                          </el-select>
                      </el-form-item>

                      <el-form-item label='拖车日期：'>
                          <el-date-picker
                              v-model='where.trailerStartDate'
                              :picker-options='pickerOptions'
                              type='daterange'
                              align='right'
                              unlink-panels
                              range-separator='至'
                              start-placeholder='开始日期'
                              end-placeholder='结束日期'>
                          </el-date-picker>
                      </el-form-item>

                      <el-form-item label='状态：'>
                          <el-select v-model='where.status' placeholder='状态'>
                              <el-option label='逾期' value='shanghai'></el-option>
                              <el-option label='已还款' value='beijing'></el-option>
                          </el-select>
                      </el-form-item>
                  </el-form>
            </el-collapse-transition>
            
             <!-- 收缩展开按钮 -->
            <div class="hongte-card-switch" @click="formShow = !formShow">
                <template v-if="formShow">
                    <i  class="fa fa-angle-double-up" ></i>
                    <span >隐藏搜索条件</span>
                </template>
                <template v-else>
                    <i  class="fa fa-angle-double-down" ></i>
                    <span >展开搜索条件</span>
                </template>
            </div>

        </el-card>

        <!-- http://element-cn.eleme.io/#/zh-CN/component/table -->
        <el-table border :data='myData' class='hongte-table' v-loading='loading'>
           <el-table-column fixed prop='businessId' label='业务编号' width='220'></el-table-column>
           <el-table-column prop='districtName' label='地区' width='120'> </el-table-column>
           <el-table-column prop='companyName' label='分公司' width='120'> </el-table-column>
           <el-table-column prop='customerName' label='客户名称' width='150'> </el-table-column>
           <el-table-column prop='borrowMoney' label='借款金额' width='120'> </el-table-column>
           <el-table-column prop='repaidAmount' label='已还金额' width='120'> </el-table-column>
           <el-table-column prop='licensePlateNumber' label='车牌号' width='120'> </el-table-column>
           <el-table-column prop='model' label='车辆型号' width='250'> </el-table-column>
           <el-table-column prop='evaluationAmount' label='评估价' width='120'> </el-table-column>
           <el-table-column prop='evaluationDate' label='评估日期' width='120'> </el-table-column>
           <el-table-column prop='trailerDate' label='拖车日期' width='120'> </el-table-column>
           <el-table-column prop='status' label='状态' width='120'> </el-table-column>
           <el-table-column fixed='right' label='操作' width='220'>
                <template slot-scope='scope'>
                    <el-dropdown trigger='click' @command='handleCommand(arguments[0], scope.$index, scope.row)'>

                         <el-button size='mini'type='success'>详情</el-button>
                         <el-dropdown-menu slot='dropdown'>
                            <el-dropdown-item command='发起拍卖'> 发起拍卖 </el-dropdown-item>
                            <el-dropdown-item command='转公车申请'> 转公车申请 </el-dropdown-item>
                            <el-dropdown-item command='拍卖记录查看'> 拍卖记录查看 </el-dropdown-item>
                            <el-dropdown-item command='车辆归还登记'> 车辆归还登记 </el-dropdown-item>
                            <el-dropdown-item command='重新评估'> 重新评估 </el-dropdown-item>
                            <el-dropdown-item command='附件上传及查看'> 附件上传及查看 </el-dropdown-item>
                            <el-dropdown-item command='查看信贷附件'> 查看信贷附件 </el-dropdown-item>
                            <el-dropdown-item command='拍卖延时'> 拍卖延时 </el-dropdown-item>
                         </el-dropdown-menu>
                    </el-dropdown> 
                    <el-button size='mini' @click='handleEdit(scope.$index, scope.row)'>编辑</el-button>
                    <el-button size='mini' type='danger' @click='handleDelete(scope.$index, scope.row)'>删除</el-button>
                 </template>
           </el-table-column>
         </el-table>

        <div class='hongte-Pagination'>
             <el-pagination
                    background
                   @current-change='handleCurrentChange'
                   :current-page='currentPage'
                   :page-size='10'
                   :total='total'
                   layout='total, prev, pager, next, jumper'>
             </el-pagination>
        </div>

        <el-dialog class="hongte-dialog" :visible.sync='dialogFormVisible' title='发起拍卖' >
            <auctionApplication></auctionApplication>
        </el-dialog>
    </div>
</template>

<script>
import { shortcuts } from '@utils'
import auctionApplication from '@htComponents/carLoanManagement/auctionApplication.vue'
import UploadFile from '@htComponents/UploadFile/UploadFile.vue'

export default {
  name: 'CarLoanManagement',
  data () {
    return {
        //搜索条件是否隐藏
        formShow:true,
        // 数据列表
        myData: [],
        // loading
        loading: true,
        // 当前分页
        currentPage: 1,
        // 分页总数
        total: 0,
        // dialog
        dialogFormVisible: false,
        // 时间选择器
        pickerOptions: {
            shortcuts
        },
        // 查询条件
        where: {
            businessId: '',
            customerName: '',
            licensePlateNumber: '',
            model: '',
            trailerStartDate: '',
            status: '',
        },
    }
  },
  components: {
    auctionApplication,
    UploadFile
  },
  methods: {
      // 重置查询条件
      resetWhere () {
          this.where = {
              businessId: '',
              customerName: '',
              licensePlateNumber: '',
              model: '',
              trailerStartDate: '',
              status: '',
          }
      },
      // 获取数据
      getData (page = 1) {
          this.loading = true
          // axios
          this.$http.get('/alms/core/car/carList', {
              params: Object.assign({}, {
                'page': page,
                'limit': 10
              }, this.where)
          }).then(result => {
              this.loading = false
              if (result.code == 0) {
                this.total = result.count
                this.myData = result.data
              } else {
                this.$message.error(result.msg);
              }
          }).catch(err => {
              this.$message.error(err.message);
          })
      },
      // 翻页
      handleCurrentChange (page) {
          this.getData(page)
      },
      // dropdown
      handleCommand () {
          console.log(arguments);
          this.dialogFormVisible = true
      },
      // 编辑行
      handleEdit () {

      },
      // 删除行
      handleDelete () {

      },
  },
  beforeMount () {
      this.getData(1)
  }
}
</script>

<style lang='scss'>

</style>