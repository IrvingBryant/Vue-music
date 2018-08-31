<template>
 <div class="musicCenter">
   <div class="loding" v-show="isok1">
     <img src="/static/img/loding.gif" class="lodingImg" >
     <P>玩命加载中loading</P>
   </div>
   <div v-show="isok2">
   <div class="recommendList">
     <p class="recommendTitele">推荐歌单 ></p>
     <div class="playList" v-for="item in songListData" :id="item.id" @click="goList(item.id)">
       <img :src="item.picUrl" alt="" class="playListImg">
        <p class="accessnum"><span></span>&nbsp;&nbsp;{{item.accessnum}}</p>
        <p class="songListDesc">{{item.songListDesc}}</p>
     </div>
   </div>
   <div style="padding-bottom:.16rem;">
   <p class="rangkingTitle">音乐排行榜 ></p>
   <div class="rankingList" v-for="item in rankingData" :id="item.id" @click="goList(item.id)">
     <div class="ranking">
       <img :src="item.picUrl" alt="" class="rankingImg"/>
       <div class="rankingContent">
         <h3>{{item.topTitle}}</h3>
         <p>{{item.songList[0].songname}} - <span>{{item.songList[0].singername}}</span></p>
         <p>{{item.songList[1].songname}} - <span>{{item.songList[1].singername}}</span></p>
         <p>{{item.songList[2].songname}} - <span>{{item.songList[2].singername}}</span></p>
       </div>
     </div>
   </div>
   </div>
   </div>
 </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          songListData:'',
          rankingData:'',
          isok1:true,
          isok2:false
        }
      },
      created: function(){
        var songurl = '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1514950706027'
        var rankingurl = '/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1514962558022'
        var that = this
        axios.get(songurl)
          .then(function(response){
            var data = response.data.data
            that.songListData = data.songList
            console.log(that.songListData)
          }).catch(function (err) {
          ('匹配不成功')
        })
        axios.get(rankingurl)
          .then(function(response){
            var rankingData = response.data.data
            that.rankingData = rankingData.topList
            console.log(that.rankingData)
            that.isok1=false
            that.isok2=true
          }).catch(function (err) {
          ('匹配不成功')
        })
      },
      methods:{
        goList (id) {
          console.log("go recommendPlaylist.vue 组建")
          this.$router.push({path:'/recommendPlaylist/'+id }) //表示路由跳转
        }
      }
    }

</script>
<style scoped>
  .musicCenter{
    width:7.2rem;
    min-height:100%;
    background:#f2f4f5;
    position: absolute;
    top:.8rem;
    padding-bottom: .8rem;
  }
  .recommendList{
    display: flex;
    flex-wrap:wrap;
    margin-bottom: .32rem;
  }
  .recommendTitele{
    height:.8rem;
    width:6.88rem;
    line-height: .8rem;
    font-size:.28rem;
    padding-left:.32rem;
  }
  .playList{
  width: 32%;
  height:2.9rem;
  margin-left: 1%;
  margin-top:1%;
  /*margin-top: .06rem;*/
}
  .playListImg{
    display: block;
    height:2.3rem;
    width:2.3rem;
  }
  .accessnum{
    position:relative;
    top:-.48rem;
    color: aliceblue;
  }
  .accessnum span{
    width:.4rem;
    height:.4rem;
    background-image: url("./img/accessnum.png");
    background-size:100% 100%;
    display: inline-block;
    position: relative;
    top:.08rem;
  }
 .songListDesc{
   position: relative;
   top:-.42rem;
 }
  .rankingList{
    height:2rem;
    margin-top: .16rem;
   margin-left: .16rem;
  }
  .rangkingTitle{
    height:.8rem;
    width: 6.88rem;
    line-height: .8rem;
    font-size: .28rem;
    padding-left: .32rem;
    border-top: .01rem solid #dadcdd;
    margin-bottom: -.16rem;
  }
  .rankingImg{
    width:2rem;
    height:2rem;
    float: left;
  }
  .rankingContent{
    float: left;
    width:4.8rem;
  }
  .rankingContent p{
    width:4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: .16rem;
    margin-left: .16rem;
  }
  .rankingContent h3{
    margin-left: .16rem;
    font-size: .28rem;
  }
  .rankingContent p span {
    color: #898a8b;
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

</style>
