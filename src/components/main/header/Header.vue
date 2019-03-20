<template>
	<header class="row col-12 align-items-center header">
		<slot></slot>
		<div class="header-logo col-3">
			Betify.
		</div>

		<div class="user_login col-3 row align-items-center">
			<img class="user_login-img" src="https://pp.userapi.com/c836124/v836124545/2cf59/YkcciolvVFg.jpg?ava=1" alt="">
			<span class="user_login-name">Ильин Сергей</span>
			<span class="user_login-money">
				<i>512</i>₽
			</span>
			<img src="../../../../public/img/deposit.png" alt="" class="user_login-deposit" @click="showPopup('deposit')">
			<img src="../../../../public/img/withdraw.png" alt="" class="user_login-withdraw" @click="showPopup('withdraw')">			
		</div>

		<div class="user-unlogin" v-if="false"></div>

		<div class="header-menu col-5 row justify-content-between">
			<div class="header-menu-search col-5" :class = "inputClass">
				<i class="fas fa-search header-menu-search-icon"></i>
				<input class="header-menu-search-input" type="text" placeholder="Например: Virtus.pro"							
							@focus = "searchActive"
							@blur = "searchInactive"
				>
			</div>
			<div class="header-menu-right_part col-7">								

				<app-tippy v-for="(item, index) in tippy"
								:key="index"
								:text="item.text"
								:icon="item.icon"
								:popup="item.popup"
								>					
				</app-tippy>

				<span class="header-menu-right_part-select_wrap">
					<select class="header-menu-right_part-select_wrap-select" name="selectTime" id="selectTime">
						<option value="-3" id="time1">15:42 (GMT +0)</option>
						<option value="-2" id="time2">16:42 (GMT +1)</option>
						<option value="-1" id="time3">17:42 (GMT +2)</option>
						<option value="0" id="time4" selected="">18:42 (GMT +3)</option>
						<option value="+1" id="time5">19:42 (GMT +4)</option>
						<option value="+2" id="time6">20:42 (GMT +5)</option>
						<option value="+3" id="time7">21:42 (GMT +6)</option>
						<option value="+4" id="time8">22:42 (GMT +7)</option>
						<option value="+5" id="time9">23:42 (GMT +8)</option>
						<option value="+6" id="time10">00:42 (GMT +9)</option>
						<option value="+7" id="time11">01:42 (GMT +10)</option>
						<option value="+8" id="time12">02:42 (GMT +11)</option>
						<option value="+9" id="time13">03:42 (GMT +12)</option>
					</select>
					<img class="header-menu-right_part-select_wrap-arrow" 
						src="../../../../public/img/select_arrow.png" alt="">
				</span>				
			</div>
		</div>
		<div class="header-exit_wrapper col-1">
			<div class="header-exit_wrapper-btn" v-if="">
				<!-- <i class="fas fa-room-closed"></i> -->
				<!-- <img src="../../../public/img/exit.png" alt=""> -->
				<span>Выйти</span>					
			</div>
		</div>
		
		
	</header>
</template>

<script>
	import AppTippy from './Tippy'
	import {mapMutations} from 'vuex'

	export default {
		data: () => ({
			inputClass: '',
			tippy: [
				{
					text: 'Расширенный профиль',
					icon: 'fas fa-user',
					popup: 'job'
				},
				{
					text: 'Избранные команды',
					icon: 'fas fa-star',
					popup: ''
				}
				// {
				// 	text: 'Как ставить?',
				// 	icon: 'fas fa-question',
				// 	popup: 'technicalHelp'
				// }
			]
		}),
		methods: {
			...mapMutations('popups', {
	        showPopup: 'doPopup'
	      }),
			searchActive() {
				this.inputClass = 'input-active';
			},
			searchInactive(e) {
				this.inputClass = 'input-inactive';
				e.target.value = '';
			}
		},
		components: {
			AppTippy
		}
	}
</script>

