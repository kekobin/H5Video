var Taf = Taf || {};
Taf.Util = Taf.Util || {};

Taf.Util.jcestream = function(value)
{
	if (value == null || value == undefined)
	{
		console.log("Taf.Util.jcestream::value is null or undefined");
		return ;
	}
	if (!(value instanceof ArrayBuffer))
	{
		console.log("Taf.Util.jcestream::value is not ArrayBuffer");
		return ;
	}

	var view = new Uint8Array(value);
	var str = "";
	for (var i = 0; i < view.length; i++)
	{
		if (i != 0 && i%16 == 0)
		{
			str += "\n";
		}
		else if (i!= 0)
		{
			str += " ";
		}

		str += (view[i] > 15?"":"0") + view[i].toString(16);
	}
	console.log(str.toUpperCase());
};

Taf.Util.str2ab = function (value)
{
    var idx, len = value.length, arr = new Array(len);
    for (idx = 0; idx < len; ++idx) 
    {
        arr[ idx ] = value.charCodeAt(idx);
    }

    return new Uint8Array(arr).buffer;
}; 

Taf.Util.ajax = function (sURL, oData, oSuccFunc, oFailFunc) 
{
	var xmlobj = new XMLHttpRequest();
	xmlobj.overrideMimeType('text/plain; charset=x-user-defined'); 	//必须的&&一定要设置

	var handleStateChange = function () 
	{
		if (xmlobj.readyState === 4) 
		{
			if (xmlobj.status === 200 || xmlobj.status === 304) 
			{
				oSuccFunc(Taf.Util.str2ab(xmlobj.response));
			} 
			else 
			{
				oFailFunc(xmlobj.status);
			}

			xmlobj.removeEventListener('readystatechange', handleStateChange);
			xmlobj = undefined;
		}
	};

    xmlobj.addEventListener('readystatechange', handleStateChange);
    xmlobj.open("post", sURL);
	xmlobj.send(oData);
};
