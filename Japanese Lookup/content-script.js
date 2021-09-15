var parseJapanese = function(text)
{
	let c = 0;
	let japaneseStrings = new Array();
	let isJapanese = false;
	let currentString = "";
	let maxStrings = 5, stringLimit = 0;

	for(let i = 0; i < text.length; ++i)
	{
		c = parseInt(text.charCodeAt(i));
		if(isJapaneseUnicode(c))
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

var isJapaneseUnicode = function(code) {
		if((code >= 0x3000 && code <=0x30ff) || (code >= 0xff00 && code <= 0xffef) || 
			(code >= 0x4e00 && code <= 0x9faf) || (code >= 0x3400 && code <= 0x4db0))
		{
			return true;
		}
		else
		{
			return false;
		}
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
				if(japaneseStrings.length < 5)
				{
					stringLimit = japaneseStrings.length;
				}
				else
				{
					stringLimit = 5;
				}

				for(let i = 0; i < stringLimit; ++i)
				{
					chrome.runtime.sendMessage({from:"JLookup", string: japaneseStrings[i]});
				}
			}
		}	
	}

});