<template>
	<div>
		<salary-pel></salary-pel>
		<u-tabbar :mid-button="false" :list="list"></u-tabbar>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import salaryPel from '@/components/project/salary-pel/salary-pel.vue';
export default {
	components: {
		salaryPel,
	},
	data: () => ({}),
	computed: {
		...mapState(['list']),
	},
	methods: {},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad() {},
	// 页面周期函数--监听页面初次渲染完成
	onReady() {},
	// 页面周期函数--监听页面显示(not-nvue)
	onShow() {},
	// 页面周期函数--监听页面隐藏
	onHide() {},
	// 页面周期函数--监听页面卸载
	onUnload() {},
	// 页面处理函数--监听用户下拉动作
	onPullDownRefresh() {},
	// 页面处理函数--监听用户上拉触底
	onReachBottom() {},
	// 页面处理函数--监听页面滚动(not-nvue)
	/* onPageScroll(event) {}, */
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style></style>
