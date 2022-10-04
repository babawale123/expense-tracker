import axios from 'axios'
import qs from 'qs'

class Gmail {
	getAccessToken = async () =>{
		var data = qs.stringify({
			  'client_id': '1018848419549-o0vaaacvag512ojr74fako1hf90e33ip.apps.googleusercontent.com',
			  'client_secret': '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',
			  'refresh_token': '1//03C-0r_1awsaMCgYIARAAGAMSNwF-L9IrRXFDN6rT4CG7iEMpOz49ge3ACKeU-dTCQBb4LNo3ALqAxRAvxzt82Rey7tAgtiFZNBc',
			  'grant_type': 'refresh_token' 
			});
			var config = {
			  method: 'post',
			  url: 'https://accounts.google.com/o/oauth2/token',
			  headers: { 
			    'Content-Type': 'application/x-www-form-urlencoded', 
			  },
			  data : data
			};

			var accessToken = "";

			await axios(config)
			.then(async function (response) {
			  accessToken = await response.data.access_token;

			  console.log("Access Token " + accessToken)
			})
			.catch(function (error) {
			  console.log(error);
			});

			return accessToken;
	};

	getMessages = async () =>{
		var config = {
		  method: 'get',
		  url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages/',
		  headers: { 
		    'Authorization': `Bearer ${await this.getAccessToken()}`
		  },
		};

		await axios(config)
		.then(function (response) {
		  console.log("All messages", JSON.stringify(response.data));
		})
		.catch(function (error) {
		  console.log(error);
		});
			};

	readContent = async (messageId) => {

		var config = {
		  method: 'get',
		  url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
		  headers: { 
	   		 'Authorization': `Bearer ${await this.getAccessToken()}`
	 	 },
		};

		var data = {};

		await axios(config)
		.then(async function (response) {
		  //console.log(JSON.stringify(response.data));
		  data = await response.data;
		})
		.catch(function (error) {
		  console.log(error);
		});
		return data;
	};
};



export default Gmail;