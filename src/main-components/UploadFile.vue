<template>
  <div class="ht-upload">
      <el-container>
          <!-- 左侧菜单栏 -->
          <el-aside>
              <el-button class="change-status-btn" type="primary" icon="fa fa-sitemap" @click="openAlltree"> 文档类型</el-button>
              <el-tree :data="data"
                       :props="defaultProps"
                       :render-content="renderContent"
                       :setChecked="true"
                       @node-click="handleNodeClick"
                       ref="tree"
                       node-key="value"
                       default-expand-all
                       icon="fa fa-file">
              </el-tree>
          </el-aside>

          <!-- 右侧主内容区域 -->
          <el-container>
              <el-main>
                  <!-- 头部 -->
                  <div class="upload-btn">
                      <el-button-group class="left">
                          <el-button type="primary" @click="active=1" icon="fa fa-upload"> 上传文件</el-button>
                          <el-button type="primary" @click="active=2"icon="fa fa-eye"> 查看所有附件</el-button>
                      </el-button-group>
                      <span class="right">
                          <!-- 全选 -->
                          <el-checkbox v-model="checkAll"
                                       :indeterminate="isIndeterminate" 
                                       @change="handleCheckAllChange" 
                                       style="padding-right:20px">全选
                          </el-checkbox>
                          <!-- 删除 -->
                          <el-button type="danger" icon="el-icon-delete" @click="deleteCheckedUploads">删除</el-button>
                      </span>
                  </div>
                  
                  <!-- 图片列表：带上传按钮 -->
                  <template v-if="active == 1">
                      <div class="upload-title">{{curNode}}</div>
                      <!-- 上传按钮 -->
                      <el-upload ref="upload"
                                 class="avatar-uploader"
                                 action="http://172.16.200.112:30111/alms/core/doc/upload"
                                 accept="jpg,png,jpeg,gif,xls,xlsx,xlsm,doc,docx,ppt,pptx,zip,rar,7z,cab,pdf"
                                 :on-change="handleChange"
                                 :show-file-list="false"
                                 :auto-upload="true"
                                 :on-preview="handlePreview"
                                 :before-upload="beforeAvatarUpload"
                                 :on-success="handleAvatarSuccess">
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <transition-group name="slide-fade">
                          <span class="ht-preview-box"
                                @click.stop="previewDetial(item)"
                                v-for="(item,index) in fileList"
                                :key="index">
                                    <img class="ht-preview-img" :src="item.imgUrl" />
                                    <span class="mouseover">
                                        <el-checkbox class="checkbox"
                                                     :key="item.uid"
                                                     :label="item"
                                                     v-model="checkedUploads"
                                                     @change="handleCheckedChange(checkedUploads)">{{''}}
                                        </el-checkbox>
                                        <span>
                                            <i class="el-icon-zoom-in" @click.stop="viewImg(item)"></i>
                                            <i class="el-icon-delete"  @click.stop="handleRemove(item)"></i>
                                        </span>
                                    </span>
                                    <p class="title">{{item.title}}</p>
                          </span>
                      </transition-group>
                  </template>

                  <!-- 图片列表：纯图片展示 -->
                  <template v-if="active == 2">
                      <transition-group name="slide-fade">
                          <template>
                              <span class="ht-preview-box"
                                    v-for="(item,index) in fileListAll"
                                    @click.stop="previewDetial(item)"
                                    :key="index">
                                        <img class="ht-preview-img" :src="item.imgUrl" />
                                        <el-checkbox class="checkbox"
                                                     :key="item.uid"
                                                     :label="item"
                                                     v-model="checkedUploads"
                                                     @change="handleCheckedChange(checkedUploads)">{{''}}
                                        </el-checkbox>
                                        <span class="mouseover">
                                            <span>
                                                <i class="el-icon-zoom-in" @click.stop="viewImg(item)"></i> 
                                                <i class="el-icon-delete"  @click.stop="handleRemove(item)"></i>
                                            </span>
                                        </span>
                                        <p class="title">{{item.title}}</p>
                              </span>
                          </template>
                      </transition-group>
                  </template>

                  <!-- 查看大图 -->
                  <el-dialog :visible.sync="dialogVisible">
                      <img width="100%":src="dialogImageUrl" /> 
                  </el-dialog>
              </el-main>
          </el-container>
      </el-container>
  </div>
