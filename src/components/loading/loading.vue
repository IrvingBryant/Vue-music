<template>
  <div class="loading" ref="loading" >
    <div class="loadingContent">
    <img src="/static/img/loding.gif" alt=""/>
    <p>玩命加载中loading</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style scoped>
   .loading{
     position: relative;
     top: .8rem;
     min-height: 11.2rem;
     background: #f2f4f5;
     padding-bottom: .8rem;
     min-height: 11.2rem;
     display: none;
   }
  .loading .loadingContent{
    position: absolute;
    left:50%;
    margin-left: -2rem;
    text-align: center;
    height:4rem;
    margin-top:3rem;
  }
  .loadingContent img{
    width:4rem;
    height:4rem;
  }
   .loadingContent p{
   margin-top: -.8rem;
   }
</style>
