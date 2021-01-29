<template>
	<div class="preson-center">
		<gy-navBar mode="general" transparent title="我的" @bar-height="barHeight"></gy-navBar>
		<!--  -->
		<view class="headertop" :style="{ paddingTop: barheight }">
			<image src="/static/images/bg/4.png" mode="widthFix" />
			<view class="center">
				<p>{{ userCenterw.relaname }}</p>
				<p>{{ userCenterw.phone }}</p>
			</view>
		</view>
		<!--  -->
		<view class="container">
			<!--  -->
			<tui-list-cell
				v-for="(v, k) in btnList"
				:key="k"
				:hover="false"
				padding="30rpx 0"
				:lineLeft="false"
				backgroundColor="transparent"
				arrow
				@click="skipEvent(v)"
				:arrowRight="false"
			>
				<view class="container1">
					<view class="left">
						<image :src="v.img" mode="" />
						<span>{{ v.name }}</span>
					</view>
				</view>
			</tui-list-cell>
		</view>
	</div>
</template>

<script>
export default {
	components: {},
	data: () => ({
		barheight: 0,
		userCenterw: {},
		btnList: [
			{
				img: '/static/images/icon/tabbar-1-s.png',
				url: '/pages/views/rent-car-detail/rent-car-detail',
				name: '租车信息',
			},
			{
				img: '/static/images/icon/tabbar-2-s.png',
				url: '/pages/views/put-up-detail/put-up-detail',
				name: '住宿信息',
			},
			{
				img: '/static/images/icon/tabbar-3-s.png',
				url: '/pages/views/salary-earner-detail/salary-earner-detail',
				name: '雇工信息',
			},
			{
				img: '/static/images/icon/message.png',
				url: '/pages/views/message-list/message-list',
				name: '通知',
			},
			{
				img: '/static/images/icon/loginout.png',
				name: '退出登录',
				type: 'loginOut',
			},
		],
	}),
	computed: {},
	methods: {
		get_data_fun() {
			this.$axios({
				url: '/user/userCenter',
			}).then((res) => {
				console.log(res);
				if (res.code == 0) {
					this.userCenterw = res.data;
					// is_leader = 1 项目负责人  2 = 测量员 只能雇工
					uni.setStorageSync('is_leader', res.data.is_leader);
				}
			});
		},
		barHeight(data) {
			this.barheight = data + 'px';
		},
		skipEvent(data) {
			if (data.type === 'loginOut') {
				this.common
					.modal({
						content: '确认要退出登录？',
					})
					.then(() => {
						uni.removeStorageSync('token');
						uni.removeStorageSync('is_leader');
						uni.reLaunch({
							url: '/pages/views/login/login',
						});
					});
			} else {
				this.skipLink('navigateTo', data.url);
			}
		},
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {
		this.get_data_fun();
	},
	// 页面周期函数--监听页面初次渲染完成
	onReady() {},
	// 页面周期函数--监听页面显示(not-nvue)
	onShow() {},
	// 页面周期函数--监听页面隐藏
	onHide() {},
	// 页面周期函数--监听页面卸载
	onUnload() {},
	// 页面处理函数--监听用户下拉动作
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
	},
	// 页面处理函数--监听用户上拉触底
	onReachBottom() {},
	// 页面处理函数--监听页面滚动(not-nvue)
	/* onPageScroll(event) {}, */
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scope>
.preson-center {
	.headertop {
		position: relative;
		height: 300rpx;
		image {
			width: 100%;
			background: #f7f7f7;
			position: absolute;
			top: 0;
			left: 0;
		}
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		padding: 0 30rpx;
		.center {
			position: relative;
			z-index: 2;
			color: #fff;
			& p:first-child {
				font-size: 36rpx;
				padding-bottom: 14rpx;
			}
			& p:last-child {
				font-size: 28rpx;
			}
		}
	}
	.container {
		padding: 30rpx;
		padding-top: 0;
		.container1 {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			.left {
				font-size: 30rpx;
				color: #333333;
				display: flex;
				align-items: center;
				image {
					width: 46rpx;
					height: 46rpx;
					margin-right: 16rpx;
				}
			}
		}
	}
}
</style>
