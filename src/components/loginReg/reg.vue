<template>
  <div>
    <header class="regHead"><router-link to="/loginReg"><img src="./img/exit.png" alt=""></router-link><span class="reg">注册</span></header>
    <div class="body">
      <input type="text" placeholder="请输入用户名" v-model="username" class="username" minlength="2" maxlength="8" />
      <input type="password" placeholder="请输入密码"  v-model="password" class="password" maxlength="16"  v-on:keyup="judgePassword"/>
      <div class="regCurrten"  v-bind:class="{ Error: state,Right: state2}"></div>
      <input type="password" placeholder="请重复输入密码"  v-model="repassword" class="password" maxlength="16"  v-on:keyup="judgeRepassword" />
      <div class="regCurrten2 currten2"  v-bind:class="{ Error: restate,Right: restate2}"></div>
      <div class="btnReg" v-on:click="judgeReg">注册</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          username: '',
          password: '',
          repassword: '',
          state: false, // 表示错误时状态
          state2: false, // 表示正确时状态
          restate: false, // 表示重复密码错误时状态
          restate2: false // 表示重复密码正确时状态
        }
      },
      methods: {
        judgeReg () {
           if((this.password !== this.repassword )|| !this.username || (this.password <= 6)  ){
               alert("用户名或密码格式不正确")
           }else{
              var that = this
              var regUrl = "users/reg"
              axios.post(regUrl,{
                userName:that.username,
                userPwd:that.password
              }).then((response) =>{
                 var res = response.data;
                if(res.status == '0'){
                  alert('注册成功');
                  this.$router.push({path:'/'})
                }else{
                  alert(res.msg);
                }
              });
           }
        },
        judgePassword () {
          if (this.password.length >= 6) {
            this.state = false
            this.state2 = true
          } else {
            this.state = true
            this.state2 = false
          }
        },
        judgeRepassword () {
          if (this.password === this.repassword) {
            this.restate2 = true
            this.restate = false
          } else {
            this.restate2 = false
            this.restate = true
          }
        }
      }
    }
</script>
<style scope>
  .regHead{
    min-width:7.20rem;
    height:.9rem;
    background: #e20000;
    line-height: .9rem;
    color:#ffffff;
  }
  .regHead .reg{
    margin-left:.24rem;
    color:#ffffff;
  }
  .regHead  img{
    width: .32rem;
    height:.32rem;
    margin-left: .3rem;
    vertical-align: middle;
    margin-top: -.05rem;
  }
  [data-dpr="1"] .regHead{
    font-size: 16px;
  }
  [dtat-dpr="2"] .regHead{
    font-size: 32px;
  }
  [data-dpr="3"] .regHead{
    font-size: 48px;
  }
  .body{
    margin-top: .64rem;
    min-width: 7.2rem;
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
  .body .btnReg{
    width:6.2rem;
    height:.64rem;
    color:#ffffff;
    border-radius: .24rem;
    background: #e20000;
    text-align: center;
    line-height: .64rem;
    margin-top: .48rem;
    margin-left:.5rem;
  }
  [data-dpr="1"] .btnReg{
    font-size: 16px;
  }
  [dtat-dpr="2"] .btnReg{
    font-size: 32px;
  }
  [data-dpr="3"] .btnReg{
    font-size: 48px;
  }
 .body .Error{
     background-image: url('img/error.png');
   }
  .body .Right{
    background-image: url('img/yes.png');
  }
.regCurrten,.regCurrten2{
  background-size: .4rem;
  width: .4rem;
  height:.4rem;
  position: absolute;
  left:6.2rem;
  top:2.66rem;
 }
.currten2{
  top:3.68rem;
}
</style>
