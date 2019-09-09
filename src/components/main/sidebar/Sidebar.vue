<template>
	<div class="main_left col-3 row" id="main_left">
		<div class="main_left-header col-12 row" :class="chatShadow">
			<div class="main_left-header-chat_btn col-4" @mousedown="activateChat" :class="activeChat">
				<div class="main_left-header-chat_btn-img_wrapper">
					<img src="../../../../public/img/chat.png" alt="">
				</div>				
				Чат
			</div>
			<div class="col-2"></div>
			<div class="main_left-header-games_btn col-4" @mousedown="activateGames" :class="activeGames">
				<div class="main_left-header-games_btn-img_wrapper">
					<img src="../../../../public/img/joystick.png" alt="">
				</div>				
				Игры
			</div>
		</div>
		<transition name="changeBlock" mode="out-in">
			<app-chat v-if="showChat" key="games_block"></app-chat>
			<app-games v-else key="chat_block"></app-games>		
		</transition>
		
	</div>
</template>

<script>

	import AppChat from './Chat'
	import AppGames from './Games'

	export default {
		data: () => ({
			activeGames: "activeBtn",
			activeChat: "",
			chatShadow: "",
			showChat: false
		}),
		methods: {
			activateChat() {
				this.showChat = true;
				this.activeGames = "";
				this.activeChat = "activeBtn";
				this.chatShadow = "chatShadow";
			},
			activateGames() {
				this.showChat = false;
				this.activeGames = "activeBtn";
				this.activeChat = "";
				this.chatShadow = "";
			}
		},
		components: {
			AppChat,
			AppGames
		}
	}
</script>

<style scoped lang="sass">
// VUE анимации
.changeBlock-enter
	opacity: 0
	transform: translate3d(-20%, 0px, 0px)
.changeBlock-enter-active
	transition: all 0.3s
.changeBlock-leave
	display: none
.changeBlock-leave-active
	display: none

	

.main_left
	border-top: 2px solid #0b101c
	background-color: #080c17
	position: fixed
	flex-direction: column
	margin-left: 0px
	padding: 0px
	align-content: flex-start
	.chatShadow
		box-shadow: 0px 35px 60px #080c17
		z-index: 10
	&-header
		max-height: 90px
		margin-left: 0px
		padding: 0px 0px 0px 43px
		border-bottom: 1px solid #0b101c
		&-chat_btn, &-games_btn
			padding: 0px
			font-weight: 600
			color: #373f53
			display: flex
			align-items: center
			font-size: 14px				
			&-img_wrapper
				width: 40px
				height: 40px
				border-radius: 50%
				display: flex
				align-items: center
				justify-content: center
				margin-right: 10px
				background-color: #1d243b				
				img
					filter: brightness(0.4)					
			&:hover
				color: #fff
				cursor: pointer
				transition: all 0.4s
				div
					background-color: #293c74
					img
						filter: brightness(1)
						transition: filter 0.4s
		.activeBtn
			color: #fff
			div
				background-color: #293c74!important
				img
					filter: brightness(1)!important
		&-games_btn
			&-img_wrapper
				img
					width: 25px
//MEDIA
@media only screen and (max-width : 1600px)
	.main_left	
		.chatShadow
			box-shadow: 0px 15px 60px #080c17	
		&-header
			max-height: 70px
			padding: 0px 0px 0px 30px
			&-chat_btn, &-games_btn	
				font-size: 12px			
				&-img_wrapper
					width: 35px
					height: 35px
					img
						max-width: 60%
</style>