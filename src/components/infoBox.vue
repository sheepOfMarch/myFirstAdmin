<template>
	<div class="infoBox">
		<div class="pic"></div>
		<div class="info" >
			<span></span>
			<span></span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				infoBoxObj: {
					url: "background-image: url(../assets/images/u2480.png)",
					title: '',
					number: 0,
					isMoney: ture
				}
			}
		}
	}
</script>

<style>
	.infoBox {
		width: 250px;
		height: 100px;
		border: 1px solid #dddddd;
		box-sizing: border-box;
	}
</style>
