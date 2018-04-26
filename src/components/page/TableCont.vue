<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><a class="rank-head-back" @click="routerBack">返回</a></el-breadcrumb-item>
                <el-breadcrumb-item>{{ $route.params.name }}</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="handle-box">

            <span class="demonstration">姓名：</span>
            <el-input v-model="select_name" placeholder="筛选姓名" class="handle-input mr10"></el-input>
            <span class="demonstration">身份证号：</span>
            <el-input v-model="select_IdentificationNumber" placeholder="筛选身份证号" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" border style="width: 752px;">

            <el-table-column prop="id"  label="序号"  width="50">
            </el-table-column>
            <el-table-column prop="name" label="姓名" sortable width="120">
            </el-table-column>
            <el-table-column prop="documentType" label="证件类型" sortable width="180">
            </el-table-column>
            <el-table-column prop="IdentificationNumber" label="证件号码" width="250">
            </el-table-column>
            <el-table-column prop="sex" label="性别" sortable width="150">
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
                url: './static/user.json',
                tableData: [],
                tolnum:100,
                cur_page: 1,
                multipleSelection: [],
                select_IdentificationNumber: '',
                select_name:'',
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

                        if(d.name.indexOf(self.select_name) > -1 &&d.IdentificationNumber.indexOf(self.select_IdentificationNumber) > -1
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
            },
            routerBack(){
                this.$router.push({ path: 'card', query: {activeName:this.$route.params.activeName}});
            }
        }
    }
</script>

<style scoped>
.demonstration{padding: 0 10px;}
.pagination{width: 750px;}
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