</template>
<script>
const jsonData = [{text: '签署文书', value: '1', sons: [{value: '11', text: '最高额借款抵押合同', files: [{url: 'http://10.110.1.79/file/1.png', title: '1', ext: 'png', docID: '5515', isSending: true }, {url: 'http://pic13.nipic.com/20110322/6922092_142423354124_2.jpg', title: '1', ext: 'png', docID: '555', isSending: true } ], sons: [{value: '111', text: '新增1', files: [{url: 'http://himg2.huanqiu.com/attachment2010/2012/1023/20121023034413313.jpg', title: '1', ext: 'jpg', docID: '1141', isSending: false }, {url: 'http://pic38.nipic.com/20140114/13563153_210444192122_2.jpg', title: '2', ext: 'png', docID: '2222', isSending: true } ] }, {value: '112', text: '新增2', files: [{url: 'http://img15.3lian.com/2015/f3/16/d/172.jpg', title: '3', ext: 'jpg', docID: '3343', isSending: false } ] } ] }, {value: '12', text: '借款确认书', files: [{url: 'http://img.sj33.cn/uploads/allimg/201105/20110517102640829.jpg', title: '1', ext: 'jpg', docID: '33123', isSending: false } ] } ] }, {text: '签署文书2', value: '2', sons: [{value: '21', text: '变卖协议', files: [{url: 'http://10.110.1.79/file/2.png', title: '2', ext: 'png', docID: '412344', isSending: true } ], sons: [{value: '211', text: '最高额借款抵押合同', files: [{url: 'http://pic.baike.soso.com/p/20130921/20130921113932-1425927050.jpg', title: '1', ext: 'png', docID: '134611', isSending: false }, {url: 'http://pic21.nipic.com/20120609/22411_142849182156_2.jpg', title: '4', ext: 'png', docID: '222764', isSending: true } ] }, {value: '212', text: '借款确认书', files: [{url: 'http://pic15.nipic.com/20110728/2531170_220558291173_2.jpg', title: '1', ext: 'png', docID: '3123133', isSending: false } ] } ] }, {value: '22', text: '还款服务委托书', files: [{url: 'http://pic15.nipic.com/20110728/2531170_220558291173_2.jpg', title: '1', ext: 'png', docID: '51232355', isSending: true }, {url: 'http://pic15.nipic.com/20110728/2531170_220558291173_2.jpg', title: '2', ext: 'png', docID: '6612346', isSending: true } ] }, {value: '23', text: '借款合同', files: [{url: 'http://pic15.nipic.com/20110728/2531170_220558291173_2.jpg', title: '1', ext: 'png', docID: '7123477', isSending: true }, {url: 'http://pic15.nipic.com/20110728/2531170_220558291173_2.jpg', title: '2', ext: 'png', docID: '88123238', isSending: true }, {url: 'http://10.110.1.79/file/test.docx', title: 'test', ext: 'docx', docID: '99913', isSending: true } ] } ] }, {text: '签署文书3', value: '3', sons: [{value: '31', text: '收款确认书', files: [{url: 'http://10.110.1.79/file/test.docx', title: 'test', ext: 'docx', docID: '101012130', isSending: true}]}]}];
export default {
  data () {
      return {
          data: [],                // 菜单列表
          active: 1,
          dialogImageUrl: '',      // 查看大图的图片路径
          dialogVisible: false,    // 查看大图的开关
          checkAll: false,         // 全选
          checkedUploads: [],      // 已选择的文件数组
          isIndeterminate: true,
          fileList: [],
          fileListAll: [],
          curNode: '',              // 当前操作的节点
          openAll: true,            // 是否全展开菜单
          defaultProps: {
              children: 'sons',     // 节点
              label: 'text'         // 显示的节点名称
          },
      }
  },
  watch: {
      active(nVal) {
          this.checkAll = false;
          this.checkedUploads = [];
          this.isIndeterminate = true;
      }
  },
  created() {
      this.$nextTick(function() {
          this.$refs.tree.setCurrentKey(111);
      });
  },
  mounted() {
      this.$nextTick(() => {
          this.data = jsonData;
          this.computedFileListAll(this.data);
      });
  },
  methods: {
      // 删除选中的节点
      deleteCheckedUploads() {
          let that = this;
          that.checkedUploads.forEach((x, index) => {
              that.handleRemove(x);
          });
      },
      // 获取不同层级之间的附件
      computedFileListAll(data) {
          let fileListAll = [];
          if (data != null) {
              data.forEach((x, indexX) => {
                  if (x.sons == null || x.sons.length == 0) {
                      fileListAll = fileListAll.concat(x.files);
                      debugger;
                  } else {
                      x.sons.forEach((y, indexY) => {
                          if (y.sons == null || y.sons.length == 0) {
                             fileListAll = fileListAll.concat(y.files);
                          } else {
                            y.sons.forEach((z, indexZ) => {
                               fileListAll = fileListAll.concat(z.files);
                            });
                          }
                      });
                  }
              });
              fileListAll.forEach((item, index) => {
                  item.name = '.' + item.ext;
                  item = this.fileType(item);
              });
              this.fileListAll = fileListAll;
          }
      },
      //查看文件
      viewImg (item) {
          this.dialogVisible = true;
          this.dialogImageUrl = this.fileType(item).imgUrl;
      },
      //全选
      handleCheckAllChange (val) {
          if (this.active == 1) this.checkedUploads = val ? this.fileList : [];
          if (this.active == 2) this.checkedUploads = val ? this.fileListAll : [];
          this.isIndeterminate = false;
      },
      //单选
      handleCheckedChange (value) {
          let checkedCount = value.length;
          if (this.active == 1) {
              this.checkAll = checkedCount === this.fileList.length;
              this.isIndeterminate =
              checkedCount > 0 && checkedCount < this.fileList.length;
          } else {
              this.checkAll = checkedCount === this.fileListAll.length;
              this.isIndeterminate =
              checkedCount > 0 && checkedCount < this.fileListAll.length;
          }
      },
      //点击已上传的文件
      previewDetial(item) {
          console.log('previewDetial');
      },
      // 点击tree节点
      handleNodeClick(data) {
          this.checkAll = false;
          this.checkedUploads = [];
          this.isIndeterminate = true;
          let that = this;
          that.active = 1;
          if (data.sons == null) {
              this.curNode = data.text;
              if (data.files != null) {
                  data.files.forEach((x, index) => {
                      x.name = '.' + x.ext;
                      x = that.fileType(x);
                  });
              }
              this.fileList = data.files;
          }
          console.log(data);
      },
      // 删除文件
      handleRemove(file) {
          let delIndex = -1;
          let id = '';
          let fileId = file.uid || file.docID;
          let fileList = this.active == 1 ? this.fileList : this.fileListAll;
          fileList.forEach((x, index) => {
              id = x.uid || x.docID;
              if (id == fileId) {
                delIndex = index;
              }
          });
          fileList.splice(delIndex, 1);
          console.log('文件列表移除文件时的钩子', file);
      },
      handlePreview(file) {
          console.log('点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据', file);
      },
      handleAvatarSuccess(res, file) {
          let fileList = this.fileList;
          fileList.push(file);
          // 根据上传的文件类型显示不一样的图片
          file = this.fileType(file); 
          console.log('文件上传成功时的钩子', res, file);
          // 判断是否是已上传过的文件
          let repeatFlag = fileList.every((x, index) => {
              return file !== x.uid;
          });
          if (repeatFlag) {
              this.fileList = fileList;
          } else {
              this.$message.error('你已经上传了该文件!');
          }
      },
      // 上传文件之前-判断格式正确、大小不能超过
      beforeAvatarUpload(file) {
          console.log('上传文件之前的钩子', file);
          let fileType = /\.(gif|jpg|jpeg|png|xls|xlsx|xlsm|doc|docx|ppt|pptx|zip|rar|7z|cab|pdf)$/.test(file.name);
          let isLt10M = file.size / 1024 / 1024 < 10;
          if (!fileType) {
              this.$message.error('请选择格式正确的文件!');
          }
          if (!isLt10M) {
              this.$message.error('上传头像图片大小不能超过10MB!');
          }
          return fileType && isLt10M;
      },
      // 判断文件类型 - 显示不一样的图片
      fileType(file) {
          let name = file.name.toLowerCase();
          let isImg = /\.(gif|jpg|jpeg|png)$/.test(name);
          let isXls = /\.(xls|xlsx|xlsm)$/.test(name);
          let isDoc = /\.(doc|docx)$/.test(name);
          let isPPt = /\.(ppt|pptx)$/.test(name);
          let isZip = /\.(zip|rar|7z|cab)$/.test(name);
          let isPdf = /\.(pdf)$/.test(name);
          if (isImg) file.imgUrl = file.url;
          if (isXls) file.imgUrl = require('@assets/excel.png');
          if (isDoc) file.imgUrl = require('@assets/word.png');
          if (isPPt) file.imgUrl = require('@assets/ppt.png');
          if (isZip) file.imgUrl = require('@assets/zip.png');
          if (isPdf) file.imgUrl = require('@assets/pdf.png');
          return file;
      },   
      // 打开tree全部节点
      openAlltree() {
          this.openAll = !this.openAll;
          console.log(this.$refs.tree);
          // for (let i = 0; i < this.$refs.tree.$children.length; i++) {
          //   this.$refs.tree.store.$children[i].expanded = false;
          // }
      },    
      // 文件状态改变时
      handleChange(file, fileList) {
          // file = this.fileType(file); //根据上传的文件类型显示不一样的图片
          // // 判断是否是已上传过的文件
          // let repeatFlag = fileList.every((x, index) => {
          //   return file !== x.uid;
          // });
          // if (repeatFlag) {
          //   this.fileList = fileList;
          // } else {
          //   this.$message.error('你已经上传了该文件!');
          // }
          // console.log('文件状态改变时的钩子', file, fileList);
      },   
      // tree节点的渲染
      renderContent(h, { node, data, store }) {
          if (data.sons == null) {
            return (
              <div style="font-size:14px;">
                <span>{node.label}</span>
                <span style="padding:0 25px;color:red;">{data.files.length}</span>
              </div>
            );
          } else {
            return (
              <div style="font-size:14px;">
                <span>{node.label}</span>
              </div>
            );
          }
      },
  },
};
</script>
<style lang="scss" scoped>
.change-status-btn {
    display: block;
    width: 100%;
    border-radius: 0;
    margin-bottom: 10px;
}

