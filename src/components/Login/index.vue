<template>
    <div class="login-app">
        <!-- 项目名称 -->
        <div class="login-top">
            <h1>欢迎登录大屏数据展示平台</h1>
        </div>
        <!-- 版权 -->
        <div class="login-bottom">
            <p class="footer" ref="copyright">版权所有&copy;象翌微链科技发展有限公司 桂ICP备1300904号</p>
        </div>
        <div id="fs-setting-area">
            <!-- logo -->
            <div class="fs-left">
                <img src="../../assets/images/logo-red.png" />
            </div>
            <!-- 信息 -->
            <div class="fs-right">
                <div class="fs-content">
                    <!-- 用户名称 -->
                    <div class="item">
                        <div class="item-name">
                            <label for="">用户名：</label>
                        </div>
                        <div class="item-ipt">
                            <input  type="text" title="用户名" v-model="username" @keyup.enter="login" :autofocus="this.focus">
                            <p v-if="nameShow">用户名不能为空</p>
                        </div>
                    </div>
                    <!-- 密码 -->
                    <div class="item">
                        <div class="item-name">
                            <label for="">密码：</label>
                        </div>
                        <div class="item-ipt">
                            <input type="password" title="密码" v-model="password" @keyup.enter="login">
                            <p v-if="pwdShow">密码不能为空</p>
                        </div>
                    </div>
                    <!-- 是否记住密码 -->
                    <div class="item">
                        <div class="item-name">
                        </div>
                        <div class="item-ipt">
                            <input type="checkbox" style="-webkit-appearance: checkbox;" v-model="sel"><label for="checkbox">记住密码</label>                           
                        </div>
                    </div>
                    <!-- 登录 -->
                    <div class="item">
                        <div class="item-name">
                        </div>
                        <div class="item-ipt">
                            <button @click="login">登录</button>
                            <p v-if="pwdoruser">用户名或密码错误</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.css" scoped></style>

