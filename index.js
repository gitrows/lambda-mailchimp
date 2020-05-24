require('dotenv').config();
const fetch=require('node-fetch');
const md5 = require('md5');
const response = require("@gitrows/lambda-response");
const api=`https://${process.env.DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}/members/`;
const headers={
	'Authorization':'Basic '+ Buffer.from(process.env.USERNAME + ":" + process.env.API_KEY).toString('base64'),
	'Content-Type': 'application/json'
};

exports.handler = async (event) => {
	console.log("request: " + JSON.stringify(event));
	let data={status:process.env.STATUS},status=200,result;
	if (event.queryStringParameters)
		Object.assign(data,event.queryStringParameters);
	else if (JSON.parse(event.body))
		Object.assign(data,JSON.parse(event.body));
	if (typeof data.email_address == 'undefined')
		result=response(400,{error:'No email found in request.'});
	else {
		result=await fetch(api,{
			method:'POST',
			headers:headers,
			body:JSON.stringify(data)
		})
		.then(r=>{
			if (!r.ok) {
				r=async()=>{
					await fetch(api+md5(data.email_address),{
						method:'PUT',
						headers:headers,
						body:JSON.stringify(data)
					})
					.then(r=>{
						status=r.status;
						return r.json;
					});
				};
			} else {
				status=r.status;
				return r.json();
			}
		})
		.then(d=>response(status,d));
	}
	//AWS API Gateway does only accept statusCode, headers, body and isBase64Encoded, otherwise throws 502 - Malformed Lambda proxy response
	delete result.statusDescription;
	return result;
};
