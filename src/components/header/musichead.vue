<template>
  <div class="indexHead">
  <div class="musicHead" >
    <img src="./img/menu.png" alt="" @click="showInfo() "/>
    <div class="centerLog">
     <img :src="activity===0 ?  '../static/img/music.png': '../static/img/music2.png'"  @click="gomyMusic()"/>
      <router-link to="/"><img :src="activity===1 ?  '../static/img/musicLog.png': '../static/img/musicLog2.png'" @click="select(1)"  /></router-link>
      <img :src="activity===2 ?  '../static/img/social.png': '../static/img/social2.png'" @click="gosoclai()" />
    </div>
    <router-link to="/search"><img src="./img/search.png" alt=""/></router-link>
  </div>
    <myInfo :result="active" @on-result-change="onResultChange"></myInfo>
  </div>

</template>
<script type="text/ecmascript-6">
  import myInfo from '../myInfo/myInfo.vue'
  export default {
    data () {
      return {
        activity: 1,
        active: false
      }
    },
    methods: {
      select (activity) {
        this.activity = activity
      },
      onResultChange (val) {
        this.active = val // ④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
      },
      showInfo () {
        this.active = !this.active
      },
      getCookie(key){
        var cookieArr = document.cookie.split('; ');
        for(var i = 0; i < cookieArr.length; i++) {
          var arr = cookieArr[i].split('=');
          if(arr[0] === key) {
            return arr[1];
          }
        }
        return false;
      },
      gomyMusic(){
        this.activity = 0;
        //判断是否登录
         if(!this.getCookie('userName')){
             this.$router.push({path:"/error"})
         }else{
            this.$router.push({path:"/myMusic"})
         }
      },
      gosoclai(){
        this.activity = 2;
        //判断是否登录
        if(!this.getCookie('userName')){
          this.$router.push({path:"/error"})
        }else{
          this.$router.push({path:"/soclai"})
        }
      }
    },
    components: {
      myInfo
    }
  }
</script>
<style scoped>
.musicHead{
  display: flex;
  justify-content: space-between ;
  width: 7.2rem;
  height:.8rem;
  background: #e20000;
  position: fixed;
  z-index:9;
 }
  .musicHead img{
     width:.40rem;
     height:.40rem;
     margin:.2rem .32rem 0rem .32rem;

  }


</style>
