<template>
<el-container>
  
<el-main style="padding:0px">

	<el-dialog
  title="智能识图"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">
  <el-tooltip class="item" effect="dark" content="智能识图：识别人物、搜索服饰、寻找高清素材、浏览相似美图，尽在智能识图!   上传一张图片，我们将会为您展示相似图片。" placement="top" :enterable="false" >
          <i class="el-icon-question"></i>
  </el-tooltip>
  <el-upload
  class="upload-demo"
  drag
  ref="upload"
  action="/api/imgUpload"
  multiple
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :auto-upload="false"
   :limit="1"
   :on-exceed="handleExceed"
  :on-success="handleSuccess"
  :file-list="fileList"
   list-type="picture">
   
   <p>本地上传</p>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">拖拽图片到此处试试，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
   </el-upload>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitPicture">识 图 一 下</el-button>
  </span>
   </el-dialog>

<el-row>
<el-col :span="24"><div class="grid-content bg-purple-dark">
    <div class = "wrapper_userinfo_box">
    <div class = "wrapper_userinfo_cover">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1"><el-link href="https://news.baidu.com/" target="_blank">新闻</el-link></el-menu-item>
  <el-menu-item index="2"><el-link href="https://www.hao123.com/" target="_blank">hao123</el-link></el-menu-item>
  <el-menu-item index="3"><el-link href="https://map.baidu.com/" target="_blank">地图</el-link></el-menu-item>
  <el-menu-item index="4"><el-link href="https://tieba.baidu.com/" target="_blank">论坛</el-link></el-menu-item>
  <el-submenu index="6">
    <template slot="title">更多</template>
    <el-menu-item index="6-1">音乐</el-menu-item>
    <el-menu-item index="6-2">知道</el-menu-item>
    <el-menu-item index="6-3">网盘</el-menu-item>
  </el-submenu>
</el-menu>
    </div>

    <div id = "user_info">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1"><el-link href="https://www.baidu.com/" target="_blank">首页</el-link></el-menu-item>    
  <el-menu-item index="2"><el-link οnclick="javascript:window.external.addFavorite('http://www.baidu.com','百度')" target="_blank" title="收藏本站">收藏本站</el-link>
  </el-menu-item>
  <el-menu-item index="3"><el-link href="#" target="_blank">官方合作</el-link></el-menu-item> 
<el-menu-item index = "4">
  <el-dropdown>
  <span class="el-dropdown-link">
    <i class="el-icon-info"></i>用户1234<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item divided>个人中心</el-dropdown-item>
    <el-dropdown-item divided>账号设置</el-dropdown-item>
    <el-dropdown-item divided>退出登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</el-menu-item>

</el-menu>
    </div>
  </div>
    <img :src="image1" alt="未找到图片" style="margin-top:150px;margin-left: 360px;"/>
    <div class="grid-content bg-purple">
          <el-autocomplete
      class="inline-input input"
      v-model="input"
      :fetch-suggestions="querySearch"
      @select="handleSelect"
      clearable
      placeholder="请输入搜索关键字"
          >
          
          <!--<i slot="suffix" class="el-input__icon el-icon-camera icon" @click="handleIconClick"></i>-->
        </el-autocomplete>
        <el-tooltip class="item" effect="dark" content="按图片搜索" placement="bottom" :enterable="false" >
          <el-button type="primary" plain icon="el-icon-camera" @click="handleIconClick"></el-button>
        </el-tooltip>
            <el-button type="primary"  icon="el-icon-search" @click="searchImg">搜索</el-button>
            <p>
            <span style="font-size: 20px;">热门搜索：</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            <a style="color: white;font-size: 20px;" @click = "findimages('animals')">可爱动物</a>&nbsp;&nbsp;
            <a style="color: white;font-size: 20px;" @click = "findimages('structures')">宏伟建筑</a>&nbsp;&nbsp;
            <a style="color: white;font-size: 20px;" @click = "findimages('car')">炫酷跑车</a>
            </p>
            
    </div>
</div></el-col>
</el-row>


<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-light" style="margin:0 auto">
      <p>精选推荐</p>
        <el-carousel :interval="4000" height="375px"  type = "card">
    <el-carousel-item v-for="(item,index) in slideImgs" :key="index">
      <img :src="item.src" alt="未找到图片" @click="findimages(item.route)">
       <div class="slide-info">
         <p>{{item.description}}</p>
       </div>
    </el-carousel-item>
  </el-carousel>
  </div>
