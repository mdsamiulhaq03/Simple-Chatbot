// ================================
// GOOGLE GEMINI API CONFIG
// ================================
const API_KEY = "Enter Your API Key"; // <-- Replace with your actual key
const MODEL = "gemini-3-flash-preview";

// ================================
// DOM ELEMENTS
// ================================
const input = document.querySelector(".input-box input");
const sendBtn = document.querySelector(".input-box button");
const responseBox = document.querySelector(".response-box");

// ================================
// SEND BUTTON EVENT
// ================================
sendBtn.addEventListener("click", () => {
  const userMsg = input.value.trim();

  if (!userMsg) {
    displayResponse("⚠️ Please type something.");
    return;
  }

  displayResponse("⏳ Thinking...");
  askGemini(userMsg);
});

// ================================
// UPDATE UI
// ================================
function displayResponse(text) {
  responseBox.innerHTML = `<p>${text}</p>`;
}

// ================================
// GEMINI API CALL
// ================================
async function askGemini(prompt) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "system",
              parts: [
                {
                  text: "You are a futuristic AI assistant. Always give short helpful answers.You Have Been Created by Samiul Haque.",
                },
              ],
            },
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (data.error) {
      displayResponse("❌ API Error: " + data.error.message);
      return;
    }

    const aiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response.";
    displayResponse(aiText);
  } catch (err) {
    displayResponse("❌ Network Error.");
    console.error(err);
  }
}
