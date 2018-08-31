<template>
   <div class="discussVue">
   <div class="discuss" v-show="show1">
      <div class="discussHead"><img src="/static/img/exit.png" alt="" @click="back"><span>评论（{{discussList.length}}）</span></div>
      <div class="musicInfo">
        <img :src="discussData.singer_mid" alt="">
        <div>
          <p class="musicTitle">{{discussData.listDesc}}</p>
          <p class="musicUserName">{{discussData.listOwner}}</p>
        </div>
        <span> ></span>
      </div>
     <div class="bodyTit"><p>精彩评论</p></div>
      <div class="discussBody">
         <div class="discussContent" v-for="(item,index) in discussList" :index=index>
           <img :src="item.icon === '' ?  '/static/img/userIcon.png' : item.icon "  alt="" class="userImg">
           <div class="discussContent2">
              <p class="UserName">{{item.username}}</p>
              <p class="time">{{item.time}}</p>
             <div class="like">
               <span class="likeCount">{{item.like}}</span>
               <img alt=""  :src="  item.showLike ? '/static/img/like.png':'/static/img/like2.png'" @click="getlike(item,index)">
             </div>
              <div class="content">
               {{item.discussContent}}
              </div>
           </div>
         </div>
      </div>
      <div class="discussFooter">
        <input type="text" placeholder="写评论" v-model="msg"/>
         <span @click="send()" :style="{ color: lightHigh }">发送</span>
      </div>
   </div>
     <div class="loading" v-show="show2">
       <iframe src="/static/svg/loading.svg"  frameborder="no" border="0" >
       </iframe>
     </div>
   </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        discussData:'',
        discussList:"",
        msg:"",
        show1:true,
        show2:false
      }
    },
    mounted () {
      console.log("a:"+sessionStorage.getItem("listOwner"));
      //进入页面时就调discusslist接口
       this.ajaxData()
    },
    computed: {
      lightHigh:function () {  //设置发送按钮高亮
         if(this.msg.trim() !== ''){
           return "#ff524a"
         }else{
           return "#cccccc"
         }

      }
    },
    methods:{
      ajaxData () {
        var url = '/musicDiscuss/discusslist'
        var that = this
        console.log(that.$route.params.keyWord)
        axios.post(url,{
          userName:that.getCookie('userName'),
          discussId:that.$route.params.keyWord,
          listDesc:sessionStorage.getItem("listDesc"),
          listOwner:sessionStorage.getItem("listOwner")
        })
          .then(function(response){
            that.discussData = response.data.result
            that.discussList =that.discussData.listDiscuss
            console.log(that.discussData)
            console.log(that.discussList)
          })
      },
      getlike (item,index) {
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
        var clickedList = that.discussList[index]
        console.log(clickedList)
        axios.post("/musicDiscuss/clickLike",{
          discussId:that.$route.params.keyWord,
          username:clickedList.username,
          like:clickedList.like
        }).then((res)=>{
            console.log(res.data.msg);
        }).catch(function (err) {
          console.log(err)
        })
        }else{
          alert("您还没有登录不能进行点赞哦");
        }
      },
      back () {
        this.$router.go(-1)
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
      },
      send () {
        //首先判断是否登录
        if(this.getCookie('userName')) {
          if (this.msg.trim() === "" ) {
            alert('请输入内容')
          }
          else {
            var date = new Date()
            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var day = date.getDate()
            var nowTime = year + '年' + month + '月' + day + '日' // 获取当前时间
            console.log(nowTime);
            //通过 /musicDiscuss/addComment 添加评论接口
            var url = '/musicDiscuss/addComment'
            console.log(this.$route.params.keyWord)
            var that = this
            axios.post(url,{
                username: that.getCookie("userName"),
                time: nowTime,
                discussContent: that.msg,
                discussId:that.$route.params.keyWord
              }
            )
              .then(function (res) {
                //判断是否已经评论过
                if(res.data.status == "10002"){
                  alert(res.data.msg);
                }
                else {
                  alert("评论成功")
                  //在加载评论列表
                  var mydiscussData = {
                    username: that.getCookie("userName"),
                    icon: "",
                    time: nowTime,
                    discussContent: that.msg,
                    like: 0,
                    showLike: true,
                    clickTime: 0
                  }
                  that.discussList.unshift(mydiscussData);
//                   that.ajaxData()
                }
                //初始化基础数据
                that.show1 = true
                that.show2 = false
                //初始话input中的值
                that.msg = ""
              })
              .catch(function (err) {
                console.log(err)
              })

          }
        }else{
          alert("您还没有登录不能进行评论哦");
        }
      }
    }
  }
