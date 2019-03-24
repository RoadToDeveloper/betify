<!-- Сделать отображение нескольких сообщений подряд, хорошее отображение смайликов при получении эвента сообщения -->

<template>
	<div class="chat col-12 row">
		<div id="chat-body" class="chat-body row col-12" @scroll.passive="getMoreMessage()">
			<div class="chat-item col-12 row align-self-end" v-for="(item, index) in items" :key="index">
				<div class="col-auto row" v-if="!item.self">
					<img class="chat-item-ava col-auto align-self-end"  alt="" :src="item.img">
					<div class="chat-item-msg col">
						<span class="chat-item-msg-name">{{ item.name }}</span>
						<p class="chat-item-msg-text">{{ item.message }}</p>				
					</div>
				</div>
				
				<div class="col-12 row self_msg justify-content-end" v-else>
					<div class="chat-item-msg_self col-auto">				
						<p class="chat-item-msg_self-text">{{ item.message }}</p>				
					</div>
				</div>
			</div>
		</div>
		

		<div class="chat-send_wrap row col-12 align-items-center">
			<div class="chat-send_wrap-msg col-9" aria-multiline="true" @keydown.enter.prevent="sendMsg(userMessage, userData, true)">
				<div 	class="textarea" id="msg" role="textbox" aria-multiline="true" rows="5" contenteditable="true"
						@focus="changeColorFocus" 
						@blur="changeColorBlur"   
						@keypress="onInput($event)" 
						@keyup="test($event)"
				>					
				</div>
				<div class="textarea-placeholder" :class="placeholderColor" v-if="removePlaceholder">
					<div class="textarea-placeholder-content" >Напишите сообщение…</div>
				</div>
			</div>

			<div class="chat-send_wrap-icons col-3">
				<svg @mouseenter="showSmiles" @mouseleave="hideSmiles" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path opacity=".4" d="M0 0h24v24H0z"/><path fill="#ffffff" fill-rule="nonzero" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm18.3 0a8.3 8.3 0 1 0-16.6 0 8.3 8.3 0 0 0 16.6 0zm-11.05-.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm5.5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"/><path stroke="#ffffff" stroke-width="1.7" d="M9 14.85c.833.767 1.833 1.15 3 1.15s2.167-.383 3-1.15" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
				<img src="../../../../public/img/send.png" alt="" @click="sendMsg(userMessage, userData, true)">
			</div>
			
			<transition name="slide">
				<div class="chat-send_wrap-smiles" @mouseover="showSmiles" @mouseleave="hideSmiles" v-show="smilesVisible">
					<img v-for="(smile, index) in smiles"
							:src="smile.url" 
							:alt="smile.name" 
							:name="smile.name"  
							:key="index"
							@click="addSmile(smile.name)"
					>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'

	var prevHeight;
	var updateFlag = false;
	function scrollChat() {		
		let block = document.getElementById("chat-body");
  		block.scrollTop = block.scrollHeight;
	}
	
	
	export default {
		created() {
			this.$http.get('http://betify.xyz/api/v1/chat/get')
				.then(response => response.json())
        		.then(data => {
        			console.log(data)
        			for (let i = 0; i < data.length; i++) {
        				//если челвоек не залогинен, то у него нет сообщений в чате
        				if (this.userData === undefined) {
							data[i].self = false;
        				}
        				//если айдишник отправителя совпадает с айдишником пользователя, то считаем, что это его сообщение
        				else if (data[i].userid == this.userData.id) data[i].self = true
        				//и наоборот
        				else data[i].self = false       				
        				this.items.unshift(data[i]);
        			}        			
        		})
		},
		mounted() {	
			//этот таймаут для корректного скролла чата при инициализации, так как нужно время на рендер сообщений			
			setTimeout(()=>{
				scrollChat();	
			}, 150)
			//узнаем изначальную высоту чата
			var prevHeight = document.getElementById("chat-body").scrollHeight;
		},
		updated() {
			document.getElementById("chat-body").scrollTop = document.getElementById("chat-body").scrollHeight - prevHeight;
			prevHeight = document.getElementById("chat-body").scrollHeight;								
		},
		data: () => ({
			items: [],
			smiles: [
				{
					name: '4Head',
					url: '/img/smiles/4Head.png'
				},
				{
					name: 'BabyRage',
					url: '/img/smiles/BabyRage.png'
				},
				{
					name: 'BibleThump',
					url: '/img/smiles/BibleThump.png'
				},
				{
					name: 'CoolStoryBob',
					url: '/img/smiles/CoolStoryBob.png'
				},
				{
					name: 'EZ',
					url: '/img/smiles/EZ.png'
				},
				{
					name: 'FeelsBadMan',
					url: '/img/smiles/FeelsBadMan.png'
				},
				{
					name: 'GabeN',
					url: '/img/smiles/GabeN.png'
				},
				{
					name: 'HeyGuys',
					url: '/img/smiles/HeyGuys.png'
				},
				{
					name: 'Kappa',
					url: '/img/smiles/Kappa.png'
				},
				{
					name: 'Kreygasm',
					url: '/img/smiles/Kreygasm.png'
				},
				{
					name: 'LUL',
					url: '/img/smiles/LUL.png'
				},
				{
					name: 'monkaS',
					url: '/img/smiles/monkaS.png'
				},
				{
					name: 'NotLikeThis',
					url: '/img/smiles/NotLikeThis.png'
				},
				{
					name: 'PogChamp',
					url: '/img/smiles/PogChamp.png'
				},
				{
					name: 'PunchTrees',
					url: '/img/smiles/PunchTrees.png'
				},
				{
					name: 'ResidentSleeper',
					url: '/img/smiles/ResidentSleeper.png'
				},
				{
					name: 'roflanContent',
					url: '/img/smiles/roflanContent.png'
				},
				{
					name: 'roflanDulya',
					url: '/img/smiles/roflanDulya.png'
				},
				{
					name: 'roflanEbalo',
					url: '/img/smiles/roflanEbalo.png'
				},
				{
					name: 'roflanGorit',
					url: '/img/smiles/roflanGorit.png'
				},
				{
					name: 'roflanOld',
					url: '/img/smiles/roflanOld.png'
				},
				{
					name: 'roflanPomoika',
					url: '/img/smiles/roflanPomoika.png'
				},
				{
					name: 'SeemsGood',
					url: '/img/smiles/SeemsGood.png'
				},
				{
					name: 'SMOrc',
					url: '/img/smiles/SMOrc.png'
				},
				{
					name: 'WutFace',
					url: '/img/smiles/WutFace.png'
				},
			],
			userMessage: '',
			smilesVisible: false,
			showPlaceholder: true,
			placeholderColor: ''
		}),
		computed: {
			...mapGetters('user', {
				userData: 'userData'
			}),
			removePlaceholder() {
				if (this.userMessage === '') { return this.showPlaceholder = true}
					else {return this.showPlaceholder = false}
			}
		},
		methods: {
			getMoreMessage() {							
				if (document.getElementById("chat-body").scrollTop == 0) {
					
					this.$http.get(`http://betify.xyz/api/v1/chat/get/${this.items.length}`)
						.then(response => response.json())
		        		.then(data => {
		        					        			
		        			for (let i = 0; i < data.length; i++) {
		        				updateFlag = true;
		        				//если челвоек не залогинен, то у него нет сообщений в чате
		        				if (this.userData === undefined) {
									data[i].self = false;
		        				}
		        				//если айдишник отправителя совпадает с айдишником пользователя, то считаем, что это его сообщение
		        				else if (data[i].userid == this.userData.id) data[i].self = true
		        				//и наоборот
		        				else data[i].self = false       				
		        				this.items.unshift(data[i]);		        				
		        			}	        			    			
		        		})
				}				
			},
			onInput(e) {
				if(!e.ctrlKey) this.userMessage += e.key;	
				
			},
			test(e) {
				this.userMessage = document.getElementById("msg").innerText;
			},
			changeColorFocus() {
				this.placeholderColor = "placeholderOnFocus"
			},
			changeColorBlur() {
				this.placeholderColor = "placeholderOnBlur"
			},
			sendMsg(text, user, self) {
				if (text != '') {
					document.getElementById("msg").innerText = '';
					this.userMessage = '';
					this.items.push({
						name: user.name,
						img: user.img,
						message: text,
						self: self
					});
					
				}									
			},
			showSmiles() {
				setTimeout(()=> {
					this.smilesVisible = true;
				}, 100);				
			},
			hideSmiles() {
				setTimeout(()=> {
					this.smilesVisible = false;
				}, 100);
			},
			addSmile(smile) {
				document.getElementById("msg").innerText += " "+smile;
				this.message += " "+smile;
				this.showPlaceholder = false;
			}
		}
	}
