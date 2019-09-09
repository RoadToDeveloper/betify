<template>
	<div class="block_wrap row col-5" id="block_wrap">
		<div class="block_wrap-header col-12 row align-items-center">
			<span class="block_wrap-header-arrow">
				<img src="../../../../public/img/arrow_hide1.png" alt="">
			</span>
			<div class="block_wrap-header-left_part col-3">
				<img :src="gameImg" alt="" class="block_wrap-header-left_part-img">
				<span class="block_wrap-header-left_part-name">{{ gameName }}</span>
			</div>
			<p class="block_wrap-header-tournament col-6">{{ info.tournament }}</p>
			<div class="col-3"></div>
		</div>
		<div class="block_wrap-body col-12 row">

			<div class="col-6 block_wrap-body-left_color"></div>
			<div class="col-6 block_wrap-body-right_color"></div>

			<div class="block_wrap-body-info col-12 row">
				<div class="block_wrap-body-info-first_team col">
					<img :src="info.logoFirst" alt="">
					<p>{{ info.teamFirst }}</p>
					<p>{{ info.percentageFirst }} на победу</p>
				</div>
				<div class="block_wap-body-info-numbers col-3">
					<p class="block_wrap-body-info-numbers-time">{{ info.time }}</p>
					<p class="block_wrap-body-info-numbers-date">{{ info.date }}</p>
					<strong>VS</strong>
					<span class="block_wrap-body-info-numbers-best_of">{{ info.format }}</span>
				</div>
				<div class="block_wrap-body-info-second_team col">
					<img :src="info.logoSecond" alt="">
					<p>{{ info.teamSecond }}</p>
					<p>{{ info.percentageSecond }} на победу</p>
				</div>
			</div>
			<div class="block_wrap-body-extra_events col-12 row">
				<!-- <p class="col-12">Дополнительные события:</p> -->
				<div class="block_wrap-body-extra_events-items col-12 row"
						v-for="(eventList, index) in betItems"
						v-show="eventList.length"
						:key = "index"
					>
					<div class="block_wrap-body-extra_events-items-category col-12">{{ index | ExtraEventsName }}</div>
					<app-item v-for="(item, i) in eventList"
								:key="item.id"
								:name="item.name"
								:teamFirst = "item.team1name"
								:teamSecond = "item.team2name"
								:moneyFirst = "item.money1"
								:moneySecond = "item.money2"
								:show = "item.status"
								:coefFirst = "item.coefficients[0]"
								:coefSecond = "item.coefficients[1]"
								:eventType = "index | ExtraEventsName"
								:betId = "item.id"
					></app-item>
				</div>
			</div>
		</div>

		<app-bet></app-bet>

	</div>
</template>

<script>
	import Vue from 'vue'
	import AppItem from './ExtraItem'
	import AppBet from './DoBet'
	import {mapGetters} from 'vuex'
	import ExtraEventsName from '../../../../src/filters/ExtraEventsName.js'

	export default {
		computed: {
			...mapGetters('betBlock', {
				info: 'info',
				betItems: 'betItems'
			}),
			gameName() {
				if (this.info.game == 1) {
					return 'CS:GO'
				}
				else if (this.info.game == 2) {
					return 'Dota 2'
				}
				else if (this.info.game == 3) {
					return 'LoL'
				}
				else if (this.info.game == 4) {
					return 'HotS'
				}
				else if (this.info.game == 5) {
					return 'HearthStone'
				}
			},
			gameImg() {
				if (this.info.game == 1) {
					return '/img/csgo.png'
				}
				else if (this.info.game == 2) {
					return '/img/dota2.png'
				}
				else if (this.info.game == 3) {
					return '/img/lol.png'
				}
				else if (this.info.game == 4) {
					return '/img/hots.png'
				}
				else if (this.info.game == 5) {
					return '/img/hs.png'
				}
			}
		},
		filters: {
			ExtraEventsName
		},
		components: {
			AppItem,
			AppBet
		}
	}
</script>

