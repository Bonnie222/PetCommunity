import axios from "axios";

export default{
	getData(api, cb){
		axios.get(api).then(cb).catch(err => {
			console.log(err);
		})
	},
	postData(api, post, cb){
		axios.post(api, post).then(cb).catch(err => {
			console.log(err);
		})
	}
}
