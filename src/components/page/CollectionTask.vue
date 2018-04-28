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
                <el-option key="1" label="全部" value="全部" selected></el-option>
                <el-option key="2" label="内部" value="内部"></el-option>
                <el-option key="3" label="外部" value="外部"></el-option>
            </el-select>
            <span class="demonstration">筛选状态：</span>
            <el-select v-model="select_state" placeholder="筛选状态" class="handle-select mr10">
                <el-option key="4" label="已完成" value="已完成"></el-option>
                <el-option key="5" label="失败" value="失败"></el-option>
                <el-option key="6" label="采集中" value="采集中"></el-option>
                <el-option key="7" label="暂停" value="暂停"></el-option>
                <el-option key="8" label="已终止" value="已终止"></el-option>
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
            <el-button type="primary" icon="search" @click="getData">搜索</el-button>
        </div>
        <el-table :data="tableData" border style="max-width: 1300px;min-height: 529px;" v-loading="loading">

            <el-table-column prop="id"  label="序号"  width="50">
            </el-table-column>
            <el-table-column prop="type" label="类型"  width="100">
            </el-table-column>
            <el-table-column prop="keyword" label="关键词"  width="100">
            </el-table-column>
            <el-table-column prop="name" label="任务名称" min-width="150">
            </el-table-column>
            <el-table-column prop="collectionDate" label="采集时间"  width="150">
            </el-table-column>
            <el-table-column prop="updateDate" label="更新时间"  width="150">
            </el-table-column>
            <el-table-column prop="tasksTate" label="任务状态"  width="80">
            </el-table-column>
            <el-table-column prop="dataQuantity" label="数据量"  width="80">
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
                select_cate: '全部',
                loading:true,
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

                }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
//                console.log(this.tableData);
//                this.tableData = this.newTable.slice((val-1)*10,val*10);
//                console.log(this.tableData)

            },

            getData(){

                let self = this;
                self.loading = true;
                if(process.env.NODE_ENV === 'development'){
                     self.url = '/ms/table/list';
                };
                self.$axios.post(self.url,
                        {
                             page:self.cur_page,
                             selectCate:self.select_cate,
                             selectState:self.selectState,
                             collectionDate:self.collectionDate,
                             selectWord:self.select_word
                        }
                        ).then((res) => {
                    self.tableData = res.data.list;
                    self.tolnum = 100;
                    self.loading = false;

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
    .pagination{max-width: 1300px;}
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