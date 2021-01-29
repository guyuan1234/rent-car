<template>
	<div class="put-up-com">
		<image class="header_top" src="/static/images/bg/2.png" mode="widthFix" />
		<!--  -->
		<p class="title1">住宿信息</p>
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
		<tui-list-cell
			:hover="false"
			padding="30rpx 0"
			:lineLeft="false"
			backgroundColor="transparent"
			arrow
			@click="openEvent('hotelShow')"
			:arrowRight="false"
		>
			<view class="container1">
				<view class="left">宾馆名称</view>
				<view class="right select"> 请选择宾馆名称 </view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell
			:hover="false"
			padding="30rpx 0"
			:lineLeft="false"
			backgroundColor="transparent"
			arrow
			@click="openEvent('putupShow')"
			:arrowRight="false"
		>
			<view class="container1">
				<view class="left">住宿人姓名</view>
				<view class="right select"> 请选择住宿人姓名 </view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">房间号</view>
				<view class="right">
					<input type="text" placeholder="请输入房间号" />
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">每天单价</view>
				<view class="right">
					<input type="number" placeholder="请输入每天单价" />
					<span>元</span>
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
				<view class="left">入住日期</view>
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
				<view class="left">离宿日期</view>
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
		<!-- 宾馆选择器 -->
		<u-picker
			v-model="hotelShow"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'hotelShow')"
			:range="hotelData"
			range-key="name"
			mode="selector"
		></u-picker>
		<!-- 住宿人选择器 -->
		<u-picker
			v-model="putupShow"
			@cancel="cancel"
			@close="cancel"
			:range="putupData"
			@confirm="confirm($event, 'putupShow')"
			range-key="name"
			mode="selector"
		></u-picker>
		<!-- 日期选择器 -->
		<u-picker
			v-model="startShow"
			@cancel="cancel"
			@confirm="confirm($event, 'startShow')"
			@close="cancel"
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
		hotelShow: false,
		hotelData: [
			{ id: 1, name: '宾馆1' },
			{ id: 2, name: '宾馆2' },
		],
		putupShow: false,
		putupData: [
			{ id: 1, name: '住宿人1' },
			{ id: 2, name: '住宿人2' },
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
.put-up-com {
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
