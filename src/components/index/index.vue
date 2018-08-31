<template>
  <div class="main">
    <musichead></musichead>
    <!--keep-alive vue中内置设置浏览器缓存-->
    <!--<loading></loading>-->
    <keep-alive include="musicCenter">
    <router-view></router-view>
    </keep-alive>
    <musicFooter :musicData="songData"  ref="footer"></musicFooter> <!--ref属性用于直接访问它 只能访问他的子组建-->
  </div>
</template>
<script type="text/ecmascript-6">
  import musichead from '../header/musichead.vue'
  import musicFooter from '../footer/musicFooter.vue'
  import loading from '../loading/loading.vue'
  import indexBroadcast from '../../../static/js/broadcast.js'
  export default {
    name:'index',
    data () {
      return {
        songData:{
          "songname": "Something Just Like This",
          "singer": [{
            "id": 156095,
            "songmid": "004JaCzc1KhTrU",
            "name": "The Chainsmokers"
          }],
          "songmid": "004JaCzc1KhTrU",
          "albummid": "001fyOld32C1nv",

        }, //初始化 musciFooter 数据
        songlistData:'',
        isplay:'',
      }
    },
    components: {
      musichead,
      musicFooter,
      loading
    },
    methods: {
      broadcastMdata(data) {            // 这个广播方法接受音乐的基本数据
         console.log(data.songmid)
        console.log(data)
        this.songData = data
        console.log(this.songData)
      },
      getlistData (data){
        console.log('getlistData触发')
        this.songlistData = data
        console.log(this.songlistData)
      },
      isplayCast(data){
        this.isplay = data
        console.log(data)
        this.broadcast('singerHomepage','broadcastIsplay',data)
    },
      isplayCastTwo(data){
        this.isplay = data
        console.log(data)
        this.broadcast('recommendPlaylist','broadcastIsplay',data)
      }
    },
    mounted: function(){
      this.$on('broadcastMdata',function(data){ //监听broadcast自定义事件
        this.broadcastMdata(data)
      })
      this.$on('getlistData',function(data){ //监听broadcast自定义事件
        this.getlistData(data)
      })
      this.$on('isplayCast',function(data){ //监听broadcast自定义事件
        this.isplayCast(data)
      })
      this.$on('isplayCastTwo',function(data){ //监听broadcast自定义事件
        this.isplayCastTwo(data)
      })
    },
    mixins:[indexBroadcast]
  }
</script>
<style>

</style>
