document.addEventListener("DOMContentLoaded", async function () {
    // Query the active tab when the extension popup is opened
    let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    const match = tab.url.match(/targetId=([^&]+)/);
    const targetId = match ? match[1] : null;

    if (targetId) {
        document.getElementById("itemId").innerText = targetId;

        // Enable the button and attach event listener
        const button = document.getElementById("openTabButton");
        button.disabled = false;
        button.onclick = () => updateCurrentTab(tab.id, targetId);
    }
});

function updateCurrentTab(tabId, targetId) {
    const newUrl = `https://item.taobao.com/item.htm?id=${targetId}`;
    chrome.tabs.update(tabId, {url:newUrl});
}
