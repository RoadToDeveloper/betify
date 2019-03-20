<template>
	<div class="footer col-9 row">
		<div class="footer-logo col-auto">
			Betify
		</div>
		<ul class="footer-items col row justify-content-around">
			<li @click="showLegal">Соглашение</li>
			<li @click="showPopup('technicalHelp')">Поддержка</li>
			<li>FAQ</li>
			<li @click="showPopup('job')">Вакансии</li>
		</ul>
		<ul class="footer-contacts col-auto">
			<li><i class="fas fa-map-marker-alt"></i> Arch. Makaroy III,
				135</li>
			<li><i class="fas fa-mobile-alt"></i> +35725123295</li>
		</ul>
		<p class="footer-copyright col-12">
			© Copyright 2018 Все права защищены. Азартные игры могут вызывать зависимость. Пожалуйста, играйте ответственно
		</p>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		methods: {
			...mapMutations('popups', {
	        showPopup: 'doPopup'
	      }),
	      showLegal() {
	      	this.$router.push('/legal')
	      	window.scrollTo(0,0);
	      }
		}
	}
</script>

<style scoped lang="sass">
	.footer
		margin-left: 25%
		background-color: #080c17
		align-self: flex-end
		align-items: center
		padding: 0px 45px 8px 45px
		&-logo
			color: #fff
			font-size: 18px
			font-family: "Lato",
			font-weight: 900
			letter-spacing: 0.3px
			padding: 0px
		&-items
			color: #6f7481
			list-style-type: none
			margin: 0px
			li
				display: inline-block
				font-size: 14px
				transition: all 0.3s
				padding: 10px 20px
				&:hover
					cursor: pointer
					color: rgba(255, 255, 255, 0.7)
		&-contacts
			color: #6f7481
			list-style-type: none
			margin: 0px
			font-size: 14px
			padding: 10px 0px
			li:not(:last-of-type)
				margin-bottom: 5px
				i
					margin-right: 4px
		&-copyright
			font-size: 12px
			color: rgba(255, 255, 255, 0.3)
			text-align: center
			position: relative
			margin: 0px
			padding-top: 7px
			&:before
				content: ''
				position: absolute
				top: 0px
				width: 104%
				left: -2%
				background-color: rgba(255, 255, 255, 0.4)
				height: 1px
</style>