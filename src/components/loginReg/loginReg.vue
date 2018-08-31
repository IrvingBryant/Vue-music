<template>
  <div class="loginReg">
  <div class="logBgi">
    <div class="bgp"></div>
    <router-link to="/login"><div class="log" @click="addStyle" :class="{bgcolor:style}">登录</div></router-link>
    <router-link to="/reg"><div class="reg" @click="addStyle" :class="{bgcolor:style}">注册</div></router-link>
    <router-link to="/"><div class="visitor">游客试用</div></router-link>
  </div>
  </div>

</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        style: false
      }
    },
    methods: {
      addStyle () {
        this.style = true
      }
    }
  }
</script>
<style scoped>
  body a{
    text-decoration: none;
  }
  .logBgi {
    background-image: url("img/bgi.jpg");
    min-width: 7.2rem;
    min-height: 12.8rem;
    background-size: 100% 100%;
    /*background: #fffafe;*/
  }

  .bgp {
    min-width: 7.2rem;
    min-height: 3.8rem;
  }

  .log, .reg {
    width: 5.6rem;
    height: .8rem;
    /*background: #fedbff;*/
    text-align: center;
    border-radius: .32rem;
    line-height: .8rem;
    color: #e20000;
    margin-left: .8rem;
    border: .02rem solid #e20000;
    margin-top: .32rem;

  }

  [data-dpr="1"] .logBgi {
    font-size: 16px;
  }

  [data-dpr="2"] .logBgi {
    font-size: 32px;
  }

  [data-dpr="3"] .logBgi {
    font-size: 48px;
  }

  [data-dpr="1"] .visitor {
    font-size: 12px;
  }

  [data-dpr="2"] .visitor {
    font-size: 24px;
  }

  [data-dpr="3"] .visitor {
    font-size: 36px;
  }

  .visitor {
    text-align: center;
    margin-top: .48rem;
    color: #b0b0b0;
    text-decoration: underline;

  }
.bgcolor{
  color:#b0b0b0;
  background: #ff5f38;
  opacity: .5;
}
</style>
