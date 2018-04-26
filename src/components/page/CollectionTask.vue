<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-news"></i> 采集任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <span class="demonstration">筛选类型：</span>
            <el-select v-model="select_cate" placeholder="筛选类型" class="handle-select mr10">
                <el-option key="1" label="内部" value="内部"></el-option>
                <el-option key="2" label="外部" value="外部"></el-option>
            </el-select>
            <span class="demonstration">筛选状态：</span>
            <el-select v-model="select_state" placeholder="筛选状态" class="handle-select mr10">
                <el-option key="3" label="已完成" value="已完成"></el-option>
                <el-option key="4" label="失败" value="失败"></el-option>
                <el-option key="5" label="采集中" value="采集中"></el-option>
                <el-option key="6" label="暂停" value="暂停"></el-option>
                <el-option key="7" label="已终止" value="已终止"></el-option>
            </el-select>
            <span class="demonstration">采集时间：</span>
            <el-date-picker
                    v-model="collectionDate"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp"
                    :picker-options="pickerOptions2">
            </el-date-picker>
            <span class="demonstration">关键词：</span>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" border style="width: 962px;">

            <el-table-column prop="id"  label="序号"  width="50">
            </el-table-column>
            <el-table-column prop="type" label="类型" sortable width="100">
            </el-table-column>
            <el-table-column prop="keyword" label="关键词" sortable width="100">
            </el-table-column>
            <el-table-column prop="name" label="任务名称" width="250">
            </el-table-column>
            <el-table-column prop="collectionDate" label="采集时间" sortable width="150">
            </el-table-column>
            <el-table-column prop="updateDate" label="更新时间" sortable width="150">
            </el-table-column>
            <el-table-column prop="tasksTate" label="任务状态" sortable width="80">
            </el-table-column>
            <el-table-column prop="dataQuantity" label="数据量" sortable width="80">
            </el-table-column>

        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="tolnum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                tolnum:100,
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                select_state:'',
                collectionDate:'',
                del_list: [],
                is_search: false,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }

            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    console.log(self.collectionDate)
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.name === self.del_list[i].name){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){

                        if(d.type.indexOf(self.select_cate) > -1 &&
                                d.tasksTate.indexOf(self.select_state) > -1&&
                                (!self.collectionDate||self.collectionDate[0]<new Date(d.collectionDate).getTime()&&new Date(d.collectionDate).getTime()<self.collectionDate[1])&&
                                (d.name.indexOf(self.select_word) > -1 ||
                                d.keyword.indexOf(self.select_word) > -1)

                        ){
                            return  d;
                        }
                    }
                }).slice((self.cur_page-1)*10,self.cur_page*10)
                //进行筛选并截取分页
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                //this.getData();
//                console.log(this.tableData);
//                this.tableData = this.newTable.slice((val-1)*10,val*10);
//                console.log(this.tableData)

            },

            getData(){
                let self = this;
                if(process.env.NODE_ENV === 'development'){
                    // self.url = '/ms/table/list';
                };
                self.$axios.get(self.url, {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                self.tolnum = res.data.list.length;

            })
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            delAll(){
                const self = this,
                        length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
    .demonstration{padding: 0 10px;}
    .pagination{width: 975px;}
    .handle-box{
        margin:10px 0 25px 0;
    }
    .handle-select{
        width: 120px;
    }
    .handle-input{
        width: 180px;
        display: inline-block;
    }
</style>