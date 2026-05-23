<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>জাদুর প্রদীপের দৈত্য</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Noto Serif Bengali', serif;
      background: #0e0d0b;
      color: #f5f0e8;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse 60% 40% at 50% 80%, rgba(250,199,117,0.07) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }
    #app {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 460px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 1.5rem 1.25rem;
    }
    #landing {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      gap: 1.6rem;
      text-align: center;
      animation: fadeUp 0.8s ease both;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .lamp-wrap { position: relative; display: inline-block; }
    .lamp-icon {
      font-size: 64px;
      line-height: 1;
      filter: drop-shadow(0 0 18px rgba(250,199,117,0.55));
      animation: lampPulse 3s ease-in-out infinite;
    }
    @keyframes lampPulse {
      0%, 100% { filter: drop-shadow(0 0 18px rgba(250,199,117,0.55)); }
      50%       { filter: drop-shadow(0 0 32px rgba(250,199,117,0.9)); }
    }
    .sparkles { position: absolute; inset: -20px; pointer-events: none; }
    .sp {
      position: absolute;
      width: 4px; height: 4px;
      border-radius: 50%;
      background: #FAC775;
      animation: floatUp var(--d, 4s) var(--delay, 0s) ease-in-out infinite;
      opacity: 0;
      left: var(--x, 50%);
      top: var(--y, 80%);
    }
    @keyframes floatUp {
      0%   { opacity: 0; transform: translateY(0) scale(0.5); }
      30%  { opacity: 0.8; }
      100% { opacity: 0; transform: translateY(-60px) scale(1.2); }
    }
    .title { font-size: 24px; font-weight: 600; color: #FAC775; }
    .subtitle { font-size: 14.5px; color: #888; line-height: 1.75; max-width: 320px; }
    #start-btn {
      padding: 13px 32px;
      background: transparent;
      color: #FAC775;
      border: 1px solid #FAC775;
      border-radius: 8px;
      font-size: 16px;
      font-family: inherit;
      cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s;
    }
    #start-btn:hover {
      background: rgba(250,199,117,0.1);
      box-shadow: 0 0 18px rgba(250,199,117,0.25);
    }
    #start-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    /* CHAT */
    #chat-area {
      display: none;
      flex-direction: column;
      flex: 1;
      animation: fadeUp 0.5s ease both;
    }
    .chat-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 14px;
      border-bottom: 1px solid #1e1e1c;
      margin-bottom: 4px;
    }
    .chat-header-icon { font-size: 22px; }
    .chat-header-title { font-size: 16px; font-weight: 600; color: #FAC775; }
    #msgs {
      flex: 1;
      overflow-y: auto;
      padding: 8px 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-height: calc(100vh - 160px);
      scrollbar-width: thin;
      scrollbar-color: #2a2a28 transparent;
    }
    .msg-wrap { display: flex; gap: 10px; padding: 6px 0; align-items: flex-start; }
    .msg-wrap.user { flex-direction: row-reverse; }
    .avatar {
      width: 30px; height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .avatar.genie { background: #1e1e1c; font-size: 16px; filter: drop-shadow(0 0 6px rgba(250,199,117,0.4)); }
    .avatar.user { background: #1e1e1c; border: 1px solid #2e2e2c; color: #666; font-size: 11px; }
    .bubble {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 14.5px;
      line-height: 1.7;
    }
    .bubble.genie {
      background: #1a1a18;
      color: #FAC775;
      border: 1px solid #2a2a28;
      border-radius: 4px 14px 14px 14px;
    }
    .bubble.user {
      background: #1e1e1c;
      color: #d0cbbf;
      border: 1px solid #2a2a28;
      border-radius: 14px 4px 14px 14px;
    }
    .typing { display: flex; gap: 5px; align-items: center; padding: 12px 14px; }
    .dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #FAC775;
      animation: blink 1.3s infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes blink {
      0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1.1); }
    }
    #input-row {
      display: flex;
      gap: 8px;
      padding-top: 12px;
      border-top: 1px solid #1e1e1c;
      margin-top: 8px;
    }
    #user-input {
      flex: 1;
      padding: 11px 14px;
      border-radius: 8px;
      border: 1px solid #2e2e2c;
      background: #1a1a18;
      color: #f0ebe0;
      font-size: 14.5px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }
    #user-input:focus { border-color: #FAC775; }
    #user-input::placeholder { color: #444; }
    #send-btn {
      padding: 11px 18px;
      border-radius: 8px;
      border: 1px solid #2e2e2c;
      background: #1a1a18;
      color: #FAC775;
      font-size: 14px;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.2s, border-color 0.2s;
    }
    #send-btn:hover:not(:disabled) { background: rgba(250,199,117,0.08); border-color: #FAC775; }
    #send-btn:disabled { opacity: 0.35; cursor: not-allowed; }
  </style>
