<template>
	<form class="help_form col-auto row" action="" @submit.enter.prevent="sendQuestion(activePopup)">
		<p class="help_form-promo col-9">Подробно опишите свою проблему и мы обязательно Вам ответим!</p>
		<input class="help_form-input col-12" type="text" placeholder="Тема обращения" v-model="title">
		<textarea class="help_form-textarea col-12" placeholder="Напишите свой вопрос" rows="10" v-model="text"></textarea>
		<p class="help_form-condition col-12">
			<i>*</i> Для запроса нужно указать E-mail в настройках
		</p>
		<button class="help_form-send col-6" type="submit">
			<span v-if="!showLoader">Отправить</span>			
			<div v-else></div>
		</button>
		<p class="help_form-extra col-6">
			<span>
				Вы также можете задать свой вопрос в нашей <a href="https://vk.com/topic-170412223_39685932" target="_blank">группе</a>
			</span> 
		</p>
		<p class="help_form-error col-12" v-if="formError">Запрос можно отправлять раз в сутки</p>
	</form>
</template>

<script>
	import {mapMutations} from 'vuex'
	import {mapGetters} from 'vuex'

	export default {
		data: () => ({
			title: '',
			text: '',
			showLoader: false,
			formError: false
		}),
		computed: {
			...mapGetters('popups', {
				activePopup: 'activePopup'
			}),
			inputsEmpty() {
				if (this.title == '' || this.text == '') return true
					else return false
			}
		},
		methods: {
			...mapMutations('popups', {
				hidePopup: 'doPopup'
			}),
			sendQuestion(activePopup) {
				console.log({'title': this.title, 'text': this.text})
				this.showLoader = true
				setTimeout(()=>{					
					this.showLoader = false
					this.formError = true
					setTimeout(()=>{
						this.formError = false
						this.hidePopup(activePopup);
					}, 2500)
				}, 1000)
			}
		}
	}
</script>

<style scoped lang="sass">
	
	@keyframes rotate 
		0% 
			-webkit-transform: rotate(0)
			transform: rotate(0)
		50% 
			-webkit-transform: rotate(180deg)
			transform: rotate(180deg)
		100% 
			-webkit-transform: rotate(360deg)
			transform: rotate(360deg)

	.help_form
		background-color: #1f273a
		padding: 30px 40px 40px 40px
		margin-left: 0px
		min-width: 470px
		width: 37%
		border-radius: 10px
		justify-content: center
		&-promo
			color: #94a0c0
			font-weight: 800
			padding: 0px
			font-size: 18px
			margin: 0px
			text-align: center
		&-input, &-textarea
			margin-top: 20px
			border-radius: 5px
			background-color: #29344d
			padding: 12px 20px
			border: none
			outline: none
			color: rgba(255, 255, 255, 0.6)
			font-family: "Montserrat"
			font-size: 14px
			border: 1px solid transparent
			transition: all 0.5s
			&::-webkit-input-placeholder
				color: rgba(255, 255, 255, 0.3)	
				font-size: 14px
			&:focus
				border-color: rgba(254, 144, 59, 0.7)
		&-condition
			display: flex
			margin-top: 20px
			color: rgba(254, 144, 59, 1)
			font-size: 14px
			padding: 0px
			i
				font-style: normal
				font-size: 24px
				font-weight: 600
				margin-right: 5px
		&-send
			padding: 0px 20px
			background-color: rgba(254, 144, 59, 1)
			color: #fff
			height: 47px
			font-weight: 600
			border: none
			border-radius: 5px
			transition: all 0.3s
			outline: none
			&:hover
				cursor: pointer
				background-color: #5a83ff
			&:disabled
				background-color: rgba(255, 255, 255, 0.2)
				color: #29344d
			div 
				border-radius: 100%
				margin: 2px
				border: 2px solid #fff
				border-bottom-color: transparent
				height: 26px
				width: 26px
				background: 0 0!important
				display: inline-block
				-webkit-animation: rotate .75s 0s linear infinite
				animation: rotate .75s 0s linear infinite
		&-extra
			color: #fff
			font-size: 14px
			display: flex
			align-items: center
			margin: 0px
			padding: 0px 0px 0px 20px
			a
				color: #5a83ff
		&-error
			color: #D8000C
			font-size: 14px
			margin-bottom: 0px
			text-align: center
			margin-top: 20px
			font-weight: 600

</style>