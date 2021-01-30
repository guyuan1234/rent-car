<template>
	<div class="rent-car">
		<image v-if="!detail_data" class="header_top" src="/static/images/bg/1.png" mode="widthFix" />
		<!--  -->
		<p class="title1">车辆信息</p>
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
			@click="!detail_data && openEvent('driverShow')"
			:arrowRight="false"
		>
			<view class="container1">
				<view class="left">驾驶员</view>
				<view class="right select" :style="detail_data && 'padding-right:0'">
					<p v-if="!detail_data">{{ get_data_select('driver', 'did').name || '请选择驾驶员' }}</p>
					<p v-else>{{ rentalInfo.driver }}</p>
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
			@click="!detail_data && openEvent('plateShow')"
			:arrowRight="false"
		>
			<view class="container1">
				<view class="left">车牌号</view>
				<view class="right select" :style="detail_data && 'padding-right:0'">
					<p v-if="!detail_data">{{ get_data_select('car', 'cid').car_number || '请选择车牌号' }}</p>
					<p v-else>{{ rentalInfo.car_number }}</p>
				</view>
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
			:arrow="detail_data ? false : true"
			@click="!detail_data && openEvent('peopleShow', true)"
			:arrowRight="false"
		>
			<view class="container1">
				<view class="left">租车人姓名</view>
				<view class="right select" :style="detail_data && 'padding-right:0'">
					<p v-if="!detail_data">{{ get_data_select('user', 'uid').relaname || '请选择租车人姓名' }}</p>
					<p v-else>{{ rentalInfo.renters }}</p>
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">起始里程</view>
				<view class="right" :style="detail_data && 'padding-right:0'">
					<input
						v-if="!detail_data"
						type="text"
						v-model="sub_data.start_mileage"
						placeholder="请输入起始里程"
					/>
					<input v-else type="text" v-model="rentalInfo.start_mileage" disabled />
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
				<tui-upload
					:value="detail_data ? [rentalInfo.start_images] : []"
					:forbidDel="detail_data"
					:forbidAdd="detail_data"
					:limit="1"
					@complete="complete($event, 'start_images')"
					:serverUrl="`${request_url}/index/imgUpload`"
				></tui-upload>
			</view>
		</tui-list-cell>
		<!--  -->
		<p class="title1 padding2">归程信息</p>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">归程里程</view>
				<view class="right">
					<input
						v-if="!detail_data"
						v-model="sub_data.end_mileage"
						type="text"
						placeholder="请输入归程里程"
					/>
					<input
						v-else
						type="text"
						placeholder="请输入归程里程"
						v-model="rentalInfo.end_mileage"
						:disabled="detail_data.type == 2"
					/>
					<span>KM</span>
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">过路费</view>
				<view class="right">
					<input
						v-if="!detail_data"
						v-model="sub_data.road_toll"
						type="number"
						placeholder="请输入您的过路费"
					/>
					<input
						v-else
						type="text"
						placeholder="请输入您的过路费"
						v-model="rentalInfo.road_toll"
						:disabled="detail_data.type == 2"
					/>
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
			:arrow="detail_data.type == 2 ? false : true"
			:arrowRight="false"
			@click="(!detail_data || detail_data.type == 1) && openEvent('dateShow')"
		>
			<view class="container1">
				<view class="left">租车日期</view>
				<view class="right date select" :style="detail_data.type == 2 && 'padding-right:0'">
					<span v-if="!detail_data">{{ sub_data.rental_time.split('/')[0] || '' }}</span>
					<span v-else>{{ (rentalInfo.rental_time && rentalInfo.rental_time.split('/')[0]) || '' }}</span>

					<span>年</span>
					<span v-if="!detail_data">{{ sub_data.rental_time.split('/')[1] || '' }}</span>
					<span v-else>{{ (rentalInfo.rental_time && rentalInfo.rental_time.split('/')[1]) || '' }}</span>
					<span>月</span>
					<span v-if="!detail_data">{{ sub_data.rental_time.split('/')[2] || '' }}</span>
					<span v-else>{{ (rentalInfo.rental_time && rentalInfo.rental_time.split('/')[2]) || '' }}</span>
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
				<tui-upload
					:value="detail_data ? (!rentalInfo.end_images ? [] : [rentalInfo.end_images]) : []"
					:forbidDel="detail_data.type == 2"
					:forbidAdd="detail_data.type == 2"
					:limit="1"
					@complete="complete($event, 'end_images')"
					:serverUrl="`${request_url}/index/imgUpload`"
				></tui-upload>
			</view>
		</tui-list-cell>
		<!-- 提交按钮 -->
		<button class="button" @click="submitEvent" v-if="detail_data.type == undefined">提交</button>
		<button class="button" @click="updataEvent" v-if="detail_data.type == 1">提交</button>
		<!-- 日期选择器 -->
		<u-picker
			v-model="dateShow"
			@cancel="cancel"
			@close="cancel"
			:default-time="sub_data.rental_time"
			@confirm="confirm($event, 'dateShow')"
			mode="time"
		></u-picker>
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
		<!-- 驾驶员选择器 -->
		<u-picker
			v-model="driverShow"
			:default-selector="driverdefault"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'driverShow')"
			:range="commonData.driver || []"
			range-key="name"
			mode="selector"
		></u-picker>
		<!-- 车牌选择器 -->
		<u-picker
			v-model="plateShow"
			:default-selector="platedefault"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'plateShow')"
			:range="commonData.car || []"
			range-key="car_number"
			mode="selector"
		></u-picker>
		<!-- 租车人选择器 -->
		<u-picker
			v-model="peopleShow"
			:default-selector="peopledefault"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'peopleShow')"
			:range="commonData.user || []"
			range-key="relaname"
			mode="selector"
		></u-picker>
	</div>
