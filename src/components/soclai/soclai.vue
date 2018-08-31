<template>
  <div class="soclai">
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="myscroller"
      class="scroller"
    >
    <div class="loding" v-show="isok1">
      <img src="/static/img/loding.gif" class="lodingImg" >
      <P>玩命加载中loading</P>
    </div>
    <div class="mvContent" v-for="(item , index) in mvdataList" v-show="isok2" :id="item.icon">
      <div class="head">
        <img src="/static/img/Icon.jpg" alt="" class="headImg"/>
        <p class="headTit"><span>{{item.userName}}</span>&nbsp;发布视频:</p>
      </div>
      <div class="body">
        <p class="contentTit">{{item.mvTit}}</p>
        <video :src="item.url" controls="controls"></video>
      </div>
      <div class="footer">
        <img :src="  item.showLike ? '/static/img/like.png':'/static/img/like2.png'" class="getfine" @click="getlike(item)"/><span>{{item.like}}</span>
        <img src="/static/img/discuss.png" class="discuss" @click="godiscuss(item)"/> <span> </span>
        <p>----{{item.whoPublish}}MV推荐</p>
      </div>

    </div>

      <!-- content goes here -->
    </scroller>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  import VueScroller from 'vue-scroller'
  Vue.use(VueScroller)
  export default {
    name: 'soclai',
    data () {
      return{
        mvdataList:'',
        mvAlldata:'',
        isok1:true,
        isok2:false,
        loadCount:2,  // 设置初始加载加载的个数
        allData:''
      }
    },
    created:function () {
       this.ajaxMv()
    },
    methods:{
      ajaxMv () {
        var url = '/users/soclai'
        var that = this
        axios.post(url,{
          userName:that.getCookie('userName')
        })
          .then(function (response) {
            that.mvAlldata = response.data.result.mvsoclaiList
            console.log(that.mvAlldata)
            that.mvdataList = that.mvAlldata.slice(0,that.loadCount)
            that.isok1 = false
            that.isok2 = true
          })
          .catch(function (err) {
            ('匹配不成功')
          })
      },
      getlike (item) {
        if(this.getCookie('userName')) {
          item.showLike = !item.showLike
          item.clickTime++  //通过对mvData.json中的clickTime来进行初始化使每个item的点击次数值有其对应的clickT
          console.log("当前"+item.mvTit+"元素点击次数："+item.clickTime)
          if (item.clickTime % 2 === 0){
            item.like--
          }else{
            item.like = item.like + 1
          }
          var that = this
          axios.post("/users/clickLike",{
            userName:that.getCookie('userName'),
            discussId:item.icon,
            like:item.like
          }).then((res)=>{
            console.log(res.data.msg);
          }).catch(function (err) {
            console.log(err)
          })
        }else{
          alert("您还没有登录不能进行点赞哦");
        }
      },
      godiscuss(item){
        //这里通过sessionStorage存值给discuss组建去获取存在浏览器中
         var discussId = item.icon
        sessionStorage.setItem("listOwner", item.Name);
        sessionStorage.setItem("listDesc", item.mvTit);
        console.log(discussId)
        this.$router.push({path:'/discuss/'+discussId })

      },
      refresh(){
        console.log('刷新')
      },
      infinite: function (done) {
        var that = this
        if(that.loadCount >= that.mvAlldata.length){
          setTimeout(()=>{
            that.$refs.myscroller.finishInfinite(true);
          })
        }else {
          setTimeout(function () {
            for (var i = that.loadCount; i < that.loadCount+2; i++) {
              that.mvdataList.push(that.mvAlldata[i])
            }
            console.log(that.mvdataList)
            done();
            that.loadCount = that.loadCount + 2
          }, 1500)
        }
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

  }
</script>
<style scoped>
  .loding{
    position: absolute;
    left:50%;
    margin-left: -2rem;
    top:3rem;
    z-index:25;
    text-align: center;
  }
  .lodingImg{
    width:4rem;
    height:4rem;
  }
  .loding p{
    position: relative;
    top:-.8rem;
  }
  .soclai {
    width: 100%;
    position: absolute;
    top: .8rem;
    background: #f2f4f5;
    min-height:11.2rem;
    padding-bottom: .8rem;
  }
  .mvContent{
    width: 100%;

  }
  .body{
    margin-top: -0.16rem;
  }
  .body video{
    width: 85%;
    height:100%;
    margin-left: 10%;
  }
  .headImg{
    width: .6rem;
    height:.6rem;
    margin-top: .16rem;
    border-radius: 50%;
  }
  .headTit,.headImg{
    display: inline-block;
  }
  .headTit{
    font-size: .28rem;
    position: relative;
    top:-.2rem;
    color: rgba(75, 75, 75, 0.88);
  }
  .headTit span{
   color: #689bff;
  }
  .contentTit{
    margin-left: 10%;
    font-size: .32rem;
    width: 85%;
    margin-bottom: .08rem;
  }
  .footer{
    width: 85%;
    padding:0 5% 3% 10%;
    border-bottom: .01rem solid #e1e1e1;

  }
  .footer p{
    color: rgb(127, 127, 127);
    text-align: right;
    margin-top: -.16rem;
  }
  .footer img{
    width:.48rem;
    height:.48rem;
    /*margin-left: .32rem;*/
  }
  .discuss{
    margin-left: .16rem;
  }
  .footer span{
    position: relative;
    top:-0.08rem;
  }
</style>
