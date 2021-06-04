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
                	<img :src="image" alt="未找到图片" style="width:100px;height:40px;float:left;margin-left:200px;margin-right: 50px;"/>
                	 
                   <div class = "input_page"><span>欢迎搜索</span><el-autocomplete
      class="inline-input input"
      v-model="input"
      :fetch-suggestions="querySearch"
      @select="handleSelect"
      clearable
      placeholder="请输入搜索关键字"
          >
          <i slot="suffix" class="el-input__icon el-icon-camera icon" @click="handleIconClick"></i>
        </el-autocomplete>
                     <el-button type="primary"  icon="el-icon-search" @click="searchImg">搜索</el-button>
                   
                     <a  href="/" class="desp link">搜图首页</a>&nbsp;&nbsp;&nbsp;
                     <i class="el-icon-info"></i>
                     <el-dropdown split-button type="primary" @click="handleClick" @command="handleCommand">用户123
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="您将进入个人信息中心页面">个人中心</el-dropdown-item>
                        <el-dropdown-item command="您将进入账号信息设置页面">账号设置</el-dropdown-item>
                        <el-dropdown-item command="您将进入退出个人账号">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                   </div>

                </div></el-col>
            </el-row>
            <el-row v-if="seen">
                  <el-col :span="24"><div class="grid-content bg-no">
                    <p class="desp">暂未查询到相关图片</p>
                  </div>
                </el-col>
            </el-row>
            <el-row v-else>
                <el-col :span="24"><div class="grid-content bg-purple-light">
                	<p class="desp">找到相关图片共90张</p>

                	<el-row :gutter="20">
      <el-col :span="8"><div class="grid-content ">
      	   <img :src="image1" class="pic"><el-button type="primary">下载<i class="el-icon-download el-icon--right" @click="doDownload(1)"></i></el-button>
      </div><span class="demonstration">照片评分</span>
  <el-rate
    v-model="value2"
    :colors="colors">
  </el-rate></el-col>
      <el-col :span="8"><div class="grid-content ">
      	   <img :src="image2" class="pic"><el-button type="primary">下载<i class="el-icon-download el-icon--right" @click="doDownload(2)"></i></el-button>
      </div>
    <span class="demonstration">照片评分</span>
  <el-rate
    v-model="value2"
    :colors="colors">
  </el-rate></el-col>
      <el-col :span="8"><div class="grid-content ">
      	    <img :src="image3" class="pic"><el-button type="primary">下载<i class="el-icon-download el-icon--right" @click="doDownload(3)"></i></el-button>
      </div>
    <span class="demonstration">照片评分</span>
  <el-rate
    v-model="value2"
    :colors="colors">
  </el-rate></el-col>
      </el-row >

      <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="8"><div class="grid-content ">
           <img :src="image4" class="pic"><el-button type="primary">下载<i class="el-icon-download el-icon--right" @click="doDownload(4)"></i></el-button>
      </div>
    <span class="demonstration">照片评分</span>
  <el-rate
    v-model="value2"
    :colors="colors">
  </el-rate></el-col>
      <el-col :span="8"><div class="grid-content ">
           <img :src="image5" class="pic"><el-button type="primary">下载<i class="el-icon-download el-icon--right" @click="doDownload(5)"></i></el-button>
      </div>
    <span class="demonstration">照片评分</span>
  <el-rate
    v-model="value2"
    :colors="colors">
  </el-rate></el-col>
      <el-col :span="8"><div class="grid-content ">
            <img :src="image6" class="pic"><el-button type="primary">下载<i class="el-icon-download el-icon--right" @click="doDownload(6)"></i></el-button>
      </div>
    <span class="demonstration">照片评分</span>
  <el-rate
    v-model="value2"
    :colors="colors">
  </el-rate></el-col>
      </el-row >

      <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="8"><div class="grid-content ">
           <img :src="image7" class="pic"><el-button type="primary">下载<i class="el-icon-download el-icon--right" @click="doDownload(7)"></i></el-button>
      </div>
    <span class="demonstration">照片评分</span>
  <el-rate
    v-model="value2"
    :colors="colors">
  </el-rate></el-col>
      <el-col :span="8"><div class="grid-content ">
           <img :src="image8" class="pic"><el-button type="primary">下载<i class="el-icon-download el-icon--right" @click="doDownload(8)"></i></el-button>
      </div>
    <span class="demonstration">照片评分</span>
  <el-rate
    v-model="value2"
    :colors="colors">
  </el-rate></el-col>
      <el-col :span="8"><div class="grid-content ">
            <img :src="image9" class="pic"><el-button type="primary">下载<i class="el-icon-download el-icon--right" @click="doDownload(9)"></i></el-button>
      </div>
    <span class="demonstration">照片评分</span>
  <el-rate
    v-model="value2"
    :colors="colors">
  </el-rate></el-col>
      </el-row >

                </div></el-col>
            </el-row>
              <div class="block">
                <p></p>
                <p></p>
    <span class="demonstration">分页查询</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="9"
      layout="total, prev, pager, next"
      :total="90">
    </el-pagination>
  </div>
     	</el-main>

     </el-container>
