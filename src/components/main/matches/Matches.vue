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

		<div class="matches-type row col-12">
			<ul id="matchesTypes" class="matches-type-items col row">
				<router-link v-for="(item, index) in types"
							 :key="index"
							 :to="item.url"
							 tag="li"
							 class="matches-type-items-item"
							 active-class="type_item-active"
				>
					<a>{{ item.text }}</a>
				</router-link>

			</ul>
		</div>
		<transition name="changeMatches">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import AppActive from './Active'
	import AppFuture from './Future'
	import AppLive from './Live'
	import AppPast from './Past'
	import AppTournament from './Tournament'
	import {mapMutations} from 'vuex'
	import {mapGetters} from 'vuex'

	export default {
		mounted() {
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
				gameName: 'activeGame'
			})
		},
		components: {
			AppActive,
			AppFuture,
			AppLive,
			AppPast,
			AppTournament
		}
	}
</script>

<style scoped lang="sass">
	// VUE анимации
	.changeMatches-leave
		display: none
	.changeMatches-leave-active
		display: none

	.matches
		background-color: #0b101c
		margin-left: 25%
		padding: 0px
		align-content: flex-start
		overflow-x: hidden
		.row
			margin-left: 0px
		&-header
			padding: 0px 45px
			height: 90px
			align-items: flex-end
			&-left_part
				padding: 0px
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
				padding: 0px
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
			margin-left: 0px
			padding: 0px 45px
			align-items: center
			font-size: 14px
			&-items
				padding: 0px
				margin: 0px
				max-width: 100%!important	
				.type_item-active
					a
						color: #fff

					&:before
						background-color: #5a83ff
				&-item
					list-style-type: none
					padding: 0px
					user-select: none
					width: 24%
					display: inline-flex
					
					font-weight: 600
					position: relative
					transition: all 0.3s
					a
						padding: 5px 0px 5px 22px
						text-decoration: none
						color: #6f7481
						transition: all 0.3s
						width: 100%
					&:hover
						cursor: pointer
					&:before
						position: absolute
						transition: all 0.3s
						content: ''
						height: 100%
						background-color: #1d243b
						width: 2px
						left: 0px
						top: 0px
	//MEDIA
	@media only screen and (max-width : 1600px)
		.matches
			&-header
				padding: 0px 30px
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
				padding: 0px 30px	
				height: 72px
				font-size: 12px

</style>