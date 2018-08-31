<template>
<div id="myInfo" :class="{showStyle: myResult }">
  <div class="info">
    <div class="infoHead">
      <div class="infoImg">
       <img src="./img/irving.jpg" alt="" />
      </div>
      <p class="userName">{{userInfo}}</p>
    </div>
    <div class="bodyOne sameStyle">
      <div><img src="./img/news.png" alt=""><span>我的消息</span></div>
      <div><img src="./img/vip.png" alt=""><span>会员中心</span></div>
      <div><img src="./img/shop.png" alt=""><span>商城</span></div>
      <div><img src="./img/listen.png" alt=""><span>在线听歌免流量</span></div>
   </div>
    <div class="bodyTwo sameStyle">
      <div><img src="./img/friend.png" alt=""><span>我的好友</span></div>
      <div><img src="./img/dingwei.png" alt=""><span>附近的人</span></div>
    </div>
    <div class="bodyThree sameStyle">
      <div><img src="./img/clothes.png" alt=""><span>个性换肤</span></div>
      <div><img src="./img/listenMusic.png" alt=""><span>听歌识曲</span></div>
      <div><img src="./img/news.png" alt=""><span>我的消息</span></div>
      <div><img src="./img/sao.png" alt=""><span>扫一扫</span></div>
    </div>
    <div class="infoFooter sameStyle">
     <div @click="logout"><img src="./img/exit.png" alt=""/><span class="logout">{{exit}}</span></div>
    </div>
    </div>
  <div class="shadow1" @click="hide()">
  </div>
</div>
</template>
<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          timer: null,
          myResult: this.result,  // 创建的副本
          userInfo:"",
          exit:'注销'
        }
      },
      watch: {
        // 如果 `result` 发生改变，这个函数就会运行
        result (val) {
          this.myResult = val // 新增result的watch，监听变更并同步到myResult上
        },
        myResult (val) {
          // 触发当前实例上的事件。附加参数都会传给监听器回调。
          this.$emit('on-result-change', val) // ③组件内对myResult变更后向外部发送事件通知
        }
      },
      props: [  // 父组建对子组建进行通信
        'result' // 传过来的值是只读属性
      ],
      methods: {
        hide () {
          console.log('父组建传过来的值：' + this.myResult)  // 子组建中不能改变props中传过来的值
          this.myResult = !this.myResult // myResult 此时发生改变 为false，调用上面的watch中myResult（）
//          this.activa = true
        },
        // js缓冲动画
        startMover (itarget, obj) {
          clearInterval(this.timer)
          this.timer = setInterval(function () {
            var speed = (itarget - obj.offsetLeft) / 10 // 缓冲动画的速度参数变化值
            // 如果速度是大于0，说明是向右走，那么就向上取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
            // Math.floor();向下取整
            if (obj.offsetLeft === itarget) {
              clearInterval(this.timer)
            } else {
              // clientLeft 返回对象的offsetLeft属性值和到当前窗口左边的真实值之间的距离
              obj.style.left = obj.offsetLeft + speed + 'px'
            }
          }, 80)
        },
        logout () {
           var that=this
           var logoutUrl="/users/logout"
           axios.post(logoutUrl).then(function(response){
              let res = response.data;
              if(res.status == 0){
//                alert("登出成功");
                that.$router.push({path:"/loginReg"})
              }
           });
        },
        getCookie(key){
          var cookieArr = document.cookie.split('; ');
          for(var i = 0; i < cookieArr.length; i++) {
            var arr = cookieArr[i].split('=');
            if(arr[0] === key) {
              return arr[1];
            }
          }
          return false;
        }
      },
      created:function(){
        if(this.getCookie("userName")) {
          this.userInfo = this.getCookie("userName")
        }else{
          this.userInfo=''
          this.exit='我要去登录'
        }
      }
    }
</script>
<style scoped>
  .shadow1{
    width: 7.2rem;
    height: 93.7%;
    background: #616262;
    position: fixed;
    opacity: 0.5;
    top:0;
    /*display:none;*/
    z-index:9;
  }
  .info{
    width:6.2rem;
    height:93%;
    background:#f2f4f5;
    position: fixed;
    top:0;
    z-index:10;
    /*display: none;*/
  }
  .infoHead{
    width:100%;
    height:30%;
    background-image: url("img/infoBgi.jpg");
    background-size:100% 100%;
    text-align:center;

  }
  .infoImg{
    position:absolute;
    top:1rem;
    text-align: center;
    left:50%;
    margin-left:-.64rem;
  }
  .infoHead img{
    width:1.28rem;
    height:1.28rem;
    border-radius: 50%;
 }
  [data-dpr="1"] .userName{
     font-size:18px;
    position: relative;
    top:2.5rem

  }[data-dpr="2"] .userName{
     font-size:36px;
       position: relative;
       top:2.5rem

     }
  [data-dpr="3"] .userName{
     font-size:54px;
    position: relative;
    top:2.5rem

  }
  .bodyOne{
    width:100%;
    height:24%;
    background:#ffffff;
  }
  .sameStyle div{
    height:25%;
    width:100%;
    line-height: .6rem;

  }
  .sameStyle div img{
    width:.40rem;
    height:.4rem;
    position: relative;
    top:.1rem;
    left:.2rem;
 }
  .sameStyle div span{
    position: relative;
    left:.4rem;
  }
  .bodyTwo {
    width:100%;
    height:12.5%;
    background:#ffffff;
    margin-top: .16rem;
  }
  .bodyTwo div{
    height:50%;
  }
  .bodyThree{
    width:100%;
    height:24%;
    margin-top:.16rem;
    background:#ffffff;
  }
  .infoFooter{
    width:100%;
    height: 6%;
    margin-top: .16rem;
    background: #ffffff;
    border-bottom:1px solid #f2f4f5;
  }
  .infoFooter div img{
    margin-top:.06rem ;
  }
  .infoFooter div{
    text-decoration: none;
    text-underline: none;
    color: black;
  }
  .infoFooter div .logout{

    margin-top: .06rem;
  }
#myInfo{
  position:absolute;
  left:-7.2rem ;
  width:100%;
  /*transition-timing-function: ease;*/
  transition:left .8s ;
  -moz-transition:left .8s ; /* Firefox 4 */
  -webkit-transition:left .8s ; /* Safari and Chrome */
  -o-transition:left .8s ; /* Opera */

}
  .showStyle{
    left:0rem !important;
  }
  .hideStyle{
     left:-7.2rem !important;
   }

</style>