</head>
<body>
<div id="app">

  <div id="landing">
    <div class="lamp-wrap">
      <div class="lamp-icon">🪔</div>
      <div class="sparkles">
        <div class="sp" style="--x:20%;--y:70%;--d:3.5s;--delay:0s"></div>
        <div class="sp" style="--x:75%;--y:65%;--d:4.2s;--delay:0.8s"></div>
        <div class="sp" style="--x:50%;--y:75%;--d:3s;--delay:1.5s"></div>
        <div class="sp" style="--x:35%;--y:60%;--d:5s;--delay:0.3s"></div>
        <div class="sp" style="--x:65%;--y:72%;--d:3.8s;--delay:2s"></div>
      </div>
    </div>
    <div class="title">জাদুর প্রদীপের দৈত্য</div>
    <div class="subtitle">তোমার অন্তরের প্রশ্নের উত্তর খুঁজে পেতে,<br>দৈত্যকে জাগাও।</div>
    <button id="start-btn" onclick="startJourney()">প্রদীপ জ্বালাও ✨</button>
  </div>

  <div id="chat-area">
    <div class="chat-header">
      <span class="chat-header-icon">🪔</span>
      <span class="chat-header-title">জাদুর প্রদীপের দৈত্য</span>
    </div>
    <div id="msgs"></div>
    <div id="input-row">
      <input id="user-input" type="text" placeholder="তোমার কথা বলো..."
        onkeydown="if(event.key==='Enter' && !event.shiftKey) sendMsg()" />
      <button id="send-btn" onclick="sendMsg()">পাঠাও</button>
    </div>
  </div>

</div>
<script>
  let history = [];

  async function callGenie(msgs) {
    const res = await fetch('/.netlify/functions/genie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: msgs })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'সার্ভার সমস্যা');
    }
    const data = await res.json();
    return data.reply;
  }

  function addMsg(role, text) {
    const msgs = document.getElementById('msgs');
    const wrap = document.createElement('div');
    wrap.className = 'msg-wrap ' + role;
    const av = document.createElement('div');
    av.className = 'avatar ' + (role === 'assistant' ? 'genie' : 'user');
    av.textContent = role === 'assistant' ? '🪔' : 'তু';
    const bubble = document.createElement('div');
    bubble.className = 'bubble ' + (role === 'assistant' ? 'genie' : 'user');
    bubble.textContent = text;
    wrap.appendChild(av);
    wrap.appendChild(bubble);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const msgs = document.getElementById('msgs');
    const wrap = document.createElement('div');
    wrap.className = 'msg-wrap assistant';
    wrap.id = 'typing-indicator';
    const av = document.createElement('div');
    av.className = 'avatar genie';
    av.textContent = '🪔';
    const typing = document.createElement('div');
    typing.className = 'bubble genie typing';
    typing.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    wrap.appendChild(av);
    wrap.appendChild(typing);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typing-indicator');
    if (t) t.remove();
  }

  async function startJourney() {
    const btn = document.getElementById('start-btn');
    btn.disabled = true;
    btn.textContent = 'জাগাচ্ছি...';

    document.getElementById('landing').style.display = 'none';
    const chat = document.getElementById('chat-area');
    chat.style.display = 'flex';

    showTyping();
    try {
      const firstMsg = [{ role: 'user', content: 'আমি প্রস্তুত। আমার যাত্রা শুরু করো।' }];
      const reply = await callGenie(firstMsg);
      removeTyping();
      history = [{ role: 'assistant', content: reply }];
      addMsg('assistant', reply);
    } catch (e) {
      removeTyping();
      addMsg('assistant', 'প্রদীপের আলো জ্বলছে না... ' + e.message);
    }
    document.getElementById('user-input')?.focus();
  }

  async function sendMsg() {
    const inp = document.getElementById('user-input');
    const btn = document.getElementById('send-btn');
    const text = inp.value.trim();
    if (!text) return;

    inp.value = '';
    inp.disabled = true;
    btn.disabled = true;

    history.push({ role: 'user', content: text });
    addMsg('user', text);
    showTyping();

    try {
      const reply = await callGenie(history);
      removeTyping();
      history.push({ role: 'assistant', content: reply });
      addMsg('assistant', reply);
    } catch {
      removeTyping();
      addMsg('assistant', 'মুহূর্তের জন্য থামো... আবার বলো।');
    }

    inp.disabled = false;
    btn.disabled = false;
    inp.focus();
  }
</script>
</body>
</html>