.upload-title {
    padding-bottom: 20px;
    font-size: 20px;
    color: #409eff;
}

.ht-upload {
    .el-footer {
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
        text-align: center;
    }

    .el-main {
        padding-top: 0;
        color: #333;
        text-align: left;
        width: 100%;
        white-space: normal;
    }

    .el-container {
        height: 100vh;
    }
}

.avatar-uploader {
    display: inline-block;
    text-align: left;

    .el-upload {
        overflow: hidden;
    }

    .avatar-uploader-icon {
        position: relative;
        overflow: hidden;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        font-size: 28px;
        color: #8c939d;
        width: 130px;
        height: 130px;
        line-height: 130px;
        text-align: center;
        margin-bottom: 10px;
        margin-right: 20px;
    }

    .avatar {
        width: 130px;
        height: 130px;
        display: block;
    }
}

.ht-preview-box {
    display: inline-block;
    position: relative;
    margin-bottom: 40px;
    margin-right: 20px;
    width: 130px;
    height: 130px;
    border-radius: 6px;
    vertical-align: top;

    &:hover {
        .mouseover,
        .checkbox {
            opacity: 1;
        }
    }

    .checkbox {
        position: absolute;
        top: -5px;
        left: -5px;
        opacity: 1;
    }

    .mouseover {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s;
        border-radius: 6px;

        &.show {
            opacity: 1;
        }

        span {
            position: absolute;
            width: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .ht-preview-img {
        position: relative;
        width: 130px;
        height: 130px;
    }

    .title {
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 5px 0;
        text-align: center;
    }

    .fa-window-close {
        position: absolute;
        top: -5px;
        right: -5px;
    }

    .process {
        position: absolute;
        top: 0;
        left: 0;
    }
}

.upload-btn {
    overflow: hidden;
    margin-bottom: 20px;

    .right {
        float: right;
    }

    .left {
        float: left;
    }
}

.slide-fade-enter-active {
    transition: all 0.3s ease;
}

.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
</style>