<style scoped lang="sass">
	.block_wrap
		position: fixed
		z-index: 100
		margin-left: 0px
		top: 0px
		padding: 0px
		right: 15px
		height: 100vh
		box-shadow: -38px 0px 100px rgba(0,0,0,0.5)
		flex-direction: column
		&-header
			background-color: #172034
			margin-left: 0px
			max-height: 85px
			display: flex
			padding: 0px 30px
			position: relative
			font-weight: 600
			&-arrow
				position: absolute
				width: 35px
				left: -35px
				height: 100%
				background-color: #5a83ff
				opacity: 0.7
				display: flex
				align-items: center
				justify-content: center
				transition: 0.3s
				img
					width: 10px
				&:hover
					cursor: pointer
					opacity: 1
			&-left_part
				padding: 0px
				display: flex
				align-items: center
				&-img
					width: 40px
					margin-right: 20px
				&-name
					color: #fff
			&-tournament
				color: #94a0c0
				margin: 0px
				font-weight: 700
				text-align: center
		&-body
			padding: 0px
			margin-left: 0px
			align-content: flex-start
			position: relative
			overflow: hidden
			flex: 1
			flex-direction: column
			&-info
				padding: 30px 0px 0px 0px
				margin-left: 0px
				align-content: flex-start
				align-items: flex-start
				max-height: fit-content
				&-first_team, &-second_team
					padding: 0px
					text-align: center
					img
						width: 49px
					p
						width: 100%
						text-align: center
						color: #fff
						font-weight: 600
					p:last-of-type
						color: #5a83ff
				&-numbers
					color: #4a526b
					font-weight: 700
					padding: 5px 0px 0px 0px
					p
						text-align: center
						margin: 0px 0px 8px 0px
						font-size: 18px
					p:last-of-type
						font-weight: normal
						font-size: 14px
					p:first-of-type
						color: #fff
					strong
						display: block
						text-align: center
						font-size: 46px
						line-height: 40px
					span
						margin-top: 5px
						display: block
						text-align: center
			&-extra_events
				margin-left: 0px
				padding: 0px 30px 20px 30px
				align-content: flex-start
				align-items: flex-start
				overflow-x: hidden
				overflow-y: auto
				flex: 1
				&::-webkit-scrollbar-thumb
					background-color: #373f53
					border-radius: 15px
				&::-webkit-scrollbar
					background-color: #080c17
					width: 4px
				&>p
					text-align: center
					margin: 0px
					font-weight: 600
					color: #fff
				&-items
					padding: 0px
					margin-left: 0px
					// max-height: 508px
					margin: 20px 0px 0px 0px
					&-category
						text-align: center
						color: rgba(255, 255, 255, 0.4)
						font-size: 14px
						margin-bottom: 15px
						padding: 0px
						position: relative
						&:before
							content: ''
							position: absolute
							background-color: #94a0c0
							transform: skewX(-45deg)
							opacity: 0.7
							height: 5px
							bottom: 7px
							width: 40%
							left: -35px
						&:after
							content: ''
							position: absolute
							background-color: #94a0c0
							transform: skewX(-45deg)
							opacity: 0.7
							height: 5px
							bottom: 7px
							width: 40%
							right: -35px
			&-left_color, &-right_color
				position: absolute
				top: 0px
				left: 0px
				background-color: #0b101c
				height: 100%
			&-right_color
				background-color: #0e1526
				left: 50%
	@media only screen and (max-width : 1600px)
		.block_wrap
			max-width: 45%
			&-header
				max-height: 60px
				padding: 0px 20px
				&-left_part
					&-img
						width: 40px
						margin-right: 10px
					&-name
						font-size: 16px
				&-tournament
					font-size: 14px
				&-arrow
					width: 30px
					left: -30px
			&-body
				&-info
					padding-top: 15px
					&-first_team, &-second_team
						img
							width: 40px
						p
							margin: 1px 0px
							font-size: 14px
					&-numbers
						height: 100%
						p
							font-size: 14px
							margin-bottom: 0px
						p:last-of-type
							font-size: 12px
						strong
							font-size: 30px
							line-height: 27px
						span
							margin-top: 0px
							font-size: 14px
				&-extra_events
					padding: 0px 20px
					p
						font-size: 14px
						margin-bottom: 10px
					&-items
						margin-top: 5px
						&-category
							font-size: 12px
							margin-bottom: 10px
							&:before
								height: 4px
								bottom: 6px
							&:after
								height: 4px
								bottom: 6px

</style>
