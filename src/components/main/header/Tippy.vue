<template>
	<span class="tippy_wrapper" @click="showPopup(popup)">
		<i class="tippy_wrapper-icon" :class="icon"></i>
		<p class="tippy_wrapper-text">{{text}}</p>	
	</span>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		data: () => ({
		}),
		props: ['text', 'icon', 'popup'],
		methods: {
			...mapMutations('popups', {
	        showPopup: 'doPopup'
	      })
		}
	}
</script>

<style scoped lang="sass">
	// .fadeInTippy
	// 	opacity: 1!important
	// 	-webkit-transform: translate3d(0, 0, 0)!important
	// 	transform: translate3d(0, 0, 0)!important
	.tippy_wrapper
		width: 30px
		height: 30px
		display: flex
		align-items: center
		justify-content: center
		border-radius: 50%
		font-size: 14px
		margin-right: 25px
		color: #373f53
		border: 1px solid #373f53		
		transition: all 0.5s
		&-icon
			padding-right: 0px
		&:hover
			cursor: pointer
			color: rgba(255, 255, 255, 0.4)
			border-color: rgba(255, 255, 255, 0.4)	
			p
				opacity: 1!important
				-webkit-transform: translate3d(0, 0, 0)!important
				transform: translate3d(0, 0, 0)!important
		&-text
			position: absolute
			border-radius: 5px
			font-weight: 400
			color: rgba(255,255,255,0.7)
			background-color: #373f53	
			bottom: -100%
			margin: 0px
			padding: 4px 10px	
			transition: all 0.5s
			opacity: 0
			-webkit-transform: translate3d(0, -50%, 0)
			transform: translate3d(0, -50%, 0)
			&:before
				position: absolute
				content: ''
				border: 6px solid transparent
				border-bottom: 10px solid #373f53
				top: -15px
				left: 47.5%	
	//MEDIA
	@media only screen and (max-width : 1600px)
		.tippy_wrapper
			width: 26px
			height: 26px
			font-size: 12px
			&-icon
				padding-right: 0px
				padding-left: 1px
				

</style>