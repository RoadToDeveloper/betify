<template>	
	<div id="chat-body" class="chat-body row col-12" @scroll="getMoreMessage()">
		<div class="chat-item col-12 row align-self-end" v-for="(item, index) in items" :key="index">

			<div class="col-auto row" v-if="!item.self" :class="item.class">
				
					<img class="chat-item-ava col-auto align-self-end"  alt="" :src="item.img">
					<div class="chat-item-msg col">
						<span class="chat-item-msg-name" v-show="item.firstInGroup">{{ item.name }}</span>
						<p class="chat-item-msg-text" v-html="item.message"></p>				
					</div>
							
			</div>
			
			<div class="col-12 row self_msg justify-content-end" v-else>
				<div class="chat-item-msg_self col-auto">				
					<p class="chat-item-msg_self-text" v-html="item.message"></p>				
				</div>
			</div>						
		</div>
		<div class="chat-item-system" v-show="chatError">{{errorText}}</div>		
	</div>
</template>

<script>
	var prevHeight;
	import {mapGetters} from 'vuex'

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
        				data[i].firstInGroup = false;
        				//показываем смайлики, если есть совпадения в тексте сообщения
        				let text = data[i].message.replace(/(4Head|BabyRage|BibleThump|CoolStoryBob|EZ|FeelsBadMan|GabeN|HeyGuys|Kappa|Kreygasm|LUL|monkaS|NotLikeThis|PogChamp|PunchTrees|ResidentSleeper|roflanContent|roflanDulya|roflanEbalo|roflanGorit|roflanOld|roflanPomoika|SeemsGood|SMOrc|WutFace)/g, "<img style='width:20px' src='/img/smiles/$1.png' alt='$1'>");
						data[i].message = text; 
        				//если челвоек не залогинен, то у него нет сообщений в чате
        				if (this.userData === undefined) {
							data[i].self = false;
        				}
        				//если айдишник отправителя совпадает с айдишником пользователя, то считаем, что это его сообщение
        				else if (data[i].userid == this.userData.id) data[i].self = true
        				//и наоборот
        				else data[i].self = false; 
        				
        				//если id сообщения не совпадает с ПОСЛЕДУЮЩИМ, то считаем это последним сообщением в группе
        				if (i > 0 && data[i].userid != data[i - 1].userid) {
        					data[i].lastInGroup = true;
        					data[i].class = "not_first_in_group"
        				}   
        				//если id совпадает, то считаем это промежуточным сообщением в группе   	
        				else if (i > 0 && data[i].userid == data[i - 1].userid) {
        					data[i].img = "";
        					data[i].class = "not_first_in_group"
        				}		
        				//если id не совпадает с ПРЕДЫДУЩИМ сообщением, то считаем это первым сообщием в группе
        				//причем это условие и первое формируют одиночные сообщения в совокупности
        				if (i != data.length - 1 && data[i].userid != data[i + 1].userid)	{
        					data[i].firstInGroup = true;
        					data[i].class = "first_in_group"
        					if (i > 0 && data[i].userid != data[i - 1].userid) data[i].firstInGroup = true;
        				}     
        				// if (i = 0 && data[i].userid != data[i + 1].userid) {
        				// 	data[i].class = "not_first_in_group"	
        				// } 	

        				this.items.unshift(data[i]);
        			}; 
        			if (data[0].userid == data[1].userid) {
						data[0].class = "not_first_in_group"
        			}
        			setTimeout(()=>{
						scrollChat();
					}, 10)		
        		})
		},
		mounted() {
			setTimeout(()=>{
				scrollChat();
			}, 10)
			this.sockets.subscribe('chatNew', (data) => {
				let text = data.message.replace(/(4Head|BabyRage|BibleThump|CoolStoryBob|EZ|FeelsBadMan|GabeN|HeyGuys|Kappa|Kreygasm|LUL|monkaS|NotLikeThis|PogChamp|PunchTrees|ResidentSleeper|roflanContent|roflanDulya|roflanEbalo|roflanGorit|roflanOld|roflanPomoika|SeemsGood|SMOrc|WutFace)/g, "<img style='width:20px' src='/img/smiles/$1.png' alt='$1'>");
				data.message = text;
			   prevHeight = 0;
			   if (this.userData === undefined) {
     				data.self = false;
     			}
     			else if (data.userid == this.userData.id) data.self = true
     			else data.self = false;
     			//присуждение стилей
     			if (data.userid == this.items[this.items.length - 1].userid) {
  					data.class = "not_first_in_group";
  					this.items[this.items.length - 1].img = "";
  				}      	
  				else {
  					data.firstInGroup = true;
        			data.class = "first_in_group"
  				}		
				this.items.push(data);
				setTimeout(()=>{
					scrollChat();
				}, 10)
			})
			scrollChat();
			//узнаем изначальную высоту чата
			prevHeight = document.getElementById("chat-body").scrollHeight;
		},
		props: ["chatError", "errorText", "smiles"],
		data: () => ({
			items: []
		}),
		computed: {
			...mapGetters('user', {
				userData: 'userData',
				userLogin: 'userLogin'
			})
		},
		methods: {
			getMoreMessage() {
				if (document.getElementById("chat-body").scrollTop == 0) {			
					this.$http.get(`http://betify.xyz/api/v1/chat/get/${this.items.length}`)
					.then(response => response.json())
					.then(data => {
						for (let i = 0; i < data.length; i++) {
		        			let text = data[i].message.replace(/(4Head|BabyRage|BibleThump|CoolStoryBob|EZ|FeelsBadMan|GabeN|HeyGuys|Kappa|Kreygasm|LUL|monkaS|NotLikeThis|PogChamp|PunchTrees|ResidentSleeper|roflanContent|roflanDulya|roflanEbalo|roflanGorit|roflanOld|roflanPomoika|SeemsGood|SMOrc|WutFace)/g, "<img style='width:20px' src='/img/smiles/$1.png' alt='$1'>");
							data[i].message = text; 
		        			//если челвоек не залогинен, то у него нет сообщений в чате
		        			if (this.userData === undefined) {
		        				data[i].self = false;
		        			}
		        			//если айдишник отправителя совпадает с айдишником пользователя, то считаем, что это его сообщение
		        			else if (data[i].userid == this.userData.id) data[i].self = true
		        			//и наоборот
		        			else data[i].self = false;          				
		        			this.items.unshift(data[i]);		        				
		        		}
		        		for (let i = 0; i <= 50; i++) {
	        				if (i > 0 && i != 50 && data[i].userid != data[i - 1].userid) {
	        					data[i].lastInGroup = true;
	        					data[i].class = "not_first_in_group"
	        				}      	
	        				else if (i > 0 && data[i].userid == data[i - 1].userid) {
	        					data[i].img = "";
	        					data[i].class = "not_first_in_group"
	        				}		
	        				if (i != data.length - 1 && data[i].userid != data[i + 1].userid)	{
	        					data[i].firstInGroup = true;
	        					data[i].class = "first_in_group"
	        					if (i > 0 && data[i].userid != data[i - 1].userid) data[i].firstInGroup = true;
	        				}   
	        			}		        			    			
		        	})
				}				
			},
		},
		watch: {
			userData() {
				console.log(this.userData.id);
				for (let i = 0; i < this.items.length; i++) {
        			if (this.items[i].userid == this.userData.id) this.items[i].self = true; 
        			prevHeight = 0;    						        				
        		}	
			},
			userLogin() {
				for (let i = 0; i < this.items.length; i++) {
        			this.items[i].self = false; 
        			prevHeight = 0;    						        				
        		}
			},
			items() {
				document.getElementById("chat-body").scrollTop = document.getElementById("chat-body").scrollHeight - prevHeight;
				prevHeight = document.getElementById("chat-body").scrollHeight;			
			}
		}
	}
</script>

<style lang="sass" scoped>
	.chat-body
		margin-left: 0px
		padding: 0px 0px 10px 0px
		flex: 1
		overflow-y: scroll
		&::-webkit-scrollbar-thumb
			background-color: lightgray
		&::-webkit-scrollbar
			background-color: transparent
			width: 0px
	.chat-item:first-of-type
		margin-top: 10px
	.chat-item
		margin-bottom: 7px
		margin: 0px 0px 2px 0px	
		padding: 0px	
		align-self: flex-end
		.not_first_in_group
			.chat-item-msg
				border-radius: 7px 20px 20px 0px!important
		.first_in_group
			margin-top: 4px!important
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
		&-system
			// color: #A4A9B7
			color: rgba(255, 255, 255, 0.4)
			padding: 0px 
			margin-left: 0px
			font-size: 14px
			width: 100%
			span
				font-weight: 900
//MEDIA
@media only screen and (max-width : 1600px)
	.chat-item
		margin-bottom: 2px
		&-ava
			width: 25px
			height: 25px
		&-msg, &-msg_self
			font-size: 12px
			padding: 4px 10px
			&-text
				margin: 0px
</style>