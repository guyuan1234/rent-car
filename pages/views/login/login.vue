<template>
	<div class="login">
		<view class="logo">
			<image src="/static/images/logo/logo.png" mode="" />
		</view>
		<!--  -->
		<view class="container_box">
			<view class="item">
				<image src="/static/images/icon/user.png" mode="" />
				<input type="text" v-model="phone" placeholder="请输入您的账号" />
			</view>
			<!--  -->
			<view class="item">
				<image src="/static/images/icon/pwd.png" mode="" />
				<input type="password" v-model="password" placeholder="请输入您的密码" />
			</view>
			<!-- 提交按钮 -->
			<button class="button" @click="loginEvent">立即登录</button>
		</view>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	components: {},
	data: () => ({
		phone: '',
		password: '',
	}),
	computed: {},
	methods: {
		...mapMutations(['setingAuth']),
		loginEvent() {
			if (!this.phone) {
				this.common.toast('请输入您的账号');
				return;
			} else if (!this.password) {
				this.common.toast('请输入您的账号密码');
				return;
			}
			this.common.loading();
			this.$axios({
				url: '/index/login',
				data: {
					phone: this.phone,
					password: this.password,
				},
			}).then((res) => {
				this.setTimeout(() => {
					uni.hideLoading();
					if (res.code == 0) {
						uni.setStorageSync('login_phone', this.phone);
						uni.setStorageSync('token', res.data.token);
						// is_leader = 1 项目负责人  2 = 测量员 只能雇工
						this.setingAuth(res.data.is_leader);
						this.skipLink('switchTab', '/pages/tabbar/preson-center/preson-center');
					}
				});
			});
		},
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {
		this.phone = uni.getStorageSync('login_phone') || '';
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
.login {
	.logo {
		padding-top: 150rpx;
		text-align: center;
		image {
			width: 330rpx;
			height: 138rpx;
		}
	}
	.container_box {
		padding: 0 100rpx;
		padding-top: 350rpx;
		.item {
			padding: 23rpx;
			border-bottom: 1px solid #f5f5f5;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			input {
				font-size: 28rpx;
				width: calc(100% - 36rpx - 20rpx);
			}
			image {
				width: 36rpx;
				height: 41rpx;
				margin-right: 20rpx;
			}
		}
		.button {
			height: 88rpx;
			background-color: #0877bc;
			border-radius: 44rpx;
			font-size: 32rpx;
			line-height: 88rpx;
			color: #ffffff;
			margin-top: 90rpx;
			&:after {
				border: 0;
			}
			&:active {
				opacity: 0.6;
			}
		}
	}
}
</style>
