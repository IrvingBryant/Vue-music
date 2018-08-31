<template>
   <div class="errorBox">
       <div class="gologin" @click='gologin'>Click Me Go Login！</div>
   </div>
</template>
<script type="text/ecmascript-6">
  export default {
    methods:{
      gologin(){
        this.$router.push({path:'/login'});
      }
    }
  }
</script>
<style scoped>
  .errorBox{
    width:100%;
    height:11.2rem;
    position: relative;
    top:0.8rem;
    background-image:url('/static/img/error.jpg');
    background-size: 100% 100%;
  }
  .gologin{
    width: 4rem;
    height:1rem;
    position: relative;
    left:50%;
    transform:translateX(-50%);
    font-size: .36rem;
    top:2rem;
    background-size: 100% 100%;
    text-align: center;
    line-height: 1rem;
    color: #633716;
  }

</style>
