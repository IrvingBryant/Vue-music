<template>
  <div class="hotSinger" ref="hotSinger">
    <div class="hotSingerAreaVue">
    <div class="hotSingerArea" v-for="(item,index) in singerAlldata" v-show="isok">
    <p class="hotSingerTitle" @click="isshow(item)"> {{item.title}} <span :class="{ current:item.show }">></span></p>
   <div class="hotSingerList"  ref="profile">
     <div class="singer"  v-for="item2 in item.Singerlist" :id="item2.singerId" v-show="item.show" @click="goHomepage(item2.singerId)">
       <img :src="'//y.gtimg.cn/music/photo_new/T001R300x300M00000'+item2.singerImg+'.jpg?max_age=2592000'" class="Img" />
        <p>{{item2.singerName}}</p>
     </div>
   </div>
    </div>
    </div>
    <router-view></router-view>
  </div>

</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        singerAlldata:'',
        singerImg:'',
        isok:true
      }
    },
    methods:{
      isshow (item) {
        item.show = !item.show
      },
      goHomepage (id){
        this.$router.push({path:'/hotSinger/'+id})
      }
    },
    created: function(){
      let url ='/static/json/hotSinger.json'
      var that = this
      axios.get(url)
        .then(function(response){
            that.singerAlldata = response.data.hotSingerList
          console.log(that.singerAlldata)
        })
    }

  }
</script>
<style scoped>
  .hotSinger{
    width: 100%;
    background:#f2f4f5;
    z-index:10;
    position: absolute;
    top:.8rem;
    min-height: 11.2rem;
    margin-bottom: .8rem;
  }
  .hotSingerList{
    width:100%;
    /*height :1.2rem;*/
    display:flex;
    flex-wrap:wrap;

  }
  .hotSinger .hotSingerTitle{
    font-size: .32rem;
    margin-left: 4.5%;
    height:.8rem;
    line-height: .8rem;
    width:95.5%;
  }
  .singer{
    width: 23.75%;
    height:2rem;
    /*background:red;*/
    margin-left:1%;
    margin-bottom: 1%;
    text-align: center;
    /*margin-top: .16rem;*/
  }
  .Img{
    display: block;
    width:1.6rem;
    height:1.6rem;
    position: relative;
    left:50%;
    margin-left: -.8rem;
    border-radius: 10%;
  }
  .singer p{
    /*margin-top: .16rem;*/
    overflow: hidden;
    font-size: .28rem;
    text-overflow: ellipsis;
    white-space: nowrap;/*强制不换行*/
  }
  .hotSingerTitle span{
    transition: transform .4s;
    -moz-transition:  -moz-transform .4s;	/* Firefox 4 */
    -webkit-transition: -webkit-transform .4s;	/* Safari 和 Chrome */
    -o-transition: -o-transform .4s;
  }
  .current{
    display: inline-block;
    transform: rotate(90deg);
  }


</style>
