<template>
	<div class="rent-car">
		<image class="header_top" src="/static/images/bg/1.png" mode="widthFix" />
		<!--  -->
		<p class="title1">车辆信息</p>
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
			@click="openEvent('driverShow')"
			:arrowRight="false"
		>
			<view class="container1">
				<view class="left">驾驶员</view>
				<view class="right select"> 请选择驾驶员 </view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell
			:hover="false"
			padding="30rpx 0"
			:lineLeft="false"
			backgroundColor="transparent"
			arrow
			@click="openEvent('plateShow')"
			:arrowRight="false"
		>
			<view class="container1">
				<view class="left">车牌号</view>
				<view class="right select"> 请选择车牌号 </view>
			</view>
		</tui-list-cell>
		<!--  -->
		<p class="title1 padding">出发信息</p>
		<!--  -->
		<tui-list-cell
			:hover="false"
			padding="30rpx 0"
			:lineLeft="false"
			backgroundColor="transparent"
			arrow
			@click="openEvent('peopleShow')"
			:arrowRight="false"
		>
			<view class="container1">
				<view class="left">租车人姓名</view>
				<view class="right select"> 请选择租车人姓名 </view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">起始里程</view>
				<view class="right">
					<input type="text" placeholder="请输入起始里程" />
					<span>KM</span>
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell
			:hover="false"
			unlined
			padding="30rpx 0"
			:lineLeft="false"
			backgroundColor="transparent"
			:arrow="false"
		>
			<view class="topBox">请上传起始里程照片</view>
			<view class="updateBox">
				<tui-upload :limit="1"></tui-upload>
			</view>
		</tui-list-cell>
		<!--  -->
		<p class="title1 padding2">归程信息</p>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">归程里程</view>
				<view class="right">
					<input type="text" placeholder="请输入归程里程" />
					<span>KM</span>
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">过路费</view>
				<view class="right">
					<input type="number" placeholder="请输入您的过路费" />
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
			@click="openEvent('dateShow')"
		>
			<view class="container1">
				<view class="left">租车日期</view>
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
			unlined
			padding="30rpx 0"
			:lineLeft="false"
			backgroundColor="transparent"
			:arrow="false"
		>
			<view class="topBox">请上传归程里程照片</view>
			<view class="updateBox">
				<tui-upload :limit="1"></tui-upload>
			</view>
		</tui-list-cell>
		<!-- 提交按钮 -->
		<button class="button">提交</button>
		<!-- 日期选择器 -->
		<u-picker
			v-model="dateShow"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'dateShow')"
			mode="time"
		></u-picker>
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
		<!-- 驾驶员选择器 -->
		<u-picker
			v-model="driverShow"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'driverShow')"
			:range="driverData"
			range-key="name"
			mode="selector"
		></u-picker>
		<!-- 车牌选择器 -->
		<u-picker
			v-model="plateShow"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'plateShow')"
			:range="plateData"
			range-key="name"
			mode="selector"
		></u-picker>
		<!-- 租车人选择器 -->
		<u-picker
			v-model="peopleShow"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'peopleShow')"
			:range="peopleData"
			range-key="name"
			mode="selector"
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
		driverShow: false,
		driverData: [
			{ id: 1, name: '驾驶员1' },
			{ id: 2, name: '驾驶员2' },
		],
		plateShow: false,
		plateData: [
			{ id: 1, name: '车牌1' },
			{ id: 2, name: '车牌2' },
		],
		peopleShow: false,
		peopleData: [
			{ id: 1, name: '租车人1' },
			{ id: 2, name: '租车人2' },
		],
		dateShow: false,
	}),
	computed: {},
	methods: {
		openEvent(item) {
			// uni.hideTabBar();
			this[item] = true;
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
.rent-car {
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
		&.padding {
			padding-top: 60rpx;
		}
		&.padding2 {
			padding-top: 30rpx;
		}
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
				margin-right: 10rpx;
				font-weight: normal;
			}
			span {
				color: #333;
			}
			&.date {
				span {
					padding-left: 10rpx;
					color: #333;
				}
				& span:nth-child(odd) {
					color: #888;
				}
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
	.updateBox {
		padding-top: 28rpx;
	}
	.button {
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
