<template>
	<div class="item col-12 row">
		<div class="item-first col-6"  @click="userChooseBet($event, {
															choose: teamFirst, 
															coef: coefFirst,
															betName: name,
															eventType: eventType,
															betId: betId
														})">
			<p class="team_and_coef_wrap">
				<span>{{ teamFirst }}</span>
				<i>{{ coefFirst }}</i>
			</p>
			<p class="money_wrap">
				{{ moneyFirst }} ₽
			</p>
			
		</div>
		<div class="item-second col-6"  @click="userChooseBet($event, {
															choose: teamSecond, 
															coef: coefSecond,
															betName: name,
															eventType: eventType,
															betId: betId
														})">
			<p class="team_and_coef_wrap">
				<i>{{ coefSecond }}</i>
				<span>{{ teamSecond }}</span>
				
			</p>
			<p class="money_wrap">
				{{ moneySecond }} ₽
			</p>						
		</div>	
		<p class="item-text">{{ name }}</p>				
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'

	export default {
		props: ['betId', 'name', 'teamFirst', 'teamSecond', 'moneyFirst', 'moneySecond', 'show', 'coefFirst', 'coefSecond', 'eventType'],
		methods: {
			...mapMutations('betBlock', {
				pushBetInfo: 'pushBetInfo'
			}),
			userChooseBet(e, data) {
				//предотвращение многократного запроса на сервер
				if (e.target.parentNode.classList.contains("activeItem") == false) {
					this.pushBetInfo(data);
					var items = document.querySelectorAll(".block_wrap-body-extra_events .item-first, .block_wrap-body-extra_events .item-second");
					for (let item of items) {
						item.classList.remove("activeItem")
					}
					e.target.parentNode.classList.add("activeItem");
				}
				document.getElementById("betInput").focus();
			}
		}
	}
</script>

<style scoped lang="sass">
	
	.item
		border-radius: 30px
		margin-left: 0px
		padding: 0px
		align-items: center
		margin-bottom: 10px
		user-select: none
		display: flex
		&-text
			position: absolute
			width: 100%
			text-align: center
			font-size: 12px
			color: rgba(255, 255, 255, 0.8)
			margin: 0px
			line-height: 0px
			pointer-events: none
		.activeItem
			background-color: #5a83ff!important
			color: #fff
		&-first, &-second
			background-color: #0f1628
			padding: 0px			
			border-radius: 30px 0px 0px 30px
			transition: background-color 0.3s
			color: rgba(255, 255, 255, 0.5)
			position: relative
			overflow: hidden
			height: 100%
			.team_and_coef_wrap, .money_wrap
				padding: 7px 0px
				margin: 0px
				transform: translate3d(0px, 0, 0px)
				transition: all 0.3s
				height: 100%
				display: flex
				align-items: center
			.money_wrap
				position: absolute
				transform: translate3d(0px, 100%, 0px)
				top: 0px
				transition: all 0.3s
				display: inline-flex
				align-items: center
				height: 100%
				width: 100%
				font-size: 14px
				font-weight: 600
				padding-left: 45px
			span,i
				display: inline-block
				width: 35%
				padding: 0px 0px 0px 10px
				text-align: left
				font-weight: 600							
				font-size: 14px
			span
				text-align: center
			i
				padding: 0px
				width: 65%
				padding: 0px 0px 0px 20px
				font-style: normal
				font-weight: 800
			&:hover
				cursor: pointer
				background-color: rgba(90, 131, 255, 0.3)
				color: rgba(255, 255, 255, 1)
				.money_wrap
					transform: translate3d(0px, 0, 0px)
				.team_and_coef_wrap
					transform: translate3d(0px, -100%, 0px)

		&-second
			background-color: #121b31
			border-radius: 0px 30px 30px 0px
			span,i
				padding: 0px 10px 0px 0px
				text-align: right
			i
				padding: 0px 20px 0px 0px
			span
				text-align: center
			.money_wrap
				padding-left: 0px
				justify-content: flex-end
				padding-right: 40px
	@media only screen and (max-width : 1600px)
		.item
			&-text
				font-size: 10px
			&-first, &-second
				span,i
					font-size: 12px
				.money_wrap
					font-size: 12px



</style>