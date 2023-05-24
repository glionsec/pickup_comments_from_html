browser.browserAction.onClicked.addListener(function(tab) {
    browser.tabs.executeScript({
        code: `
        var comments = [];
        var re = /<!--(.*?)-->/sg;
        var matches;
        while (matches = re.exec(document.documentElement.innerHTML)) {
            comments.push(matches[1]);
            console.log(matches[1]);
        }
        browser.runtime.sendMessage({type: "comments", content: comments});
        `
    });
});

browser.runtime.onMessage.addListener(function(message) {
    if (message.type === "comments") {
        browser.tabs.create({
            url: browser.runtime.getURL("display.html"),
            active: false
        }, function(tab) {
            var handler = function(tabId, changeInfo) {
                if(tabId === tab.id && changeInfo.status === "complete"){
                    browser.tabs.onUpdated.removeListener(handler);
                    browser.tabs.sendMessage(tab.id, message);
                }
            }
        browser.tabs.onUpdated.addListener(handler);
        });
    }
});
