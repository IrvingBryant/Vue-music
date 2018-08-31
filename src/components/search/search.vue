<template>
  <div class="search" slot="search">
  <div class="searchHead">
    <router-link to="/"><div class="searchExit"></div></router-link>
    <div class="searchInput"><input type="text" placeholder="请输入您想听的歌名" v-model="searchVal" @keyup.enter="onEnter"/></div>
  </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import broadcast from '../../../static/js/broadcast.js'
  export default {
    data () {
      return {
        ok: false,
        searchVal: '' // 搜索的值
      }
    },
    methods: {
      onEnter () {
        if (this.searchVal.trim() !== '') {
//          window.location.href = '/search/' + this.searchVal
           this.$router.push({path:'/search/' + this.searchVal})
           this.broadcast('searchResult','broadcastUrl',this.searchVal)
        }
      }
    },
    mixins:[broadcast]
  }
</script>
<style scoped>

  .searchBody{
    position: absolute;
    top:.8rem;
  }
  .search{
    background: #f2f4f5;
    /*min-height:100%;*/
    width: 7.2rem;
  }
  .searchHead {
    height: .8rem;
    width: 7.2rem;
    background: #d33a31;
    position: fixed;
    z-index: 10;
    top: 0;
  }

  .searchExit {
    width: .4rem;
    height: .4rem;
    float: left;
    background-image: url("./img/searchExit.png");
    background-size: 100% 100%;
    margin: .2rem .3rem;
    margin-right: .4rem;
  }

  .searchInput input {
    width: 5.6rem;
    height: .6rem;
    background: none;
    outline: none;
    border: 0px;
    border-bottom: .01rem solid #edb0ad;
    margin-top: .06rem;
    color: #e0756e;
  }
  .searchInput input::-webkit-input-placeholder { /* WebKit browsers */
    color: #e0756e;
  }

  .searchInput input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #e0756e;
  }

  .searchInput input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #e0756e;
  }

  .searchInput input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #e0756e;
  }

  [data-dpr="1"] .searchInput input {
    font-size: 16px;
  }

  [data-dpr="2"] .searchInput input {
    font-size: 32px;
  }

  [data-dpr="3"] .searchInput input {
    font-size: 48px;
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
    border-bottom: .01rem solid #e5e7e8;
    margin-top: .1rem;
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

</style>
