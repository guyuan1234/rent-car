<template>
	<div class="salary-earner">
		<image class="header_top" src="/static/images/bg/3.png" mode="widthFix" />
		<!--  -->
		<p class="title1">雇工信息</p>
		<!--  -->
		<tui-list-cell
			:hover="false"
			padding="30rpx 0"
			:lineLeft="false"
			backgroundColor="transparent"
			arrow
			@click="openEvent('projectShow')"
			:arrowRight="false"
		>
			<view class="container1">
				<view class="left">项目名称</view>
				<view class="right select"> 请选择项目名称 </view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">雇工姓名</view>
				<view class="right">
					<input type="text" placeholder="请输入雇工姓名" />
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">性别</view>
				<view class="right">
					<u-radio-group v-model="value" active-color="#0877bc">
						<u-radio name="1"> 男 </u-radio>
						<u-radio name="2"> 女 </u-radio>
					</u-radio-group>
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">电话</view>
				<view class="right">
					<input type="number" placeholder="请输入雇工电话" />
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">身份证号</view>
				<view class="right">
					<input type="text" placeholder="请输入雇工身份证号" />
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">开户银行</view>
				<view class="right">
					<input type="text" placeholder="请输入开户银行" />
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">银行卡号</view>
				<view class="right">
					<input type="number" placeholder="请输入银行卡号" />
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">用工单价</view>
				<view class="right">
					<input type="number" placeholder="请输入用工单价" />
					<span>/天</span>
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell
			:hover="false"
			padding="30rpx 0"
			:lineLeft="false"
			backgroundColor="transparent"
			arrow
			:arrowRight="false"
			@click="openEvent('startShow')"
		>
			<view class="container1">
				<view class="left">雇工日期</view>
				<view class="right date select">
					<span>2020</span>
					<span>年</span>
					<span>12</span>
					<span>月</span>
					<span>12</span>
					<span>日</span>
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell
			:hover="false"
			padding="30rpx 0"
			:lineLeft="false"
			backgroundColor="transparent"
			arrow
			:arrowRight="false"
			@click="openEvent('endShow')"
		>
			<view class="container1">
				<view class="left">结束日期</view>
				<view class="right date select">
					<span>2020</span>
					<span>年</span>
					<span>12</span>
					<span>月</span>
					<span>12</span>
					<span>日</span>
				</view>
			</view>
		</tui-list-cell>
		<!-- 提交按钮 -->
		<button class="button">提交</button>
		<!-- 项目名称选择器 -->
		<u-picker
			v-model="projectShow"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'projectShow')"
			:range="projectData"
			range-key="name"
			mode="selector"
		></u-picker>
		<!-- 日期选择器 -->
		<u-picker
			v-model="startShow"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'startShow')"
			mode="time"
		></u-picker>
		<!-- 日期选择器 -->
		<u-picker
			v-model="endShow"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'endShow')"
			mode="time"
		></u-picker>
	</div>
</template>

<script>
export default {
	props: {},
	data: () => ({
		projectShow: false,
		projectData: [
			{ id: 1, name: '项目1' },
			{ id: 2, name: '项目2' },
		],
		startShow: false,
		endShow: false,
	}),
	computed: {},
	methods: {
		openEvent(item) {
			this[item] = true;
			// uni.hideTabBar();
		},
		confirm(data, item) {
			console.log(data, item);
			// uni.showTabBar();
		},
		cancel() {
			// uni.showTabBar();
		},
	},
	watch: {},

	// 组件周期函数--监听组件挂载完毕
	mounted() {},
	// 组件周期函数--监听组件数据更新之前
	beforeUpdate() {},
	// 组件周期函数--监听组件数据更新之后
	updated() {},
	// 组件周期函数--监听组件激活(显示)
	activated() {},
	// 组件周期函数--监听组件停用(隐藏)
	deactivated() {},
	// 组件周期函数--监听组件销毁之前
	beforeDestroy() {},
};
</script>

<style lang="scss" scope>
.salary-earner {
	padding: 28rpx;
	.header_top {
		width: 100%;
		background-color: #b4ddff;
		border-radius: 16rpx;
		margin-bottom: 28rpx;
	}
	.title1 {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}
	.container1 {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		.left {
			font-size: 30rpx;
			font-weight: 600;
			color: #333333;
		}
		.right {
			font-size: 30rpx;
			font-weight: normal;
			color: #888;
			display: flex;
			flex-flow: row nowrap;
			input {
				line-height: 30rpx;
				text-align: right;
				font-weight: normal;
			}
			span {
				margin-left: 10rpx;
				color: #333;
			}
			&.select {
				padding-right: 30rpx;
			}
		}
	}
	.topBox {
		font-size: 28rpx;
		line-height: 34rpx;
		font-weight: 600;
		color: #333333;
	}
	.button {
		margin-top: 60rpx;
		height: 88rpx;
		background-color: #0877bc;
		border-radius: 44rpx;
		font-size: 32rpx;
		line-height: 88rpx;
		color: #ffffff;
		&:after {
			border: 0;
		}
		&:active {
			opacity: 0.6;
		}
	}
}
</style>
