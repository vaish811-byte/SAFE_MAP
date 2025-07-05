let latitude = "";
let longitude = "";
let recognition;
let isRecognizing = false;

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("panicBtn").addEventListener("click", panicAction);
  document.getElementById("voiceBtn").addEventListener("click", startVoiceRecognition);
  document.getElementById("voiceDisableBtn").addEventListener("click", stopVoiceRecognition);
  document.getElementById("WhatsApp").addEventListener("click", sendWhatsApp);
});

// 🚨 PANIC BUTTON FUNCTION
async function panicAction() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError, {
      enableHighAccuracy: true
    });
  } else {
    alert("Geolocation not supported by this browser.");
  }
}

async function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  const apiKey = '3ee8118867264b0798d25e8201aefb34'; // Replace with your actual key
  const geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(geocodeURL);
    const data = await response.json();
    const address = data.results[0]?.formatted || "Address not found";

    document.getElementById("locationInfo").innerHTML =
      `📍 <strong>Your Current Location:</strong><br>${address}`;

    document.getElementById("mapFrame").src =
      `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`;

    // Optional siren
    const siren = document.getElementById("siren");
    if (siren) siren.play();

  } catch (error) {
    console.error("Location error:", error);
    alert("Could not fetch location. Try again.");
  }
}

// 📱 WHATSAPP SHARING BUTTON FUNCTION
function sendWhatsApp() {
  if (!latitude || !longitude) {
    alert("📍 Location not ready. Please click the Panic button first.");
    return;
  }

  const contactDropdown = document.getElementById("contactSelect");
  const phone = contactDropdown.value;

  const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;
  const message = encodeURIComponent(`🚨 I need urgent help!\nPlease check my location:\n${mapLink}`);

  const whatsappURL = `https://wa.me/${phone}?text=${message}`;
  window.open(whatsappURL, "_blank");
}


// 🎙️ VOICE ACTIVATION
function startVoiceRecognition() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Web Speech API is not supported in this browser.");
    return;
  }

  recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = true;

  recognition.onresult = function (event) {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
    if (transcript.includes("help") || transcript.includes("assist me")) {
      panicAction();
    }
  };

  recognition.onstart = function () {
    isRecognizing = true;
    document.getElementById("voiceStatus").innerHTML = "🎤 Voice command is <strong>ON</strong>";
    document.getElementById("voiceBtn").style.display = "none";
    document.getElementById("voiceDisableBtn").style.display = "inline-block";
  };

  recognition.onend = function () {
    if (isRecognizing) recognition.start();
  };

  recognition.start();
}

function stopVoiceRecognition() {
  if (recognition && isRecognizing) {
    recognition.stop();
    isRecognizing = false;
    document.getElementById("voiceStatus").innerHTML = "🎤 Voice command is <strong>OFF</strong>";
    document.getElementById("voiceBtn").style.display = "inline-block";
    document.getElementById("voiceDisableBtn").style.display = "none";
  }
}

// ❗ ERROR HANDLER
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Location access denied.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location unavailable.");
      break;
    case error.TIMEOUT:
      alert("Location request timed out.");
      break;
    default:
      alert("Unknown error occurred.");
  }
}
document.getElementById("chat").addEventListener("click", openChatSupport);
function openChatSupport() {
  window.location.href = "/chat-support/";
}

document.getElementById("safety").addEventListener("click", openSafetyTips);
function openSafetyTips() {
  alert("⚠️ Safety Tips:\n1. Stay alert\n2. Share location\n3. Avoid isolated areas");
}
document.getElementById("emergency").addEventListener("click", sendSMS);

function sendSMS() {
  const phoneNumber = "112";
  const message = encodeURIComponent("🚨 Emergency! I need help. Here is my location.");
  window.location.href = `sms:${phoneNumber}?body=${message}`;
}


