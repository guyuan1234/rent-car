<template>
	<view class="tui-container">
		<view class="tui-upload-box">
			<view
				class="tui-image-item"
				:style="{ width: customStyle.width, height: customStyle.height }"
				v-for="(item, index) in imageList"
				:key="index"
			>
				<image
					:src="item"
					class="tui-item-img"
					:style="{ width: customStyle.width, height: customStyle.height }"
					@tap.stop="previewImage(index)"
					mode="aspectFill"
				></image>
				<view v-if="!forbidDel" class="tui-img-del" @tap.stop="delImage(index)"></view>
				<view v-if="statusArr[index] != 1" class="tui-upload-mask">
					<view class="tui-upload-loading" v-if="statusArr[index] == 2"></view>
					<text class="tui-tips">{{ statusArr[index] == 2 ? '上传中...' : '上传失败' }}</text>
					<view
						class="tui-mask-btn"
						v-if="statusArr[index] == 3"
						@tap.stop="reUpLoad(index)"
						hover-class="tui-btn-hover"
						:hover-stay-time="150"
						>重试</view
					>
				</view>
			</view>
			<view
				v-if="isShowAdd"
				class="tui-upload-add"
				:style="{ width: customStyle.width, height: customStyle.height }"
				@tap="chooseImage"
			>
				<image src="/static/images/icon/camra.png" mode="" />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'tuiUpload',
	props: {
		// 样式
		customStyle: {
			type: Object,
			default() {
				return {};
			},
		},
		//初始化图片路径
		value: {
			type: Array,
			default() {
				return [];
			},
		},
		//禁用删除
		forbidDel: {
			type: Boolean,
			default: false,
		},
		//禁用添加
		forbidAdd: {
			type: Boolean,
			default: false,
		},
		//服务器地址
		serverUrl: {
			type: String,
			default: '',
		},
		//限制数
		limit: {
			type: Number,
			default: 9,
		},
		//original 原图，compressed 压缩图，默认二者都有
		sizeType: {
			type: Array,
			default() {
				return ['original', 'compressed'];
			},
		},
		//album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
		sourceType: {
			type: Array,
			default() {
				return ['album', 'camera'];
			},
		},
		//可上传图片类型，默认为空，不限制  Array<String> ['jpg','png','gif']
		imageFormat: {
			type: Array,
			default() {
				return [];
			},
		},
		//单张图片大小限制 MB
		size: {
			type: Number,
			default: 4,
		},
		//项目名，默认为 file
		fileKeyName: {
			type: String,
			default: 'file',
		},
		//HTTP 请求 Header, header 中不能设置 Referer。
		header: {
			type: Object,
			default() {
				return { token: 'c9eb7b42-3929-4fd8-986d-60cef45e8320' };
			},
		},
		//HTTP 请求中其他额外的 form data
		formData: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			//图片地址
			imageList: [],
			//上传状态：1-上传成功 2-上传中 3-上传失败
			statusArr: [],
		};
	},
	created() {
		this.initImages();
	},
	watch: {
		value(val) {
			if (val) {
				this.initImages();
			}
		},
	},
	computed: {
		isShowAdd() {
			let isShow = true;
			if (this.forbidAdd || (this.limit && this.imageList.length >= this.limit)) {
				isShow = false;
			}
			return isShow;
		},
	},
	methods: {
		initImages() {
			this.imageList = [...this.value];
			for (let item of this.imageList) {
				this.statusArr.push('1');
			}
		},
		// 重新上传
		reUpLoad(index) {
			this.$set(this.statusArr, index, '2');
			this.change();
			this.uploadImage(index, this.imageList[index])
				.then(() => {
					this.change();
				})
				.catch(() => {
					this.change();
				});
		},
		change() {
			let status = ~this.statusArr.indexOf('2') ? 2 : 1;
			if (status != 2 && ~this.statusArr.indexOf('3')) {
				// 上传失败
				status = 3;
			}
			this.$emit('complete', {
				status: status,
				imgArr: this.imageList,
			});
		},
		toast(text) {
			text &&
				uni.showToast({
					title: text,
					icon: 'none',
				});
		},
		chooseImage: function () {
			let _this = this;
			uni.chooseImage({
				count: _this.limit - _this.imageList.length,
				sizeType: _this.sizeType,
				sourceType: _this.sourceType,
				success: function (e) {
					let imageArr = [];
					for (let i = 0; i < e.tempFiles.length; i++) {
						let len = _this.imageList.length;
						if (len >= _this.limit) {
							_this.toast(`最多可上传${_this.limit}张图片`);
							break;
						}
						//过滤图片类型
						let path = e.tempFiles[i].path;

						if (_this.imageFormat.length > 0) {
							let format = '';
							// #ifdef H5
							let type = e.tempFiles[i].type;
							format = type.split('/')[1];
							// #endif

							// #ifndef H5
							format = path.split('.')[path.split('.').length - 1];
							// #endif

							if (_this.imageFormat.indexOf(format) == -1) {
								let text = `只能上传 ${_this.imageFormat.join(',')} 格式图片！`;
								_this.toast(text);
								continue;
							}
						}

						//过滤超出大小限制图片
						let size = e.tempFiles[i].size;

						if (_this.size * 1024 * 1024 < size) {
							let err = `单张图片大小不能超过：${_this.size}MB`;
							_this.toast(err);
							continue;
						}
						imageArr.push(path);
						_this.imageList.push(path);
						_this.statusArr.push('2');
					}
					_this.change();

					let start = _this.imageList.length - imageArr.length;
					for (let j = 0; j < imageArr.length; j++) {
						let index = start + j;
						//服务器地址
						if (_this.serverUrl) {
							_this
								.uploadImage(index, imageArr[j])
								.then(() => {
									_this.change();
								})
								.catch(() => {
									_this.change();
								});
						} else {
							//无服务器地址则直接返回成功
							_this.$set(_this.statusArr, index, '1');
							_this.change();
						}
					}
				},
			});
		},
		uploadImage: function (index, url) {
			let _this = this;
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: _this.serverUrl,
					name: _this.fileKeyName,
					header: _this.header,
					formData: _this.formData,
					filePath: url,

					success: function (res) { 
						if (res.statusCode == 200) {
                            let d = JSON.parse(res.data); 
							//判断code，以实际接口规范判断
							if (d.code === 0) { 
								// 上传成功 d.url 为上传后图片地址，以实际接口返回为准
                                d.data && (_this.imageList[index] = d.data);  
								_this.$set(_this.statusArr, index, d.data ? '1' : '3');
							} else {
								// 上传失败
								// const _res = JSON.parse(res.data);
								_this.$set(_this.statusArr, index, '3');
								// //
								// if (_res.code === 101 || _res.code === 104 || _res.code === 105) {
								// 	// 需要重新登录 
								// 	_this.common.toast(_res.message);
								// 	uni.removeStorageSync('token');
								// 	uni.navigateTo({
								// 		url: '/pages/views/login/login',
								// 	});
								// 	resolve(res.data);
								// }
							}
							resolve(index);
						} else {
							_this.$set(_this.statusArr, index, '3');
							reject(index);
						}
					},
					fail: function (res) {
						_this.$set(_this.statusArr, index, '3');
						reject(index);
					},
				});
			});
		},
		delImage: function (index) {
			this.imageList.splice(index, 1);
			this.statusArr.splice(index, 1);
			this.$emit('remove', {
				index: index,
			});
			this.change();
		},
		previewImage: function (index) {
			if (!this.imageList.length) return;
			uni.previewImage({
				current: this.imageList[index],
				loop: true,
				urls: this.imageList,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@font-face {
	font-family: 'tuiUpload';
	src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAATcAA0AAAAAByQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEwAAAABoAAAAciR52BUdERUYAAASgAAAAHgAAAB4AKQALT1MvMgAAAaAAAABCAAAAVjxvR/tjbWFwAAAB+AAAAEUAAAFK5ibpuGdhc3AAAASYAAAACAAAAAj//wADZ2x5ZgAAAkwAAADXAAABAAmNjcZoZWFkAAABMAAAAC8AAAA2FpiS+WhoZWEAAAFgAAAAHQAAACQH3QOFaG10eAAAAeQAAAARAAAAEgwAACBsb2NhAAACQAAAAAwAAAAMAEoAgG1heHAAAAGAAAAAHwAAACABEgA2bmFtZQAAAyQAAAFJAAACiCnmEVVwb3N0AAAEcAAAACgAAAA6OMUs4HjaY2BkYGAAYo3boY/i+W2+MnCzMIDAzb3qdQj6fwPzf+YGIJeDgQkkCgA/KAtvAHjaY2BkYGBu+N/AEMPCAALM/xkYGVABCwBZ4wNrAAAAeNpjYGRgYGBl0GJgZgABJiDmAkIGhv9gPgMADTABSQB42mNgZGFgnMDAysDA1Ml0hoGBoR9CM75mMGLkAIoysDIzYAUBaa4pDA7PGJ9xMjf8b2CIYW5gaAAKM4LkANt9C+UAAHjaY2GAABYIVmBgAAAA+gAtAAAAeNpjYGBgZoBgGQZGBhBwAfIYwXwWBg0gzQakGRmYnjE+4/z/n4EBQksxSf6GqgcCRjYGOIeRCUgwMaACRoZhDwCiLwmoAAAAAAAAAAAAAAAASgCAeNpdjkFKw0AARf/vkIR0BkPayWRKQZtYY90ohJju2kOIbtz0KD1HVm50UfEmWXoAr9ADOHFARHHzeY//Fx8Ci+FJfIgdJFa4AhgiMshbrCuIsLxhFJZVs+Vl1bT1GddtbXTC3OhohN4dg4BJ3zMJAnccyfm468ZzHXddrH9ZKbHzdf9n/vkY/xv9sPQXgGEvBrHHwst5kTbXLE+YpYVPkxepPmW94W16UbdNJd6f3SAzo5W7m1jaKd+8ZZIvk5nlKw9SK6Wle7BLS3f/bTzQLmfAF2T1NsQAeNp9kD1OAzEQhZ/zByQSQiCoXVEA2vyUKRMp9Ailo0g23pBo1155nUg5AS0VB6DlGByAGyDRcgpelkmTImvt6PObmeexAZzjGwr/3yXuhBWO8ShcwREy4Sr1F+Ea+V24jhY+hRvUf4SbuFUD4RYu1BsdVO2Eu5vSbcsKZxgIV3CKJ+Eq9ZVwjfwqXMcVPoQb1L+EmxjjV7iFa2WpDOFhMEFgnEFjig3jAjEcLJIyBtahOfRmEsxMTzd6ETubOBso71dilwMeaDnngCntPbdmvkon/mDLgdSYbh4FS7YpjS4idCgbXyyc1d2oc7D9nu22tNi/a4E1x+xRDWzU/D3bM9JIbAyvkJI18jK3pBJTj2hrrPG7ZynW814IiU68y/SIx5o0dTr3bmniwOLn8owcfbS5kj33qBw+Y1kIeb/dTsQgil2GP5PYcRkAAAB42mNgYoAALjDJyIAOWMGiTIxMjMxsKak5qSWpbFmZiRmJ+QAmgAUIAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMABAABAAQAAAACAAAAAHjaY2BgYGQAgqtL1DlA9M296nUwGgA+8QYgAAA=)
		format('woff');
	font-weight: normal;
	font-style: normal;
}

.tui-upload-icon {
	font-family: 'tuiUpload' !important;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	padding: 10rpx;
}

.tui-icon-delete:before {
	content: '\e601';
}

.tui-icon-plus:before {
	content: '\e609';
}

.tui-upload-box {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}

.tui-upload-add {
	border: 1px solid #f7f7f7;
	border-radius: 5rpx;
	width: 220rpx;
	height: 220rpx;
	font-size: 68rpx;
	font-weight: 100;
	color: #888;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	image {
		width: 48rpx;
		height: 48rpx;
	}
}

.tui-image-item {
	width: 220rpx;
	height: 220rpx;
	position: relative;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
}

// .tui-image-item:nth-of-type(3n) {
// 	margin-right: 0;
// }

.tui-item-img {
	width: 220rpx;
	height: 220rpx;
	display: block;
	border: 1px solid #f7f7f7;
	border-radius: 5rpx;
}

.tui-img-del {
	width: 36rpx;
	height: 36rpx;
	position: absolute;
	right: -12rpx;
	top: -12rpx;
	background-color: #eb0909;
	border-radius: 50%;
	color: white;
	font-size: 34rpx;
	z-index: 999;
}

.tui-img-del::before {
	content: '';
	width: 16rpx;
	height: 1px;
	position: absolute;
	left: 10rpx;
	top: 18rpx;
	background-color: #fff;
}

.tui-upload-mask {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	padding: 40rpx 0;
	box-sizing: border-box;
	background-color: rgba(0, 0, 0, 0.6);
}

.tui-upload-loading {
	width: 28rpx;
	height: 28rpx;
	border-radius: 50%;
	border: 2px solid;
	border-color: #b2b2b2 #b2b2b2 #b2b2b2 #fff;
	animation: tui-rotate 0.7s linear infinite;
}

@keyframes tui-rotate {
	0% {
		transform: rotate(0);
	}

	100% {
		transform: rotate(360deg);
	}
}

.tui-tips {
	margin-top: 10rpx;
	font-size: 24rpx;
	color: #fff;
}

.tui-mask-btn {
	margin-top: 4rpx;
	padding: 4rpx 16rpx;
	border-radius: 40rpx;
	text-align: center;
	font-size: 20rpx;
	color: #fff;
	border: 1rpx solid #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tui-btn-hover {
	opacity: 0.8;
}
</style>
