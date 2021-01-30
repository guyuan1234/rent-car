<template>
	<div class="salary-earner">
		<image v-if="!detail_data" class="header_top" src="/static/images/bg/3.png" mode="widthFix" />
		<!--  -->
		<p class="title1">雇工信息</p>
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
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">雇工姓名</view>
				<view class="right">
					<input v-if="!detail_data" type="text" v-model="sub_data.username" placeholder="请输入雇工姓名" />
					<input v-else type="text" v-model="rentalInfo.username" disabled />
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">性别</view>
				<view class="right">
					<u-radio-group v-if="!detail_data" v-model="sub_data.sex" active-color="#0877bc">
						<u-radio name="男"> 男 </u-radio>
						<u-radio name="女"> 女 </u-radio>
					</u-radio-group>
					<span v-else>{{ rentalInfo.sex }}</span>
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">电话</view>
				<view class="right">
					<input v-if="!detail_data" type="number" v-model="sub_data.phone" placeholder="请输入雇工电话" />
					<input v-else type="text" v-model="rentalInfo.phone" disabled />
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">身份证号</view>
				<view class="right">
					<input
						v-if="!detail_data"
						type="text"
						v-model="sub_data.id_card"
						placeholder="请输入雇工身份证号"
					/>
					<input v-else type="text" v-model="rentalInfo.id_card" disabled />
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">开户银行</view>
				<view class="right">
					<input v-if="!detail_data" type="text" v-model="sub_data.bank" placeholder="请输入开户银行" />
					<input v-else type="text" v-model="rentalInfo.bank" disabled />
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">银行卡号</view>
				<view class="right">
					<input
						v-if="!detail_data"
						type="number"
						v-model="sub_data.bank_card"
						placeholder="请输入银行卡号"
					/>
					<input v-else type="text" v-model="rentalInfo.bank_card" disabled />
				</view>
			</view>
		</tui-list-cell>
		<!--  -->
		<tui-list-cell :hover="false" padding="30rpx 0" :lineLeft="false" backgroundColor="transparent" :arrow="false">
			<view class="container1">
				<view class="left">用工单价</view>
				<view class="right">
					<input v-if="!detail_data" type="number" v-model="sub_data.price" placeholder="请输入用工单价" />
					<input v-else type="text" v-model="rentalInfo.price" disabled />
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
			:arrow="detail_data ? false : true"
			:arrowRight="false"
			@click="!detail_data && openEvent('startShow')"
		>
			<view class="container1">
				<view class="left">雇工日期</view>
				<view class="right date select" :style="detail_data && 'padding-right:0'">
					<span v-if="!detail_data">{{ sub_data.employ_time.split('/')[0] || '' }}</span>
					<span v-else>{{ rentalInfo.employ_time.split('/')[0] || '' }}</span>
					<span>年</span>
					<span v-if="!detail_data">{{ sub_data.employ_time.split('/')[1] || '' }}</span>
					<span v-else>{{ rentalInfo.employ_time.split('/')[1] || '' }}</span>
					<span>月</span>
					<span v-if="!detail_data">{{ sub_data.employ_time.split('/')[2] || '' }}</span>
					<span v-else>{{ rentalInfo.employ_time.split('/')[2] || '' }}</span>
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
			:arrow="detail_data ? false : true"
			:arrowRight="false"
			@click="!detail_data && openEvent('endShow')"
		>
			<view class="container1">
				<view class="left">结束日期</view>
				<view class="right date select" :style="detail_data && 'padding-right:0'">
					<span v-if="!detail_data">{{ sub_data.end_time.split('/')[0] || '' }}</span>
					<span v-else>{{ rentalInfo.end_time.split('/')[0] || '' }}</span>
					<span>年</span>
					<span v-if="!detail_data">{{ sub_data.end_time.split('/')[1] || '' }}</span>
					<span v-else>{{ rentalInfo.end_time.split('/')[1] || '' }}</span>
					<span>月</span>
					<span v-if="!detail_data">{{ sub_data.end_time.split('/')[2] || '' }}</span>
					<span v-else>{{ rentalInfo.end_time.split('/')[2] || '' }}</span>
					<span>日</span>
				</view>
			</view>
		</tui-list-cell>
		<!-- 提交按钮 -->
		<button v-if="!detail_data" class="button" @click="submitEvent">提交</button>
		<!-- 项目名称选择器 -->
		<u-picker
			v-model="projectShow"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'projectShow')"
			:range="commonData.project || []"
			:default-selector="projectdefault"
			range-key="title"
			mode="selector"
		></u-picker>
		<!-- 日期选择器 -->
		<u-picker
			v-model="startShow"
			:default-time="sub_data.employ_time"
			@cancel="cancel"
			@close="cancel"
			@confirm="confirm($event, 'startShow')"
			mode="time"
		></u-picker>
		<!-- 日期选择器 -->
		<u-picker
			v-model="endShow"
			:default-time="sub_data.end_time"
			@cancel="cancel"
			@close="cancel"
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
		startShow: false,
		endShow: false,
		sub_data: {
			pid: '',
			username: '',
			sex: '',
			phone: '',
			id_card: '',
			bank: '',
			bank_card: '',
			price: '',
			employ_time: '',
			end_time: '',
		},
		rentalInfo: {
			employ_time: '',
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
		...mapMutations(['updateCommon']),
		submitEvent() {
			if (!this.sub_data.pid) {
				this.common.toast('请选择项目名称');
				return;
			} else if (!this.sub_data.username) {
				this.common.toast('请输入雇工姓名');
				return;
			} else if (!this.sub_data.sex) {
				this.common.toast('请选择性别');
				return;
			} else if (!this.sub_data.phone) {
				this.common.toast('请填写手机号码');
				return;
			} else if (!this.sub_data.id_card) {
				this.common.toast('请填身份证号');
				return;
			} else if (!this.sub_data.bank) {
				this.common.toast('请填写开户行名称');
				return;
			} else if (!this.sub_data.bank_card) {
				this.common.toast('请填写银行卡号');
				return;
			} else if (!this.sub_data.price) {
				this.common.toast('请填写用工单价');
				return;
			} else if (!this.sub_data.employ_time) {
				this.common.toast('请填写雇工日期');
				return;
			} else if (!this.sub_data.end_time) {
				this.common.toast('请填写雇工结束日期');
				return;
			}
			this.common.loading();
			this.$axios({
				url: '/user/employees',
				data: this.sub_data,
			}).then((res) => {
				this.setTimeout(() => {
					uni.hideLoading();
					if (res.code == 0) {
						this.common.toast('提交成功');
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/views/salary-earner-detail/salary-earner-detail',
							});
						}, 500);
					}
				});
			});
		},
		openEvent(item) {
			this[item] = true;
			// uni.hideTabBar();
		},
		confirm(data, item) {
			if (item == 'projectShow') {
				// 项目选择
				this.projectdefault = data;
				let _data = JSON.parse(JSON.stringify(this.commonData.project[data[0]] || {}));
				this.sub_data.pid = _data.pid || '';
			} else if (item == 'startShow') {
				// 雇工日期选择
				this.sub_data.employ_time = data.year + '/' + data.month + '/' + data.day;
			} else if (item == 'endShow') {
				// 雇工结束日期选择
				this.sub_data.end_time = data.year + '/' + data.month + '/' + data.day;
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
					url: '/user/employeesInfo',
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
