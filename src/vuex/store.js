import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios';
import router from '../router'
import qs from 'qs';
import weiningdata from '../../static/weining.json';
//import bus from '../bus.js'
Vue.use(Vuex);
//引入需要的相应img
import Img0 from "@/assets/images/map/custom.png"; //空气质量
import Img1 from "@/assets/images/map/shuidi.png"; //淡水
import Img2 from "@/assets/images/map/ocean_mk.png"; //海洋
import Img3 from "@/assets/images/map/company.png"; //企业排放
import Img4 from "@/assets/images/map/cstatus.png"; //引擎工况
import Img41 from "@/assets/images/map/cstatus1.png"; //引擎工况
import Img42 from "@/assets/images/map/cstatus2.png"; //引擎工况
import Img44 from "@/assets/images/map/cstatus4.png"; //引擎工况
import Img5 from "@/assets/images/map/agriculture_mk.png"; //智慧农业
import ningjia from "@/assets/images/map/ningjia.png"; //生鲜
import screenpic from "@/assets/images/map/yiliao.png"; //影像
import guangxi1 from "@/assets/images/map/guangxi1.png"; //广西
import weining1 from "@/assets/images/map/weining.png"; //威宁
import air from "@/assets/images/detailAir.png"; //弹出框空气
import agriculture from "@/assets/images/detailAgriculture.jpg"; //弹出框农业
import company from "@/assets/images/detailCompany.png"; //弹出框企业
import water from "@/assets/images/detailWater.png"; //弹出框淡水
import xiansheng1 from "@/assets/images/shengxian.png"; //弹出框生鲜
import guangxiimg from "@/assets/images/guangxi.png"; //弹出框广西
import massivePointsimg from "@/assets/images/detailcstatus.png"; //弹出框引擎
import hong7 from "@/assets/images/wnicon/hong7.png"; //空气质量
import huang6 from "@/assets/images/wnicon/huang6.png"; //空气质量
import jin4 from "@/assets/images/wnicon/jin4.png"; //空气质量
import jin5 from "@/assets/images/wnicon/jin5.png"; //空气质量
import lan3 from "@/assets/images/wnicon/lan3.png"; //空气质量
import lv2 from "@/assets/images/wnicon/lv2.png"; //空气质量
import yin1 from "@/assets/images/wnicon/yin1.png"; //空气质量
//state  ：存储数据、数据 初始化
const state = {
    info: [],
    changeimg: Img0,
}
var gmap;

function pd() { //判断用户当前选中 state.selindex是转换的状态值 修改地图小标与调用哪个方法 修改弹窗img没在这里面写  2、pd(i)来操作，让变化的值都在数组里，利用下标来控制代码比较优化
    switch (state.selindex) {
        case '/home/air':
            state.changeimg = Img0;
            state.type = 'air';
            break;
        case '/home/freshWater':
            state.changeimg = Img1;
            state.type = 'water';
            break;
        case '/home/seaWater':
            state.changeimg = Img2;
            state.type = 'ocean';
            break;
        case '/home/letOut':
            state.changeimg = Img3;
            state.type = 'company';
            break;
        case '/home/car':
            state.changeimg = Img4;
            state.type = 'cstatus';
            break;
        case '/home/cultivation':
            state.changeimg = Img5;
            state.type = 'agriculture';
            break;
        case '/home/freshCrude':
            state.changeimg = ningjia;
            state.type = 'xiansheng';
            break;
        case '/home/screenage':
            state.changeimg = screenpic;
            state.type = 'yiliao';
            break;
        case '/home/guangxi':
            state.changeimg = guangxi1;
            state.type = 'guangxi';
            break;
        case '/home/weining':
            state.changeimg = weining1;
            state.type = 'weining';
            break;
        default:
            console.log('参数有问题')
    }
}

