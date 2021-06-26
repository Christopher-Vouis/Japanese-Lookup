chrome.runtime.onMessage.addListener(function(message, sender, reply) {
	if(message.from == "JLookup")
	{
		if(message.string == "DEL")
		{
			chrome.contextMenus.removeAll();
			chrome.contextMenus.onClicked.removeListener(listener);
		}
		else
		{
			chrome.contextMenus.create({
			title: `Search ${message.string} on Jisho`,
			contexts : ["selection"],
			id: message.string
			});			

			chrome.contextMenus.onClicked.addListener(listener);

		}
	}
});

var listener = function(info)
{
	openSearch(info.menuItemId)
}

var openSearch = function(toSearch)
{
	chrome.tabs.create({
		url: `https://jisho.org/search/${toSearch}`
	});
}