</template>

<script>
import config from '@/plugins/config.js';
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
		request_url: config.request_url,
		projectShow: false,
		projectdefault: [0],
		driverShow: false,
		driverdefault: [0],
		plateShow: false,
		platedefault: [0],
		peopleShow: false,
		peopledefault: [0],
		dateShow: false,
		sub_data: {
			pid: '',
			did: '',
			cid: '',
			uid: '',
			start_mileage: '',
			start_images: '',
			road_toll: '',
			rental_time: '',
			end_mileage: '',
			end_images: '',
		},
		rentalInfo: {
			rental_time: '',
			end_mileage: '',
			end_images: '',
			road_toll: '',
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
				road_toll: this.rentalInfo.road_toll,
				rental_time: this.rentalInfo.rental_time,
				end_mileage: this.rentalInfo.end_mileage,
				end_images: this.rentalInfo.end_images,
			};
			if (!_data.end_mileage) {
				this.common.toast('请填写归程里程');
				return;
			} else if (!_data.road_toll) {
				this.common.toast('请填写过路费');
				return;
			} else if (!_data.rental_time) {
				this.common.toast('请选择租车日期');
				return;
			} else if (!_data.end_images) {
				this.common.toast('请上传归程里程图片');
				return;
			}
			this.common.loading();
			this.$axios({
				url: '/user/replenishRental',
				data: _data,
			}).then((res) => {
				this.setTimeout(() => {
					uni.hideLoading();
					if (res.code == 0) {
						this.common.toast('提交成功');
						setTimeout(() => {
							uni.redirectTo({
								url: `/pages/views/rent-car-look/rent-car-look?id=${this.detail_data.id}&type=2`,
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
			} else if (!this.sub_data.did) {
				this.common.toast('请选择驾驶员');
				return;
			} else if (!this.sub_data.cid) {
				this.common.toast('请选择车牌号');
				return;
			} else if (!this.sub_data.uid) {
				this.common.toast('请选择租车人');
				return;
			} else if (!this.sub_data.start_mileage) {
				this.common.toast('请填写起始里程');
				return;
			} else if (!this.sub_data.start_images) {
				this.common.toast('请上传起始里程照片');
				return;
			} else if (!this.sub_data.start_images) {
				this.common.toast('请上传起始里程照片');
				return;
			}
			this.common.loading();
			this.$axios({
				url: '/user/rental',
				data: this.sub_data,
			}).then((res) => {
				this.setTimeout(() => {
					uni.hideLoading();
					if (res.code == 0) {
						this.common.toast('提交成功');
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/views/rent-car-detail/rent-car-detail',
							});
						}, 500);
					}
				});
			});
		},
		complete(data, item) {
			if (!this.detail_data) {
				this.sub_data[item] = data.imgArr[0];
			} else {
				this.rentalInfo[item] = data.imgArr[0];
			}
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
			} else if (item == 'driverShow') {
				// 驾驶员选择
				this.driverdefault = data;
				let _data = JSON.parse(JSON.stringify(this.commonData.driver[data[0]] || {}));
				this.sub_data.did = _data.did || '';
			} else if (item == 'plateShow') {
				// 车牌号选择
				this.platedefault = data;
				let _data = JSON.parse(JSON.stringify(this.commonData.car[data[0]] || {}));
				this.sub_data.cid = _data.cid || '';
			} else if (item == 'peopleShow') {
				// 租车人选择
				this.peopledefault = data;
				let _data = JSON.parse(JSON.stringify(this.commonData.user[data[0]] || {}));
				this.sub_data.uid = _data.uid || '';
			} else if (item == 'dateShow') {
				if (!this.detail_data) {
					this.sub_data.rental_time = data.year + '/' + data.month + '/' + data.day;
				} else {
					this.rentalInfo.rental_time = data.year + '/' + data.month + '/' + data.day;
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
					url: '/user/rentalInfo',
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