</script>

<style scoped lang="sass">
	.slide-enter
		opacity: 0
		transform:  scale(0.2) translate3d(0px,100px, 0px)
		transform-origin: 75%  100%
	.slide-enter-active
		transition: all 0.3s
	.slide-leave-active
		transform:  scale(0.2) translate3d(0px,100px, 0px)
		transition: all 0.3s
		transform-origin: 75%  100%
		opacity: 0.8
	.slide-leave-to
		opacity: 0

	
	.placeholderOnFocus
		color: rgba(255,255,255,0.3)!important
	.placeholderOnBlur
		color: rgba(255,255,255,0.5)!important
	.chat
		margin-left: 0px	
		position: relative
		padding: 0px
		flex: 1
		flex-direction: column
		padding: 0px 20px 15px 43px	
		&-body
			margin-left: 0px
			padding: 0px 0px 10px 0px
			flex: 1
			overflow-y: scroll
			&::-webkit-scrollbar-thumb
				background-color: lightgray
			&::-webkit-scrollbar
				background-color: transparent
				width: 0px
		&-item:first-of-type
			margin-top: 10px
		&-item
			margin-bottom: 7px
			margin: 0px 0px 7px 0px	
			padding: 0px	
			align-self: flex-end
			&>div
				padding: 0px
				margin-left: 0px
			.self_msg, .not_self_msg	
				margin-left: 0px
				padding: 0px
			&-ava
				width: 30px
				height: 30px
				border-radius: 50%
				padding: 0px
			&-msg, &-msg_self
				padding: 5px 14px
				background-color: #1d243b
				margin: 0px 0px 0px 8px
				font-size: 14px
				border-radius: 20px 20px 20px 0px
				&-name
					color: #6f7481					
				&-text
					color: rgba(255,255,255,0.7)
					margin: 2px 0px 0px 0px
					word-break: break-all
			&-msg_self
				background-color: #293c74
				border-radius: 20px 20px 0px 20px
				margin: 0px
				&-name
					color: rgba(255, 255, 255, 0.4)
		&-send_wrap	
			margin-top: 0px
			margin-left: 0px	
			color: #fff		
			background-color: #293c74
			border-radius: 25px
			font-size: 12px
			padding: 5px 15px
			max-height: fit-content
			&-msg
				padding: 0px
				outline: none
				.textarea
					outline: none
					-webkit-user-select: none
					user-select: none
					max-height: 100px
					overflow-y: auto
					padding: 0px
					overflow-x: hidden
					word-wrap: break-word
					resize: none
					&::-webkit-scrollbar-thumb
						background-color: lightgray
					&::-webkit-scrollbar
						background-color: transparent
						width: 0px
					img
						width: 18px
					&-placeholder
						transition: color 0.3s
						color: rgba(255,255,255,0.5)
						position: absolute
						font-size: 14px
						top: -2px
						-webkit-user-select: none
						user-select: none
						pointer-events: none
						&-content
							-webkit-user-select: none
							user-select: none
							pointer-events: none
					
			&-icons
				padding: 0px
				align-self: flex-end
				display: flex
				align-items: center
				justify-content: flex-end
				margin-bottom: 2px
				img, svg
					margin-left: 7px
					height: 24px
					&:hover
						cursor: pointer
						filter: brightness(0.8)
				svg
					height: 26px
					width: 26px
			&-smiles
				position: absolute
				padding: 10px 9px 10px 15px
				width: 220px
				background-color: #0b101c
				border: 2px solid #293c74
				border-radius: 15px 15px 0px 15px
				top: -225px
				right: 0px
				img
					width: 25px
					margin-right: 6px
					margin-bottom: 4px
					transition: transform 0.2s
					&:hover
						transform: scale(1.4)
						cursor: pointer
				&:hover
					display: block!important
					transform: scale(1)!important
					opacity: 1!important
	MEDIA
	@media only screen and (max-width : 1600px)
		.chat
			padding: 0px 10px 10px 30px
			&-body
			&-item
				margin-bottom: 4px
				&-ava
					width: 25px
					height: 25px
				&-msg, &-msg_self
					font-size: 12px
					padding: 4px 10px
					&-text
						margin: 0px
			&-send_wrap
				padding: 0px 5px 0px 10px
				margin-top: 5px
				&-msg
					.textarea
						&-placeholder
							font-size: 10px
							top: 1px
				&-icons
					img, svg
						padding: 4px
						margin-left: 0px
					img
						width: 24px
					svg
						min-width: 28px
						height: 28px
				&-smiles
					width: 145px
					top: -170px
					img
						width: 17px
</style>