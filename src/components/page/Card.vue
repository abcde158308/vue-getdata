<template>
   <div class="card">
       <div class="crumbs">
           <el-row style="width:100%;">
               <el-col :span="16">
                   <el-tabs v-model="activeName">
                       <el-tab-pane label="全部" name="all"></el-tab-pane>
                       <el-tab-pane label="内部数据清单" name="旅游"></el-tab-pane>
                       <el-tab-pane label="外部数据清单" name="教育"></el-tab-pane>

                   </el-tabs>
               </el-col>
               <el-col :span="8" style="box-sizing:border-box;">
                   <el-col :span="4" style="padding: 0 10px 0 0;">
                       <el-button size="medium" @click.native="changeList"><i :class="[el_icon_erp,imgList?icon_zhankai1:icon_zhankai]"></i></el-button>
                       <!--<i class="el-icon-erp icon-zhankai"></i>-->
                       <!--<i class="el-icon-erp icon-zhankai1"></i>-->
                   </el-col>
                   <el-col :span="20">

                       <el-input
                               width="100px;"
                               placeholder="请输入您想查询的数据清单"
                               suffix-icon="el-icon-search"
                               v-model="select_list">
                       </el-input>

                   </el-col>

               </el-col>
           </el-row>

       </div>
       <el-row style="width: 100%;" @click.native="add">

             <el-col v-if="imgList" style="text-align: center">
                 <el-col  v-if="data.length">
                     <el-col  v-for="(o,index) in data"  style="padding: 15px;width: 220px;">
                         <router-link :to="{name: 'tableCont',params:{userId:index,name:o.name,activeName:activeName}}">
                             <el-card :body-style="{ padding: '0px' }">
                                 <img :src="o.img" class="image">
                                 <div style="padding: 14px;">
                                     <span>{{o.name}}</span>
                                     <div class="bottom clearfix">
                                         <time class="time">{{o.time}}</time>

                                     </div>
                                 </div>
                             </el-card>
                         </router-link>
                     </el-col>
                 </el-col>
                 <p v-else style="text-align: center;line-height:600px;">查询数据为空</p>
             </el-col>
             <el-col v-else class="box-card">
                 <el-col  v-if="data.length">
                     <el-col class="text item" v-for="(o,index) in data">
                         <el-col :span="5"><img :src="o.img" alt=""></el-col>
                         <el-col :span="12">
                             <div class="title">
                                 {{o.name}}
                             </div>
                             <div class="main">
                                 涵盖旅游保险网7万家旅行社数据，1.3亿被保人数据，2万余家旅行社理赔数据
                             </div>
                             <div class="describe">
                                 <el-col :span="12">2小时前更新130000条数据</el-col>
                                 <el-col :span="12">大小150KB</el-col>
                             </div>

                         </el-col>
                         <el-col :span="7" class="show-detail">
                             <router-link :to="{name: 'tableCont',params:{userId:index,name:o.name,activeName:activeName}}">
                                 <el-button type="success">查看详情</el-button>
                             </router-link>

                         </el-col>
                     </el-col>
                 </el-col>


                 <p v-else style="text-align: center;line-height:600px;">查询数据为空</p>

             </el-col>
       </el-row>

   </div>
</template>

<style scoped>
    @import "../../assets/icon/iconfont.css";
    .text {
        font-size: 14px;
    }
    .item {
        padding: 18px 0;
        border-bottom: 1px dashed #cccccc;
    }
    .box-card {
        width: 856px;
    }
    .time {
        font-size: 13px;
        color: #999;
    }
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .title{
        margin: 10px 0 0 0;
        font-size: 16px;
        color: #7e6696;
    }
    .main{
        text-align: left;
        font-size: 14px;
        color: #999999;
        margin: 25px 0 0 0;
    }
    .describe{margin: 18px 0 0 0;color: #999999;}
    .show-detail{
        text-align: right;
        line-height: 140px;
    }

</style>

<script>

    export default {
        data() {
            return {
                currentDate: new Date(),
                dataArr:[
                    {name:'旅游保险网数据',time:'数据更新于2小时前',img:require('../../assets/images/log1.png')},
                    {name:'卫生健康保险网数据',time:'数据更新于2小时前',img:require('../../assets/images/log2.png')},
                    {name:'教育保险网数据',time:'数据更新于2小时前',img:require('../../assets/images/log3.png')},
                    {name:'安全生产保险网数据',time:'数据更新于2小时前',img:require('../../assets/images/log4.png')},
                    {name:'国内各省市天气据',time:'数据更新于2小时前',img:require('../../assets/images/log5.png')},
                    {name:'微博句法树库',time:'数据更新于2小时前',img:require('../../assets/images/log6.png')},
                    {name:'微信表情数据',time:'数据更新于2小时前',img:require('../../assets/images/log7.png')},
                    {name:'公共场所视频数据',time:'数据更新于2小时前',img:require('../../assets/images/log8.png')},
                    {name:'安全生产保险网数据',time:'数据更新于2小时前',img:require('../../assets/images/log4.png')},
                    {name:'国内各省市天气据',time:'数据更新于2小时前',img:require('../../assets/images/log5.png')},
                    {name:'微博句法树库',time:'数据更新于2小时前',img:require('../../assets/images/log6.png')},
                    {name:'微信表情数据',time:'数据更新于2小时前',img:require('../../assets/images/log7.png')},
                    {name:'公共场所视频数据',time:'数据更新于2小时前',img:require('../../assets/images/log8.png')}
                ],
                select_list:'',
                imgList:true,
                el_icon_erp:'el-icon-erp',
                icon_zhankai1:'icon-zhankai1',
                icon_zhankai:'icon-zhankai',
                activeName:this.$route.query.activeName || 'all'

            };
        },
        computed:{
            data(){
                const self = this;
                return self.dataArr.filter(function(d){

                        if(self.activeName==='all'){
                            if(d.name.indexOf(self.select_list) > -1
                            ){
                                return  d;
                            }
                        }else {
                            if(d.name.indexOf(self.select_list) > -1&&d.name.indexOf(self.activeName) > -1
                            ){
                                return  d;
                            }
                        }



                })
                //进行筛选并截取分页
            }

        },
        methods:{
            add(){

            },
            changeList(){
                this.imgList = !this.imgList;
            }
        }
    }
</script>