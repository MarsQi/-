import logo from '@/assets/images/logo-red.png'
import axios from '@/axios.js'
export default {
    data() {
        return {
            //是否选中记住密码
            sel: false,
            //焦点
            focus: true,
            //用户名称，密码
            username: '',
            password: '',
            //logo图标
            logo: logo,
            //正则判断信息
            nameShow: false,
            pwdShow: false,
            pwdoruser: false,
        }
    },
    mounted() {
        //获取本地存储用户信息
        this.getlocaluser('bigScreenUser', 'bigScreenPwd')
    },
    watch: {
        $route(to, from) { //检测路由            
            //获取本地存储用户信息
            this.getlocaluser('bigScreenUser', 'bigScreenPwd')
        }
    },
    methods: {
        getlocaluser(bigScreenLocuser, bigScreenLocpwd) { //获取localstroage存储的用户名密码
            this.sel = false;
            this.username = localStorage.getItem(bigScreenLocuser)
            this.password = localStorage.getItem(bigScreenLocpwd)
            if (localStorage.getItem(bigScreenLocuser) && localStorage.getItem(bigScreenLocpwd)) {
                this.sel = true;
            }
        },
        //登录
        login() {
            this.nameShow = false;
            this.pwdShow = false;
            this.nameORpwd = false;
            if (this.username == null || this.username == '') {
                this.nameShow = true
            } else if (this.password == null || this.password == '') {
                this.pwdShow = true
            } else {
                let that = this;
                //登陆
                let loginParam = {
                    username: that.username,
                    password: that.password

                }
                axios.post('/loginPost', loginParam)
                    .then((res) => {
                        if (res.data.status === "SUCCESS") {
                            that.pwdoruser = false;
                            if (this.sel) { //设置要记住的账户，密码
                                localStorage.setItem("bigScreenUser", that.username)
                                localStorage.setItem("bigScreenPwd", that.password)
                            } else {
                                localStorage.removeItem("bigScreenUser");
                                localStorage.removeItem("bigScreenPwd");
                            }
                            //跳转首页
                            that.$router.push({ path: "/home" });
                        } else {
                            that.pwdoruser = true;
                        }
                    })
                    .catch((err) => {

                    })
            }
            // this.$router.push({ path: "/home" })
        }
    }
};