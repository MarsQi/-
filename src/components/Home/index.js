import axios from '@/axios.js'
export default {
    data() {
        return {
            activeIndex: 'air'
        };
    },
    mounted() {
        //刷新记住当前状态
        this.activeIndex = this.$route.path
    },
    methods: {
        //获取路由
        handleSelect(key, keyPath) {
            if (key) {} else {
                let that = this;
                axios.get('/logout')
                    .then((res) => {
                        if (res.data.status === 'SUCCESS') {
                            //跳转登录页
                            that.$router.push({ path: "/" })
                        }
                    })
                    .catch((err) => {

                    })
            }
        }
    },
    watch: {
        //当路由发生变化时
        $route(to, from) {
            var data = new Date().getMilliseconds();
            var querandom = {
                rd: data
            };
            //携带路由信息
            this.$router.push({
                path: this.$route.path,
                query: querandom
            })
        }
    }
}