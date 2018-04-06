<template>
	<div id="LookEdit">
		<div v-show="showContentWindow" id="content">
			<Header title="疾病症状" :headerLeft="headerLeft" :fixed="isFixed" @clickRouter="back"></Header>
			<div class="form">
				<div class="form1">
					<textarea placeholder="详细描述宠物的症状，基本情况，以便医生能更准确迅速判断病情"
						v-model="notes" maxlength="255" @input="countWord"></textarea>
					<p>{{count}}/255</p>
					<div class="pic">
						<span class="addBtn" v-for="(item, index) in picList" v-if="picList.length!=0">
							<img :src="item.picture" @click="previewImg(index)"/>
							<img src="../../assets/images/removeImg.svg" class="remove" @click="removeImg(index)"/>
						</span>
						<span class="addBtn" v-show="picList.length != 3">
							<img src="../../assets/images/tianjia.png" />
							<input class="file-btn" type="file" hidefocus="true" name="picture"
							 	accept="image/*" @change="getImg($event)"/>
						</span>
					</div>
				</div>
				<ul class="form2">
					<li class="">
						<label>昵称</label>
						<input type="text" placeholder="请输入" v-model="editList.petName"/>
					</li>
					<li class="">
						<label>性别</label>
						<div class="radio-wrap">
							<label class="yd-radio">
								<input type="radio" value="1" name="sex" checked v-model="editList.petSex">
								<span class="yd-radio-icon"></span>
								<span class="yd-radio-text">GG</span>
							</label>
							<label class="yd-radio">
								<input type="radio" value="2" name="sex" v-model="editList.petSex">
								<span class="yd-radio-icon"></span>
								<span class="yd-radio-text">MM</span>
							</label>
						</div>
					</li>
					<li class="">
						<label>品种</label>
						<span class="" @click="showpetTypeWindow">
							{{petTypeText == '' ? '请选择':petTypeText}}
							<i class="icon-right">
								<img src="../../assets/images/right.svg" />
							</i>
						</span>
					</li>
					<li class="">
						<label>出生年月</label>
						<span class="" @click="openTimePicker">
							{{editList.petBirth == '' ? '请选择' : editList.petBirth}}
							<i class="icon-right">
								<img src="../../assets/images/right.svg" />
							</i>
						</span>
					</li>
					<li class="">
						<label>体内驱虫(3个月内)</label>
						<div class="radio-wrap">
							<label class="yd-radio">
								<input type="radio" value="1" name="insert" checked v-model="editList.isInsert">
								<span class="yd-radio-icon"></span>
								<span class="yd-radio-text">是</span>
							</label>
							<label class="yd-radio">
								<input type="radio" value="0" name="insert" v-model="editList.isInsert">
								<span class="yd-radio-icon"></span>
								<span class="yd-radio-text">否</span>
							</label>
						</div>
					</li>
					<li class="">
						<label>疫苗齐全(1年内)</label>
						<div class="radio-wrap">
							<label class="yd-radio">
								<input type="radio" value="1" name="vaccine" checked v-model="editList.isVaccine">
								<span class="yd-radio-icon"></span>
								<span class="yd-radio-text">是</span>
							</label>
							<label class="yd-radio">
								<input type="radio" value="0" name="vaccine" v-model="editList.isVaccine">
								<span class="yd-radio-icon"></span>
								<span class="yd-radio-text">否</span>
							</label>
						</div>
					</li>
					<li class="">
						<label>是否绝育</label>
						<div class="radio-wrap">
							<label class="yd-radio">
								<input type="radio" value="1" name="status" checked v-model="editList.petStatus">
								<span class="yd-radio-icon"></span>
								<span class="yd-radio-text">是</span>
							</label>
							<label class="yd-radio">
								<input type="radio" value="0" name="status" v-model="editList.petStatus">
								<span class="yd-radio-icon"></span>
								<span class="yd-radio-text">否</span>
							</label>
						</div>
					</li>
					<li class="">
						<label>城市</label>
						<span class="" @click="showCityselect = true">
							{{editList.region == '' ? '请选择' : editList.region}}
							<i class="icon-right">
								<img src="../../assets/images/right.svg" />
							</i>
						</span>
					</li>
				</ul>
				<div class="check-wrap">
					<div class="check-type">
						<label>选择填写疾病类型</label>
						<div class="check-list">
							<yd-checkbox-group v-model="editList.diseaseType"
								color="#eb695c" size="15" >
								<span v-for="(item, idx) in diseaseTypeList"
									:key="idx">
									<yd-checkbox :val="item.value">{{item.text}}</yd-checkbox>
								</span>
							</yd-checkbox-group>
						</div>
					</div>
					<yd-accordion accordion>
		        <yd-accordion-item title="呼吸系统"
							v-show="editList.diseaseType.indexOf(1) > -1">
	            <div class="check-list">
								<yd-checkbox-group v-model="breath" color="#eb695c" size="15">
									<span v-for="(item, idx) in checkList1" :key="idx">
										<yd-checkbox :val="item"></yd-checkbox>
									</span>
								</yd-checkbox-group>
	            </div>
		        </yd-accordion-item>
		        <yd-accordion-item title="消化系统"
							v-show="editList.diseaseType.indexOf(2) > -1">
							<div class="check-list flex">
								<label>是否有呕吐物</label>
								<yd-checkbox-group v-model="digestion.vomiting"
									color="#eb695c" size="15" class="checbox-group">
									<span v-for="(item, idx) in checkList2" :key="idx">
										<yd-checkbox :val="item"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>是否有腹泻物</label>
								<yd-checkbox-group v-model="digestion.diarrhea"
									color="#eb695c" size="15">
									<span v-for="(item, idx) in checkList3" :key="idx">
										<yd-checkbox :val="item"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
		        </yd-accordion-item>
		        <yd-accordion-item title="皮肤病"
							v-show="editList.diseaseType.indexOf(3) > -1">
							<div class="check-list flex">
								<label>瘙痒症状</label>
								<yd-checkbox-group v-model="skin.tickle"
									color="#eb695c" size="15" class="checbox-group" >
									<span v-for="(item, idx) in checkList4" :key="idx">
										<yd-checkbox :val="item" shape="circle"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>掉毛症状</label>
								<yd-checkbox-group v-model="skin.hair"
									color="#eb695c" size="15">
									<span v-for="(item, idx) in checkList5" :key="idx">
										<yd-checkbox :val="item" shape="circle"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>近三个月有患体外寄生虫</label>
								<yd-checkbox-group v-model="skin.parasite"
									color="#eb695c" size="15">
									<span v-for="(item, idx) in checkList6" :key="idx">
										<yd-checkbox :val="item"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>是否做体外寄生虫预防</label>
								<yd-checkbox-group v-model="skin.against"
									color="#eb695c" size="15">
									<span>
										<yd-checkbox val="1" shape="circle">是</yd-checkbox>
										<yd-checkbox val="0" shape="circle">否</yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<p class="tip">温馨提示: 请上传病症位置全身图和清晰细节图</p>
		        </yd-accordion-item>
						<yd-accordion-item title="骨科、外科"
							v-show="editList.diseaseType.indexOf(4) > -1">
							<div class="check-list flex">
								<label>受伤原因</label>
								<input type="text" placeholder="请输入"
									v-model="surgical.cause"/>
							</div>
							<div class="check-list flex">
								<label>受伤时间</label>
								<span class="choice" @click="openOutTimePicker">
									{{surgical.time == '' ? '请选择' : surgical.time}}
									<i class="icon-right">
										<img src="../../assets/images/right.svg" />
									</i>
								</span>
							</div>
							<p class="tip">温馨提示: 请上传病症位置全身图和清晰细节图</p>
		        </yd-accordion-item>
						<yd-accordion-item title="泌尿生殖系统"
							v-show="editList.diseaseType.indexOf(5) > -1">
							<div class="check-list flex">
								<label>饮水量</label>
								<yd-checkbox-group v-model="urinary.water"
									color="#eb695c" size="15">
									<span v-for="(item, idx) in checkList7" :key="idx">
										<yd-checkbox :val="item"
											shape="circle"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>尿次数</label>
								<yd-checkbox-group v-model="urinary.times"
									color="#eb695c" size="15">
									<span v-for="(item, idx) in checkList7" :key="idx">
										<yd-checkbox :val="item"
											shape="circle"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>一天总尿量</label>
								<yd-checkbox-group v-model="urinary.total"
									color="#eb695c" size="15">
									<span v-for="(item, idx) in checkList7" :key="idx">
										<yd-checkbox :val="item"
											shape="circle"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>尿颜色</label>
								<yd-checkbox-group v-model="urinary.color"
									color="#eb695c" size="15">
									<span v-for="(item, idx) in checkList8" :key="idx">
										<yd-checkbox :val="item" shape="circle"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>如果尿液有血色</label>
								<yd-checkbox-group v-model="urinary.hasBlood"
									color="#eb695c" size="15">
									<span v-for="(item, idx) in checkList9" :key="idx">
										<yd-checkbox :val="item" shape="circle"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
		        </yd-accordion-item>
						<yd-accordion-item title="五官科"
							v-show="editList.diseaseType.indexOf(6) > -1">
							<div class="check-list flex">
								<label>眼屎、眼泪</label>
								<yd-checkbox-group v-model="facial.tears"
									color="#eb695c" size="15">
									<span v-for="(item, idx) in checkList7" :key="idx">
										<yd-checkbox :val="item"
											shape="circle"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>耳有无异味</label>
								<yd-checkbox-group v-model="facial.earSmell"
									color="#eb695c" size="15">
									<span>
										<yd-checkbox val="1" shape="circle">有</yd-checkbox>
										<yd-checkbox val="0" shape="circle">无</yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>耳是否瘙痒</label>
								<yd-checkbox-group v-model="facial.earTickle"
									color="#eb695c" size="15">
									<span>
										<yd-checkbox val="1" shape="circle">有</yd-checkbox>
										<yd-checkbox val="0" shape="circle">无</yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>耳内分泌物颜色</label>
								<yd-checkbox-group v-model="facial.earColor"
									color="#eb695c" size="15">
									<span v-for="(item, idx) in checkList10" :key="idx">
										<yd-checkbox :val="item" shape="circle"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>鼻是否干燥</label>
								<yd-checkbox-group v-model="facial.nose"
									color="#eb695c" size="15">
									<span v-for="(item, idx) in checkList11" :key="idx">
										<yd-checkbox :val="item" shape="circle"></yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>口腔、是否正常进食</label>
								<yd-checkbox-group v-model="facial.oral"
									color="#eb695c" size="15">
									<span>
										<yd-checkbox val="1" shape="circle">是</yd-checkbox>
										<yd-checkbox val="0" shape="circle">否</yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>流口水症状</label>
								<yd-checkbox-group v-model="facial.isDrool"
									color="#eb695c" size="15">
									<span>
										<yd-checkbox val="1" shape="circle">是</yd-checkbox>
										<yd-checkbox val="0" shape="circle">否</yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
							<div class="check-list flex">
								<label>有牙结石</label>
								<yd-checkbox-group v-model="facial.hasTeeth"
									color="#eb695c" size="15">
									<span>
										<yd-checkbox val="1" shape="circle">是</yd-checkbox>
										<yd-checkbox val="0" shape="circle">否</yd-checkbox>
									</span>
								</yd-checkbox-group>
							</div>
		        </yd-accordion-item>
						<yd-accordion-item title="驱虫"
							v-show="editList.diseaseType.indexOf(8) > -1">
							<div class="check-list flex">
								<label>主人问题</label>
								<input type="text" placeholder="请输入"
									v-model="insert.question"/>
							</div>
							<div class="check-list flex">
								<label>最近一次驱虫时间</label>
								<span class="choice" @click="openInsertTimePicker">
									{{insert.time == '' ? '请选择' : insert.time}}
									<i class="icon-right">
										<img src="../../assets/images/right.svg" />
									</i>
								</span>
							</div>
							<p class="tip">温馨提示: 请上传病症位置全身图和清晰细节图</p>
		        </yd-accordion-item>
						<yd-accordion-item title="免疫"
							v-show="editList.diseaseType.indexOf(7) > -1">
							<div class="check-list flex">
								<label>主人问题</label>
								<input type="text" placeholder="请输入"
									v-model="immune.question"/>
							</div>
							<div class="check-list flex">
								<label>最近一次免疫时间</label>
								<span class="choice" @click="openImmuneTimePicker">
									{{immune.time == '' ? '请选择' : immune.time}}
									<i class="icon-right">
										<img src="../../assets/images/right.svg" />
									</i>
								</span>
							</div>
							<p class="tip">温馨提示: 请上传病症位置全身图和清晰细节图</p>
		        </yd-accordion-item>
					</yd-accordion>
				</div>

				<!--选择器-->
				<yd-cityselect v-model="showCityselect" :callback="resultCity" :items="district"></yd-cityselect>
				<mt-datetime-picker ref="showDatetime" type="datetime" @confirm="handleDatetime"
					:startDate="startDate" :endDate="endDate"></mt-datetime-picker>
				<mt-datetime-picker ref="showOutDatetime" type="datetime" @confirm="handleOutDatetime"
					:startDate="startDate" :endDate="endDate"></mt-datetime-picker>
				<mt-datetime-picker ref="showInsertDatetime" type="date" @confirm="handleInsertDatetime"
					:startDate="startDate" :endDate="endDate"></mt-datetime-picker>
				<mt-datetime-picker ref="showImmuneDatetime" type="date" @confirm="handleImmuneDatetime"
					:startDate="startDate" :endDate="endDate"></mt-datetime-picker>

			</div>
			<div class="btn-wrap">
				<button class="btn-save" @click="saveToPublish">{{saveBtnText}}</button>
			</div>
			<ImgView v-show="showImgView" :imgSrc="avatar" @clickkit="closeView"></ImgView>
		</div>
		<div v-show="showTypeWindow">
			<Header :title="windowTitle" :headerLeft="windowheaderLeft" @clickRouter="windowback"></Header>
			<ChoiceWindow :dataList="petTypeList" @confirm="confirmType"></ChoiceWindow>
		</div>
	</div>
