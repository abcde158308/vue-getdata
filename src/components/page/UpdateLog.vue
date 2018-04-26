<template>
    <div class="card">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>更新日志记录</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <el-col :span="24">
            <el-card v-for="o in logData" class="card-box">
                <div slot="header" class="clearfix">
                    <span>{{o.name}}</span>
                </div>
                <div v-for="o in o.warningDetail" class="text item">
                    {{o}}
                </div>
            </el-card>
        </el-col>
    </div>

</template>

<script>
    export default{
        data(){
            return{
                url:'./static/updateLog.json',
                logData:''
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                let self = this;
                self.$axios.get(self.url, {page:self.cur_page}).then((res) => {
                    self.logData = res.data.list;
                    console.log(res.data.list);
                })

            }
        }
    }
</script>

<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .card-box{
        margin:  0 0 15px 0;
    }

</style>