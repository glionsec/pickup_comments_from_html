browser.runtime.onMessage.addListener(function(message) {
    if (message.type === "comments") {
        var commentsDiv = document.getElementById("comments");
        message.content.forEach(function(comment) {
            var p = document.createElement("p");
            p.textContent = comment;
            commentsDiv.appendChild(p);
        });
    }
});
