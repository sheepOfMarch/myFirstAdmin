<template>
	<div class="index">
		<!-- 导航栏 -->
		<div class="nav">
			<h3 class="title">零售</h3>
			<ul>
				<li 
				:class="index == activeNav ? 'ative' : ''" 
				class="nav_list"
				v-for="(item, index) in nav" 
				:key="index" 
				@click="switchNav(item.path)">
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
				<span><i class="el-icon-s-home pointer"></i></span>|
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
				<span><i class="el-icon-switch-button pointer" @click="exit"></i></span>
			</div>
		</div>
		<!-- 侧边栏 -->
		<div class="menu" :style="{ 'height': mainHeight + 'px' }">
			<ul v-for="(item,index) in getSideMenu" :key="index">
			  <li class="menu-item menu-title">{{ item.sub }}</li>
			  <router-link
			    active-class="active"
			    tag="li"
			    class="menu-item"
			    v-for="(child,id) in item.menu"
			    :key="id"
			    :to="child.path" @click.native="getThisName(child.name)"
			  >{{ child.name }}</router-link>
			</ul>
			
		</div>
		
		<!-- 主窗口 -->
		<div class="content" :style="{ 'width': mainWidth + 'px', 'height': mainHeight + 'px' }">
			<div class="contentHead"
			:style="{ 'width': mainWidth + 'px'}">
			<div class="centerHead">
				<div class="title">{{isChildName ? childName : getSideMenu[0].menu[0].name}}</div>
				<div class="afresh" @click="afreshList">刷新</div>
			</div>
			</div>
			<div class="center">
				<router-view></router-view>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import nav from "@/utils/nav.js"
	export default {
		name: 'index',
		data() {
			return {
				nav: nav,
				isInfo: false,
				isAmind: false,
				childName: '',
				isChildName: false,
				mainHeight: window.innerHeight - 50,
				mainWidth: window.innerWidth - 180,
				dateOfLogin: '2020-05-12 14:36:12',
				localOfLogin: '广东省深圳市（IP：183.14.135.1）',
				pDate: '2018-09-03 14:36:21'
			}
		},
		computed: {
		  activeNav() {
		    return this.$store.getters.activeNav;
		  },
			getSideMenu() {
				return nav[this.$store.getters.activeNav].child;
			},
			
		},
		methods: {
			getThisName(name) {
				this.isChildName = true;
				this.childName = name;
				// console.log(this.childName);
			},
			switchNav(path) {
				this.isChildName = false;
				this.$router.push(path);
			},
			exit() {
				this.$router.push('/');
				this.$store.commit("CLEAR_USERINFO");
			},
			toggleIsInfo() {
				this.isInfo = this.isEnter ? false : true;
			},
			afreshList() {
				console.log('afresh');
			}
		},
		
	}
</script>

<style lang="less">
	.index {
		position: relative;
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
						background-color: #fff;
						z-index: 99;
						width: 420px;
						height: 230px;
						font-size: 14px;
						position: absolute;
						right: 10px;
						top: 50px;
						border-left: 1px solid #ccc;
						border-right: 1px solid #ccc;
						border-bottom: 1px solid #ccc;
						box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
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
					background-color: #fff;
					z-index: 99;
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
					box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
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
			.pointer {
				cursor: pointer;
			}
		}

		.menu {
			width: 180px;
			background-color: #e5e8ed;
			position: relative;
			border-right: 1px solid #dddddd;
			
			.active {
				color: rgba(26, 188, 156, 1);
				background-color: #fff;
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
			.menu-title {
				background-color: #efefef;
				border-bottom: 1px solid #dddddd;
				height: 48px;
				color: #878787;
				line-height: 48px;
			}
			.menu-title:hover {
				color: #878787;
				cursor: default;
			}

		}

		.content {
			position: absolute;
			left: 180px;
			top: 50px;
			// background-color: olive;
			.contentHead {
				font-size: 14px;
				height: 47px;
				background-color: #efefef;
				border-bottom: 1px solid #dddddd;
				border-left: 1px solid #dddddd;
				.centerHead {
					width: 1100px;
					height: 100%;
					margin: auto;
					// background-color: orange;
					.title {
						line-height: 18px;
						margin-top: 15px;
						padding-left: 5px;
						border-left: 6px solid rgba(26, 188, 156, 1);
						float: left;
					}
					.afresh {
						float: right;
						width: 78px;
						height: 28px;
						line-height: 30px;
						margin-top: 9px;
						border: 1px solid #dddddd;
						background-color: #fff;
						cursor: pointer;
					}
				}
			}
			.center {
				width: 1100px;
				margin: auto;
			}
		}
		
	}
</style>