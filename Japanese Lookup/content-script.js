var parseJapanese = function(text)
{
	let c = 0;
	let japaneseStrings = new Array();
	let isJapanese = false;
	let currentString = "";
	for(let i = 0; i < text.length; ++i)
	{
		c = parseInt(text.charCodeAt(i));
		if((c >= 0x3000 && c <=0x30ff) || (c >= 0xff00 && c <= 0xffef)
		 || (c >= 0x4e00 && c <= 0x9faf) ||(c >= 0x3400 && c <= 0x4db0))
		{
			currentString += text[i];
			isJapanese = true;
		}
		else
		{
			if(isJapanese)
			{
				japaneseStrings.push(currentString);
				currentString = "";
			}
			isJapanese = false;
		}
	}

	if(isJapanese)
	{
		japaneseStrings.push(currentString);
	}

	return japaneseStrings;
}

document.addEventListener('mousedown', function(event) {
	if(event.button == 2)
	{
		var selection = window.getSelection().toString().trim();
		chrome.runtime.sendMessage({from:"JLookup", string: "DEL"});
		if(selection.length > 0)
		{
			let japaneseStrings = parseJapanese(selection);
			if(japaneseStrings.length > 0)
			{
				for(let i = 0; i < japaneseStrings.length; ++i)
				{
					chrome.runtime.sendMessage({from:"JLookup", string: japaneseStrings[i]});
				}
			}
		}	
	}

});