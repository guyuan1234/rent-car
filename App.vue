
<script>
export default {
	onLaunch: function () { 
        if(!uni.getStorageSync('token')){
            this.skipLink('reLaunch', '/pages/views/login/login');
        }
        
    },
	onShow: function () {},
	onHide: function () {},
};
</script>

<style lang="scss">  
image {
	vertical-align: top;
} 
.tui-skeleton{
    min-height: calc(100vh - 2px);  
}
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "components/uview-ui/index.scss";
</style>> 