<style scoped lang="sass">

	//Основные стили
	.header
		padding: 0px
		margin: 0px
		font-weight: 600
		height: 85px
		color: #fff
		position: fixed
		z-index: 10
		background-color: #080c17
		&-logo
			color: #fff
			font-size: 22px
			font-family: "Lato",
			font-weight: 900
			letter-spacing: 0.3px
			padding-left: 44px
			text-align: left
			span
				color: #5a83ff
		.user_login
			padding: 0px
			margin-left: 0px
			&-img
				width: 37px
				height: auto
				border-radius: 50%
				margin-right: 18px
				margin-top: 4px
			&-name
				font-size: 14px
			&-money
				margin-left: 40px
				margin-right: 13px
				color: #5a83ff
				font-size: 14px
				font-weight: 600
				i
					font-style: normal
					margin-right: 3px
			&-deposit, &-withdraw
				width: 35px
				padding: 8px
				transition: all 0.5s
				&:hover
					cursor: pointer
					transform: translate3d(0px, -5px, 0px)
		&-menu
			margin-left: 15px
			padding: 0px
			
			&-search
				display: flex
				align-items: center
				padding: 0px
				color: #373f53
				margin-left: 0px
				font-weight: 600
				&-icon, &-input
					transition: color 0.5s
				&-icon
					font-size: 16px
					margin-right: 10px
				&-input
					background-color: transparent
					margin-left: 10px
					border: 0px
					position: relative
					outline: 0px
					font-size: 14px
					width: 70%					
					font-family: inherit
					&::-webkit-input-placeholder
						color: #373f53	
						font-weight: 600			
				&:after 
					position: absolute
					content: ''
					left: 50%
					bottom: 0px
					transition: all 0.5s
					width: 0%
					height: 1px
					background-color: rgba(255, 255, 255, 0.3)
			.input-inactive
				input, i
					color: #373f53				
			.input-active
				input, i
					color: rgba(255, 255, 255, 0.3)
				
			&-right_part
				display: flex
				align-items: center
				justify-content: flex-end
				padding: 0px 25px 0px 0px			
				&-select_wrap
					position: relative
					&-select
						padding: 8px 28px 8px 15px
						border-radius: 5px
						background-color: inherit
						border: 1px solid #373f53
						font-weight: 600
						outline: none
						color: #373f53
						font-family: inherit
						-webkit-appearance: none
						-moz-appearance: none
						appearance: none
						option
							background-color: #080c17
							border-radius: 5px
							padding: 3px 0px
					&-arrow
						position: absolute
						right: 16px
						top: 13px
		&-exit_wrapper
			padding: 0px 45px 0px 0px
			margin-left: 15px
			// margin-left: 30px
			&-btn
				background-color: #0e1526
				padding: 10px 15px
				display: flex
				align-items: center
				border-radius: 5px
				color: rgba(255,255,255,0.3)
				transition: all 0.5s
				justify-content: center
				span
					font-size: 14px
				i
					margin-top: 2px
					font-size: 14px
					margin-right: 5px
				&:hover
					cursor: pointer
					color: rgba(255,255,255,0.5)
					// transform: translate3d(5px, 0px, 0px)
	
	//MEDIA
	@media only screen and (max-width : 1600px)
		.header
			height: 60px
			&-logo
				font-size: 20px
				padding-left: 30px
			.user_login
				&-img
					width: 32px
				&-name
					font-size: 12px
				&-money
					margin-left: 20px
					margin-right: 0px
					font-size: 12px
				&-deposit, &-withdraw
					width: 33px
			&-menu
				&-search
					&-input
						font-size: 12px
				&-right_part		
						&-select_wrap
							&-select
								padding: 7px 23px 7px 15px
								font-size: 12px
							&-arrow
								right: 13px
								top: 13px
								width: 10px
			&-exit_wrapper
				padding: 0px 30px 0px 0px
				&-btn
					padding: 8px 15px
					span
						font-size: 12px

</style>