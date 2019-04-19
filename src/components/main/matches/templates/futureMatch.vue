<template>
	<div class="item row col-12" v-show="show" >
		<div class="item-date col-1">
			<p class="item-date-time">{{ time }}</p>
			<p class="item-date-date">{{ date }}</p>
		</div>
		<div class="col-1">
			<slot></slot>
		</div>
		<div class="item-first_team col">
			<span>{{ teamFirst }}</span>
			<img :src="logoFirst" alt="">	
			<div class="item-money-wrap" @mousedown="getInfoFromApi(
										{
											id: id,
											coefFirst: coefFirst,
											coefSecond: coefSecond,
											date: date,
											time: time,
											logoFirst: logoFirst,
											logoSecond: logoSecond,
											percentageFirst: percentageFirst,
											percentageSecond: percentageSecond,
											scoreFirst: scoreFirst,
											scoreSecond: scoreSecond,
											teamFirst: teamFirst,
											teamSecond: teamSecond,
											game: game,
											format: format,
											tournament: tournament,
											firstChoose: teamFirst,
											secondChoose: teamSecond,
											moneyFirst: moneyFirst,
											moneySecond: moneySecond,
											betName: 'Победа в матче',
											eventType: 'Общие события',
											readyBet: 1,
											betId: id,
											choose: teamFirst,
											coef: coefFirst,
											betChoose: 1
										}
									)">
				<i>{{ moneyFirst }} ₽</i>
				<span>x{{ coefFirst }} - {{ percentageFirst }}</span>
			</div>			
		</div>
		<div class="item-vs col-auto">
			- : -
		</div>
		<div class="item-second_team col">
			<div class="item-money-wrap" @mousedown="getInfoFromApi(
										{
											id: id,
											coefFirst: coefFirst,
											coefSecond: coefSecond,
											date: date,
											time: time,
											logoFirst: logoFirst,
											logoSecond: logoSecond,
											percentageFirst: percentageFirst,
											percentageSecond: percentageSecond,
											scoreFirst: scoreFirst,
											scoreSecond: scoreSecond,
											teamFirst: teamFirst,
											teamSecond: teamSecond,
											game: game,
											format: format,
											tournament: tournament,
											firstChoose: teamFirst,
											secondChoose: teamSecond,
											moneyFirst: moneyFirst,
											moneySecond: moneySecond,
											betName: 'Победа в матче',
											eventType: 'Общие события',
											readyBet: 2,
											betId: id,
											choose: teamSecond,
											coef: coefSecond,
											betChoose: 2
										}
									)">
				<i>{{ moneySecond }} ₽</i>
				<span>x{{ coefSecond }} - {{ percentageSecond }}</span>
			</div>
			<img :src="logoSecond" alt="">
			<span>{{ teamSecond }}</span>
		</div>

		<div class="item-extra col-auto" @mousedown="getInfoFromApi(
										{
											id: id,
											coefFirst: coefFirst,
											coefSecond: coefSecond,
											date: date,
											time: time,
											logoFirst: logoFirst,
											logoSecond: logoSecond,
											percentageFirst: percentageFirst,
											percentageSecond: percentageSecond,
											scoreFirst: scoreFirst,
											scoreSecond: scoreSecond,
											teamFirst: teamFirst,
											teamSecond: teamSecond,
											game: game,
											format: format,
											tournament: tournament,
											firstChoose: teamFirst,
											secondChoose: teamSecond,
											moneyFirst: moneyFirst,
											moneySecond: moneySecond,
											betName: 'Выбор события и ставка',
											betId: null,
											eventType: ''
										}
									)"
				>
				<!-- <div class="item-extra col-auto" @mousedown="test(id)"
				> -->
			Подробнее
			<!-- <img src="../../../../../public/img/arrow-right.png" alt=""> -->
			<i class="fas fa-arrow-right"></i>
		</div>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import {mapActions} from 'vuex'

	export default {
		props: {
			id: {
				type: Number
			},
			tournament: {
				type: String
			},
			format: {
				type: String
			},
			coefFirst: {
				type: Number
			},
			coefSecond: {
				type: Number
			},
			date: {
				type: String
			},
			time: {
				type: String
			},
			logoFirst: {
				type: String
			},
			logoSecond: {
				type: String
			},
			moneyFirst: {
				type: Number
			},
			moneySecond: {
				type: Number
			},
			scoreFirst: {
				type: String
			},
			scoreSecond: {
				type: String
			},
			percentageFirst: {
				type: String
			},
			percentageSecond: {
				type: String
			},
			scoreFirst: {
				type: String
			},
			scoreSecond: {
				type: String
			},
			teamFirst: {
				type: String
			},
			teamSecond: {
				type: String
			},
			game: {
				type: Number
			},
			show: {
				type: Boolean
			}
		},
		methods: {
			...mapActions('betBlock', {
				getInfoFromApi: 'getInfoFromApi'
			}),
			test(id) {
				this.$router.push(`/${id}`)
			}
		}
	}
</script>

<style scoped lang="sass">
	.item
		padding: 10px 45px
		margin-left: 0px
		border-bottom: 2px solid rgba(111, 116, 129, 0.1)
		&:hover
			.item-money-wrap				
				border-color: rgba(255, 255, 255, 0.7)

				i
					transform: translate3d(0px, 100%, 0px)
				span
					transform: translate3d(0px, 0, 0px)
		&>div
			padding: 0px
		&-date
			p
				margin: 0px
				color: #fff
				font-weight: 600
			p:last-of-type
				margin-top: 5px
				font-size: 12px
				color: #4a526b
		&-first_team, &-second_team
			display: flex
			align-items: center
			justify-content: flex-end
			color: rgba(255,255,255,0.8)
			font-weight: 600
			font-size: 14px
			img
				width: 35px
				margin: 0px 10px
			span
				text-align: right
		&-second_team
			justify-content: flex-start
			span
				text-align: left
		&-vs
			display: flex
			align-items: center
			color: rgba(255, 255, 255, 0.6)
			margin: 0px
			font-weight: 600
			justify-content: center
			width: 100px
		&-second_team
		&-money
			display: flex
			align-items: center

			&-wrap
				display: inline-flex
				position: relative
				width: 30%
				color: #fff
				font-weight: 600
				font-size: 14px
				justify-content: center
				border: 1px solid #6f7481
				transition: all 0.3s
				padding: 0px
				border-radius: 10px
				overflow: hidden
				&:hover
					cursor: pointer
					border-color: transparent!important
					background-color: #5a83ff
					// #fe903b
				i, span
					font-style: normal
					display: inline-flex
					padding: 5px 0px
					width: 100%
					justify-content: center
					border-radius: 5px						
					transform: translate3d(0px, 0, 0px)
					transition: all 0.3s
				span
					position: absolute
					border: none
					transform: translate3d(0px, -100%, 0px)
					transition: all 0.3s
				
		&-extra
			display: flex
			align-items: center
			color: #6f7481
			font-size: 14px
			transition: all 0.3s
			img
				margin-left: 10px
				width: 15px
				transform: rotate(180deg)
			i
				margin-left: 4px
			&:hover			
				color: #5a83ff
				cursor: pointer

	@media only screen and (max-width : 1600px)
		.item
			padding: 15px 30px
			&-date
				font-size: 14px
				p:last-of-type
					font-size: 12px
			&-first_team, &-second_team
				font-size: 12px
				img
					width: 30px
			&-money
				&-wrap
					font-size: 12px
			&-vs
				margin: 0px 15px
				font-size: 14px
			&-extra
				font-size: 12px
</style>