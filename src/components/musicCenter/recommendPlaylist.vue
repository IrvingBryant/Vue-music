<template>
  <div calss="recomplayHomepage">
    <div class="singerHomepagesLoading" v-show="isok1">
      <div class="loding">
        <img src="/static/img/loding.gif" class="lodingImg">
        <P>玩命加载中loading</P>
      </div>
    </div>
    <div v-show="isok2">
      <router-link to="/"><img src="./img/singerHomepageclose.png" alt="" class="singerHomepageclose"></router-link>
      <div class="singerHead" :style="{backgroundImage: 'url(' + bgIurl + ')'}"></div>
      <div class="shadow">
        <div class="singerInfo">
          <img :src="bgIurl" alt="" class="SingerImg"/>
          <div class="singerContent">
            <p class="singerName">{{singerName}}</p>
            <p class="fans">ListenTimes：<span>{{fansCount}}</span></p>
            <p class="singer_desc">歌单作者：{{listOwner}}   ></p>
          </div>
          <div class="nav">
            <img src="./img/shoucang2.png" @click="isShoucang()">
            <img src="./img/pinglun2.png" @click="goDiscuss()">
            <img src="./img/fenxiang.png">
            <img src="./img/xiazai.png" @click="isDownload()">
          </div>
        </div>
      </div>
      <!--推荐歌单渲染模块-->
      <div class="songListArea" v-if="idLen >= 10">
        <div class="songList" v-for="(item, index) in songList" @click="hotSingerplay(item,index)"
             :class="{ color: ind===index }">
          <p class="songName">{{item.musicData.songname}}</p>
          <p class="albuName">{{item.musicData.singer[0].name}} &nbsp;&nbsp;{{item.musicData.albumdesc}}</p>
        </div>
      </div>
      <!--排行榜歌单渲染模块-->
      <div class="songListArea" v-else>
        <div class="songList" v-for="(item ,index) in songList2" @click="hotSingerplay(item,index)"
             :class="{ color: ind===index }">
          <p class="songName">{{item.data.songname}}</p>
          <p class="albuName">{{item.data.singer[0].name}} &nbsp;&nbsp;{{item.data.albumname}}</p>
        </div>
      </div>

    </div>
    <!--弹窗start-->
    <div class="alertShadow" v-show="isShadow" @touchmove.prevent>
      <div class="alertContent">
        <p class="alertContentTit">{{content}}</p>
        <p class="noBtn" @click="alertShadowhide()">取消</p>
        <p class="yesBtn" @click="listShoucang(songlistData)">确认</p>
      </div>
    </div>
    <!--弹窗end-->
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        songlistData: '',
        id: '',
        bgIurl: '',
        fansCount: '999999+',    // 粉丝数量
        singerName: '',   // 歌手名字
        listOwner: '长大云音乐',  // 歌单作者
        songList: [],
        songList2: [],
        songName: '', //歌名
        albuName: '',//专辑名
        isok1: false,
        isok2: false,
        isShadow: false, // 表示alertShadow是否显示
        content: '',
        idLen: 0,
        ind: '',
        isplay: false  //表示音乐是否已经暂停
      }
    },
    created: function () {
      console.log('created我以调用')
      this.$on('broadcastIsplay', function (data) {
        this.broadcastIsplay(data)
      })
      // 触发ajaxgetData方法
      this.ajaxgetData()
    },
    name:'recommendPlaylist',
    methods: {
      hotSingerplay (data, index) {
        //由于两套数据格式不同所以$emit传的数据字段不同
        this.ind = index
        if (this.idLen >= 10) {
          console.log('singdata:' + data.musicData)
          this.$parent.$emit('broadcastMdata', data.musicData)
          this.$parent.$refs.footer.$emit('playTwo')
        } else {
          this.$parent.$emit('broadcastMdata', data.data)  //声明触发index组建的广播方法 传递数据
          this.$parent.$refs.footer.$emit('playTwo') //这个是声明触发 musicFooter组建的播放方法
        }
      },
      isShoucang () {
        this.isShadow = true
        this.content = '确认收藏此歌单？'
//        event.preventDefault()
      },
      alertShadowhide () {
        this.isShadow = false
      },
      listShoucang (listData) {
//        这里用ajax请求把数据存到后台，myMusic组建在通过AJAX获取数据 不用$emit
        this.isShadow = false
        console.log(this.$parent)
        this.$parent.$emit('getlistData', listData)
      },
      isDownload () {
        this.content = '请先下载移动端APP！'
        this.isShadow = true
      },
      ajaxgetData () {
        this.id = this.$route.params.recommendId //嵌套路由传递数据
        var recommendListpageUrl
        this.idLen = this.id.length //id字符串的长度
        console.log('id字符串的长度：' + this.idLen)
        console.log('myId:' + this.id)
        if (this.idLen < 10) {
          // v8前面要加斜杠
          recommendListpageUrl = '/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=187986988&uin=740465931&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=' + this.id + '&_=1515985560553'
          var that = this  //因为在用cdn引入的axios中this指向的时axios不是组件

          //排行榜歌单的Ajax请求start
          axios.get(recommendListpageUrl)
            .then(function (response) {
              console.log(response)
              console.log(response.data)
              var Data = response.data
              that.songlistData = response.data
              that.bgIurl = Data.topinfo.pic_album
              that.singerName = Data.topinfo.ListName
              that.songList2 = Data.songlist
              that.fansCount = '强烈推荐'
              that.listOwner = '长大云音乐'
              console.log(that.songList)
              that.isok1 = false  //等数据加载完后在进行loading隐藏
              that.isok2 = true
            })
            .catch(function (err) {
              ('匹配不成功')
            })
          //推荐歌单的Ajax请求end

          //推荐歌单的Ajax请求start
        } else {
          recommendListpageUrl = '/recomendmusiclist/musiclistId'
          var that = this  //因为在用cdn引入的axios中this指向的时axios不是组件
          axios.post(recommendListpageUrl,{
            musiclistId:that.id
          })
            .then(function (response) {
              console.log(response.data.result)
              var Data = response.data.result
              that.songlistData = response.data.result
              that.bgIurl = Data.singer_mid
              that.singerName = Data.listDesc
              that.fansCount = Data.fans
              that.listOwner = Data.listOwner
              that.songList = Data.list // 音乐的清单数据
              console.log(that.songList)
              that.isok1 = false  //等数据加载完后在进行loading隐藏
              that.isok2 = true
            })
            .catch(function (err) {
              ('匹配不成功')
            })
        }
        //排行榜歌单的Ajax请求end
      },
      broadcastIsplay (data) {    // 这个广播方法接受音乐是否播放完
        console.log('判断音乐是否播放完已触发')
        this.isplay = data
        console.log('musicFooter传过来的值isplay:' + this.isplay)
      },
      nextPlay (arr) {
        this.isplay = false //初始化musciFooter中的isplay的值 通过$emit将数据传递给musciFooter
        console.log('下一首准备播放')
        this.ind = this.ind + 1 //下一首的索引
        var arrlen = arr.length - 1
        if (this.ind <= arrlen) {
          var nextItem = arr[this.ind].data //下一首的歌的音乐的基本数据
          console.log(nextItem)
          this.$parent.$emit('broadcastMdata', nextItem)  //声明触发index组建的广播方法 传递数据
          this.$parent.$refs.footer.$emit('playTwo', this.isplay) //这个是声明触发 musicFooter组建的播放方法
        } else {   //当最后一首歌播完时跳至第一首歌播放
          this.ind = 0
          var nextItem2 = arr[this.ind].data
          this.$parent.$emit('broadcastMdata', nextItem2)  //声明触发index组建的广播方法 传递数据
          this.$parent.$refs.footer.$emit('playTwo', this.isplay) //这个是声明触发 musicFooter组建的播放方法
        }
      },
      goDiscuss () {   //跳转至评论组建
        this.$router.push({path:'/discuss/'+this.id })
      }
    },
    watch: {
      '$route.params.recommendId': function (val) {          //'$route.params.recommendId 表示URL后面的参数变化'
        if (val === undefined) {
          console.log('val:' + val)
          this.isok1 = true
          this.isok2 = false
          console.log('回退路由时不调用ajax')
          console.log('关闭后ID：' + this.idLen)
        } else {
          console.log('val:' + val)
          this.id = val //嵌套路由传递数据
          this.ajaxgetData()
        }
      },
      isplay: function (val) { //val的值表示监听到改变后的值！
        if (val) {
          var that = this
          //延迟一秒播放
          setTimeout(function () {  //定时器会改变vue实例中的this的指向
            that.nextPlay(that.songList2)
          }, 1000)
        } else {
          console.log('此时isplay的值已被初始化')
        }
      }
    }