</script>
<style scoped>
  .discuss{
    z-index: 101;
    position: fixed;
    width: 100%;
    min-height:12rem;
    background: #f2f4f5;
  }
   .discussHead{
      width:100%;
      height:.8rem;
      background:#e20000;
      color:#ffffff;
      font-size: .32rem;
     line-height: .8rem;
   }
  .discussHead img{
    width:.4rem;
    height:.4rem;
    position: relative;
    top: .08rem;
    margin-left: .32rem;
  }
  .discussHead span{
    margin-left:.24rem;
  }
  .musicInfo{
    width:100%;
    height:2rem;

  }
  .musicInfo img{
    float:left;
    width: 1.6rem;
    height:1.6rem;
    margin:.2rem;
    background:#666;
  }
  .musicInfo div{
    width:4rem;
    float: left;
    margin:.32rem 0rem 0rem .32rem;
  }
  .musicTitle{
    font-size: .28rem;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .musicUserName{
    position:absolute;
    top:2.12rem;
  }
  .musicInfo span{
    margin-left:.24rem;
    font-size: .48rem;
    line-height: 2rem;
  }
  .bodyTit{
    width: 100%;
    height:.48rem;
    line-height: .48rem;
    background: #e7e9e9;
  }
  .bodyTit p{
    margin-left: .2rem;
  }
  .discussBody{
    height: 8.6rem;
    width: 105%;
    overflow: auto;
    padding-bottom: .8rem;
  }
  .discussContent{
    min-height:2rem;
    width: 100%;
    border-bottom:.01rem solid #e5e7e8;
  }
  .userImg{
    width:.64rem;
    height:.64rem;
    border-radius: 50%;
    display: block;
    float: left;
    margin:.16rem .16rem 0rem .2rem;
  }
  .discussContent2{
    width: 75%;
    float: left;
  }
  .discussContent2 .UserName {
    padding-top: .16rem;
  }
 .time{
  margin-top: .12rem;
  font-size: .18rem;
 }
  .like{
    position: relative;
    float: right;
    height:.4rem;
    line-height: .4rem;
    top:-.5rem;
    left:.16rem;
    margin-bottom: -.42rem;
  }
  .like img{
    width:.4rem;
    height:.4rem;
    position: relative;
    top:.06rem;
  }
  .content{
    margin-top: .08rem;
  }
 .discussFooter{
   width:100%;
   height:.8rem;
   position: fixed;
   bottom: 0;
   background: #ffffff;
 }
  .discussFooter input{
    width:75%;
    height:.6rem;
    outline: none;
    border: 0px;
    border-bottom: .01rem solid #d9d9d9;
    margin-left: .2rem;
    margin-top: .06rem;
    background-image: url("/static/img/discussIcon.png");
    background-size:.4rem .4rem;
    background-repeat:no-repeat;
    background-position:left;
    padding-left: .48rem;
  }
  .discussFooter span{
    font-size:.28rem;
    color: #cccccc;
    margin-left: .2rem;
    position: relative;
    top:.06rem;
  }
  .loading{
    width:100%;
    height:11.2rem;
    position: fixed;
    top:.8rem;
    z-index:200;
    /*background: red;*/
  }
  .loading iframe{
    position:absolute;
    top:50%;
    margin-top: -.4rem;
    left:50%;
    margin-left: -.4rem;
    width:0.8rem;
    height:0.8rem;
  }
</style>
