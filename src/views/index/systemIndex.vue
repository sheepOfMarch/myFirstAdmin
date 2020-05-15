<template>
	<div class="systemIndex">
		<!-- 订单、销售信息 -->
		<div class="allInfo">
			<div v-for="(item, index) in arrData" :key="index">
				<div class="infoBox">
					<div class="pic" :style="{backgroundImage:item.bgi}"></div>
					<div class="info" >
						<span>{{ item.title }}</span><br>
						<span>{{index > 0 ? '¥' : '' }}{{ item.num }}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 待处理事务 -->
		<div class="todo">
			<div class="todoTitle">待处理事务</div>
			<div class="todoContent">
				<div class="todoInfo">
					<ul>
						<li><span>待付款订单</span><span>(<span class="red">{{reqData.dfk}}</span>)</span></li>
						<li><span>待发货订单</span><span>(<span class="red">{{reqData.dfh}}</span>)</span></li>
						<li><span>已发货订单</span><span>(<span class="red">{{reqData.ygb}}</span>)</span></li>
					</ul>
				</div>
				<div class="todoInfo">
					<ul>
						<li><span>已完成订单</span><span>(<span class="red">{{reqData.ywc}}</span>)</span></li>
						<li><span>新缺货登记</span><span>(<span class="red">{{reqData.dfk}}</span>)</span></li>
						<li><span>待处理退货订单</span><span>(<span class="red">{{reqData.dsh}}</span>)</span></li>
					</ul>
				</div>
				<div class="todoInfo">
					<ul>
						<li><span>待确认退货订单</span><span>(<span class="red">{{reqData.dqrth}}</span>)</span></li>
						<li><span>待处理退款申请</span><span>(<span class="red">{{reqData.dcltk}}</span>)</span></li>
						<li><span>广告位即将到期</span><span>(<span class="red">10</span>)</span></li>
					</ul>
				</div>
			</div>
			
		</div>
		<!-- 运营快捷入口 -->
		<div class="enter"></div>
		<!-- 商品、用户总览 -->
		<div class="allView"></div>
		<!-- 订单统计 -->
		<div class="orderStatistics"></div>
		<!-- 销售统计 -->
		<div class="sellStatistics"></div>
	</div>
</template>

<script>
	import pic01 from '@/assets/images/u2480.png'
	import pic02 from '@/assets/images/u2519.png'
	import pic03 from '@/assets/images/u2612.png'
	import pic04 from '@/assets/images/u2470.png'
	export default {
		name: 'systemIndex',
		data() {
			return {
				arrData: [
					{ bgi: "url(" + pic01 + ")", title: "今日订单总数", num: 1 },
					{ bgi: "url(" + pic02 + ")", title: "今日销售总额", num: 2 },
					{ bgi: "url(" + pic03 + ")", title: "昨日销售总额", num: 3 },
					{ bgi: "url(" + pic04 + ")", title: "近7天销售总额", num: 4 }
				],
				reqData: {}
			}
		},
		mounted() {
			this.$axios.post("merchant_order/getOrderAllCount", {
				merchantId: JSON.parse(this.$store.getters.userInfo).data.data.merchantId
			})
			.then(res => {
				var data = res.data.data;
				console.log(data);
				this.reqData = data;
				var num = [data.todayOrderNum, data.todayOrderMoney, data.yesterdayOrderMoney, data.nearlySevenDaysOrderMoney];
				this.arrData.forEach((item, index) => {
					item.num = num[index];
				})
			});
			
		},
		
	}
</script>

<style lang="less">
	.systemIndex {
		margin-top: 20px;
		width: 100%;
		.allInfo {
			display: flex;
			justify-content: space-between;
			.infoBox {
				width: 250px;
				height: 100px;
				border: 1px solid #dddddd;
				box-sizing: border-box;
				padding-top: 25px;
				padding-left: 20px;
				.pic {
					float: left;
					width: 50px;
					height: 50px;
					background-repeat: no-repeat;
					background-position: center;
				}
				.info {
					float: left;
					margin-left: 10px;
					text-align: left;
					font-weight: 700;
					font-size: 18px;
					:first-child {
						color: #878787;
					}
					:last-child {
						color: black;
					}
					
				}
			}
		}
		.todo {
			width: 100%;
			height: 200px;
			border: 1px solid #DDDDDD;
			box-sizing: border-box;
			margin-top: 20px;
			.todoTitle {
				height: 42px;
				background-color: #f0f0f0;
				text-align: left;
				font-size: 14px;
				font-weight: 600;
				line-height: 42px;
				padding-left: 20px;
				border-bottom: 1px solid #DDDDDD;
			}
			.todoContent {
				padding: 10px 30px;
				display: flex;
				justify-content: space-between;
				.todoInfo {
					// border: 1px solid #DDDDDD;
					width: 320px;
					li {
						border-bottom: 1px solid #eee;
						font-size: 14px;
						line-height: 39px;
						padding: 0px 10px;
						display: flex;
						justify-content: space-between;
						.red {
							color: red;
						}
					}
				}
			}
		}
	}
	
</style>
