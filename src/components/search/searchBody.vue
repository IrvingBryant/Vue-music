<template>
  <div class="searchBody">
    <div class="singerClassify">
      <router-link to="/hotSinger" class="goLink"><p><img src="./img/singer.png" alt=""/>歌手分类<span>&gt;</span></p></router-link>
    </div>
    <div class="hotSearch">
      <p>热门搜索</p>
      <div class="searchContentArea" >
        <span class="hotsearchContent" v-for="(item,key) in searchContent" :key="item.id" @click="goSearch(item)">{{item}}</span>
      </div>
    </div>
    <div class="searchHistory"  v-show="item.show"  v-for="item in searchHistory" >
      <p><img src="./img/history.png" alt=""><span>{{ item.name }}</span><img src="./img/close2.png"  @click="hide(item)"  class="closeHistory"></p>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        searchContent: ['你是不是我最疼爱的人', 'Maroon 5', '冰雨', 'SomeThing Just Like This', '刘德华'], // 表示热搜内容
        searchVal: '' , // 搜索的值
        searchHistory: [
          {name: '刘德华' , show:true},
          {name: '刘德华' , show:true},
          {name: '刘德华' , show:true},
          {name: '刘德华' , show:true},
          {name: '刘德华' , show:true}
         ] // 表示历史搜索内容
      }
    },
    methods: {
      hide (item) {
        console.log('hide方法触发')
        item.show = !item.show
      },
      goSearch (item) {
//        window.location.href = '/search/' + item // 表示点击跳转值searchResult 页面
        this.$router.push({path:'/search/' + item})
      }
    }
  }
</script>
<style scoped>
  .searchBody{
    position: absolute;
    top:.8rem;
    min-height:12rem;
    background: #f2f4f5;

  }
  .singerClassify p img{
    width:.4rem;
    height:.4rem;
    position:relative;
    top:.1rem;
    margin-right: .16rem;
    display: inline-block;
  }
  .singerClassify{
    width:7.2rem;
    height:.6rem;
    border-bottom: .01rem solid #e8e9ea;
    text-align: center;
    line-height: .6rem;
    color: #616262;
  }
  .singerClassify p span{
    margin-left: .16rem;
    font-size: .24rem;
    position: relative;
    /*top:.03rem;*/
  }
  .hotSearch{
    height:3rem;

    border-bottom: 0.01rem solid #e5e7e8;
    width:5.72rem;
    padding:.6rem 1rem 1rem .48rem
  }
  [data-dpr="1"] .hotSearch p{
    font-size: 16px;
    color:#aaabac;
  }
  [data-dpr="2"] .hotSearch p{
    font-size: 32px;
    color:#aaabac;
  }
  [data-dpr="3"] .hotSearch p{
    font-size: 48px;
    color:#aaabac;
  }
  .searchContentArea{
    padding-top: .32rem;
    display:flex;
    flex-wrap: wrap;
    justify-content:flex-start;
  }
  .hotsearchContent{
    border:.01rem solid #ced0d0;
    border-radius: .2rem;
    padding:.1rem;
    margin-top: .16rem;
    text-align: center;
    color:#303131;
    margin-left: .16rem;
  }
  .searchHistory{
    width:7.2rem;
    height:.6rem;
    color:#303130;
    /*border-bottom: .01rem solid #e5e7e8;*/
    /*margin-top: .1rem;*/
  }
  .searchHistory img{
    width:.48rem;
    height:.48rem;
    vertical-align: middle;
    margin-top: -0.06rem;
    margin-left: .32rem;
    margin-right: .16rem;
  }
  .searchHistory span {
    line-height: .6rem;
    width:5rem;
    height:.6rem;
    display: inline-block;
  }
  .closeHistory{
    width:.48rem;
    height:.48rem;

  }
 .goLink{
   text-decoration:none;
   color: #303131;
 }
</style>
