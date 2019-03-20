<template>
	<div class="wrapper col-12 row">
		<div class="tournament col-12">
			<img :src="tournamentLogo" alt="">
			{{name}}
		</div>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: ['name', 'logo'],
		computed: {
			tournamentLogo() {
				return `http://betify.xyz/logo/event/${this.logo}.png`
			}
		}
	}
</script>

<style scoped lang="sass">
	.wrapper
		padding: 0px
		margin-left: 0px
	.tournament
		display: flex
		align-items: center
		padding: 15px 45px
		background-color: #0e1526
		font-weight: 700
		color: #94a0c0
		font-size: 16px
		img
			width: 40px
			margin-right: 10px
	@media only screen and (max-width : 1600px)
		.tournament
			padding: 18px 30px
			font-size: 14px
</style>