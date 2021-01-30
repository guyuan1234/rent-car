<template>
	<div class="put-up-com">
		<image v-if="!detail_data" class="header_top" src="/static/images/bg/2.png" mode="widthFix" />
		<!--  -->
		<p class="title1">住宿信息</p>
		<!--  -->
		<tui-list-cell
			:hover="false"
			padding="30rpx 0"
			:lineLeft="false"
			backgroundColor="transparent"
			:arrow="detail_data ? false : true"
			@click="!detail_data && openEvent('projectShow')"
			:arrowRight="false"
		>
			<view class="container1">
				<view class="left">项目名称</view>
				<view class="right select" :style="detail_data && 'padding-right:0'">
					<p v-if="!detail_data">{{ get_data_select('project', 'pid').title || '请选择项目名称' }}</p>
					<p v-else>{{ rentalInfo.title }}</p>
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell
			:hover="false"
			padding="30rpx 0"
			:lineLeft="false"
			backgroundColor="transparent"
			:arrow="detail_data ? false : true"
			@click="!detail_data && openEvent('hotelShow')"
			:arrowRight="false"
		>
			<view class="container1">
				<view class="left">宾馆名称</view>
				<view class="right select" :style="detail_data && 'padding-right:0'">
					<p v-if="!detail_data">{{ get_data_select('hotel', 'hid').name || '请选择宾馆名称' }}</p>
					<p v-else>{{ rentalInfo.hotel_name }}</p>
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell
			:hover="false"
			padding="30rpx 0"
			:lineLeft="false"
			backgroundColor="transparent"
			:arrow="detail_data ? false : true"
			@click="!detail_data && openEvent('putupShow', true)"
			:arrowRight="false"
		>
			<view class="container1">
				<view class="left">住宿人姓名</view>
				<view class="right select" :style="detail_data && 'padding-right:0'">
					<p v-if="!detail_data">{{ get_data_select('user', 'uid').relaname || '请选择住宿人姓名' }}</p>
					<p v-else>{{ rentalInfo.lodgers }}</p>
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">房间号</view>
				<view class="right">
					<input v-if="!detail_data" type="text" v-model="sub_data.house_number" placeholder="请输入房间号" />
					<input v-else type="text" v-model="rentalInfo.house_number" disabled />
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">每天单价</view>
				<view class="right">
					<input v-if="!detail_data" type="number" v-model="sub_data.price" placeholder="请输入每天单价" />
					<input v-else type="text" v-model="rentalInfo.price" disabled />
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
			:arrow="detail_data ? false : true"
			:arrowRight="false"
			@click="!detail_data && openEvent('startShow')"
		>
			<view class="container1">
				<view class="left">入住日期</view>
				<view class="right date select" :style="detail_data && 'padding-right:0'">
					<span v-if="!detail_data">{{ sub_data.start_time.split('/')[0] || '' }}</span>
					<span v-else>{{ rentalInfo.start_time.split('/')[0] || '' }}</span>
					<span>年</span>
					<span v-if="!detail_data">{{ sub_data.start_time.split('/')[1] || '' }}</span>
					<span v-else>{{ rentalInfo.start_time.split('/')[1] || '' }}</span>
					<span>月</span>
					<span v-if="!detail_data">{{ sub_data.start_time.split('/')[2] || '' }}</span>
					<span v-else>{{ rentalInfo.start_time.split('/')[2] || '' }}</span>
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
			:arrow="detail_data.type == 2 ? false : true"
			:arrowRight="false"
			@click="(!detail_data || detail_data.type == 1) && openEvent('endShow')"
		>
			<view class="container1">
				<view class="left">离宿日期</view>
				<view class="right date select" :style="detail_data.type == 2 && 'padding-right:0'">
					<span v-if="!detail_data">{{ sub_data.end_time.split('/')[0] || '' }}</span>
					<span v-else>{{ (rentalInfo.end_time && rentalInfo.end_time.split('/')[0]) || '' }}</span>
					<span>年</span>
					<span v-if="!detail_data">{{ sub_data.end_time.split('/')[1] || '' }}</span>
					<span v-else>{{ (rentalInfo.end_time && rentalInfo.end_time.split('/')[1]) || '' }}</span>
					<span>月</span>
					<span v-if="!detail_data">{{ sub_data.end_time.split('/')[2] || '' }}</span>
					<span v-else>{{ (rentalInfo.end_time && rentalInfo.end_time.split('/')[2]) || '' }}</span>
					<span>日</span>
				</view>
			</view>
		</tui-list-cell>
		<!-- 提交按钮 -->
		<button class="button" @click="submitEvent" v-if="detail_data.type == undefined">提交</button>
		<button class="button" @click="updataEvent" v-if="detail_data.type == 1">提交</button>
		<!-- 项目名称选择器 -->
		<u-picker
			v-model="projectShow"
			:default-selector="projectdefault"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'projectShow')"
			:range="commonData.project || []"
			range-key="title"
			mode="selector"
		></u-picker>
		<!-- 宾馆选择器 -->
		<u-picker
			v-model="hotelShow"
			@cancel="cancel"
			@close="cancel"
			:default-selector="hoteldefault"
			@confirm="confirm($event, 'hotelShow')"
			:range="commonData.hotel || []"
			range-key="name"
			mode="selector"
		></u-picker>
		<!-- 住宿人选择器 -->
		<u-picker
			v-model="putupShow"
			@cancel="cancel"
			@close="cancel"
			:default-selector="putupdefault"
			:range="commonData.user || []"
			@confirm="confirm($event, 'putupShow')"
			range-key="relaname"
			mode="selector"
		></u-picker>
		<!-- 日期选择器 -->
		<u-picker
			v-model="startShow"
			:default-time="sub_data.start_time"
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
			:default-time="sub_data.end_time"
			@confirm="confirm($event, 'endShow')"
			mode="time"
		></u-picker>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	props: {
		detail_data: {
			type: [Object, Boolean],
			default() {
				return false;
			},
		},
	},
	data: () => ({
		projectShow: false,
		projectdefault: [0],
		hotelShow: false,
		hoteldefault: [0],
		putupShow: false,
		putupdefault: [0],
		startShow: false,
		endShow: false,
		sub_data: {
			pid: '',
			hid: '',
			uid: '',
			house_number: '',
			price: '',
			start_time: '',
			end_time: '',
		},
		rentalInfo: {
			start_time: '',
			end_time: '',
		},
	}),
	computed: {
		...mapState(['commonData']),
		get_data_select() {
			return (item, id) => {
				try {
					// 执行块
					let result = {};
					let arr = JSON.parse(JSON.stringify(this.commonData[item]));
					for (let i = 0, len = arr.length; i < len; i++) {
						if (arr[i][id] == this.sub_data[id]) {
							result = arr[i];
							break;
						}
					}
					return result;
				} catch (error) {
					// 上述代码块执行出错时执行
					return {};
				}
			};
		},
	},
	methods: {
		...mapMutations(['updateCommon', 'getUser']),
		updataEvent() {
			this.common.loading();
			let _data = {
				id: this.rentalInfo.id,
				end_time: this.rentalInfo.end_time,
			};
			if (!_data.end_time) {
				this.common.toast('请选择离宿日期');
				return;
			}
			this.common.loading();
			this.$axios({
				url: '/user/replenishLodging',
				data: _data,
			}).then((res) => {
				this.setTimeout(() => {
					uni.hideLoading();
					if (res.code == 0) {
						this.common.toast('提交成功');
						setTimeout(() => {
							uni.redirectTo({
								url: `/pages/views/put-up-look/put-up-look?id=${this.detail_data.id}&type=2`,
							});
						}, 500);
					}
				});
			});
		},
		submitEvent() {
			if (!this.sub_data.pid) {
				this.common.toast('请选择项目名称');
				return;
			} else if (!this.sub_data.hid) {
				this.common.toast('请选择宾馆名称');
				return;
			} else if (!this.sub_data.uid) {
				this.common.toast('请选择住宿人');
				return;
			} else if (!this.sub_data.house_number) {
				this.common.toast('请填写房间号');
				return;
			} else if (!this.sub_data.price) {
				this.common.toast('请填写房价');
				return;
			} else if (!this.sub_data.start_time) {
				this.common.toast('请选择入住日期');
				return;
			}
			this.common.loading();
			this.$axios({
				url: '/user/lodging',
				data: this.sub_data,
			}).then((res) => {
				this.setTimeout(() => {
					uni.hideLoading();
					if (res.code == 0) {
						this.common.toast('提交成功');
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/views/put-up-detail/put-up-detail',
							});
						}, 500);
					}
				});
			});
		},
		openEvent(item, type) {
			// uni.hideTabBar();
			if (type && !this.sub_data.pid) {
				this.common.toast('请先选择项目名称');
			} else {
				this[item] = true;
			}
		},
		confirm(data, item) {
			console.log(data, item);
			if (item == 'projectShow') {
				// 项目选择
				this.projectdefault = data;
				let _data = JSON.parse(JSON.stringify(this.commonData.project[data[0]] || {}));
				this.sub_data.pid = _data.pid || '';
				if (this.sub_data.pid) {
					this.common.loading();
					this.getUser({
						pid: this.sub_data.pid,
						callback() {
							uni.hideLoading();
						},
					});
				}
			} else if (item == 'hotelShow') {
				// 宾馆选择
				this.hoteldefault = data;
				let _data = JSON.parse(JSON.stringify(this.commonData.hotel[data[0]] || {}));
				this.sub_data.hid = _data.hid || '';
			} else if (item == 'putupShow') {
				// 住宿人选择
				this.putupdefault = data;
				let _data = JSON.parse(JSON.stringify(this.commonData.user[data[0]] || {}));
				console.log(_data);
				this.sub_data.uid = _data.uid || '';
			} else if (item == 'startShow') {
				// 入住日期选择
				this.sub_data.start_time = data.year + '/' + data.month + '/' + data.day;
			} else if (item == 'endShow') {
				// 离宿日期选择
				if (!this.detail_data) {
					this.sub_data.end_time = data.year + '/' + data.month + '/' + data.day;
				} else {
					this.rentalInfo.end_time = data.year + '/' + data.month + '/' + data.day;
				}
			}
			// uni.showTabBar();
		},
		cancel() {
			// uni.showTabBar();
		},
	},
	watch: {},

	// 组件周期函数--监听组件挂载完毕
	mounted() {
		this.common.loading();
		this.updateCommon(() => {
			if (this.detail_data) {
				this.$axios({
					url: '/user/lodgingInfo',
					data: {
						id: this.detail_data.id,
					},
				}).then((res) => {
					uni.hideLoading();
					if (res.code == 0) {
						this.rentalInfo = res.data;
					}
				});
			} else {
				uni.hideLoading();
			}
		});
	},
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