</el-col>
</el-row>

</el-main>
</el-container>
</template>

<script type="text/javascript">
import image1 from '../assets/logo2.png'
import Vue from 'vue'
export default{
     data () {
        return {
        	image1:image1,
        	input:'',
        	dialogVisible:false,
        	fileList:[],
          words:[],
          activeIndex:'1',
          activeIndex2:'1',
          slideImgs: [
        {
          src: require('../assets/slideShow-images/im1.jpg'),
          description: '动物专题',
          href: '',
          route:'animals'
        },
        {
          src: require('../assets/slideShow-images/im2.jpg'),
          description: '花卉专题',
          href: '',
          route:'flower'
        },
        {
          src: require('../assets/slideShow-images/im3.jpg'),
          description: '美食专题',
          href: '',
          route:'food'
        },
        {
          src: require('../assets/slideShow-images/im4.jpg'),
          description: '人像专题',
          href: '',
          route:'female'
        },
        {
          src: require('../assets/slideShow-images/im5.jpg'),
          description: '风景专题',
          href: '',
          route:'sunset'
        },
        {
          src: require('../assets/slideShow-images/im6.jpg'),
          description: '汽车专题',
          href: '',
          route:'car_r1'
        }
      ]
        }
    },
     mounted() {
      this.words = this.loadAll();
    },
    methods:{
      querySearch(queryString, cb) {
        var words = this.words;
        var results = queryString ? words.filter(this.createFilter(queryString)) : words;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      createFilter(queryString) {
        return (word) => {
          return (word.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
            {"value":"animals"},
            {"value":"baby"},
            {"value":"bird"},
            {"value":"car"},
            {"value":"flower"},
            {"value":"food"},
            {"value":"indoor"},
            {"value":"clouds"},
            {"value":"dog"},
            {"value":"female"},
            {"value":"lake"},
            {"value":"male"},
            {"value":"night"},
            {"value":"people"},
            {"value":"portrait"},
            {"value":"sea"},
            {"value":"sky"},
            {"value":"structures"},
            {"value":"sunset"},
            {"value":"tree"},
            {"value":"transport"},
            {"value":"river"},
            {"value":"water"},
        ]
      },
      handleSelect(item) {
        console.log(item);
      },
        handleIconClick(){
            this.dialogVisible=true;
        },
      submitPicture(){
        	this.$refs.upload.submit();
      },
        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning("最多上传一张图片");
      },
      handleSuccess(response){
         console.log(response);
          this.$router.push({path:'/result',query:{'result':response}});
      },
      findimages(val){
          Vue.axios.post('/api/searchByKey?key='+val+'&page=1').then((response)=>{
              console.log(response);
              this.$router.push({path:'/result',query:{'result':response.data,'q':val}});
          }).catch((error)=>{
        console.log(error);
        this.$router.push({path:'/result',query:{'result':"no",'q':val}});
      });
      },  
      searchImg(){
          if(!this.input){
          this.$router.push('/');
          return;
           }
           this.findimages(this.input);
        }

    }

};
</script>

<style scoped>
.icon:hover{
	color:#87CEFA;
}
 .grid-content {
    border-radius: 4px;
    min-height: 36px;
    }
  .wrapper_userinfo_box {
    position: relative;
    height: 48px;
    z-index: 2000;
  }
  .wrapper_userinfo_cover {
    position: absolute;
    top: 0;
    width: 100%;
    height: 48px;
    opacity: .3;
    filter: alpha(opacity=30);
  }
  #user_info{
    float: right;
    opacity: .3;
    filter: alpha(opacity=30);
  }
  .slide-info {
  position:absolute;
  bottom:0;
  width:500px;
  height:50px;
  line-height:30px;
  background:#000;
  opacity:0.5;
  color:#fff;
}
.slide-info p {
  float:left;
  margin-left:30px;
}
   .bg-purple-dark {
   	text-align: center;
    background: url(../assets/shanghai2.jpg) no-repeat;
    background-size: cover;
    width: 100%;
    height:800px;
  }
  .bg-purple {
    width: 70%;
    margin:0 auto ;
  }
  .bg-purple-light{
  	 width: 80%;
    margin: 0 auto;
    text-align: left;
  }
  .input{
  	width: 50%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
</style>