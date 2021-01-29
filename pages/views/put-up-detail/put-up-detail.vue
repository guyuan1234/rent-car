<template>
	<view>
		<tui-skeleton
			v-if="skeletonShow"
			backgroundColor="#ffffff"
			skeletonBgColor="#f1f1f1"
			borderRadius="10rpx"
			:loadingType="2"
		></tui-skeleton>
		<div class="car-list tui-skeleton">
			<!-- 数据列表 -->
			<view class="container">
				<!-- 标签栏 -->
				<view class="fixed_top">
					<u-tabs
						:list="tab_list"
						height="88"
						bar-width="100"
						inactive-color="#999999"
						active-color="#0877bc"
						:bold="false"
						:is-scroll="false"
						:current="tab_checked"
						@change="tabsChange"
					></u-tabs>
				</view>
				<!-- 列表数据 -->
				<view class="list_box">
					<swiper :current="tab_checked" class="swiper" :duration="150" @change="swipeChange">
						<swiper-item v-for="(item, index) in tab_data" :key="index">
							<view class="swiper-item">
								<!--  -->
								<scroll-view class="scroll_view" scroll-y @scrolltolower="scrolltolower(index)">
									<view class="item_box" v-for="(v, k) in item.data" :key="k">
										<view class="cart_s">
											<p class="top">
												<span>2020-10-21</span>
												<!-- red_text  未完善 -->
												<span>未完善</span>
											</p>
											<view class="detail">
												<p>
													<span>项目名称</span>
													<span>租车的哈哈哈哈哈</span>
												</p>
												<p>
													<span>宾馆名称</span>
													<span>情趣宾馆</span>
												</p>
												<p>
													<span>住宿人</span>
													<span>王德法</span>
												</p>
											</view>
										</view>
									</view>
									<!-- 暂无显示 -->
									<view style="padding: 30rpx" v-if="item.data.length > 0 || item.loading">
										<u-loadmore icon-type="flower" :load-text="loadText" :status="status(item)" />
									</view>
									<!--  -->
									<gy-null paddingTop="120" v-else tip="暂无相关订单"></gy-null>
								</scroll-view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</div>
	</view>
</template>

<script>
export default {
	components: {},
	data: () => ({
		skeletonShow: false,
		tab_checked: -1,
		tab_list: [
			{
				name: '全部',
				type: 0,
			},
			{
				name: '未完善',
				type: 1,
			},
			{
				name: '已完善',
				type: 2,
			},
		],
		tab_data: [
			// {
			// 	p: 1, // 当前页
			//  limit: 10, // 请求一页多少条数据
			//  type: 1, // 区别分类-查询
			// 	loading: false, // 加载中
			// 	loaded: false, // 没有更多数据
			// 	data: [], // 展示数据
			// },
		],
		loadText: {
			loadmore: '上拉加载更多数据',
			loading: '数据加载中',
			nomore: '已加载全部数据',
		},
	}),
	computed: {
		status(item) {
			return (item) => {
				if (item.loading) {
					// 加载中
					return 'loading';
				} else if (item.loaded) {
					// 暂无更多数据
					return 'nomore';
				} else {
					// 点击加载更多数据
					return 'loadmore';
				}
			};
		},
	},
	methods: {
		// 上拉触底
		scrolltolower(e) {
			if (!this.tab_data[e].loading && !this.tab_data[e].loaded) {
				// 执行请求接口
				this.tab_data[e].p++;
				this.get_data_fun(e);
			}
		},
		// 切换tab变化
		tabsChange(e) {
			this.tab_checked = e;
		},
		// swiper 左右切换变化
		swipeChange(e) {
			this.tab_checked = e.detail.current;
			if (this.tab_data[this.tab_checked].data.length <= 0) {
				this.get_data_fun(this.tab_checked);
			}
		},
		// 获取数据
		async get_data_fun(index) {
			//index => 第几个列表
			// 请求前
			this.tab_data[index].loading = true;
			const _type = this.tab_data[index].type;
			this.$axios({
				url: '/order/orderList',
				data: {
					status: this.tab_data[index].type,
					page: this.tab_data[index].p,
					limit: this.tab_data[index].limit,
				},
			}).then((res) => {
				this.setTimeout(() => {
					// 请求完成后执行
					this.skeletonShow = false;
					this.tab_data[index].loading = false;
					if (res.code == 0) {
						if (this.tab_data[index].p == 1) {
							this.tab_data[index].data = [];
						}
						//
						if (res.data.length < this.tab_data[index].limit) {
							this.tab_data[index].loaded = true;
						}
						this.tab_data[index].data = [...this.tab_data[index].data, ...res.data];
					}
				});
			});
		},
		// 初始化列表
		init_list_fun() {
			this.tab_data = [];
			const tab_list = this.tab_list;
			for (let i = 0, len = tab_list.length; i < len; i++) {
				this.tab_data.push({
					p: 1, // 当前页
					limit: 10, // 请求一页多少条数据
					type: tab_list[i].type, // 区别分类-查询
					loading: false, // 加载中
					loaded: false, // 没有更多数据
					data: [1, 2, 3, 4], // 展示数据
				});
			}
		},
	},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad(data) {
		if (data.current) {
			this.tab_checked = Number(data.current);
		} else {
			this.tab_checked = 0;
		}

		// 初始化列表
		this.init_list_fun();
		this.get_data_fun(this.tab_checked);
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
		let fun = async () => {
			this.tab_data[this.tab_checked].p = 1;
			this.tab_data[this.tab_checked].loading = false;
			this.tab_data[this.tab_checked].loaded = false;
			await this.get_data_fun(this.tab_checked); // 等待此处promise执行完毕再执行以下代码
			uni.stopPullDownRefresh();
			this.common.toast('刷新成功', 500);
		};
		fun();
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
$padding: 30rpx; //
page {
	background: #f7f7f7;
}
.car-list {
	.container {
		.fixed_top {
			height: 90rpx;
			box-sizing: border-box;
			background: #fff;
			width: 100%;
			border-bottom: 1px solid #f7f7f7;
			z-index: 99;
		}
		.list_box {
			.swiper {
				height: calc(100vh - 90rpx);
				.swiper-item {
					height: 100%;
					.scroll_view {
						height: 100%;
						.item_box {
							padding: 20rpx 20rpx 0 20rpx;
							.cart_s {
								background-color: #ffffff;
								border-radius: 16rpx;
								padding: 0 30rpx;
								p.top {
									display: flex;
									flex-flow: row nowrap;
									justify-content: space-between;
									font-size: 28rpx;
									padding: 20rpx 0;
									border-bottom: 1px solid #f5f5f5;
									& span:last-child {
										color: #999;
									}
									.red_text {
										color: #bc1600;
									}
								}
								.detail {
									padding: 12rpx 0;
									p {
										padding: 10rpx 0;
										display: flex;
										font-size: 28rpx;
										& span:first-child {
											width: 150rpx;
											color: #666666;
										}
										& span:last-child {
											font-weight: normal;
											font-stretch: normal;
											color: #333333;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
