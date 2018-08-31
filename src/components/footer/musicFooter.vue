<template>
  <div class="musicfooter">
    <div class="footerImg">
      <img :src="albummidSrc" alt="" @click="gomusciInfo">
    </div>
    <div class="nameContent">
      <p class="musicName">{{musicData.songname}}</p>
      <p class="singer">{{musicData.singer[0].name}}</p>
    </div>
    <div class="btnAudio" id="btnaudio" @click="play" v-bind:class="{stop:isopen}">
      <audio :src="musicSrc" id="mp3Btn" ref="musciPlay">
        Your browser does not support the audio tag.
      </audio>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import broadcast from '../../../static/js/broadcast.js'
  export default {
    data () {
      return {
        isopen: false, // 添加stop样式
        isplay:false, //表示音乐是否播放完
        who:''
      }
    },
    props: [
      'musicData' // 表示从父组建传过来的数据
    ],
    computed: {  // 计算属性
      musicSrc: function () {
        console.log('我以调用')
        return '/C400' + this.musicData.songmid + '.m4a?guid=3647056699&vkey=FBFF2338281EE4EAB20DAE08FC4799CB7891EB51C777C002DA17B4B2E8750A33310AB48282802B46E642F7B624E8DD3022ECB5030437276E&uin=0&fromtag=38'
      },
      albummidSrc: function () {
        return '//y.gtimg.cn/music/photo_new/T002R150x150M000' + this.musicData.albummid + '.jpg?max_age=2592000'
      }
    },
    mounted: function () {
      console.log(this.musicData)
      // Code that will run only after the
      // entire view has been rendered
      this.$on('playTwo', function () {   // $on监听当前实例上的自定义事件
//        console.log(isMe)
//        this.who = isMe
        this.playTwo()
      })
      this.$on('getisMe',function(isMe){
        this.getisMe(isMe)
      })
    },
    methods: {
      play () {
          let $mp3Btn = this.$refs.musciPlay  // vue.js中的获取DOM元素
          this.musicIsplay($mp3Btn)
      },
      gomusciInfo(){
        let $mp3Btn = this.$refs.musciPlay
        $mp3Btn.pause()
        this.isopen = false      //在页面跳转时是主页footer组件中的歌暂停
        this.$router.push({path:'/musicInfo/' + this.musicData.songid})
      },
      getisMe (data) {
        this.who = data
      },
      playTwo (data) {
          this.isplay = data
          let that = this
            setTimeout(function() {          //这里的是使异步优先级降最低等数据加载完才会播放。
              let $mp3Btn = that.$refs.musciPlay  // vue.js中的获取DOM元素
               that.musicIsplay($mp3Btn)
            },10)
      },
      musicIsplay (obj) {
        console.log('音频总时长:' + obj.duration)
        var that = this
        obj.onended = function () {  //在这个播放结束时事件中的this指向不是vue实例了 而是obj
          console.log('音频已播放完成')
          that.isopen = false   //设置样式为false
          that.isplay = true   //是播放完了
          if(that.who === 'Iamsinger'){   //判断是哪个组建传过来的音乐数据 因为他们的组建层级不同所以要分开处理
//            console.log(that.$parent.broadcast('singerHomepage','broadcastIsplay',that.isplay)) //歌手个人主页
            console.log('现在走的时singerHomepage组件中的')
            that.who ='Iamsinger'
            console.log(that.$parent)
            that.dispatch('index','isplayCast',that.isplay) //先向上分发后向下分发
            that.who = '' //初始化who
            console.log(that.who)
          }else {
            console.log('此时走的是recommendPlaylist组建中的')
            console.log(that.isplay)
            that.dispatch('index','isplayCastTwo',that.isplay) //先向上分发后向下分发
          }
        }
        if (obj.paused) { // 如果当前状态是停止
          console.log('音频是暂停')
          this.isopen = true
//          obj.currentTime = 265 //设置音乐初始的播放时刻
          obj.play()
          console.log("当前音乐的播放时刻:"+obj.currentTime)
        } else {
          obj.pause()
          this.isopen = false
        }
      }
    },
    mixins: [broadcast]  //混合插件使上下文一致
  }
</script>
<style scoped>
  .musicfooter {
    width: 7.2rem;
    height: .8rem;
    background: #ffffff;
    position: fixed;
    bottom: 0;
    margin-top: -.8rem;
    border-top: .01rem solid #d0d2d2;
    z-index: 100;
  }
  .footerImg {
    width: .64rem;
    height: .64rem;
    float: left;
    background-image: url("./img/footerImg.jpg");
    background-size: 100% 100%;
    margin: .08rem .32rem 0 .16rem;
  }

  .footerImg img {
    width: .64rem;
    height: .64rem;
  }

  .nameContent {
    float: left;
    margin-top: .08rem;
    height:.64rem;
  }

  .nameContent .musicName {
    font-size: .22rem
  }

  .singer {
    font-size: .20rem;
    color: #c2c3c4;
    margin-top: .08rem;
  }

  .btnAudio {
    position: absolute;
    left: 6rem;
    top: .08rem;
    background-image: url("./img/yes.png");
    background-size: 100% 100%;
    width: .64rem;
    height: .64rem;
    border-radius: 50%;
  }

  .musicfooter .stop {
    background-image: url('./img/no.png');
  }

  #mp3Btn {
    width: 2rem;
    height: 2rem;
    /*background: black;*/
  }

</style>
