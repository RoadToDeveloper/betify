<template>
	<div class="col-9 matches row">
		<div class="matches-header row col-12">
			<div id="leftPart" class="matches-header-left_part col">
				<img :src="headerLogo" alt="" class="matches-header-left_part-img">
				<span class="matches-header-left_part-text">
					<span class="matches-header-left_part-text-name">{{gameName}}</span>
					<span class="matches-header-left_part-text-time">30 января 2019, 22:16</span>
				</span>
			</div>

			<div class="matches-header-date col-auto">
				<img class="matches-header-date-icon" src="../../../../public/img/calendar.png" alt="">
				<span class="matches-header-date-text">Календарь событий</span>
			</div>
		</div>
		<!-- <button @click.prevent="doLive()">Сделать матч лайвом</button>
		<button @click.prevent="doPast()">Сделать матч прошедшим</button> -->
		<div class="matches-type row col-12">
			<ul id="matchesTypes" class="matches-type-items col row">
				<li class="matches-type-items-item type_item-active" @click="sortByStatus($event, 'active')">Активные матчи</li>
				<li class="matches-type-items-item" @mousedown="sortByStatus($event, 'future')">Будущие матчи</li>
				<li class="matches-type-items-item" @mousedown="sortByStatus($event, 'live')">LIVE матчи</li>
				<li class="matches-type-items-item" @mousedown="sortByStatus($event, 'past')">Прошедшие матчи</li>
			</ul>
		</div>

			<app-active v-show="matchesByStatus.active" key="active"></app-active>
			<app-future v-show="matchesByStatus.future" key="future"></app-future>
			<app-live v-show="matchesByStatus.live" key="live"></app-live>
			<app-past v-show="matchesByStatus.past" key="past"></app-past>

	</div>
</template>

<script>
	import AppActive from './Active'
	import AppFuture from './Future'
	import AppLive from './Live'
	import AppPast from './Past'
	import AppTournament from './Tournament'
	import {mapMutations} from 'vuex'
	import {mapActions} from 'vuex'
	import {mapGetters} from 'vuex'

	export default {
      components: {
         AppActive,
         AppFuture,
         AppLive,
         AppPast,
         AppTournament,
      },
		mounted() {
			//реагирование на событие изменения матча
			// this.sockets.subscribe('matchUpdate', (data) => {
			//    console.log(data);
			//    for (let i = 0; i < this.allMatches.length; i++) {
			//    	if (this.allMatches[i].id == data.id) {
			//    		if (this.allMatches[i].status == 0) {
			//    			this.updateActiveMatch(data);
			//    			this.updateFutureMatch(data);
			//    		}
			//    		else if (this.allMatches[i].status == 1) {
			//    			this.updateActiveMatch(data);
			//    			this.updateLiveMatch(data);
			//    		}
			//    	}
			//    }
			// });
			//изменение баланса юзера
			// this.sockets.subscribe('balanceDiff', (data) => {
			//    this.cutBalance(data.diff)
			// });
			let leftPartWidth = getComputedStyle(document.getElementById("leftPart")).width;
         document.getElementById("matchesTypes").style.maxWidth = leftPartWidth;
		},
		data: () => ({
			types: [
				{
					text: 'Активные матчи',
					class: 'type_item-active',
					url: 'active'
				},
				{
					text: 'Будущие матчи',
					class: '',
					url: 'future'
				},
				{
					text: 'LIVE матчи',
					class: '',
					url: 'live'
				},
				{
					text: 'Прошедшие матчи',
					class: '',
					url: 'past'
				}
			]
		}),
		computed: {
			...mapGetters('matches', {
				headerLogo: 'headerLogo',
				gameName: 'activeGame',
				matchesByStatus: 'matchesByStatus',
				allMatches: 'matches'
			})
		},
		methods: {
			...mapMutations('matches', {
				filterMatchesByStatus: 'filterMatchesByStatus'
			}),
			...mapActions('future', {
				updateFutureMatch: 'updateMatch'
			}),
			...mapActions('live', {
				updateLiveMatch: 'updateMatch'
			}),
			...mapActions('active', {
				updateActiveMatch: 'updateMatch'
			}),
			...mapMutations('user', {
            cutBalance: 'cutBalance'
			}),
			sortByStatus(e, type) {
				var items = document.querySelectorAll(".matches-type-items-item");
				for (let item of items) {
					item.classList.remove("type_item-active")
				}
				e.target.classList.add("type_item-active");
				this.filterMatchesByStatus(type);
			}
			// doLive() {
			// 	this.updateFutureMatch({status: 1, money1: 92, money2: 312, tournament: "test", id: 2332045})
			// 	this.updateActiveMatch({status: 1, money1: 92, money2: 312, tournament: "test", id: 2332045})
			// },
			// doPast() {
			// 	this.updateLiveMatch({status: 2, score: "10:15", id: 2332039})
			// 	this.updateActiveMatch({status: 2, score: "10:15", id: 2332039})
			// }
		},
	}
</script>

<style scoped lang="sass">
	// VUE анимации
	.changeMatches-enter
		transform: translate3d(10%, 0px, 0px)
		opacity: 0.5
	.changeMatches-enter-active
		transition: all 0.4s
	.changeMatches-leave
		display: none
	.changeMatches-leave-active
		display: none

	.matches
		background-color: #0b101c
		margin-left: 25%
		padding: 0
		align-content: flex-start
		overflow-x: hidden
		.row
			margin-left: 0
		&-header
			padding: 0 45px
			height: 90px
			align-items: flex-end
			&-left_part
				padding: 0
				display: flex
				align-items: center
				&-img
					width: 45px
					height: 45px
					margin-right: 20px
				&-text
					font-weight: 600
					&-name
						font-size: 22px
						color: #fff
						margin-right: 35px
					&-time
						color: #6f7481
						font-size: 14px
						vertical-align: bottom
			&-date
				padding: 0
				margin-bottom: 9px
				text-align: right
				&-icon
					width: 15px
					margin-right: 8px
				&-text
					color: #6f7481
					font-weight: 600
					font-size: 14px

		&-type
			height: 102px
			margin-left: 0
			padding: 0 45px
			align-items: center
			font-size: 14px
			&-items
				padding: 0
				margin: 0
				max-width: 100%!important
				.type_item-active
					color: #fff
					&:before
						background-color: #5a83ff
				&-item
					list-style-type: none
					user-select: none
					width: 24%
					display: inline-flex
					font-weight: 600
					position: relative
					padding: 5px 0 5px 22px
					text-decoration: none
					color: #6f7481
					transition: all 0.3s
					&:hover
						cursor: pointer
					&:before
						position: absolute
						transition: all 0.3s
						content: ''
						height: 100%
						background-color: #1d243b
						width: 2px
						left: 0
						top: 0
	//MEDIA
	@media only screen and (max-width : 1600px)
		.matches
			&-header
				padding: 0 30px
				height: 70px
				&-left_part
					&-img
						width: 40px
						height: 40px
					&-text
						&-name
							font-size: 18px
						&-time
							font-size: 12px
				&-date
					margin-bottom: 12px
					&-text
						font-size: 12px
			&-type
				padding: 0 30px
				height: 72px
				font-size: 12px

</style>
