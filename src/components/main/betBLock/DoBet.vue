<template>
	<form class="do_bet col-12 row" @submit.prevent="sendBet">
		<div class="col do_bet-left_decoration align-self-center"></div>		
		<p class="do_bet-promo col-auto">{{ info.eventType }} {{ info.betName }}</p>
		<div class="col do_bet-right_decoration align-self-center"></div>
		<div class="do_bet-choose col-12 row">
							
			<div class="do_bet-choose-field col-6">				
				<!-- <label class="do_bet-choose-field-radio">
					<input type="radio" name="team_choosen" value="2" :checked="true">
					<img src="../../../../public/img/tick.png" alt="">
				</label> -->
				<i>Ваш выбор: </i>
				<span>{{ info.choose }}</span>
			</div>
			<div class="do_bet-choose-bet col-6 row justify-content-between">
				<input type="text" id="betInput" class="do_bet-choose-bet-input col" placeholder="Ставка" @input="onInput($event)">
				<button class="do_bet-choose-bet-btn col" v-if="userLogin" @submit.prevent="sendBet" :disabled="disableBet">Поставить</button>
				<div class="do_bet-choose-bet-login col-5" v-else>
					Вход:
					<i class="fab fa-steam" @click="authSteam()"></i>
					<i class="fab fa-vk" @click="authVk()"></i>
				</div>
			</div>
			<div class="do_bet-choose-winning col-6">
				Потенциальный выигрыш: <i>{{potentialWin}} руб.</i>
			</div>
			<div class="do_bet-choose-exp col-6">
				Будет начислено: <i>{{ exp }} очков опыта</i>
			</div>
		</div>
	</form>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapMutations} from 'vuex'
	import {mapActions} from 'vuex'

	export default {
		data: () => ({
			betSum: null,
			exp: 0
		}),
		computed: {
			...mapGetters('betBlock', {
				info: 'info'
			}),
			...mapGetters('user', {
				userLogin: 'userLogin'
			}),
			disableBet() {
				if (this.betSum == null || this.choose == "") return true
					else return false
			},
			potentialWin() {
				return Math.floor(this.betSum * this.info.coef)
			}
		},
		methods: {
			 ...mapActions('user', {
	        	authVk: 'authVk',
	        	authSteam: 'authSteam'
	      }),
			onInput(e) {
				this.betSum = e.target.value;
				if (/[^0-9]/.test(this.betSum)) this.betSum = null
				this.exp = this.betSum * 10;
			},
			sendBet() {
				var data = new FormData;
				data.set('eventid', this.info.betId);
				data.set('amount', this.betSum);				
				data.set('choice', this.info.choose);
				this.$http.post(`http://betify.xyz/api/v1/bet/add`, data)
			}
		}
	}
</script>

<style scoped lang="sass">
	.do_bet
		padding: 20px 30px 
		margin-left: 0px
		background-color: #12192a
		align-items: flex-start
		align-content: flex-start
		overflow-x: hidden
		max-height: fit-content
		&-left_decoration, &-right_decoration
			position: relative
			background-color: #94a0c0
			transform: skewX(-45deg)
			opacity: 0.7
			height: 7px
			padding: 0px
			transition: max-width 0.3s
		&-left_decoration
			left: -35px
		&-right_decoration
			right: -35px
		&-promo
			color: #fe903b
			font-size: 18px
			position: relative
			padding: 0px
			margin: 0px
			text-align: center
			font-weight: 600
		&-choose
			margin-top: 30px
			margin-left: 0px
			padding: 0px
			&-field
				padding: 0px
				padding-right: 10px
				display: flex
				align-items: center
				user-select: none
				cursor: pointer
				label
					border: 2px solid #fe903b
					border-radius: 50%
					margin-right: 3px
					width: 18px
					height: 18px
					padding: 3px
					display: inline-block					
					img
						display: none
						width: 100%
					input
						visibility: hidden
						position: absolute
					&>input:checked + img
						display: block
				span
					color: #fff
					font-weight: 600
					font-size: 14px
					transition: all 0.2s
				i
					font-style: normal
					font-weight: 600
					color: #fe903b
					margin-right: 5px
			&-bet
				padding: 0px
				margin-left: 0px
				&-input
					height: 40px
					background-color: rgba(76, 110, 214, 0.3) 
					border-radius: 5px
					border: none
					outline: none
					color: #fff
					font-size: 16px
					margin-right: 35px
					transition: background-color 0.3s
					&::-webkit-input-placeholder
						color: rgba(255, 255, 255, 0.3)	
						transition: color 0.3s
						font-family: 'Montserrat'
						font-size: inherit
					&:focus
						background-color: #5a83ff
						&::-webkit-input-placeholder
							color: rgba(255, 255, 255, 0.7)
							
				&-btn
					background-color: #fe903b
					color: #fff
					border-radius: 5px
					font-weight: 600
					font-size: 14px
					border: none
					outline: none
					transition: all 0.3s
					font-family: "Montserrat"
					&:hover
						cursor: pointer
						background-color: #f09f39
					&:disabled
						background-color: #6f7481
						color: rgba(255, 255, 255, 0.6)

				&-login
					display: flex
					align-items: center
					justify-content: flex-end
					color: rgba(255, 255, 255, 0.5)
					i
						margin-left: 10px
						font-size: 24px
						color: #fff
						transition: all 0.3s
						&:hover
							cursor: pointer
							text-shadow: 0px 0px 20px #5a83ff

			&-winning, &-exp
				padding: 0px
				margin-top: 20px
				color: #6f7481
				font-size: 14px
				i
					font-style: normal
					font-weight: 600
					margin-left: 3px
					color: #5a83ff
	@media only screen and (max-width : 1600px)
		.do_bet
			
			padding: 10px 20px
			&-left_decoration, &-right_decoration
				height: 5px
			&-promo
				font-size: 14px
			&-choose
				margin-top: 15px
				&-first, &-second
					label
						width: 14px
						height: 14px
						padding: 2px
					span
						font-size: 12px
				&-bet
					&-input
						font-size: 12px
						margin-right: 10px
						height: 35px
					&-btn
						font-size: 12px
				&-winning, &-exp
					font-size: 12px
					margin-top: 15px

</style>