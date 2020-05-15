<template>
	<div class="loginPage">
		<div class="background">

		</div>
		<div class="loginBox">
			<h2>后台业务管理系统</h2>
			<div class="nameInput">
				<i class="nameIco"></i>
				<input v-model="form.username" @focus="focusEvent" type="text" placeholder="请输入用户名称">
				<i class="el-icon-error" @click="delusername" v-show="form.username"></i>
			</div>
			<div class="nameInput two">
				<i class="passwordIco"></i>
				<input v-model="form.password" @focus="focusEvent" type="password" placeholder="请输入登录密码">
				<i class="el-icon-error" @click="delpassword" v-show="form.password"></i>
			</div>
			<div class="message" v-show="messageflag">
				<i class="el-icon-warning"></i>
				<span>{{ message }}</span>
			</div>
			<div class="loginBtn" @click="login">登录</div>
		</div>
	</div>
</template>

<script>
	import CONFIG from '../utils/config.js';
	export default {
		name: "login",
		data() {
			return {
				form: {
					username: "13932493200",
					password: "000000"
				},
				config: CONFIG,
				message: '',
				messageflag: false,  
			}
		},
		methods:{
			focusEvent() {
				this.messageflag = false;
			},
			delpassword() {
				this.form.password = '';
			},
			delusername() {
				this.form.username = '';
			},
			login() {
				// console.log(process.env.BASE_URL);
				if(!this.form.username && !this.form.password) {
					this.messageflag = true;
					this.message = '请输入账号和密码';
				}else if(!this.form.username) {
					this.messageflag = true;
					this.message = '请填写用户账号';
				}else if(!this.form.password) {
					this.messageflag = true;
					this.message = '请填写登录密码';
				}
				this.$axios.post("merchant/login", this.form)
					.then(
						res => {
							this.$message({
								message: "登陆成功!",
								type: 'success'
							});
							this.$store.commit("SET_USERINFO", JSON.stringify(res));
							localStorage.userId = res.userId;
							localStorage.userMobile = res.merchantMobile;
							localStorage.merchantId_ID = res.merchantId;
							localStorage.moduleId = 300;
							this.$router.push("/index");
						},
						err => {
							console.log(err);
						})
			}
		}
	}
</script>

<style lang="less" scoped>
	@greenC: rgba(26, 188, 156, 1);

	.loginPage {
		width: 100%;
		height: 420px;
		position: absolute;
		top: 50%;
		margin-top: -210px;

		.background {
			height: 220px;
			width: 100%;
			margin-top: 100px;
			background-color: @greenC;
			background-image: url(../assets/images/u2154_state0.png);
			position: absolute;
		}

		.loginBox {
			width: 350px;
			height: 420px;
			position: absolute;
			background-color: #fff;
			left: 50%;
			transform: translateX(-50%);
			z-index: 3;
			box-shadow: 0px 0px 10px 0px #bbb;
			border-top: 10px solid @greenC;
			box-sizing: border-box;
			
			h2 {
				margin-top: 100px;
				color: @greenC;
			}
			.nameInput {
				width: 300px;
				height: 50px;
				margin-top: 20px;
				margin-left: 25px;
				margin-bottom: 20px;
				position: relative;
				.el-icon-error {
					cursor: pointer;
				}
				.nameIco, .passwordIco {
					width: 24px;
					height: 24px;
					margin-right: 10px;
					position: absolute;
					top: 13px;
					left: 10px;
				}
				.nameIco {
					background: url(../assets/images/u2176.png) no-repeat;
				}
				.passwordIco {
					background: url(../assets/images/u2178.png) no-repeat;
				}
				.el-icon-error {
					line-height: 50px;
					position: absolute;
					font-size: 18px;
					color: @greenC;
					right: 10px;
				}
				input {
					width: 100%;
					height: 100%;
					color: #ccc;
					border: 1px solid #ccc;
					border-radius: 3px;
					box-sizing: border-box;
					padding-left: 40px;
					font-family: '微软雅黑';
					font-size: 14px;
					font-weight: 700;
					box-shadow: none;
					outline: none;
				}
				input:focus {
					border: 2px solid @greenC;
				}
			}
			.message {
				width: 300px;
				height: 40px;
				background-color: black;
				opacity: 0.5;
				margin: auto;
				margin-top: -10px;
				margin-bottom: 10px;
				border-radius: 2px;
				text-align: left;
				line-height: 40px;
				i {
					padding-left: 30px;
					color: white;
					font-size: 18px;
				}
				span {
					color: white;
					font-size: 15px;
				}
			}
			.loginBtn {
				position: relative;
				width: 300px;
				height: 50px;
				background-color: @greenC;
				border-radius: 3px;
				margin: auto;
				line-height: 50px;
				font-size: 18px;
				font-weight: 700;
				color: #fff;
			}
			.loginBtn:hover {
				opacity: 0.8;
				cursor: pointer;
			}
		}






	}
</style>
