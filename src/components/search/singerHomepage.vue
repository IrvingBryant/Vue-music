<template>
  <div calss="singerHomepage" ref="singerHomepage">
    <div class="singerHomepagesLoading" v-show="isok1">
    <div class="loding" >
    <img src="/static/img/loding.gif" class="lodingImg" >
      <P>玩命加载中loading</P>
    </div>
    </div>
    <div v-show="isok2">
    <router-link to="/hotSinger"><img src="./img/singerHomepageclose.png" alt="" class="singerHomepageclose"></router-link>
     <div class="singerHead" :style="{backgroundImage: 'url(' + bgIurl + ')'}"></div>
     <div class="shadow">
       <div class="singerInfo">
         <img :src="bgIurl" alt="" class="SingerImg"/>
         <div class="singerContent">
           <p class="singerName">{{singerName}}</p>
           <p class="fans">粉丝数：<span>{{fansCount}}</span>人</p>
           <p class="singer_desc">{{singer_desc}}</p>
         </div>
       </div>
     </div>
    <div class="songListArea">
     <div class="songList" v-for="(item, index) in songList" @click="hotSingerplay(item,index)" :class="{ color: ind===index }" :index = index>
       <p class="songName">{{item.musicData.songname}}</p>
       <p class="albuName">{{item.musicData.singer[0].name}} &nbsp;&nbsp;{{item.musicData.albumdesc}}</p>
     </div>
    </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        id:'',
        bgIurl:'',
        fansCount:'',    // 粉丝数量
        singerName:'',   // 歌手名字
        singer_desc:'',  // 歌手的介绍
        songList:'',
        songName:'' , //歌名
        albuName:'' ,//专辑名
        isok1:true,
        isok2:false,
        ind:'', //想要点击高亮元素的索引
        isplay:false,
        isMe:'Iamsinger'
      }
    },
    name:'singerHomepage',
    created: function(){
      this.$on('broadcastIsplay',function(data){
        this.broadcastIsplay(data)
      })
      this.id = this.$route.params.id //嵌套路由传递数据
      var singgerhomepageUrl = '/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?singerid=' + this.id + '&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5page&needNewCode=1&order=listen&from=h5&num=15&begin=0&_=1515134254300'
      console.log(this.id)
      var that=this  //因为在用cdn引入的axios中this指向的时axios不是组件
      axios.get(singgerhomepageUrl)
        .then(function(response){
           console.log(response.data)
           var Data = response.data.data
           console.log(Data)
           console.log(Data.singer_mid)
           that.bgIurl = 'https://y.gtimg.cn/music/photo_new/T001R150x150M000'+Data.singer_mid+'.jpg?max_age=2592000'
           that.singerName = Data.singer_name
           that.fansCount = Data.fans
           that.singer_desc = Data.SingerDesc
           that.songList = Data.list
           console.log(that.songList)
           that.isok1 = false  //等数据加载完后在进行loading隐藏
           that.isok2 = true
        })
        .catch(function (err) {
        ('匹配不成功')
      })
    },
    methods:{
      hotSingerplay(data,index){
        console.log("singdata:"+data.musicData)
        this.$parent.$parent.$parent.$emit('broadcastMdata',data.musicData)
        this.$parent.$parent.$parent.$refs.footer.$emit('playTwo')
        this.$parent.$parent.$parent.$refs.footer.$emit('getisMe',this.isMe)
        this.ind = index
      },
      broadcastIsplay(data){    // 这个广播方法接受音乐是否播放完
        console.log("判断音乐是否播放完已触发")
        this.isplay = data
        console.log("musicFooter传过来的值isplay:"+this.isplay)
      },
      nextPlay(arr){
        this.isplay = false //初始化musciFooter中的isplay的值 通过$emit将数据传递给musciFooter
        console.log("下一首准备播放")
        this.ind = this.ind + 1 //下一首的索引
        var arrlen = arr.length - 1
        if(this.ind <= arrlen) {
          var nextItem = arr[this.ind].musicData   //下一首的歌的音乐的基本数据
          console.log(nextItem)
          this.$parent.$parent.$parent.$emit('broadcastMdata', nextItem)  //声明触发index组建的广播方法 传递数据
          this.$parent.$parent.$parent.$refs.footer.$emit('playTwo', this.isplay) //这个是声明触发 musicFooter组建的播放方法
          this.$parent.$parent.$parent.$refs.footer.$emit('getisMe',this.isMe)
        }else{   //当最后一首歌播完时跳至第一首歌播放
          this.ind = 0
          var nextItem2 = arr[this.ind].musicData
          this.$parent.$parent.$parent.$emit('broadcastMdata', nextItem2)  //声明触发index组建的广播方法 传递数据
          this.$parent.$parent.$parent.$refs.footer.$emit('playTwo', this.isplay) //这个是声明触发 musicFooter组建的播放方法
          this.$parent.$parent.$parent.$refs.footer.$emit('getisMe',this.isMe)  //这个触发getisMe 传isMe的值过去
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta
      to.meta.keepAlive = true; // 让 A 缓存，即不刷新
      next();
    },
    watch:{
      isplay:function(val){ //val的值表示监听到改变后的值！
        if(val) {
          var that = this
          //延迟一秒播放
          setTimeout(function(){  //定时器会改变vue实例中的this的指向
            that.nextPlay(that.songList)
          },1000)
        }else{
          console.log("此时isplay的值已被初始化")
        }
      }
    }
  }
</script>
<style scoped>
  .singerHead{
    height:2.8rem;
    width:100%;
    position: absolute;
    top:-.8rem;
    z-index:11;
    background-size:100% 150%;
  }
  .shadow{
    position: absolute;
    top:-.8rem;
    height:2.8rem;
    width:100%;
    background: rgba(0,0,0,.6);
    z-index:15;
  }
  .singerName{
    font-size:.32rem;
  }
  .fans{
    font-size: .28rem;
    margin-top: .08rem;

  }

  .SingerImg{
    float: left;
    width:28%;
    height:2rem;
    margin:.4rem .1rem .4rem .2rem;
  }
  .singerContent{
    float:left;
    color:#fff;
    width:66%;
    /*height:1.8rem;*/
    margin-top: .52rem;
  }
  .singer_desc{
    max-height:.7rem;
    text-overflow: ellipsis;
     overflow: hidden;
    margin-top: .08rem;
    font-size: .24rem;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;  /*这个只适用于谷歌浏览器*/
  }
  .songListArea{
    position:absolute;
    top:2rem;
    min-height:11.2rem;
    width:100%;
    background: #f2f4f5;
    padding-bottom: .8rem;

  }
  .songList{
    height:1rem;
    width:90%;
    border-bottom: .01rem solid #e5e7e8;
    margin-left: .24rem;
    margin-top: .16rem;
   }
  .songName{
    font-size: .28rem;
  }

  .albuName{
    overflow: hidden;
    width:90%;
    text-overflow: ellipsis;
    white-space: nowrap;/*强制不换行*/
    color:grey;
    margin-top: .08rem;
  }
  .singerHomepageclose{
    width:.48rem;
    height:.48rem;
    z-index:20;
    display: block;
    float: right;
    position: absolute;
    top:-.48rem;
    right:.2rem;
  }
  .singerHomepagesLoading{
    min-height:100%;
    width:100%;
    position: absolute;
    z-index:21;
    top:0;
    background:#fff;
  }
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
  .color{
    color:#e0756e;
  }

</style>
