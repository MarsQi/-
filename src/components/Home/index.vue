<template>
    <div class="suneee-large-screen">
    <!--导航-->
        <nav>
            <el-menu :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <!--全部-->
                <el-menu-item index="/home/quanbu">
                    <i class="iconfont icon-quanbu"></i>
                    <span>全部</span>
                </el-menu-item>
                <!--环境-->
                <el-submenu index="/home/environment">
                    <template slot="title">
                        <i class="iconfont icon-shui"></i>
                        <span>环境</span>
                    </template>
                    <el-menu-item index="/home/air">空气</el-menu-item>
                    <el-menu-item index="/home/freshWater">淡水</el-menu-item>
                    <el-menu-item index="/home/seaWater">海水</el-menu-item>
                    <el-menu-item index="/home/letOut">排放</el-menu-item>
                    <el-menu-item index="/home/soil">土壤</el-menu-item>
                    <el-menu-item index="/home/radiation">辐射</el-menu-item>
                    <el-menu-item index="/home/noise">噪声</el-menu-item>
                </el-submenu>
                <!--农业-->
                <el-submenu index="/home/farming">
                    <template slot="title">
                        <i class="iconfont icon-shui"></i>
                        <span>农业</span>
                    </template>
                    <el-menu-item index="/home/freshCrude">鲜生</el-menu-item>
                    <el-menu-item index="/home/cultivation">种植</el-menu-item>
                </el-submenu>
                <!--工业-->
                <el-submenu index="/home/industry">
                    <template slot="title">
                        <i class="iconfont icon-shui"></i>
                        <span>工业</span>
                    </template>
                    <el-menu-item index="/home/car">车辆</el-menu-item>
                    <el-menu-item index="/home/ship">船舶</el-menu-item>
                </el-submenu>
                <!--商贸-->
                <el-menu-item index="/home/business">
                    <i class="iconfont icon-shui"></i>
                    <span>商贸</span>
                </el-menu-item>
                <!--公共-->
                <el-menu-item index="/home/common">
                    <i class="iconfont icon-shui"></i>
                    <span>公共</span>
                </el-menu-item>
                <!--文化-->
                <el-menu-item index="/home/culture">
                    <i class="iconfont icon-shui"></i>
                    <span>文化</span>
                </el-menu-item>
                <!--健康-->
                <el-submenu index="/home/health">
                    <template slot="title">
                        <i class="iconfont icon-shui"></i>
                        <span>健康</span>
                    </template>
                    <el-menu-item index="/home/screenage">影像</el-menu-item>
                    <el-menu-item index="/home/biochemistry">生化</el-menu-item>
                </el-submenu>
                <!--区域-->
                <el-submenu index="/home/area">
                    <template slot="title">
                        <i class="iconfont icon-shui"></i>
                        <span>区域</span>
                    </template>
                    <el-menu-item index="/home/guangxi">广西</el-menu-item>
                </el-submenu>
                <!--部门-->
                <el-menu-item index="/home/department">
                    <i class="iconfont icon-shui"></i>
                    <span>部门</span>
                </el-menu-item>
                <!--集团-->
                <el-submenu index="/home/group">
                    <template slot="title">
                        <i class="iconfont icon-shui"></i>
                        <span>集团</span>
                    </template>
                    <el-menu-item index="/home/weining">威宁</el-menu-item>
                </el-submenu>
                <!--退出-->
                <el-menu-item index="" style="border-right: none">
                    <i class="iconfont icon-tuichu"></i>
                    <span>退出</span>
                </el-menu-item>
            </el-menu>
        </nav>
        <router-view></router-view>
    </div>
</template>
<script src="./index.js"></script>
<style src="./index.css" ></style>