<template>
	<div class="wrap_live row col-12" v-show="show">
		<div class="item row col-12">
			<div class="item-date col-1">
				<p class="item-date-time">{{ time }}</p>
				<p class="item-date-date">{{ date }}</p>
			</div>
			<div class="item-tv_wrap col-1" >
				<span ref="openStream">
					LIVE 
					<i class="fas fa-tv"  v-if="streamExist" @click="showStream(streamId, stream)"></i>
				</span>
			</div>
			<div class="item-first_team col">
				<span>{{ teamFirst }}</span>
				<img :src="logoFirst" alt="">	
				<div class="item-money-wrap">
					<i>{{ moneyFirst }} ₽</i>
					<span>x{{ coefFirst }} - {{ percentageFirst }}</span>
				</div>			
			</div>
			<div class="item-vs col-auto">
				<span>
					<i :class="firstTeamWinner"> {{ scoreFirst }} </i> : <i :class="secondTeamWinner"> {{ scoreSecond }} </i>
				</span>
			</div>
			<div class="item-second_team col">
				<div class="item-money-wrap">
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
												eventType: '',
												liveMatch: true
											}
										)"
					>
				Подробнее
				<i class="fas fa-arrow-right"></i>
			</div>
		</div>
		<slot :id="streamId" v-show="false"></slot>	
	</div>
	
</template>

<script>
	import {mapMutations} from 'vuex'
	import {mapActions} from 'vuex'
	import {mapGetters} from 'vuex'

	export default {
		props: {
			id: {
				type: Number
			},
			streamId: {
				type: String
			},
			stream: {
				type: String
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
		data: () => ({

		}),
		computed: {
			...mapGetters('matches', {
				activeStreamId: 'activeStreamId'
			}),
			firstTeamWinner() {
				if (this.scoreFirst > this.scoreSecond) return "winner"
			},
			secondTeamWinner() {
				if (this.scoreFirst < this.scoreSecond) return "winner"
			},
			streamExist() {
				if (this.stream != '') return true
					else return false
			}
		},
		methods: {
			...mapActions('betBlock', {
				getInfoFromApi: 'getInfoFromApi'
			}),
			...mapMutations('matches', {
				activateStream: 'activateStream'
			}),
			showStream(id, stream) {
				let array = document.querySelectorAll(".item-tv_wrap span")
				for (let i = 0; i < array.length; i++) {
					// array[i].style.backgroundColor = "#f64848"
					array[i].classList.remove("active_tv_wrap");
				}
				if (id == this.activeStreamId) {
					document.getElementById(id).innerHTML = "";
					// document.getElementById(id).remove();
					this.activateStream("");
					this.$refs.openStream.classList.remove("active_tv_wrap");						
				} 
				else {
					let wraps = document.querySelectorAll(".stream_wrap");
					for (let wrap of wraps) wrap.innerHTML = "";
					this.activateStream(id)
					new Twitch.Embed(`${id}`, {
			        	height: 480,
			        	channel: `${stream}`,
			        	layout: "video"
			      });
			      // this.$refs.openStream.style.backgroundColor = "rgba(90, 131, 255, 0.6)"
			      this.$refs.openStream.classList.add("active_tv_wrap");
			      document.querySelector("iframe").style.width = "100%"
			      console.log(this.activeStreamId)									
				}
				
			}
		}
	}
</script>

<style scoped lang="sass">	
	.wrap_live
		margin-left: 0px
		padding: 0px
	.stream_wrap
		width: 100%	
		overflow: hidden
		
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
		
		&-tv_wrap
			display: flex
			padding: 0px
			align-items: center
			justify-content: center
			span
				background-color: #f64848
				color: rgba(255, 255, 255, 0.9)
				padding: 3px 8px
				border-radius: 5px
				font-size: 14px
				font-weight: 600
				transition: all 0.3s
				&:hover
					cursor: pointer
					background-color: #fe903b
		.active_tv_wrap
			background-color: rgba(90, 131, 255, 0.6)
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
		// &-vs
		// 	display: flex
		// 	align-items: center
		// 	color: rgba(255, 255, 255, 0.6)
		// 	margin: 0px 15px
		// 	font-weight: 600
		&-vs
			display: flex
			align-items: center
			color: rgba(255, 255, 255, 0.6)
			margin: 0px
			font-weight: 600
			width: 100px
			span
				display: inline-block
				background-color: rgba(90, 131, 255, 0.6)
				padding: 5px 0px
				font-size: 14px
				border-radius: 7px
				width: 100%
				margin: 0px 15px
				text-align: center
				i
					font-style: normal
				.winner
					color: rgba(255, 255, 255, 1)!important
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
				i, span
					font-style: normal
					display: inline-flex
					padding: 5px 0px
					width: 100%
					justify-content: center
					border-radius: 5px						
					transition: all 0.3s
					transform: translate3d(0px, 0, 0px)
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
			&-tv_wrap
				span
					font-size: 10px
			&-first_team, &-second_team
				font-size: 12px
				img
					width: 30px
			&-money
				&-wrap
					font-size: 12px
			&-vs
				margin: 0px 15px
				span
					font-size: 12px
					padding: 5px 0px
					min-width: 60px
					text-align: center
			&-extra
				display: flex
				align-items: center
				color: #6f7481
				font-size: 12px
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
</style>