function gettime() {
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    // 例子： 
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
    Date.prototype.Format = function(fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate() - 1, //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    var time1 = new Date().Format("yyyy-MM-dd");
    var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
    return time2;
};

function getAir(map, item) { //空气数据获得marker
    axios
        .get("/air/getCityAir", {
            params: {
                cityName: item.name
            }
        })
        .then(res => {
            if (res.data.status === 'SUCCESS') {
                var info = res.data;
                var html = '<div class="fl_box" >' +
                    '<h1>' + info.data.city + '</h1>' +
                    '<div class="fl_img">' +
                    '<img src=' + air + ' alt="">' +
                    '</div>' +
                    '<div class="fl_ul">' +
                    '<ul>' +
                    '<li>SO2<span>' + (info.data.so2 || '--') + 'μg/m³</span></li>' +
                    '<li>O3<span>' + (info.data.o3 || '--') + 'μg/m³</span></li>' +
                    '<li>PM2.5<span>' + (info.data.pm25 || '--') + 'μg/m³</span></li>' +
                    '<li>CO<span>' + (info.data.co || '--') + 'mg/m³</span></li>' +
                    '<li>Level<span>' + (info.data.level || '--') + '</span></li>' +
                    '<li>PM10<span>' + (info.data.pm10 || '--') + 'μg/m³</span></li>' +
                    '<li>NO2<span>' + (info.data.no2 || '--') + 'μg/m³</span></li>' +
                    '<li>更新时间<span>' + (info.data.lat || '--') + '</span></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>';
                var infoWindow = new AMap.InfoWindow({
                    content: html,
                    autoMove: true,
                    closeWhenClickMap: true,
                    offset: {
                        x: -0,
                        y: -0
                    }
                });
                var openInfoWindow = function(e) {
                    infoWindow.open(map, [item.lon, item.lat]);
                };
                openInfoWindow();
            }
        })
        .catch(err => {
            console.log(err);
        });
};

//威宁
function weining(map, item) { //空气数据获得marker	
    let lis = '';
    for (var i = 0; i < weiningdata.data.length; i++) {
        if (item.id == weiningdata.data[i].id) {
            lis = '';
            for (let j = 0; j < weiningdata.data[i].Attributes.length; j++) {
                lis += '<li><span>' + (weiningdata.data[i].Attributes[j].value || '--') + ' </span>' + (weiningdata.data[i].Attributes[j].name || '--') + '</li>'
            }
        }
    }
    var html = '<div class="fl_box" >' +
        '<h1>' + item.compName + '</h1>' +
        '<div class="fl_img">' +
        '<img src=' + "static/logo/" + item.logo + ' alt="">' +
        '</div>' +
        '<div class="fl_ul">' +
        '<ul>' +
        lis +
        '<li>更新时间<span>' + (gettime() || '--') + '</span></li>' +
        '</ul>' +
        '</div>' +
        '</div>';
    var infoWindow = new AMap.InfoWindow({
        content: html,
        autoMove: true,
        closeWhenClickMap: true,
        offset: {
            x: -0,
            y: -0
        }
    });
    var openInfoWindow = function(e) {
        infoWindow.open(map, [item.lon, item.lat]);
    };
    openInfoWindow();
};

//广西
function guangxi(map, item) { //空气数据获得marker
    axios
        .get("/guangxi/find", {
            params: {
                mapid: item.id
            }
        })
        .then(res => {
            if (res.data.status === 'SUCCESS') {
                //					console.log(res)
                var info = res.data;
                //                  collecta(state.info.collection)
                var html = '<div class="fl_box" >' +
                    '<h1>' + info.data.name + '</h1>' +
                    '<div class="fl_img">' +
                    '<img src=' + guangxiimg + ' alt="">' +
                    '</div>' +
                    '<div class="fl_ul">' +
                    '<ul>' +
                    '<li>收货件数<span>' + (info.data.shjs || '--') + '</span></li>' +
                    '<li>上架件数<span>' + (info.data.sjjs || '--') + '</span></li>' +
                    '<li>拣货件数<span>' + (info.data.jhjs || '--') + '</span></li>' +
                    '<li>包装单数 <span>' + (info.data.bzjs || '--') + '</span></li>' +
                    '<li>发运单数<span>' + (info.data.fyds || '--') + '</span></li>' +
                    '<li>调拨出库件数<span>' + (info.data.dbckjs || '--') + '</span></li>' +
                    '<li>生产总数<span>' + (info.data.scjs || '--') + '</span></li>' +
                    '<li>更新时间<span>' + (gettime() || '--') + '</span></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>';
                var infoWindow = new AMap.InfoWindow({
                    content: html,
                    autoMove: true,
                    closeWhenClickMap: true,
                    offset: {
                        x: -0,
                        y: -0
                    }
                });
                var openInfoWindow = function(e) {
                    infoWindow.open(map, [item.lon, item.lat]);
                };
                openInfoWindow();
            }
        })
        .catch(err => {
            console.log(err);
        });
};

function yiliao(map, item) { //医疗数据获得marker
    axios
        .get("/medical/findbymapid", {
            params: {
                mapId: item.id
            }
        })
        .then(res => {
            if (res.data.status === 'SUCCESS') {
                var info = res.data;
                var html = '<div class="fl_box" >' +
                    '<h1>' + info.data.medicalname + '</h1>' +
                    '<div class="fl_img">' +
                    '<img src=' + "static/images/medical/" + info.data.imgurl + ".png" + ' alt="">' +
                    '</div>' +
                    '<div class="fl_ul">' +
                    '<ul>' +
                    '<li>在线时长<span>' + (info.data.zxsc || '--') + '小时' + '</span></li>' +
                    '<li>通信带宽<span>' + (info.data.txkd || '--') + 'GB' + '</span></li>' +
                    '<li>检测量<span>' + (info.data.jcl || '--') + '例' + '</span></li>' +
                    '<li>影像量<span>' + (info.data.yxl || '--') + '张' + '</span></li>' +
                    '<li>判读量<span>' + (info.data.pdl || '--') + '张' + '</span></li>' +
                    '<li>更新时间<span>' + (gettime() || '--') + '</span></li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="carousel-content">' +
                    '<ul class="carousel">' +
                    '<li><img src=' + "static/images/medical" + info.data.id + "/1.jpg" + ' alt=""></li>' +
                    '<li><img src=' + "static/images/medical" + info.data.id + "/2.jpg" + ' alt=""></li>' +
                    '<li><img src=' + "static/images/medical" + info.data.id + "/3.jpg" + ' alt=""></li>' +
                    '<li><img src=' + "static/images/medical" + info.data.id + "/4.jpg" + ' alt=""></li>' +
                    '<li><img src=' + "static/images/medical" + info.data.id + "/5.jpg" + ' alt=""></li>' +
                    '<li><img src=' + "static/images/medical" + info.data.id + "/6.jpg" + ' alt=""></li>' +
                    '<li><img src=' + "static/images/medical" + info.data.id + "/7.jpg" + ' alt=""></li>' +
                    '<li><img src=' + "static/images/medical" + info.data.id + "/8.jpg" + ' alt=""></li>' +
                    '<li><img src=' + "static/images/medical" + info.data.id + "/9.jpg" + ' alt=""></li>' +
                    '<li><img src=' + "static/images/medical" + info.data.id + "/10.jpg" + ' alt=""></li>' +
                    '</ul>' +
                    '<div class="carousel-prev"><img src=' + "static/images/left_btn1.png" + ' alt=""></div>' +
                    '<div class="carousel-next"><img src=' + "static/images/right_btn1.png" + ' alt=""></div>' +
                    '</div>' +
                    '</div>';
                var infoWindow = new AMap.InfoWindow({
                    content: html,
                    autoMove: true,
                    closeWhenClickMap: true,
                    offset: {
                        x: -0,
                        y: -0
                    }
                });
                var openInfoWindow = function(e) {
                    infoWindow.open(map, [item.lon, item.lat]);
                    setTimeout(function() {
                        $(".carousel-content").carousel({
                            carousel: ".carousel", //轮播图容器
                            indexContainer: ".img-index", //下标容器
                            prev: ".carousel-prev", //左按钮
                            next: ".carousel-next", //右按钮
                            timing: 5000, //自动播放间隔
                            animateTime: 800, //动画时间
                            auto: true, //是否自动播放
                        });

                        $(".carousel-prev").hover(function() {
                            $(this).find("img").attr("src", "static/images/left_btn2.png");
                        }, function() {
                            $(this).find("img").attr("src", "static/images/left_btn1.png");
                        });
                        $(".carousel-next").hover(function() {
                            $(this).find("img").attr("src", "static/images/right_btn2.png");
                        }, function() {
                            $(this).find("img").attr("src", "static/images/right_btn1.png");
                        });

                    }, 500)

                };
                openInfoWindow();
            }
        })
        .catch(err => {
            console.log(err);
        });
};

function xiansheng(map, item, marker) { //生鲜数据获得marker
    axios
        .get("/huifresh/find", {
            params: {
                mapid: item.id
            }
        })
        .then(res => {
            var info = res.data.data
            var html = '<div class="fl_box" >' +
                '<h1>' + info.name + '</h1>' +
                '<div class="fl_img">' +
                '<img src=' + xiansheng1 + ' alt="">' +
                '</div>' +
                '<div class="fl_ul">' +
                '<ul>' +
                // '<li>日期：<span>' + (info.data.rq || '--') + '</span></li>' +
                '<li>订单量：<span>' + (info.ddl || '--') + '单' + '</span></li>' +
                '<li>交易额：<span>' + (info.jye || '--') + '元' + '</span></li>' +
                '<li>客单价：<span>' + (info.kdj || '--') + '元/单' + '</span></li>' +
                '<li>SKU: <span>' + (info.sku || '--') + '</span></li>' +
                '<li>抽检率：<span>' + (info.cjl || '--') + '</span></li>' +
                '<li>合格率：<span>' + (info.hgl || '--') + '</span></li>' +
                '<li>配送单：<span>' + (info.psl || '--') + '单' + '</span></li>' +
                '<li>更新时间：<span>' + (gettime() || '--') + '</span></li>' +
                '</ul>' +
                '</div>' +
                '</div>';
            var infoWindow = new AMap.InfoWindow({
                content: html,
                autoMove: true,
                closeWhenClickMap: true,
                offset: {
                    x: -0,
                    y: -0
                }
            });
            var openInfoWindow = function(e) {
                infoWindow.open(map, [item.lon, item.lat]);
            };
            openInfoWindow();
        })
        .catch(err => {
            console.log(err);
        });

};

function getWater(map, item) { //淡水水质数据获得marker 
    var html = '<div class="fl_box" >' +
        '<h1>' + item.place + '</h1>' +
        '<div class="fl_img">' +
        '<img src=' + water + ' alt="">' +
        '</div>' +
        '<div class="fl_ul">' +
        '<ul>' +
        '<li>水质类别<span>' + (item.waterGradesDo || '--') + '</span></li>' +
        '<li>氨氮<span>' + (item.nh3N || '--') + '</span></li>' +
        '<li>氨氮级别<span>' + (item.waterGradesNh3N || '--') + '</span></li>' +
        '<li>溶解氧<span>' + (item.do1 || '--') + '</span></li>' +
        '<li>PH<span>' + (item.ph || '--') + '</span></li>' +
        '<li>高锰酸钾<span>' + (item.codmn || '--') + '</span></li>' +
        '<li>更新时间<span>' + (item.extend1 || '--') + '</span></li>' +
        '</ul>' +
        '</div>' +
        '</div>';
    var infoWindow = new AMap.InfoWindow({
        content: html,
        autoMove: true,
        closeWhenClickMap: true,
        offset: {
            x: -0,
            y: -0
        }
    });
    /**
     * 显示信息
     * @param e
     */
    var openInfoWindow = function(e) {
        infoWindow.open(map, [item.lon, item.lat]);
    };
    openInfoWindow()
};
//海水水质数据获得marker
function getOcean(map, item) {
    var html = '<div class="fl_box">' +
        '<h1>' + item.name + '</h1>' +
        '<div class="fl_img">' +
        '<img src="' + item.imgurl + '" alt="">' +
        '</div>' +
        '<div class="fl_ul">' +
        '<ul>' +
        '<li>海水类别<span>' + item.sjz + '</span></li>' +
        '<li>水温<span>' + (item.swclz || '--') + '</span></li>' +
        '<li>PH值<span>' + (item.phclz || '--') + '</span></li>' +
        '<li>DO值<span>' + (item.rjyclz || '--') + '</span></li>' +
        '<li>电导率<span>' + (item.ddlclz || '--') + '</span></li>' +
        '<li>盐度<span>' + (item.ydclz || '--') + '</span></li>' +
        '<li>更新时间<span>' + (item.date + ' ' + item.time || '--') + '</span></li>' +
        '</ul>' +
        '</div>' +
        '</div>';
    var infoWindow = new AMap.InfoWindow({
        content: html,
        autoMove: true,
        closeWhenClickMap: true,
        offset: {
            x: -0,
            y: -0
        }
    });
    var openInfoWindow = function(e) {
        infoWindow.open(map, [item.lon, item.lat]);
    };
    openInfoWindow();
};
//公司数据获得marker
function getCompany(map, item) {
    axios
        .get("/companyMapDetail/comDetailList", {
            params: {
                yhm: item.yhm
            }
        })
        .then(res => {
            if (res.data.status === 'SUCCESS') {
                var info = res.data.data;
                if (info.imgurl != "") {
                    info.imgurl = "http://gxhbh5.weilian.cn//img/wryCompanyIMG/" + info.imgurl;
                } else {
                    info.imgurl = company;
                }
                var html = '<div class="fl_box" >' +
                    '<h1>' + info.yhm + '</h1>' +
                    '<div class="fl_img">' +
                    '<img src=' + info.imgurl + ' alt="">' +
                    '</div>' +
                    '<div class="fl_ul">' +
                    '<ul>' +
                    '<li>控制指标<span>' + (info.wrwmc || '--') + '</span></li>' +
                    '<li>监测值<span>' + (info.wrwnd || '--') + '</span></li>' +
                    '<li>单位<span>' + (info.pfbzdw || '--') + '</span></li>' +
                    '<li>标准<span>' + (info.scqk || '--') + '</span></li>' +
                    '<li>超标情况<span>' + (info == 1 ? '超标' : '未超标') + '</span></li>' +
                    '<li>更新时间<span>' + (gettime() || '--') + '</span></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>';
                var infoWindow = new AMap.InfoWindow({
                    content: html,
                    autoMove: true,
                    closeWhenClickMap: true,
                    offset: {
                        x: -0,
                        y: -0
                    }
                });
                var openInfoWindow = function(e) {
                    infoWindow.open(map, [item.lon, item.lat]);
                };
                openInfoWindow();
            }
        })
        .catch(err => {
            console.log(err);
        });

};
// 引擎工况获取marker
function getCstatus(map, item) {
    var html = '';
    var dataTime = '';
    var lis = '';
    var time = '';
    var datass;
    let datawa = {
        dtu_id: item.dtuId
    }
    axios
        .post("/engine/getOtherJson", datawa)
        .then(res => {
            var data = res.data;
            if (data.time != null && data.time != undefined && data.time != "") {
                datass = data.time.substring(0, data.time.indexOf(" "));
            } else {
                datass = "--"
            }
            if (data.status != "ERROR") {
                var result = data.viewData;
                lis = "";
                for (var i = 0; i < result.length; i++) {
                    /* if(i == 4){
                         break;
                     }*/
                    for (var key in result[i]) {
                        if (key.indexOf("经度") < 0 && key.indexOf("纬度") < 0) {
                            lis += '<li><span>' + (result[i][key] || '--') + '</span>' + key + '</li>';
                        }
                    }
                }
            }
            var carid = "";
            if (data.carid != null && data.carid != undefined && data.carid != "") {
                carid = data.carid;
            } else {
                carid = "- -";
            }
            html = '<div class="fl_box" >' +
                '<h1>' + carid + '</h1>' +
                '<div class="fl_img">' +
                '<img src=' + massivePointsimg + ' alt="">' +
                '</div>' +
                '<div class="fl_ul">' +
                '<ul class="clearfix">' +
                lis +
                '<li><span>' + (data.time || '--') + '</span>' + '更新时间' + '</li>' +
                '</ul>' +
                '</div>' +
                '</div>';
            var infoWindow = new AMap.InfoWindow({
                content: html,
                autoMove: true,
                closeWhenClickMap: true,
                offset: {
                    x: -0,
                    y: -0
                }
            });
            var openInfoWindow = function(e) {
                infoWindow.open(map, [item.lon, item.lat]);
            };
            openInfoWindow();
        })
        .catch(err => {
            console.log(err);
        });
}
//智慧农业数据获得marker
function getAgriculture(map, item) {
    //请求当前地区的数据
    axios
        .get("/huiYun/huiYunDetail", {
            params: {
                orgName: item.orgname
            }
        })
        .then(res => {
            if (res.data.status === 'SUCCESS') {
                state.info = res.data.data;
                var html = '<div class="fl_box" >' +
                    '<h1>' + state.info.orgname + '</h1>' +
                    '<div class="fl_img">' +
                    '<img src=' + agriculture + ' alt="">' +
                    '</div>' +
                    '<div class="fl_ul">' +
                    '<ul class="clearfix">' +
                    '<li>空气温度<span>' + (state.info.airtemlastvalue || '--') + '℃' + '</span></li>' +
                    '<li>空气湿度<span>' + (state.info.airhumlastvalue || '--') + '%' + '</span></li>' +
                    '<li>风向<span>' + (state.info.dirlastvalue || '--') + '</span></li>' +
                    '<li>风速<span>' + (state.info.windlastvalue || '--') + 'km/h' + '</span></li>' +
                    '<li>光照<span>' + (state.info.lightlastvalue || '--') + 'lux' + '</span></li>' +
                    '<li>土壤酸碱度<span>' + (state.info.phlastvalue || '--') + '</span></li>' +
                    '<li>土壤导电率<span>' + (state.info.soilsollastvalue || '--') + 'μs/cm' + '</span></li>' +
                    '<li>土壤温度<span>' + (state.info.temlastvalue || '--') + '℃' + '</span></li>' +
                    '<li>降雨量<span>' + (state.info.rainfalllastvalue == "null" ? "--" : state.info.rainfalllastvalue + 'mm') + '</span></li>' +
                    '<li>更新时间<span>' + (state.info.lastupdatevaluetime || '--') + '</span></li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="carousel-content">' +
                    '<ul class="carousel">' +
                    '<li><img src=' + "static/images/agCarousel" + "/0.png" + ' alt=""></li>' +
                    '<li><img src=' + "static/images/agCarousel" + "/1.jpg" + ' alt=""></li>' +
                    '<li><img src=' + "static/images/agCarousel" + "/3.jpg" + ' alt=""></li>' +
                    '<li><img src=' + "static/images/agCarousel" + "/4.png" + ' alt=""></li>' +
                    '</ul>' +
                    '<div class="carousel-prev"><img src=' + "static/images/left_btn1.png" + ' alt=""></div>' +
                    '<div class="carousel-next"><img src=' + "static/images/right_btn1.png" + ' alt=""></div>' +
                    '</div>' +
                    '</div>';
                var infoWindow = new AMap.InfoWindow({
                    content: html,
                    autoMove: true,
                    closeWhenClickMap: true,
                    offset: {
                        x: -0,
                        y: -0
                    }
                });
                var openInfoWindow = function(e) {
                    infoWindow.open(map, [item.lon, item.lat]);
                    setTimeout(function() {
                        $(".carousel-content").carousel({
                            carousel: ".carousel", //轮播图容器
                            indexContainer: ".img-index", //下标容器
                            prev: ".carousel-prev", //左按钮
                            next: ".carousel-next", //右按钮
                            timing: 5000, //自动播放间隔
                            animateTime: 800, //动画时间
                            auto: true, //是否自动播放
                        });

                        $(".carousel-prev").hover(function() {
                            $(this).find("img").attr("src", "static/images/left_btn2.png");
                        }, function() {
                            $(this).find("img").attr("src", "static/images/left_btn1.png");
                        });
                        $(".carousel-next").hover(function() {
                            $(this).find("img").attr("src", "static/images/right_btn2.png");
                        }, function() {
                            $(this).find("img").attr("src", "static/images/right_btn1.png");
                        });

                    }, 500)
                };
                openInfoWindow();
            }
        })
        .catch(err => {
            console.log(err);
        });
};
//封装所有模块传值
function massivePoints(data, img, method, type) { //type留着扩展
    AMapUI.load(['ui/misc/PointSimplifier', 'lib/$'], function(PointSimplifier, $) { //引入ui组件
        if (!PointSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }
        var pointSimplifierIns = new PointSimplifier({
            map: gmap, //所属的地图实例
            getPosition: function(item) {
                if (!item) {
                    return null;
                }
                //返回经纬度	
                return [parseFloat(item.lon), parseFloat(item.lat)];
            },

            getHoverTitle: function(dataItem, idx) {
                return '';
            },
            renderOptions: {
                //点的样式
                //              pointStyle: {
                ////                  width: 10,
                ////                  height: 10,
                //                  content:'1'
                //                  
                //              },
                pointStyle: {
                    //绘制点占据的矩形区域
                    content: PointSimplifier.Render.Canvas.getImageContent(
                        img,
                        function onload() {
                            pointSimplifierIns.renderLater();
                        },
                        function onerror(e) {
                            alert('图片加载失败！');
                        }),
                    //宽度
                    width: 22,
                    //高度
                    height: 22,
                    //定位点为底部中心
                    offset: ['-50%', '-100%'],
                    fillStyle: null,
                    strokeStyle: null
                },
                pointHoverStyle: {
                    content: 'none'
                },
                eventSupport: true, //是否开启鼠标事件
                //鼠标hover时的title信息
                hoverTitleStyle: {
                    position: 'top',
                }
            }
        });
        window.pointSimplifierIns = pointSimplifierIns;
        pointSimplifierIns.setData(data);
        //测试清除所有点 
        ////			pointSimplifierIns.setData(null);		
        pointSimplifierIns.on('pointClick', function(e, record) {
            //			console.log(record)
            var item = record.data;
            method(gmap, item);
        });
    });
}
//mutations修改数据
const mutations = {
    renderMap(state) { //地图初始渲染
        var that = this;
        gmap = new AMap.Map("container", {
            center: [108.000923, 36.675807],
            resizeEnable: true,
            zoom: 4
        });
        // 地图控件
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
            gmap.addControl(new AMap.ToolBar({
                position: "LB",
                offset: new AMap.Pixel(10, 20)
            }))
            gmap.addControl(new AMap.Scale({
                position: "LB",
                offset: new AMap.Pixel(10, 20)
            }));

        });
    },
    daynight(state, background) { //控制白天黑夜
        gmap.setMapStyle('amap://styles/' + background);
    },
    renderMapDatasel(state, data) { // 数据选择渲染
        gmap.clearMap();
        pd(); //调用选择方法		
        if (state.selindex == '/home/car') {
            massivePoints(data.lixian, Img41, getCstatus);
            massivePoints(data.lan1, Img42, getCstatus);
            massivePoints(data.lan2, Img44, getCstatus);
            massivePoints(data.hong, Img4, getCstatus);
        } else if (state.selindex == '/home/weining') {
            var type1 = [];
            var type2 = [];
            var type3 = [];
            var type4 = [];
            var type5 = [];
            var type6 = [];
            var type7 = [];
            for (let i = 0; i < weiningdata.data.length; i++) {
                console.log(weiningdata.data[i].type)
                switch (weiningdata.data[i].type) {
                    case '1':
                        type1.push(data[i]);
                        break;
                    case '2':
                        type2.push(data[i]);
                        break;
                    case '3':
                        type3.push(data[i]);
                        break;
                    case '4':
                        type4.push(data[i]);
                        break;
                    case '5':
                        type5.push(data[i]);
                        break;
                    case '6':
                        type6.push(data[i]);
                        break;
                    case '7':
                        type7.push(data[i]);
                        break;
                    default:
                        console.log('参数有问题')
                }
            }
            massivePoints(type2, huang6, weining);
            massivePoints(type3, jin4, weining);
            massivePoints(type4, jin5, weining);
            massivePoints(type5, lan3, weining);
            massivePoints(type6, lv2, weining);
            massivePoints(type7, yin1, weining);
            massivePoints(type1, hong7, weining);
            //    setTimeout(()=>{
            //特殊需求修改
            //    },5000)
        } else {
            state.type === 'air' && massivePoints(data, state.changeimg, getAir);
            state.type === 'water' && massivePoints(data, state.changeimg, getWater);
            state.type === 'ocean' && massivePoints(data, state.changeimg, getOcean);
            state.type === 'company' && massivePoints(data, state.changeimg, getCompany);
            state.type === 'agriculture' && massivePoints(data, state.changeimg, getAgriculture);
            state.type === 'xiansheng' && massivePoints(data, state.changeimg, xiansheng);
            state.type === 'yiliao' && massivePoints(data, state.changeimg, yiliao);
            state.type === 'guangxi' && massivePoints(data, state.changeimg, guangxi);
        }
        //		gmap.setFitView();
    },
    renderMapDataAll(state, data) { // 数据渲染全部-->初始化界面		
        //gmap.clearMap();		
        massivePoints(data.freshWater, Img1, getWater)
        massivePoints(data.letOut, Img3, getCompany)
        massivePoints(data.seaWater, Img2, getOcean)
        if (data.car.hong.length > 0) { //引擎			
            massivePoints(data.car.lixian, Img41, getCstatus);
            massivePoints(data.car.lan1, Img42, getCstatus);
            massivePoints(data.car.lan2, Img44, getCstatus);
            massivePoints(data.car.hong, Img4, getCstatus);
        }
        massivePoints(data.cultivation, Img5, getAgriculture)
        massivePoints(data.freshCrude, ningjia, xiansheng)
        massivePoints(data.guangxi, guangxi1, guangxi)
        massivePoints(data.screenage, screenpic, yiliao)
        massivePoints(data.weining, weining, weining)
        massivePoints(data.air, Img0, getAir)
            //		gmap.setZoom(4);
            //		gmap.setCenter([115.000923, 36.675807]);
    },
    clearmap(state) { //	跳转地图
        gmap.clearMap();
    }
};
const actions = { //多个 state 的操作 , 使用 mutations 会来触发会比较好维护 , 那么需要执行多个 mutations 就需要用 action 了  -->理解成管理mutations
    actionmethod(context) { //这里的context和我们使用的$store拥有相同的对象和方法
        context.commit('rendermethod');
        //你还可以在这里触发其他的mutations方法
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})