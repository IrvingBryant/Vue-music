<template>
 <div class="searchResult">
     <div class="singerInfo" v-show="isok">
        <p><img :src="'https://y.gtimg.cn/music/photo_new/T001R68x68M000'+singermid+'.jpg?max_age=2592000'" alt="" class="singerImg"></p>
        <div class="singerSong">
           <p class="singerName">{{this.singName}}</p>
           <p calss="songInfo">单曲:<span>{{this.songnum}}</span> 专辑:<span>{{this.albumnum}}</span></p>
        </div>
     </div>
     <div class="songList" v-for="item in songList" :id="item.songmid" @click="played(item)">
       <div class="songListicon"></div>
       <div class="songInfo">
         <p class="songName"> {{ item.songname }}</p>
         <p class="singerNametwo"><span>专辑:{{item.albumname}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>歌手:{{item.singer[0].name}}</span> </p>
       </div>
     </div>
 </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        word: '',
        singName:'佘阳',
        songnum:'100', // 歌曲数量
        singermid:'003aQYLo2x8izP', // 歌手图片 设计一个初始值
        albumnum:'100', // 专辑数量
        songList:'',
        isok: true
      }
    },
    name:'searchResult',
    mounted: function () {
      this.$on("broadcastUrl",function(data){
        this.broadcastUrl(data)
      })
      this.word = this.$route.params.keyWord  //这是上个路由传过来的搜索关键字
      console.log('word:' + this.word)
      var url = '/soso/fcgi-bin/search_for_qq_cp?g_tk=792116527&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=' + this.word + '&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=2&remoteplace=txt.mqq.all&_=1514358703016'
      var that = this   // 将当前vue对象 存到that常量
      axios.get(url)
        .then(function (response) {
          var allData= response.data.data
          that.singName = allData.zhida.singername
          that.songnum = allData.zhida.songnum
          that.singermid = allData.zhida.singermid
          that.albumnum = allData.zhida.albumnum //分析QQ音乐json数据得到歌手的信息
          that.songList = allData.song.list
          if(allData.zhida.type === 0){
              that.isok = false
          }
        })
        .catch(function (err) {
          ('匹配不成功')
        })
    },
    methods: {
      played (data) {
        console.log("我已出发")
        this.$parent.$parent.$emit('broadcastMdata',data) //触发自定义事件 负责传数据
        this.$parent.$parent.$refs.footer.$emit('playTwo')
//        this.$parent.$parent.$refs.footer.playTwo()
      },
      broadcastUrl(data) {            // 这个广播方法接受搜索栏的内容改变时
        console.log("路由改变的值："+data)
        this.word = data
      }
    },
    watch:{
      word:function(){
        var url = '/soso/fcgi-bin/search_for_qq_cp?g_tk=792116527&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=' + this.word + '&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=2&remoteplace=txt.mqq.all&_=1514358703016'
        var that = this   // 将当前vue对象 存到that常量
        axios.get(url)
          .then(function (response) {
            var allData= response.data.data
            that.singName = allData.zhida.singername
            that.songnum = allData.zhida.songnum
            that.singermid = allData.zhida.singermid
            that.albumnum = allData.zhida.albumnum //分析QQ音乐json数据得到歌手的信息
            that.songList = allData.song.list
            if(allData.zhida.type === 0){
              that.isok = false
            }
          })
          .catch(function (err) {
            ('匹配不成功')
          })
   }
    }
  }
</script>
<style scoped>
  .searchResult{
    position: absolute;
    top:.8rem;
    width:7.2rem;

  }
.singerInfo{
  width:7.2rem;
  height:1rem;
  border:.01rem solid #dadcdd;
  display:flex;
}
  .singerImg{
    display: inline-block;
    width:.8rem;
    height:.8rem;
    border-radius: 50%;
    margin-top: .1rem;
    margin-left: .16rem;
  }
  .singerName{
    font-size: .32rem;
  }
  .singerSong{
    display:inline-block;
    margin-top: .12rem;
    margin-left: .32rem;
  }
  .songListicon{
    width:.52rem;
    height:.52rem;
    background-image: url("./img/iconMusic.png");
    background-size:100% 100%;
    display: inline-block;
    margin-top: .19rem;
    margin-left: .32rem;
  }
  .songList{
    width:7.2rem;
    height:.9rem;
    border-bottom: .01rem solid #dadcdd;
    text-overflow:ellipsis;
  }
.songInfo{
  display: inline-block;
  margin-left: .4rem;
}
.singerNametwo{
  font-size: .20rem;
}
.singerNametwo span{
  width:2rem;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
  .songName{
    font-size: .28rem;
    width:5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
