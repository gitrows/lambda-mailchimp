const description=require('./lib/descriptions.js');

module.exports = (code,payload,headers={},base64=false)=>{
	let response={
		"statusCode": code,
		"statusDescription": description[code],
		"isBase64Encoded": base64,
		"headers":headers
	};
	response.headers['Access-Control-Allow-Origin'] = '*';
	if (typeof payload=='undefined')
		payload={
			"message": description[code],
			"documentation_url":'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'+code
		}
	if (typeof payload=='object')
		payload=JSON.stringify(payload);

	response.headers['Content-Type']="application/json"
	response.body=payload;
	return response;
}
