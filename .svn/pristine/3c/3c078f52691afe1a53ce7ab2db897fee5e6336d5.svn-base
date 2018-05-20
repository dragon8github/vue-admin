<template>
  <div class="hongte-main-header">
      <div class="lm-item"> 
          <a @click="showpopover"><el-badge :value="3" class="item" slot="reference" > <i class="fa fa-envelope-o"></i> </el-badge> </a>
          <transition name="slide-fade">
              <div class="hongte-message-popover" v-show="popover" ref="popover">
                  <div class="popover__title">你有3条新的消息</div>
                  <div class="popover__body">
                     <ul class="hongte-message-list">
                         <li class="list__item" v-for='(item, index) in message' :key='index' @click="go(item.id, index)">
                               <h1 class="item__title">{{ item.title }}</h1>
                               <article class="item__body">{{ item.body }}</article>
                               <span class="item__time is-right"><i class="fa fa-clock-o"></i> {{ item.time }}</span>
                         </li>
                     </ul>
                  </div>
              </div>
          </transition>
      </div>
      <div class="lm-item"><i class="fa fa-key fa-fw"></i> 修改密码</div> 
      <div class="lm-item" @click="signOut"><i class="fa fa-power-off"></i> 退出登录</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
          message: [
            {id: '1', title: '这是一段内容', body: '这是一段内容,这是一段内容,这是一段内容,这是一段内容。', time: '2018/05/15 09:28:30'},
            {id: '2', title: '这是一段内容', body: '这是一段内容,这是一段内容,这是一段内容,这是一段内容。', time: '2018/05/15 09:28:30'},
            {id: '3', title: '这是一段内容', body: '这是一段内容,这是一段内容,这是一段内容,这是一段内容。', time: '2018/05/15 09:28:30'},
          ],
          popover: false
      }
    },
    methods: {
      go (id, index) {
          console.log(id, index);
      },
      signOut () {
          this.$cookie.delete('token');
          this.$cookie.delete('refreshToken');
          this.$router.push('/login')
      },
      showpopover (e) {
          this.popover = !this.popover
          var closePopover = (event) => {
              if (!this.$refs.popover.contains(event.target)) {
                  this.popover = false
                  document.body.removeEventListener('mouseup', closePopover)
              }
          }
          document.body.addEventListener('mouseup',closePopover)
      }
    },
    watch: {
      popover () {
        console.log(123);
      }
    },
    beforeMount () {

    }
  }
</script>

<style lang='scss'>

.hongte-main-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size:16px;

    .lm-item {
        margin: auto 15px;
        cursor: pointer;
        color: #606266;
        position: relative;

        .el-badge__content.is-fixed {
            top: 30%;
        }
    }
}

.hongte-message-popover {
    width: 300px;
    background-color: #ffffff;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, .1));
    border: 1px solid #f2f2f2;
    min-width: 150px;
    position: absolute;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;

    .popover__title {
        color: #303133;
        font-size: 16px;
        margin-bottom: 12px;
        margin: 0 18px;
        line-height: 58px;
        border-bottom: 1px solid #eee;
        text-align: left;
    }

    .popover__body {
        overflow-y: auto;
        height: 300px;
    }

    &:before {
        content: "";
        top: -9px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 10px solid #fff;
        z-index: 1;
    }

    &:after {
        content: "";
        position: absolute;
        top: -11px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 10px solid #eee;
    }

    .hongte-message-list {
        height: 300px;
        margin: 0;
        padding: 0;

        .list__item {
            position: relative;
            padding: 10px 18px;
            cursor: pointer;
            list-style: none;
            text-align: left;
            overflow: hidden;
            line-height: normal;
        }

        .list__item + .list__item::after {
            content: '';
            position: absolute;
            top: 0;
            width: 90%;
            height: 1px;
            background-color: #eee;
            left: 50%;
            transform: translateX(-50%);
        }    
        
        .list__item:hover {
            background: #f2f2f2;
        }

            .item__title {
                font-size: 16px;
                color: #444;
                margin: 0;
            }
            
            .item__body {
                font-size: 12px;
                margin: 8px 0;
                color: #888
            }
            
            .item__time {
                font-size: 12px;
            }
    }
}
</style>
