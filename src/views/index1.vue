<template>
	<div class="index">
		<div class="nav">
			<h3 class="title">零售</h3>
			<ul>
				<li :class="index == activeNav ? 'nav_list ative' : 'nav_list'" v-for="(item, index) in nav" :key="index" @click="switchNav(item.path)">
					{{ item.title }}
				</li>

			</ul>
			<div class="nav_right">
				<span class="user noType" @mouseover="isInfo=true" @mouseout="isInfo=false"><i class="el-icon-user-solid"></i> admin
				<div class="userInfo" v-show="isInfo" @mouseout="isInfo=false">
					<div class="loginInfo">
						<span>登录信息</span>
						<span>账户设置</span>
					</div>
					<div class="infoList">
						<ul>
							<li>本次登录：{{ dateOfLogin }}</li>
							<li>登录地区：{{ localOfLogin }}</li>
							<li>上次登录：{{ pDate }}</li>
						</ul>
					</div>
				</div></span>|
				<span><i class="el-icon-s-home"></i></span>|
				<span class="amind" @mouseover="isAmind=true" @mouseout="isAmind=false"><i class="el-icon-message-solid"><i class="amindNum">50</i></i>
				<div class="orAmind" v-show="isAmind" @mouseout="isAmind=false">
					<div class="orderAmind">
						<span class="grey">订单提示</span>
						<ul>
							<li><span>待付款订单</span>(<span class="red">{{ 10 }}</span>)</li>
							<li><span>待发货订单</span>(<span class="red">{{ 10 }}</span>)</li>
							<li><span>已发货订单</span>(<span class="red">{{ 10 }}</span>)</li>
							<li><span>已完成订单</span>(<span class="red">{{ 10 }}</span>)</li>
						</ul>
					</div>
					<div class="ggAmind">
						<span class="grey">广告位提示</span>
						<ul>
							<li><span>广告位即将到期</span>(<span class="red">{{ 10 }}</span>)</li>
						</ul>
					</div>
				</div></span>|
				<span><i class="el-icon-switch-button" @click="exit"></i></span>
			</div>
		</div>
		<div class="menu" :style="{ 'height': mainHeight + 'px' }">
			<h4 class="noType">系统首页</h4>
			<ul>
				<li v-for="item in nav.index.child[0].menu" :key="item.path" @click="toContent(item.path)">{{ item.name }}</li>
			</ul>
		</div>
		
		<div class="content" :style="{ 'width': mainWidth + 'px', 'height': mainHeight + 'px' }">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import nav from "@/utils/nav";
	export default {
		name: 'index',
		data() {
			return {
				mainHeight: window.innerHeight - 50,
				mainWidth: window.innerWidth - 180,
				nav: nav,
				sideNav: {},
				isInfo: false,
				isAmind: false,
				dateOfLogin: '2020-05-12 14:36:12',
				localOfLogin: '广东省深圳市（IP：183.14.135.1）',
				pDate: '2018-09-03 14:36:21'
			}
		},
		created() {
			updataSideNav();
		},
		methods: {
			switchNav(path) {
				console.log(path);
				this.$router.push(path);
			},
			exit() {
				this.$router.push('/');
			},
			toggleIsInfo() {
				this.isInfo = this.isEnter ? false : true;
			},
			toContent(path) {
				this.$router.push(path);
			},
			updataSideNav(){
				console.log('abc')
			}
		},
		
		watch: {
			'isInfo': function() {
				this.isEnter = this.isInfo;
			}
		},
		computed: {
		  activeNav() {
		    return this.$store.getters.activeNav;
		  },
		}
	}
</script>

<style lang="less">
	.index {
		min-width: 1200px;
		.noType {
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
		}
		.nav {
			width: 100%;
			height: 50px;
			background-color: #4b4f5b;
			border: 1px solid #3d404a;
			box-sizing: border-box;
			color: #fff;
			line-height: 50px;
			overflow: hidden;

			.title {
				float: left;
				width: 180px;
			}

			.nav_list {
				line-height: 50px;
				float: left;
				width: 60px;
				font-size: 14px;
				font-weight: 700;
			}

			.ative {
				background-color: #777a83;
			}

			.nav_list:hover {
				cursor: pointer;
				color: #dbdede;
			}

			.nav_right {
				float: right;
				height: 50px;
				vertical-align: middle;
				color: #3d3e40;
				font-size: 22px;

				span {
					padding: 0 30px;
				}

				.user {
					font-size: 16px;
					height: 50px;
					display: inline-block;
					color: #e6e9e9;
					.userInfo {
						width: 420px;
						height: 230px;
						font-size: 14px;
						position: absolute;
						right: 10px;
						top: 50px;
						border-left: 1px solid #ccc;
						border-right: 1px solid #ccc;
						border-bottom: 1px solid #ccc;
						box-shadow: 2px 2px 5px;
						.loginInfo {
							height: 50px;
							margin: 5px 15px;
							border-bottom: 1px solid #ccc;
							:first-child {
								color: #6e6e6e;
								float: left;
							}
							:last-child {
								color: #1fb18e;
								float: right;
								cursor: pointer;
							}
						}
						.infoList {
							ul {
								font-size: 12px;
								color: #6e6e6e;
								padding: 30px 0px 0px 45px;
								float: left;
								li {
									text-align: left;
									height: 30px;
								}
							}
						}
					}
					.el-icon-user-solid {
						font-size: 24px;
					}
				}

				i {
					color: #e6e9e9;
				}
				.amind {
					display: inline-block;
					height: 50px;
					
					
				.el-icon-message-solid {
					position: relative;

					.amindNum {
						display: block;
						position: absolute;
						top: -6px;
						left: 14px;
						width: 20px;
						height: 20px;
						line-height: 20px;
						font-size: 12px;
						font-style: normal;
						font-weight: 700;
						border-radius: 50%;
						background-color: red;
					}
				}
				.orAmind {
					width: 360px;
					height: 330px;
					font-size: 10px;
					padding: 0px 30px;
					position: absolute;
					right: 10px;
					top: 50px;
					text-align: left;
					border-left: 1px solid #ccc;
					border-right: 1px solid #ccc;
					border-bottom: 1px solid #ccc;
					box-shadow: 2px 2px 5px;
					.grey {
						color: #808080;
						font-size: 14px;
						padding: 0 10px;
					}
					.red {
						color: red;
						padding: 0 10px;
					}
					.orderAmind {
						li {
							text-align: right;
							line-height: 40px;
							border-top: 1px solid #808080;
							:first-child {
								float: left;
								padding: 0 10px;
								
							}
						}
					}
					.ggAmind {
						li {
							text-align: right;
							line-height: 40px;
							border-top: 1px solid #808080;
							:first-child {
								float: left;
								padding: 0 10px;
								
							}
						}
					}
				}
				}
			}

		}

		.menu {
			float: left;
			width: 180px;
			background-color: #e5e8ed;

			h4 {
				
				background-color: #efefef;
				border-bottom: 1px solid #dddddd;
				height: 48px;
				color: #878787;
				line-height: 48px;
			}

			li {
				height: 40px;
				border-bottom: 1px solid #dddddd;
				color: #3c3c3c;
				font-size: 12px;
				line-height: 40px;
			}

			li:hover {
				color: rgba(26, 188, 156, 1);
				cursor: pointer;
			}

		}

		.content {
			float: left;
		}
		
	}
</style>