</template>

<script type="text/javascript">
import image1 from '../assets/logo2.png'
import Vue from 'vue'
export default{
    data(){
    	return{
    		image:image1,
        image1:"",
        image2:"",
        image3:"",
        image4:"",
        image5:"",
        image6:"",
        image7:"",
        image8:"",
        image9:"",
    		input:'',
        url:"http://100.66.52.7:5000",
    		fileList:[],
    		dialogVisible:false,
        words:[],
        seen:true,
        currentPage1:1,
        value2: null,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    	}
    },
    created:function(){
        this.refresh();
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
      createFilter(queryString) {
        return (word) => {
          return (word.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSizeChange(newSize) {
      console.log(newSize);
    },
      handleCurrentChange(newPage){
        this.currentPage1 = newPage;
        this.getByPage();
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
      refresh(){
         if(this.$route.query.result==="no"){
            this.input=this.$route.query.q;
            return;
         }
          this.image1=this.url+this.$route.query.result.image0;
          this.image2=this.url+this.$route.query.result.image1;
          this.image3=this.url+this.$route.query.result.image2;
          this.image4=this.url+this.$route.query.result.image3;
          this.image5=this.url+this.$route.query.result.image4;
          this.image6=this.url+this.$route.query.result.image5;
          this.image7=this.url+this.$route.query.result.image6;
          this.image8=this.url+this.$route.query.result.image7;
          this.image9=this.url+this.$route.query.result.image8;
          this.input=this.$route.query.q;
          this.seen=false;
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
          this.refresh();
      },
      doDownload(val){
        if(val == 1){
          this.downloadByBlob(this.image1,'img1');
        }
        else if(val == 2){
          this.downloadByBlob(this.image2,'img2');
        }
        else if(val == 3){
          this.downloadByBlob(this.image3,'img3');
        }
        else if(val == 4){
          this.downloadByBlob(this.image4,'img4');
        }
        else if(val == 5){
          this.downloadByBlob(this.image5,'img5');
        }
        else if(val == 6){
          this.downloadByBlob(this.image6,'img6');
        }
        else if(val == 7){
          this.downloadByBlob(this.image7,'img7');
        }
        else if(val == 8){
          this.downloadByBlob(this.image8,'img8');
        }
        else if(val == 9){
          this.downloadByBlob(this.image9,'img9');
        }
      },
      download(href, name) {
  let eleLink = document.createElement('a')
  eleLink.download = name
  eleLink.href = href
  eleLink.click()
  eleLink.remove()
},
      downloadByBlob(url,name) {
    let image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
    image.onload = () => {
      let canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, image.width, image.height)
      canvas.toBlob((blob) => {
        let url = URL.createObjectURL(blob)
        download(url,name)
        // 用完释放URL对象
        URL.revokeObjectURL(url)
      })
    }
  },
      handleClick(){
        alert('查看用户信息');
      },
      handleCommand(command) {
        alert(command);
      },
      searchImg(){
        if(!this.input){
          this.$router.push('/');
          return;
        }
        Vue.axios.post('/api/searchByKey?key='+this.input+'&page=1').then((response)=>{
              console.log(response);
              this.$router.push({path:'/result',query:{'result':response.data,'q':this.input}});
              this.refresh();
          }).catch((error)=>{
        console.log(error);
         this.$router.push({path:'/result',query:{'result':"no",'q':val}});
         this.refresh();
      });
      },
      getByPage(){
        if(!this.input){
          this.$router.push('/');
          return;
        }
        Vue.axios.post('/api/searchByKey?key='+this.input+'&page='+this.currentPage1).then((response)=>{
          console.log(response);
          this.$router.push({path:'/result',query:{'result':response.data,'q':this.input}});
          this.refresh();
        }).catch((error)=>{
          console.log(error);
          this.$router.push({path:'/result',query:{'result':"no",'q':val}});
         this.refresh();
        });
      }
    }
};
	
</script>

<style scoped>
a:link{
  text-decoration:none;
 }
 a:hover{
  color: #6d9eeb;
 }
.icon:hover{
	color:#87CEFA;
}
 .input{
  	width: 500px;
  	margin-left: 20px;
  }
.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
 .bg-purple-dark {
    text-align: left;
  }
  .desp{
  	color: grey;
  	font-size: 15px;
  }
  .link{
  	margin-left: 30%;
  }
   .bg-purple-light{
  	 width: 80%;
    margin: 0 auto;
    text-align: left;
  }
  .pic{
  	width:65%;
  	height: 250px;
  }
  .bg-no{
    margin-top: 50px;
  }
  .input_page{
    margin-right: 50px;
  }
</style>