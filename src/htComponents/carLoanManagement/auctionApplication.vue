<template>
    <div class="auctionApplication">
        <el-card shadow='always' class="hongte-query-card">
            <div slot='header' class='card-header'> <span>一、业务基本信息 </span> </div>
            <el-collapse-transition>  <!-- 收缩展开的动画 -->
                <el-form  v-if="formShow1" :inline='true' label-position="right" label-width="120px"  :model='where' class='hongte-query-form'>
                    <el-form-item label='车架号'><el-input v-model='where.businessId' placeholder='车架号'></el-input></el-form-item>
                    <el-form-item label='客户姓名：'><el-input v-model='where.businessId' placeholder='客户姓名'></el-input></el-form-item>
                    <el-form-item label='借款金额：'><el-input v-model='where.businessId' placeholder='借款金额'></el-input></el-form-item>
                    <el-form-item label='借款期限：'><el-input v-model='where.businessId' placeholder='借款期限'></el-input></el-form-item>
                    <el-form-item label='还款方式：'><el-input v-model='where.businessId' placeholder='还款方式'></el-input></el-form-item>
                    <el-form-item label='费率：'><el-input v-model='where.businessId' placeholder='费率'></el-input></el-form-item>
                    <el-form-item label='拖车时间：'><el-input v-model='where.businessId' placeholder='拖车时间'></el-input></el-form-item>
                    <el-form-item label='业务主办：'><el-input v-model='where.businessId' placeholder='业务主办'></el-input></el-form-item>
                    <el-form-item label='出款人：'><el-input v-model='where.businessId' placeholder='出款人'></el-input></el-form-item>
                    <el-form-item label='出款日期：'><el-input v-model='where.businessId' placeholder='出款日期'></el-input></el-form-item>
                    <el-form-item label='已还本金：'><el-input v-model='where.businessId' placeholder='已还本金'></el-input></el-form-item>
                    <el-form-item label='已还利息：'><el-input v-model='where.businessId' placeholder='已还利息'></el-input></el-form-item>
                    <el-form-item label='剩余本金：'><el-input v-model='where.businessId' placeholder='剩余本金'></el-input></el-form-item>
                    <el-form-item label='利息交至日期：'><el-input v-model='where.businessId' placeholder='利息交至日期'></el-input></el-form-item>
                    <el-form-item label='逾期天数：'><el-input v-model='where.businessId' placeholder='逾期天数'></el-input></el-form-item>
                </el-form>
            </el-collapse-transition>
             <!-- 收缩展开按钮 -->
            <div class="hongte-card-switch" @click="formShow1 = !formShow1">
                <template v-if="formShow1">
                    <i  class="fa fa-angle-double-up" ></i>
                    <span >隐藏表单</span>
                </template>
                <template v-else>
                    <i  class="fa fa-angle-double-down" ></i>
                    <span >展开表单</span>
                </template>
            </div>
        </el-card>

        <el-card shadow='always' class="hongte-query-card">
            <div slot='header' class='card-header'> <span>二、车辆信息 </span> </div>
            <el-collapse-transition>  <!-- 收缩展开的动画 -->
                <el-form  v-if="formShow2" :inline='true' label-position="right" label-width="120px"  :model='where' class='hongte-query-form'>
                    <el-form-item label='发动机号'><el-input v-model='where.businessId' placeholder='发动机号'></el-input></el-form-item>
                    <el-form-item label='排量'><el-input v-model='where.businessId' placeholder='排量'></el-input></el-form-item>
                    <el-form-item label='汽车品牌'><el-input v-model='where.businessId' placeholder='汽车品牌'></el-input></el-form-item>
                    <el-form-item label='车牌号'><el-input v-model='where.businessId' placeholder='车牌号'></el-input></el-form-item>
                    <el-form-item label='品牌型号'><el-input v-model='where.businessId' placeholder='品牌型号'></el-input></el-form-item>
                    <el-form-item label='汽车产地'><el-input v-model='where.businessId' placeholder='汽车产地'></el-input></el-form-item>
                    <el-form-item label='车辆属地'><el-input v-model='where.businessId' placeholder='车辆属地'></el-input></el-form-item>
                    <el-form-item label='颜色'><el-input v-model='where.businessId' placeholder='颜色'></el-input></el-form-item>
                    <el-form-item label='汽车注册日期'><el-input v-model='where.businessId' placeholder='汽车注册日期'></el-input></el-form-item>
                    <el-form-item label='车辆抵押状态'><el-input v-model='where.businessId' placeholder='车辆抵押状态'></el-input></el-form-item>
                    <el-form-item label='抵押时车辆评估价值'><el-input v-model='where.businessId' placeholder='抵押时车辆评估价值'></el-input></el-form-item>
                    <el-form-item label='抵押时车辆评估时间'><el-input v-model='where.businessId' placeholder='抵押时车辆评估时间'></el-input></el-form-item>
                    <el-form-item label='最新车辆评估价值'><el-input v-model='where.businessId' placeholder='最新车辆评估价值'></el-input></el-form-item>
                    <el-form-item label='最新车辆评估时间'><el-input v-model='where.businessId' placeholder='最新车辆评估时间'></el-input></el-form-item>
                    <el-form-item label='违章费用'><el-input v-model='where.businessId' placeholder='违章费用'></el-input></el-form-item>
                    <el-form-item label='年审到期日期'><el-input v-model='where.businessId' placeholder='年审到期日期'></el-input></el-form-item>
                    <el-form-item label='里程表读数'><el-input v-model='where.businessId' placeholder='里程表读数'></el-input></el-form-item>
                    <el-form-item label='燃油量（约余）'><el-input v-model='where.businessId' placeholder='燃油量（约余）'></el-input></el-form-item>
                    <el-form-item label='过户次数'><el-input v-model='where.businessId' placeholder='过户次数'></el-input></el-form-item>
                    <el-form-item label='最后一次过户时间'><el-input v-model='where.businessId' placeholder='最后一次过户时间'></el-input></el-form-item>
                    <el-form-item label='车辆评估价值'><el-input v-model='where.businessId' placeholder='车辆评估价值'></el-input></el-form-item>
                    <el-form-item label='价值差额'><el-input v-model='where.businessId' placeholder='价值差额'></el-input></el-form-item>
                    <el-form-item label='保险到期日'><el-input v-model='where.businessId' placeholder='保险到期日'></el-input></el-form-item>
                    <el-form-item label='车辆使用性质'><el-input v-model='where.businessId' placeholder='车辆使用性质'></el-input></el-form-item>
                    <el-form-item class="is-full" label='随车工具'><el-input v-model='where.businessId' placeholder='随车工具'></el-input></el-form-item>
                    <el-form-item class="is-full" label='提供文件'><el-input v-model='where.businessId' placeholder='提供文件'></el-input></el-form-item>
                    <el-form-item class="is-full" label='违章未处理记录'><el-input v-model='where.businessId' placeholder='违章未处理记录'></el-input></el-form-item>
                    <el-form-item class="is-full" label='交易方式'><el-input v-model='where.businessId' placeholder='交易方式'></el-input></el-form-item>
                    <el-form-item class="is-full" label='车辆位置'><el-input v-model='where.businessId' placeholder='车辆位置'></el-input></el-form-item>
                    <el-form-item class="is-full" label='备注'><el-input type="textarea" v-model='where.businessId' placeholder='备注'></el-input></el-form-item>
                </el-form>
             </el-collapse-transition>
             <!-- 收缩展开按钮 -->
            <div class="hongte-card-switch" @click="formShow2 = !formShow2">
                <template v-if="formShow2">
                    <i  class="fa fa-angle-double-up" ></i>
                    <span >隐藏表单</span>
                </template>
                <template v-else>
                    <i  class="fa fa-angle-double-down" ></i>
                    <span >展开表单</span>
                </template>
            </div>
        </el-card>

        <el-card shadow='always' class="hongte-query-card">
            <!-- 卡片头部 -->
            <div slot='header' class='card-header'> <span>三、拍卖信息 </span> </div>
            <!-- 典型查询条件表单 -->
            <el-collapse-transition>  <!-- 收缩展开的动画 -->
                <el-form  v-if="formShow3" :inline='true' label-position="right" label-width="120px"  :model='where' class='hongte-query-form'>
                    <el-form-item label='起拍价：'><el-input v-model='where.businessId' placeholder='起拍价'></el-input></el-form-item>
                    <el-form-item label='保证金：'><el-input v-model='where.businessId' placeholder='保证金'></el-input></el-form-item>
                    <el-form-item label='加价幅度：'><el-input v-model='where.businessId' placeholder='加价幅度'></el-input></el-form-item>
                    <el-form-item label='保留价：'><el-input v-model='where.businessId' placeholder='保留价'></el-input></el-form-item>
                    <el-form-item label='拍卖开始时间：'><el-input v-model='where.businessId' placeholder='拍卖开始时间'></el-input></el-form-item>
                    <el-form-item label='拍卖截止时间：'><el-input v-model='where.businessId' placeholder='拍卖截止时间'></el-input></el-form-item>
                    <el-form-item label='交易类型：'><el-input v-model='where.businessId' placeholder='交易类型'></el-input></el-form-item>
                    <el-form-item label='优先购权人：'><el-input v-model='where.businessId' placeholder='优先购权人'></el-input></el-form-item>
                    <el-form-item label='取货方式：'><el-input v-model='where.businessId' placeholder='取货方式'></el-input></el-form-item>
                    <el-form-item label='竞买开始时间：'><el-input v-model='where.businessId' placeholder='竞买开始时间'></el-input></el-form-item>
                    <el-form-item label='竞买结束时间：'><el-input v-model='where.businessId' placeholder='竞买结束时间'></el-input></el-form-item>
                    <el-form-item label='支付方式：'><el-input v-model='where.businessId' placeholder='支付方式'></el-input></el-form-item>
                    <el-form-item label='咨询开始时间：'><el-input v-model='where.businessId' placeholder='咨询开始时间'></el-input></el-form-item>
                    <el-form-item label='咨询结束时间：'><el-input v-model='where.businessId' placeholder='咨询结束时间'></el-input></el-form-item>
                    <el-form-item label='咨询人：'><el-input v-model='where.businessId' placeholder='咨询人'></el-input></el-form-item>
                    <el-form-item label='看样开始时间：'><el-input v-model='where.businessId' placeholder='看样开始时间'></el-input></el-form-item>
                    <el-form-item label='看样结束时间：'><el-input v-model='where.businessId' placeholder='看样结束时间'></el-input></el-form-item>
                    <el-form-item label='咨询人联系方式：'><el-input v-model='where.businessId' placeholder='咨询人联系方式'></el-input></el-form-item>

                    <el-form-item label='银行卡号：' class="hongte-multiple-input">
                        <el-input v-model='where.businessId' placeholder='银行卡号'></el-input>
                    </el-form-item>
                    <el-form-item label='' class="hongte-multiple-input">
                        <el-input v-model='where.businessId' placeholder='银行卡号'></el-input>
                    </el-form-item>
                    <el-form-item class="is-full" label='竞价规则'><el-input v-model='where.businessId' placeholder='竞价规则'></el-input></el-form-item>
                    <el-form-item class="is-full" label='处置单位'><el-input v-model='where.businessId' placeholder='处置单位'></el-input></el-form-item>
                    <el-form-item class="is-full" label='联系地点'><el-input v-model='where.businessId' placeholder='联系地点'></el-input></el-form-item>
                    <el-form-item class="is-full" label='看样地点'><el-input v-model='where.businessId' placeholder='看样地点'></el-input></el-form-item>
                    <el-form-item class="is-full" label='备注'><el-input type="textarea" v-model='where.businessId' placeholder='备注'></el-input></el-form-item>
                </el-form>
             </el-collapse-transition>
             <!-- 收缩展开按钮 -->
            <div class="hongte-card-switch" @click="formShow3 = !formShow3">
                <template v-if="formShow3">
                    <i  class="fa fa-angle-double-up" ></i>
                    <span >隐藏表单</span>
                </template>
                <template v-else>
                    <i  class="fa fa-angle-double-down" ></i>
                    <span >展开表单</span>
                </template>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {

  name: 'auctionApplication',

  data () {
    return {
        //表单是否隐藏
        formShow1:true,
        formShow2:true,
        formShow3:true,
        // 查询条件
        where: {
            businessId: '',
        }
    }
  }
}
</script>

<style lang="scss" scoped>

.auctionApplication {
    padding: 15px;
    background-color: #f5f4f4;
    .el-card +.el-card {
        margin-top: 15px;
    }
}

.hongte-multiple-input {
    .el-input + .el-input {
        margin-top: 10px;
    }
}

</style>