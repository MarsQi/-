import AMap from 'AMap';
import AMapUI from 'AMapUI';
import mapStore from '@/vuex/store.js';
import axios from '@/assets/../axios.js';
import '@/assets/js/carousel.js';
import '@/assets/css/style.css';
import $ from 'jquery';
export default {
    data() {
        return {
            alldata: {
                air: [], //空气
                cultivation: [], //农业
                freshCrude: [], //海鲜
                freshWater: [], //淡水
                guangxi: [], //广西
                letOut: [], //企业排放
                screenage: [], //影像
                seaWater: [], //海水
                weining: [], //威宁
                car: [] //引擎
            },
            flagtest: false,
            strdata: '',
            source: null,
            loading2: true
        }
    },
    mounted() {
        mapStore.commit('renderMap');
        mapStore.commit('daynight', 'dark');
        if (this.$route.meta.length && this.$route.path != '/home/quanbu') {
            this.mapxr(this.$route.path, this.$route.meta);
        } else if (this.$route.path === '/home/quanbu') {
            this.mapallmethod()
        } else {
            this.loading2 = false;
        }

    },
    methods: {
        mapxr(path, api) { //追踪路由选择渲染页面
            mapStore.state.selindex = path;
            this.loading2 = true;
            if (mapStore.state.selindex != '/home/car' && mapStore.state.selindex != '/home/quanbu' && api.length > 0) {
                axios
                    .get(api)
                    .then(res => {
                        var data = res.data.data;
                        mapStore.commit('renderMapDatasel', data);
                        this.loading2 = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else if (mapStore.state.selindex == '/home/car') {
                axios
                    .post(api)
                    .then(res => {
                        var data = res.data.data;
                        mapStore.commit('renderMapDatasel', data);
                        this.loading2 = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        mapallmethod() { //渲染全部	
            this.loading2 = true;
            for (let i = 0; i < this.$router.options.routes[0].children.length; i++) {
                if (this.$router.options.routes[0].children[i].meta != undefined && this.$router.options.routes[0].children[i].path != 'car') {
                    mapStore.state.selindex = this.$router.options.routes[0].children[i].path;
                    axios
                        .get(this.$router.options.routes[0].children[i].meta)
                        .then(res => {
                            var data = res.data.data;
                            this.alldata[this.$router.options.routes[0].children[i].path] = data;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else if (this.$router.options.routes[0].children[i].path === 'car') {
                    this.flagtest = false;
                    mapStore.state.selindex = this.$router.options.routes[0].children[i].path;
                    axios
                        .post(this.$router.options.routes[0].children[i].meta)
                        .then(res => {
                            var data = res.data.data;
                            this.alldata[this.$router.options.routes[0].children[i].path] = data;
                            this.flagtest = true;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        }

    },
    watch: {
        $route(to, from) { //检测路由
            mapStore.commit('renderMap');
            mapStore.commit('daynight', 'dark');
            if (to.meta.length != undefined && to.path != '/home/quanbu') {
                this.mapxr(to.path, to.meta);
            } else if (to.path === '/home/quanbu') {
                this.mapallmethod()
            } else if (to.meta.length == undefined) {
                mapStore.commit('clearmap');
                mapStore.commit('daynight', 'dark');
            }
        },
        flagtest(val) { //检测数据是否请求 完毕
            if (val) {
                mapStore.commit('renderMapDataAll', this.alldata);
                this.loading2 = false;
            }
        }
    }

}