</template>

<script>
import Header from '@/components/header';
import District from 'ydui-district/dist/gov_province_city_area_id';
import ChoiceWindow from '@/components/choiceWindow';
import ImgView from '@/components/imageView';
import { mapGetters } from 'vuex';

export default{
	name:"LookEdit",
	components:{
	    Header,ImgView,ChoiceWindow
	},
	data(){
		return{
			//窗口
			showContentWindow:true,
			showAgeWindow:false,
			showTypeWindow:false,
			/*selectWindow*/
			windowTitle:'',
			windowheaderLeft:'',
			//主页
			isFixed:true,
			headerLeft:true,
			isSaving:false,
			saveBtnText:'确认发布',
			showCityselect:false,
			district:District,
			notes:'',
			count:0,
			files:[],
			avatar:'',
			petTypeText:'',
			showImgView:false,
			picList:[],
			checkList1: ['咳嗽', '流鼻涕', '鼻子干', '有痰', '无痰', '精神良好', '精神不振',
				'精神萎靡', '食欲良好', '食欲一般', '无食欲'],
			checkList2: ['无', '食物', '黄水', '白色泡沫', '异物'],
			checkList3: ['无', '软便', '烂泥状', '水状', '腥臭', '酸臭', '腐臭'],
			checkList4: ['无瘙痒', '轻度瘙痒', '中度瘙痒', '重度瘙痒'],
			checkList5: ['不掉毛', '少量掉毛', '大量掉毛', '脱毛', '秃毛'],
			checkList6: ['跳蚤', '蜱虫', '虱子'],
			checkList7: ['增多', '减少', '无变化'],
			checkList8: ['淡黄', '深黄', '血红色', '茶色'],
			checkList9: ['尿前', '尿中(混合)', '尿后'],
			checkList10: ['褐色', '黄色'],
			checkList11: ['湿润', '干燥', '干裂'],
			diseaseTypeList:[{
				text:'呼吸系统', value:1,
			},{
				text:'消化系统', value:2,
			},{
				text:'皮肤病', value:3,
			},{
				text:'骨科、外科', value:4,
			},{
				text:'泌尿生殖', value:5,
			},{
				text:'五官科', value:6,
			},{
				text:'免疫', value:7,
			},{
				text:'驱虫', value:8,
			}],
			breath: [],
			digestion: {
				vomiting: [],
				diarrhea: [],
			},
			skin: {
				tickle: [],
				hair: [],
				parasite: [],
				against: [],
			},
			surgical: {
				cause: '',
				time: '',
			},
			urinary: {
				water: [],
				times: [],
				total: [],
				color: [],
				hasBlood: [],
			},
			facial: {
				tears: [],
				earSmell: [],
				earTickle: [],
				earColor: [],
				nose: [],
				oral: [],
				isDrool: [],
				hasTeeth: [],
			},
			insert: {
				question: '',
				time: '',
			},
			immune: {
				question: '',
				time: '',
			},
			editList:{
				petAvatar:'',
				note:'',
				petName: null,
				petSex:1,
				petType: null,
				petBirth: '',
				isInsert:1,
				isVaccine:1,
				petStatus:1,
				region:'',
				diseaseType: [],
				symptoms: {},
			},
			startDate: new Date('1990-01-01'),
			endDate:new Date(this.utils.getNowTime()),
			petTypeList:[{
				text:'汪星人', value:1, isChecked:false
			},{
				text:'喵星人', value:2, isChecked:false
			},{
				text:'兔星人', value:3, isChecked:false
			},{
				text:'鼠星人', value:4, isChecked:false
			},{
				text:'鸟星人', value:5, isChecked:false
			},{
				text:'龟星人', value:6, isChecked:false
			},{
				text:'鱼星人', value:7, isChecked:false
			},{
				text:'其它', value:8, isChecked:false
			}],
		}
	},
	computed:{
		...mapGetters([
			'id',
		])
	},
	methods:{
		back:function(){
			this.$router.go(-1);
		},
		windowback: function(){
			let vm = this;
			vm.showContentWindow = true;
			vm.showAgeWindow = false;
			vm.showTypeWindow = false;
		},
		countWord: function(){
			let vm = this;
			let len = vm.notes.length;
			vm.count = len;
		},
		previewImg: function(index){
			let vm = this;
			vm.avatar = vm.picList[index].picture;
    		vm.showImgView = true;
    	},
    	closeView: function(){
    		this.showImgView = false;
    	},
    	removeImg: function(index){
    		let list = this.picList;
    		let fileslist = this.files;
    		list = list.splice(index, 1);
    		fileslist = fileslist.splice(index, 1)
    	},
    //城市
		resultCity: function(ret) {
        this.editList.region = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
   	},
   	//时间
   	openTimePicker:function(){
   		this.$refs.showDatetime.open();
   	},
   	handleDatetime: function(value){
   		let vm = this;
   		let d = `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}`;
	 		d = vm.utils.formatDate(d, 'yyyy-MM-dd hh:mm');
	 		vm.editList.petBirth = d;
   	},
		//品种
		showpetTypeWindow:function(){
       		let vm = this;
       		vm.showContentWindow = false;
       		vm.showTypeWindow = true;
       		vm.windowTitle = '宠物品种';
			vm.windowheaderLeft = true;
       	},
       	confirmType: function(obj){
			let vm = this;
			$.each(vm.petTypeList, function(index, item){
					item.isChecked = false;
			})
			obj.isChecked = true;
			vm.petTypeText = obj.text;
			vm.editList.petType = obj.value;
			setTimeout(function(){
				vm.showContentWindow = true;
				vm.showTypeWindow = false;
			},500);
		},
		// 外科 时间
   	openOutTimePicker:function(){
   		this.$refs.showOutDatetime.open();
   	},
   	handleOutDatetime: function(value){
   		let vm = this;
   		let d = `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}`;
	 		d = vm.utils.formatDate(d, 'yyyy-MM-dd hh:mm');
	 		vm.surgical.time = d;
   	},
		// 驱虫 时间
   	openInsertTimePicker:function(){
   		this.$refs.showInsertDatetime.open();
   	},
   	handleInsertDatetime: function(value){
   		let vm = this;
   		let d = `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}`;
	 		d = vm.utils.formatDate(d, 'yyyy-MM-dd hh:mm');
	 		vm.insert.time = d;
   	},
		// 免疫 时间
   	openImmuneTimePicker:function(){
   		this.$refs.showImmuneDatetime.open();
   	},
   	handleImmuneDatetime: function(value){
   		let vm = this;
   		let d = `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}`;
	 		d = vm.utils.formatDate(d, 'yyyy-MM-dd hh:mm');
	 		vm.immune.time = d;
   	},
  	getImg: function(e){
  		let vm = this;
  		let file = e.target.files[0];
  		let fileslist = vm.files;
  		fileslist = fileslist.push(file);
  		if((file.type).indexOf("image/")==-1){
  			vm.$dialog.toast({
	            mes: '该文件必须为图片格式',
	            timeout: 1000,
	            icon: 'error'
	        });
  			return false;
  		}
  		let reader = new FileReader();
  		reader.readAsDataURL(file);
  		reader.onload = function(e){
  			let pic = {};
  			let list = vm.picList;
  			pic.picture = this.result;
  			list = list.push(pic);
  		}
    	},
    	saveToPublish: function(){
    		let vm = this;
    		if(vm.isSaving) return;
				let data = vm.editList;
				if(!data.region || !data.petBirth ||
					!data.petType || !vm.notes || !data.petName){
						vm.$toast('信息填写不完整');
						return;
				}
				if(!data.diseaseType){
						vm.$toast('未选择疾病类型');
						return;
				}

    		let e = vm.files;
      	let url = vm.urls.uploadArray;
    		let fname = 'picture';
    		vm.isSaving = true;
				vm.saveBtnText = '正在发布中...';
    		let callback = function(r){
    			vm.editList.petAvatar = JSON.stringify(r.data.data);
    			save();
    		}
				if(e) {
					vm.utils.uploadMore(vm, e, fname, url, callback);
				} else {
					save();
				}


    		function save(){
    			const url = vm.urls.addDisease;
					data.userId = vm.id;
					data.createTime = vm.utils.getNowTime();
					data.note = vm.notes.replace(/\n|\r\n/g,"<br/>");
					let symptom = {};
					data.diseaseType.forEach((item) => {
						symptom[vm.config.diseaseListEn[item]] = vm[vm.config.diseaseListEn[item]];
					});
					data.diseaseType = JSON.stringify(data.diseaseType);
					data.symptoms = JSON.stringify(symptom);

				let callback = function(r){
					vm.$dialog.toast({
						mes: '发布成功',
	  					icon: 'success',
	  					timeout: 1000
					});
					vm.isSaving = false;
					vm.saveBtnText = '确认发布';
					setTimeout(function(){
						vm.$router.go(-1);
					},1500);
				}
				vm.utils.postData(url, data, callback);
    		}
    	}
	}
}
</script>

