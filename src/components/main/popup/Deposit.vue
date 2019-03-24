<template>
	<form class="deposit_form col-auto row" action="http://betify.xyz/backend/payments/request.php" method="POST" target="_blank">	
		<p class="deposit_form-promo col-12">Выберите способ пополнения:</p>	
		<div class="deposit_form-methods col-10">
			<label class="deposit_form-methods-method col" @click="depositMethodChoose">
				<input type="radio" class="payMethod cards col" name="method" hidden="" value="AC" id="AC">
				<img src="https://betify.pro/img/card.png" alt="" class="cardBtn">
				<p>Банковская карта</p>
			</label> 
			<label class="deposit_form-methods-method col" @click="depositMethodChoose">
				<input type="radio" class="payMethod cards col" name="method" hidden="" value="MC" id="MC">
				<img src="https://betify.pro/img/yandex.png" alt="">
				<p>Яндекс.Деньги</p>
			</label> 
			<label class="deposit_form-methods-method col" @click="depositMethodChoose">
				<input type="radio" class="payMethod cards col" name="method" hidden="" value="qiwi" id="qiwi">
				<img src="https://betify.pro/img/qiwi.png" alt="" class="qiwiBtn">
				<p>QIWI Кошелек</p>
			</label> 
		</div>

		<input id="depositValue" v-model="depositSum" class="deposit_form-input col-12" type="text" name="sum" placeholder="Введите сумму">
		<p class="qiwiWarning" style="display: none;"> <i class="fas fa-exclamation-circle"></i> После перенаправления на страницу пополнения <b>обязательно</b>  укажите код <span>12342341</span> в поле комментария к платежу!</p>
		<p class="deposit_form-access"> 
			<label class="deposit_form-access-label">
				<input type="checkbox" name="legalAccess" value="accepted" v-model="legalAccess">
				<img src="../../../../public/img/tick.png" alt="">
			</label>
		 	Я принимаю условия <a href="http://localhost:8080/legal" target="_blank" id="depositOfferBtn"> пользовательского соглашения</a>
		</p>
		<input class="deposit_form-submit" type="submit" value="Пополнить" :disabled="disabledSubmit">											
		<p class="offerErrorNotify" style="display: none;">Соглашение не принято</p>
		
	</form>
</template>

<script>
	export default {
		data: () => ({
			depositSum: null,
			legalAccess: false
		}),
		computed: {
			disabledSubmit() {
				if (/[^0-9]/.test(this.depositSum) || this.legalAccess == false || this.depositSum == "") return true
			}
		},
		methods: {
			depositMethodChoose(e) {
				
				if (e.target.className == "payMethod cards col") {
					var items = document.querySelectorAll(".deposit_form-methods-method");
					for (let item of items) {
						item.classList.remove("active_method")
						e.target.parentNode.classList.add("active_method")
					}
					document.getElementById("depositValue").focus();
				}
			}
		}
	}
</script>

<style scoped lang="sass">
	.deposit_form
		border-radius: 15px
		background-color: #1f273a
		padding: 30px 40px 20px 40px
		max-width: 550px
		justify-content: center
		&-promo
			color: #94a0c0
			font-size: 18px
			text-align: center
			font-weight: 600
			margin: 0px 0px 20px 0px
		&-methods
			display: flex
			justify-content: center
			padding: 0px 10px
			.active_method
				img
					box-shadow: 0px 0px 30px rgba(254, 144, 59, 0.8)
				p
					color: rgba(254, 144, 59, 0.8)
			&-method
				text-align: center
				padding: 0px
				&:hover
					cursor: pointer
				img
					width: 50px
					border-radius: 50%
					transition: all 0.3s
				p
					text-align: center
					color: rgba(255, 255, 255, 0.7)
					font-size: 14px
					margin: 5px 0px 0px 0px
					transition: all 0.3s
		&-input
			margin-top: 20px
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
		&-access
			user-select: none
			color: #fff
			font-size: 14px
			padding-left: 10px
			width: 100%
			display: flex
			align-items: center
			justify-content: center
			label
				border: 2px solid #fe903b
				border-radius: 50%
				margin-right: 10px
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
				&:hover
					cursor: pointer
			a
				color: #5a83ff
				margin-left: 4px
		&-submit
			font-family: "Montserrat"
			font-size: 14px
			padding: 10px 25px
			border: none
			ounline: none
			margin: 10px auto 0px
			background-color: #5a83ff
			border-radius: 5px
			transition: all 0.3s
			color: #fff
			&:hover
				background-color: #fe903b
				cursor: pointer
			&:disabled
				background-color: #6f7481
				color: rgba(255, 255, 255, 0.6)
</style>