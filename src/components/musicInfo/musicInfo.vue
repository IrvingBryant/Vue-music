<template>
  <div class="musicInfo" ref="musicInfo" :style="{backgroundImage:'url('+musicImgSrc+')'}">
    <div class="head">
      <img src="/static/img/exit.png" alt="" class="exit" @click="exit()">
      <img src="./img/needle-ip6.png" alt="" class="needle"/>
       <div class="headCd" @click="isPlay()" :class="[{ play:isplay , pause: ispause }]">
         <img :src="musicImgSrc" alt="" class="cdImg"/>
         <div class="btnAudio" id="btnaudio"   v-bind:class="{musicStop:isopen}">
           <audio :src="'/C400' + musicData.songmid + '.m4a?guid=3647056699&vkey=FBFF2338281EE4EAB20DAE08FC4799CB7891EB51C777C002DA17B4B2E8750A33310AB48282802B46E642F7B624E8DD3022ECB5030437276E&uin=0&fromtag=38'" id="mp3Btn" ref="musciPlay">
             Your browser does not support the audio tag.
           </audio>
         </div>
       </div>
      <div class="wordsBody">
         <h6 class="songName">Something Just Like This--The Chainsmokers/Coldplay</h6>
         <div class="songWords" >
           <div ref="wordsNode">
             <p class="m-song-lritem j-lritem" :index = index v-for="(item2 , index) in musicData.words">
                 <span class="m-song-lrori">{{item2.english}}</span>
                 <span class="m-song-lrtra">{{item2.chinese}}</span>
             </p>
           </div>
         </div>
      </div>
      <img src="./img/upArrow.png" alt="" class="arrow">
      <div class="discuss">
       <h5 class="discussTitle">精彩评论</h5>
        <div class="discussContent" :id = "'a'+index"  v-for="(item,index) in musicData.listDiscuss"  :class="{lastStyle:index === (musicData.listDiscuss.length-1)}">
           <div class="userInfo">
             <div class="userImg">
               <img :src="item.icon === '' ?  '/static/img/userIcon.png' : item.icon " />
             </div>
             <div class="userName">
                <span id="name">{{item.username}}</span>
                <span id="time">{{item.time}}</span>
             </div>
             <div class="getLike">
                <span>{{item.like}}</span><img src="./img/like.png" alt=""/>
             </div>
             <div class="content">
               {{item.discussContent}}
             </div>

           </div>

        </div>

      </div>

    </div>

     <div class="footer">
      下载 APP
     </div>
  </div>

</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        initialValue: 0, //初始值
        ispause: true,    //控制转盘旋转的暂停
        isplay: false,   //控制转盘旋转的运行
        isopen: false,   //控制播放的按钮
        timer: 0,
        musicData: '',
        speed:1000   //定时器的速度
      }
    },
    name: 'musicInfo',
    methods: {
      isPlay () {
        this.play()
        this.isplay = !this.isplay
        this.ispause = !this.ispause
        var that = this
        var allHeight = that.$refs.wordsNode.offsetHeight
        console.log(allHeight)
        if (this.ispause) {
          clearInterval(this.timer)
        } else {
          this.timer = setInterval(function () {  //设置全局的 定时器
            that.initialValue = that.initialValue - 20
            that.$refs.wordsNode.style.cssText = 'transform:translateY(' + that.initialValue + 'px);'
            console.log(that.initialValue)
            if (that.initialValue + allHeight < 0 ) {
              clearInterval(that.timer)
            }
          }, this.speed)
        }
      },
      play () {
        let $mp3Btn = this.$refs.musciPlay  // vue.js中的获取DOM元素
        this.musicIsplay($mp3Btn)
      },
      musicIsplay (obj) {
//        obj.currentTime = 265 //设置音乐初始的播放时刻
        var that = this
        obj.onended = function () {  //在这个播放结束时事件中的this指向不是vue实例了 而是obj
          that.isopen = true
          that.ispause = true
          that.isplay = false
        }
        if (obj.paused) {
          this.isopen = false
          obj.play()
        } else {
          obj.pause()
          this.isopen = true
        }
      },
      exit(){
        clearInterval(this.timer)  //返回上一级时清空定时器
        this.$router.go(-1)
      }
    },
    mounted: function () {
      var url = '/static/json/song.json'
      console.log(this.$route.params.keyWord) //URl 传的值
      var that = this
      axios.get(url)
        .then(function (response) {
          console.log(response.data)
          that.musicData = response.data.data
        }).then(function () {
        that.isPlay()  //进来就自动播放
      })
    },
    computed: {  // 计算属性
      musicImgSrc: function () {
        return '//y.gtimg.cn/music/photo_new/T002R150x150M000' + this.musicData.albummid + '.jpg?max_age=2592000'
      }
    }
  }