//    beforeRouteupdate(){  表示在当前组建调用本身的时候触发
//      console.log("beforeRouteupdate触发")
//    }
  }
</script>
<style scoped>
  .singerHead {
    height: 4rem;
    width: 100%;
    position: absolute;
    z-index: 11;
    background-size: 100% 150%;
  }

  .shadow {
    position: absolute;
    height: 4rem;
    width: 100%;
    background: rgba(31, 36, 26, 0.8);
    z-index: 15;
  }

  .singerName {
    font-size: .32rem;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /*这个只适用于谷歌浏览器*/
  }

  .fans {
    font-size: .28rem;
    margin-top: .24rem;

  }

  .SingerImg {
    float: left;
    width: 36%;
    height: 2.4rem;
    margin: .52rem .2rem .4rem .32rem;
  }

  .singerContent {
    float: left;
    color: #fff;
    width: 50%;
    /*height:1.8rem;*/
    margin-top: .64rem;
  }

  .singer_desc {
    max-height: .7rem;
    font-size: .28rem;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: .24rem;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /*这个只适用于谷歌浏览器*/
  }

  .songListArea {
    position: absolute;
    top: 4rem;
    height: 7.2rem;
    width: 100%;
    overflow: auto;
    background: #f2f4f5;
    padding-bottom: .8rem;

  }

  .songList {
    height: 1rem;
    width: 90%;
    border-bottom: .01rem solid #e5e7e8;
    margin-left: .24rem;
    margin-top: .16rem;

  }

  .songName {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: .28rem;
  }

  .albuName {
    overflow: hidden;
    width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap; /*强制不换行*/
    color: grey;
    margin-top: .08rem;
  }

  .singerHomepageclose {
    width: .48rem;
    height: .48rem;
    z-index: 20;
    display: block;
    float: right;
    position: absolute;
    /*top:-.48rem;*/
    top: .16rem;
    right: .2rem;
  }

  .singerHomepagesLoading {
    min-height: 100%;
    width: 100%;
    position: absolute;
    z-index: 21;
    top: 0;
    background: #fff;
  }

  .loding {
    position: absolute;
    left: 50%;
    margin-left: -2rem;
    top: 3rem;
    z-index: 25;
    text-align: center;

  }

  .lodingImg {
    width: 4rem;
    height: 4rem;
  }

  .loding p {
    position: relative;
    top: -.8rem;
  }

  .nav {
    width: 80%;
    height: .8rem;
    position: absolute;
    top: 3.1rem;
    display: flex;
    justify-content: space-between;
    margin-left: 10%;
  }

  .nav img {
    width: .48rem;
    height: .48rem;
    margin-top: .16rem;
  }

  .alertShadow {
    width: 100%;
    height: 100%;
    background: rgba(163, 155, 151, 0.34);
    position: fixed;
    z-index: 30;
  }

  .alertContent {
    width: 60%;
    height: 1.2rem;
    margin-left: 15%;
    background: #ffffff;
    margin-top: 65%;
    padding: .32rem 5% .32rem 5%;
    border-radius: .1rem;
  }

  .alertContentTit {
    font-size: .32rem;
    color: #666;

  }

  .yesBtn, .noBtn {
    float: right;
    margin-top: .32rem;
    margin-right: .32rem;
    font-size: .28rem;
    color: #e20000;
  }

  .yesBtn {
    margin-right: .48rem;
  }

  .color {
    color: #e0756e;
  }
</style>
