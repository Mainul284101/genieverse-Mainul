exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not configured" }),
    };
  }

  try {
    const { messages } = JSON.parse(event.body);

    const SYSTEM = `তুমি "জাদুর প্রদীপের দৈত্য" — একজন Socratic গাইড এবং অবচেতন মনের দোভাষী।
তোমার কাজ সরাসরি উত্তর দেওয়া নয়। ব্যবহারকারী যা বলে তার পেছনের আসল চাওয়া খুঁজে বের করা।
রহস্যময় এবং কাব্যিক বাংলায় কথা বলো। ২-৩ বাক্যের বেশি বলবে না এবং শেষে একটি শক্তিশালী প্রশ্ন করবে।`;

    const prompt =
      SYSTEM +
      "\n\nChat History:\n" +
      messages
        .map((m) => `${m.role === "user" ? "User" : "Genie"}: ${m.content}`)
        .join("\n");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: err.error?.message || "Gemini error" }),
      };
    }

    const data = await res.json();
    const reply = data.candidates[0].content.parts[0].text;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
