document.getElementById('appreciationForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const message = document.getElementById('message').value;
  if (!message) return;

  const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
  });

  if (response.ok) {
      document.getElementById('message').value = '';
      loadMessages();
  }
});

async function loadMessages() {
  const response = await fetch('/api/messages');
  const data = await response.json();

  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';

  data.messages.forEach(msg => {
      const div = document.createElement('div');
      div.classList.add('message');
      div.textContent = msg.message_content;
      messagesDiv.appendChild(div);
  });

  document.getElementById('count').textContent = data.count;
}

loadMessages();
