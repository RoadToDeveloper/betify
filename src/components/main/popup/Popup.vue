<template>
	<div class="wrapper_popup col-12 row" :class="activePopup" @click="closePopup">
		<slot></slot>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import {mapGetters} from 'vuex'
	export default {
		methods: {
			...mapMutations('popups', {
				hidePopup: 'doPopup'
			}),
			closePopup() {
				let elems = document.getElementsByClassName('wrapper_popup')
				for (let i = 0; i < elems.length; i++) {
					if (event.target == elems[i]) this.hidePopup(this.activePopup)
				} 
			}
		},
		computed: {
			...mapGetters('popups', {
				activePopup: 'activePopup'
			})
		}
	}
</script>

<style scoped lang="sass">
	.wrapper_popup
		z-index: 100
		position: absolute
		justify-content: center
		margin-left: 0px
		align-items: center
		background-color: rgba(0,0,0,0.6)
		filter: blur(0px)!important
		top: 0px
		left: 0px
		width: 100vw
		height: 105vh
		&-content
			width: 50%
			background-color: lightgray
			height: 30vw
			border-radius: 15px
</style>