<style lang="less" scoped>
#LookEdit{
	#content{
		.mint-header{
			background: #FFFFFF;
			border-bottom:1px solid #CCCCCC; /*no*/
			color: #333333;
			z-index: 9999;
		}
	}
	.form{
		padding-top: 90px;
		.form1{
			font-size: 0px;
			border-bottom: 1px solid #E4E4E4;/*no*/
			margin-bottom: 20px;
			background: #FFFFFF;
			textarea{
				font-size: 28px;
				padding: 10px 20px 0;
				width: 100%;
				min-height: 300px;
				border: none;
				line-height: 40px;

			}
			textarea::placeholder{
				color:#999999;
			}
			p{
				font-size: 26px;
				color: #999999;
				text-align: right;
				padding: 10px 20px;
			}
			.pic{

				height: 130px;
				padding: 10px;
				.addBtn{
					position: relative;
					display: inline-block;
					width: 110px;
					height: 110px;
					margin-right:10px;
					&:last-child{
						margin: 0;
					}
					img{
						width: inherit;
						height: inherit;
					}
					.remove{
						cursor: pointer;
						position: absolute;
						width: 40px;
						height: 40px;
						right: 0;
						top:0;
					}
				}
				input[type=file]{
					position: absolute;
					left: 0;
					top:30%;
					z-index: 1;
					width: 100%;
					height: 100%;
					font-size: 28px;
					opacity: 0;
					cursor: pointer;
				}
			}
		}
		.form2{
			background: #ffffff;
			padding: 0 25px;
			border-top: 1px solid #E4E4E4;/*no*/
			border-bottom: 1px solid #E4E4E4;/*no*/
			font-size: 30px;
			color: #333333;
			margin-bottom: 20px;
			& li{
				display: flex;
				justify-content: space-between;
				padding: 30px 5px;
				border-bottom: 1px solid #e4e4e4; /*no*/
				&:last-child{
					border: none;
				}
				label{
					display: inline-block;
					width: 120px;
					text-align: left;
					color: #666666;
				}
				input{
					width: 500px;
					text-align: right;

				}
				input::placeholder{
					color:#cccccc;
				}
				.icon-right{
					display: inline-block;
					width: 15px;
					height: 26px;
					img{
						width: 15px;
						height: 26px;
					}
				}
			}

		}
		.radio-wrap{
			.yd-radio{
				display: inline-block;
				width: 130px;
				line-height: 38px;
				position: relative;
			}
			.yd-radio-icon{
				position: absolute;
				width: 25px;
				height: 25px;
				margin-right: 2px;
				/*background: url(../../assets/images/radioNotCheck.png);
				*/
			}
			& input[type=radio]{
				display: inline-block;
				/*margin-right: 15px;*/
				opacity: 0;
			}
			& input[type=radio]:checked+.yd-radio-icon{
				background: url(../../assets/images/radioChecked.png);
				background-size: cover;
			}
			.yd-radio-text{
				display: inline-block;
				margin-left: 45px;
				font-size: 30px;
				color: #666;
			}
		}
	}
	// .yd-accordion-item {
	// 	margin-bottom: 10px;
	// }
	.check-wrap {
		.check-type {
			background-color: #ffffff;
			display: flex;
			flex-direction: column;
			padding: 20px 20px 0px;
			border: 1px solid #e4e4e4; /*no*/
			border-left: 0px;
			border-right: 0px;
			font-size: 28px;
			margin-bottom: 10px;
			label {
				margin-bottom: 15px;
			}
			.radio-wrap{
				display: flex;
				flex-wrap: wrap;
				.yd-radio {
					min-width: 210px;
				}
				.yd-radio-text{
					font-size: 28px;
					color: #666;
				}
			}
		}
		.tip {
			padding: 20px;
			color: #999999;
		}
		.check-list {
			border-bottom: 1px solid #e4e4e4; /*no*/
			padding: 20px;
			.yd-checkbox {
				margin-bottom: 15px;
				color: #333333;
			}
		}
		.flex {
			display: flex;
			justify-content:space-between;
			input{
				text-align: right;
				font-size: 28px;
			}
			label {
				color: #666666;
				font-size: 28px;
				line-height: 36px;
				margin-right: 10px;
			}
			.choice {
				font-size: 26px;
				.icon-right{
					display: inline-block;
					width: 15px;
					height: 26px;
					img{
						width: 15px;
						height: 26px;
					}
				}
			}

			.checkbox-group{

			}
		}
	}
	.btn-wrap{
		margin: 50px 0;
	    .btn-save{
	    	display: block;
	    	margin: 0 auto;
	    	width: 80%;
	    }
	}
}

</style>
