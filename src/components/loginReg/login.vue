<template>
  <div>
    <header class="head"><router-link to="/loginReg"><img src="./img/exit.png" alt=""></router-link><span class="login">登录</span></header>
    <div class="body">
      <input type="text" placeholder="请输入用户名" v-model="username" class="username" minlength="2" maxlength="8" />
      <input type="password" placeholder="请输入密码"  v-model="password" class="password" maxlength="16"  /> <span class="forget">忘记密码?</span>
      <div class="btnLog" v-on:click="judgeLog">登录</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import broadcast from '../../../static/js/broadcast.js'
    export default {
      data () {
        return {
          password: '',
          username: '',
          userAllInfo:''
        }
      },
      methods: {
        judgeLog () {
          if (!this.password || !this.username ) {  // 这里的this指向的是上面的data对象
            alert("帐号密码不正确");
            return;
          }
          var that = this;
          var userInfoUrl = "/users/login";
          axios.post(userInfoUrl,{
            userName:that.username,
            userPwd:that.password
          }).then((response)=>{
            let res = response.data;
            that.dispatch('app','getInfodata',response.data)
            if(res.status == '0'){
              alert('登录成功');
              that.$router.push({path:'/'});
            }else{
              alert("登录失败");
            }
          })

        }
      },
      mixins: [broadcast]
    }
</script>
<!--scoped 表示css为组件私有-->
<style scoped>
  .head{
    min-width:720rem;
    height:.9rem;
    background: #e20000;
    line-height: .9rem;
    color:#ffffff;
  }
  .head .login{
    margin-left:.24rem;
  }
  .head  img{
    width: .32rem;
    height:.32rem;
    margin-left: .3rem;
    vertical-align: middle;
    margin-top: -.05rem;
  }
  [data-dpr="1"] .head{
    font-size: 16px;
  }
  [dtat-dpr="2"] .head{
    font-size: 32px;
  }
  [data-dpr="3"] .head{
    font-size: 48px;
  }
  [data-dpr="1"] .btnLog{
    font-size: 16px;
  }
  [dtat-dpr="2"] .btnLog{
    font-size: 32px;
  }
  [data-dpr="3"] .btnLog{
    font-size: 48px;
  }
  .body{
    margin-top: .64rem;
  }
  .body input {
    width:5.6rem;
    height:.48rem;
    padding:.1rem 0rem .1rem .6rem;
    border:0;
    outline:none;
    border-bottom: .01rem solid #ced0d0;
    background-size:.4rem;
    background-repeat:no-repeat;
    background-position:left;
    display: block;
    margin-left: .5rem;
    margin-top:.48rem;
 }
 .body .username{
    background-image: url("img/yonghu.png");

  }
 .body .password{
    background-image: url("img/mima.png");
    margin-top: .32rem;
  }
  .body .btnLog{
    width:6.2rem;
    height:.64rem;
    color:#ffffff;
    border-radius: .24rem;
    background: #e20000;
    text-align: center;
    line-height: .64rem;
    margin-top: .32rem;
    margin-left:.5rem;
  }
  .forget{
    display: block;
    position:absolute;
    left:5.8rem;
    top:2.75rem;
    color:#5b85b3;
  }
</style>
