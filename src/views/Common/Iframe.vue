<template>
    <div class="ht-iframe">
        <iframe  id="myiframe" frameborder="0" scrolling="no" width="100%" src="http://www.baidu.com" height="1000">
            <p>你的浏览器不支持iframe标签，建议使用谷歌浏览器查看</p>
        </iframe>
    </div>
</template>

<script>
export default {
  name: "Iframe",
  data() {
    return {
     
    };
  },
  mounted() {
    this.$nextTick(() => {
    //   var ifm = document.getElementById("myiframe");
    //   ifm.height = document.documentElement.clientHeight;
    });
  },
  methods: {
    
  },
  computed: {
   
  }
};
</script>

<style scoped>

</style>