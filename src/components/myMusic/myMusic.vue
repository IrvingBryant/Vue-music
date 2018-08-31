<template>
  <div class="myMusic" ref="myMusic">
    <div class="myMusicbody">
      <div class="localMusic equalStyle"><img src="./img/localMusic.png" alt="">本地音乐<span class="fontStyle">(<span>200</span>)</span></div>
      <div class="recentlyPlayed equalStyle"><img src="./img/recentlyPlayed.png" alt="">最近播放<span class="fontStyle">(<span>70</span>)</span></div>
      <div class="download equalStyle"><img src="./img/download.png" alt="">下载管理<span class="fontStyle">(<span>100</span>)</span></div>
      <div class="myCollection equalStyle"><img src="./img/myCollection.png" alt="">我的收藏<span class="fontStyle">(<span>20</span>)</span></div>
    </div>
    <!-- 这是创建的歌单模块-->
    <div class="bodyContent setupContent">
      <div class="setupList allStyle" @click="setupListshow(0)"><span class="icon" v-bind:class="{myMusiccurrten: show1}">&gt;</span>创建的歌单(<span>8</span>)</div>
      <div class="musicList" v-show="show1">
        <div class="img"></div>
        <div class="musicListName">
        <p >musci</p>
        <p class="musicCount"><span>15</span>首</p>
        </div>
      </div>


    </div>
    <!-- 这是收集的歌单模块-->
    <div class="bodyContent collectContent">
    <div class="collectList allStyle" @click="setupListshow(1)"><span class="icon" v-bind:class="{myMusiccurrten: show2}">&gt;</span>收藏的歌单(<span>9</span>)</div>
    <div class="musicList" v-show="show2">
      <div class="img"></div>
      <div class="musicListName">
        <p >musci</p>
        <p class="musicCount"><span>15</span>首</p>
      </div>
    </div>
  </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          show1: true, // 表示歌单是否隐藏初始时展示
          show2: true,
          active: 0 // 这个表示对setupContent collectContent 这两个元素的区别
        }
      },
      methods: {
        setupListshow (active) {
          console.log(active)
          if (active === 0) {  // 此时执行 setupContent 元素的show
            console.log('setupContent 元素 响应')
            this.show1 = !this.show1
          } else {
            console.log('collectContent 元素 响应')
            this.show2 = !this.show2
          }
        },

      }
//      mounted: function() {
//        this.$on('getlistData',function(data){ //注册broadcast自定义事件
//          this.getlistData(data)
//        })
//      }
    }
</script>
<style scoped>
  .myMusic{
    position: relative;
    top:.8rem;
    min-height:11.2rem;
    background: #f2f4f5;
    padding-bottom:.8rem;

  }
  .equalStyle{
    width:5.62rem;
    height:.52rem;
    padding:.32rem 0rem .16rem 0rem;
    margin-left: 1.06rem;
  }
  .myMusicbody div img{
    width:.4rem;
    height: .4rem;
    position:absolute;
    left:.21rem;
  }
  [data-dpr="1"] .equalStyle{
   border-bottom:1px solid #dadcdd;
  font-size: 16px;
 }
  [data-dpr="2"] .equalStyle{
    border-bottom:1px solid #dadcdd;
    font-size: 32px;
  }
  [data-dpr="3"] .equalStyle{
    border-bottom:1px solid #dadcdd;
    font-size: 48px;
  }
  .myMusicbody div .fontStyle{
   color:#919293;
    margin-left: .16rem;

  }
  [data-dpr="1"]  .myMusicbody div .fontStyle{

    font-size: 12px;
  }
  [data-dpr="2"]  .myMusicbody div .fontStyle{

    font-size: 24px;
  }
  [data-dpr="3"]  .myMusicbody div .fontStyle{

    font-size: 36px;
  }
  .bodyContent .allStyle{
    width:7.2rem;
    height:.44rem;
    line-height: .44rem;
    background:#e7e9e9;
  }
  .bodyContent  .icon{
    display: inline-block;
    font-size: .32rem;
    margin: 0rem .16rem 0 .16rem;
    /*transform:rotate(90deg);*/
    transition:transform .4s;
  }
.musicList{
  width:6.88rem;
  height:1.2rem;
  /*background: red;*/
  margin:.16rem 0 0.16rem .16rem;
  /*border-bottom: 1px solid #e5e7e8;*/
}
  .musicList .img{
    width:1.2rem;
    height:1.2rem;
    float:left;
    background-image: url("img/musiclistImg/musiclist.jpg");
    background-size:100% 100%;
  }
  .musicList .musicListName{
     float:left;
    font-size: .32rem;
    margin-top: .15rem ;
    margin-left: .16rem;
    padding-bottom:.16rem ;
    width:5.2rem;
    height:.88rem;
    border-bottom:.01rem solid #e5e7e8;
  }
  .musicCount{
    margin-top: .1rem;
    font-size: .24rem;
    color:#c2c3c4;
  }
  .collectContent{
    /*margin-top: .16rem;*/
  }


  .myMusiccurrten {
    transform: rotate(90deg);
  }

</style>
