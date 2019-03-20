<template>
	<form class="withdraw_form col-auto row">	
		<p class="withdraw_form-promo col-12">Выберите способ вывода:</p>	
		<div class="withdraw_form-methods col-10">
			<label class="withdraw_form-methods-method col">
				<input type="radio" class="payMethod cards col" name="method" hidden="" value="AC" id="AC">
				<img src="https://betify.pro/img/card.png" alt="" class="cardBtn">
				<p>Банковская карта</p>
			</label> 
			<label class="withdraw_form-methods-method col">
				<input type="radio" class="payMethod cards col" name="method" hidden="" value="MC" id="MC">
				<img src="https://betify.pro/img/yandex.png" alt="">
				<p>Яндекс.Деньги</p>
			</label> 
			<label class="withdraw_form-methods-method col">
				<input type="radio" class="payMethod cards col" name="method" hidden="" value="qiwi" id="qiwi">
				<img src="https://betify.pro/img/qiwi.png" alt="" class="qiwiBtn">
				<p>QIWI Кошелек</p>
			</label> 
		</div>
		
		<!-- <p class="withdraw_form-rules_promo col-12">Условия на вывод средств</p>
		<ul class="withdraw_form-rules col-12">
			<li class="withdraw_form-rules-item col-12">
				Должен быть положительный баланс
			</li>
			<li class="withdraw_form-rules-item col-12">
				Сделано не менее 5 ставок
			</li>
		</ul> -->
		<input id="withdrawValue" class="withdraw_form-input col-12" type="text" name="sum" placeholder="Введите сумму">
		<input id="withdrawMethod" class="withdraw_form-input col-12" type="text" name="method" placeholder="Введите номер для зачисления">

		<input class="withdraw_form-submit" type="submit" value="Пополнить">											
		<p class="withdraw_form-extra_info col-12">Вывод средств может занимать до 24 часов</p>
		<p class="withdraw_form-extra_info col-12">Комиссия на вывод средств: 5%</p>
		
	</form>
</template>

<script>
	export default {

	}
</script>

<style scoped lang="sass">
	.withdraw_form
		border-radius: 15px
		background-color: #1f273a
		padding: 30px 40px 20px 40px
		max-width: 550px
		justify-content: center
		&-promo
			color: #94a0c0
			font-size: 18px
			text-align: center
			// font-family: "Rubik"
			letter-spacing: 0.5px
			font-weight: 600
			margin: 0px 0px 20px 0px
		&-methods
			display: flex
			justify-content: center
			padding: 0px 10px
			&-method
				text-align: center
				padding: 0px
				img
					width: 50px
					border-radius: 50%
					transition: all 0.3s
				p
					text-align: center
					color: rgba(255, 255, 255, 0.7)
					font-size: 14px
					margin: 5px 0px 0px 0px
				&:hover
					cursor: pointer
					img
						box-shadow: 0px 0px 25px #fe903b
		&-rules_promo
			color: #5a83ff
			font-size: 16px
			margin: 20px 0px 10px 0px 
			text-align: center
			font-weight: 600
		&-rules
			color: #44b718
			list-style-type: none
			padding: 0px
			font-size: 14px
			margin-top: 0px
			font-weight: 600
			&-item
				padding: 0px
				margin-bottom: 3px
		&-input
			margin-top: 10px
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
		&-submit
			font-family: "Montserrat"
			font-size: 14px
			padding: 10px 25px
			border: none
			ounline: none
			margin: 10px auto 15px
			background-color: #5a83ff
			border-radius: 5px
			transition: all 0.3s
			color: #fff
			&:hover
				background-color: #fe903b
				cursor: pointer
		&-extra_info
			font-size: 14px
			color: rgba(255, 255, 255, 0.3)
			text-align: center
			margin: 5px 0px 0px 0px
</style>