</script>
<style scoped>
  .musicInfo{
    width: 7.2rem;
    height: 12.8rem;
    position: absolute;
    z-index:1000;
    background-image: url("/static/img/123.jpg");
    background-size:100% 100%;
    overflow: auto;
  }
  .head{
    width:100%;
    min-height:12.8rem;
    background: rgba(0, 0, 0, 0.6);
    color: aliceblue;
  }
  .needle{
    width:1.4rem;
    height:2.5rem;
    position: relative;
    margin-left: 3.6rem;
    z-index:12;
  }
  .head .headCd
  {
    width:5rem;
    height:5rem;
    position: relative;
    margin-left:1.1rem;
    margin-top: -1.2rem;
    background-image: url("./img/disc-ip6.png");
    background-size: 100% 100%;
    text-align:center;
    animation:mymove 5s linear infinite;
    -webkit-animation:mymove 5s linear infinite; /*Safari and Chrome*/
  }
.cdImg{
  width:3.2rem;
  height:3.2rem;
  border-radius: 50%;
  margin-top: .9rem;

}
  @keyframes mymove
  {
    0%{
      transform:rotate(0deg) skew(0deg) scale(1);
      -ms-transform:rotate(0deg) skew(0deg) scale(1);     /* IE 9 */
      -moz-transform:rotate(0deg) skew(0deg) scale(1);     /* Firefox */
      -webkit-transform:rotate(0deg) skew(0deg) scale(1); /* Safari ºÍ Chrome */
      -o-transform:rotate(0deg) skew(0deg) scale(1);
    }
    100%{
      transform:rotate(360deg) skew(0deg) scale(1);
      -ms-transform:rotate(360deg) skew(0deg) scale(1);     /* IE 9 */
      -moz-transform:rotate(360deg) skew(0deg) scale(1);     /* Firefox */
      -webkit-transform:rotate(360deg) skew(0deg) scale(1); /* Safari ºÍ Chrome */
      -o-transform:rotate(360deg) skew(0deg) scale(1);
    }
  }
.wordsBody{
  width:4.96rem;
  height:4.96rem;
  margin-left: .8rem;
  margin-top: .32rem;
  text-align: center;
  padding:.32rem;
}
  .wordsBody .songName{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: .28rem;
  }
  .wordsBody .songWords{
    width:4rem;
    height:3.2rem;
    margin-left: .48rem;
    margin-top: .16rem;
    font-size: .26rem;
    overflow: hidden;


  }
  .songWords div{
    transform:translateY(0px);
  }
  .songWords p{
    padding-bottom: .12rem;
  }
  .m-song-lrori{
    display: block;
  }
 .footer{
   width: 90%;
   height:.8rem;
   position: fixed;
   bottom: 0;
   color: #fff;
   background-color: #d33a31;
   border-color: #d33a31;
   text-align: center;
   line-height: .8rem;
   border-radius: 2rem;
   margin-left: 5%;
   font-size: .32rem;
   margin-bottom: .16rem;

 }
  .arrow{
    width:.48rem;
    height:.48rem;
    position: relative;
    left: 50%;
    margin-left: -0.24rem;
    bottom: 1.2rem;
  }
  .exit{
    width:.48rem;
    height:.48rem;
    position: absolute;
    left:.24rem;
    top:.24rem;
  }
  .discuss{
    min-height: 3.6rem;
    width: 7.2rem;
    /*background: rgba(0, 0, 0, 0.55);*/
    color: aliceblue;
  }
  .discussContent{
    width: 7.2rem;
    min-height:2rem;
    padding-top: .12rem;
    /*padding-bottom: .96rem;*/
  }
  .discussTitle{
    width:6.96rem;
    height:.4rem;
    line-height:.4rem;
    padding-left: .16rem;
    border-left: .08rem solid #d33a31;
    font-size: .32rem;
  }
  .userInfo{
    width: 7.2rem;
    min-height: 2rem;
    border-bottom: .02rem solid rgba(0,0,0,0.1);
    margin-top: .32rem;
    padding-bottom: .08rem;
  }
  .userInfo div{
    float: left;
  }
  .userImg img{
    width:.6rem;
    height:.6rem;
    margin-left:.16rem;
    border-radius: 50%;
  }
  .userName {
    margin-left: .16rem;
  }
  .userName span{
    display: block;
  }
  #name{
    font-size: .28rem;
  }
 .userInfo .getLike{
   height: .4rem;
   width:1rem;
    float: right;
   margin-right: .32rem;
   line-height: .4rem;
  }
  .getLike span{
   position: relative;
    top:-0.08rem;
    right:.12rem;
  }
  .getLike img{
    width:.4rem;
    height:.4rem;
  }
  .content{
    width:5.96rem;
    min-height: 1.6rem;
    margin-left: .88rem;
    margin-top: .12rem;
    font-size: .30rem;
  }
 .head .pause {
    animation-play-state: paused;
    animation-fill-mode:forwards;
  }
  .btnAudio {
    position: absolute;
    bottom:50%;
    left:50%;
    margin-bottom: -0.5rem;
    margin-left: -0.5rem;
    background-size: 100% 100%;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;

  }
  .lastStyle{
    padding-bottom: .96rem;
  }
  .musicStop{
     background-image: url("./img/paly.png") ;
     background-size: 100% 100%;
  }
  .head .play{
    animation-play-state: running;
  }
</style>
