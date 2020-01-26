let socket = io.connect('http://localhost:6677/', { forceNew: true });

socket.on('messages', (data) => render(data));

const render = data => {
    const messages = document.querySelector('#messages');
    messages.innerHTML = data.map((message, index) => `
        <div class="message">
            <strong>${ message.nickname }</strong> says:
            <p>${ message.text }</p>
        </div>
    `).join(' ');
    messages.scrollTop = messages.scrollHeight;
}

document.querySelector('#formSend').addEventListener('submit', event => {
    event.preventDefault();
    const nickname = document.querySelector('#nickname');
    const text = document.querySelector('#text');
    if (!nickname.value.trim() || !text.value.trim() === 0) return;
    socket.emit('addMessage', { nickname: nickname.value.trim(), text: text.value.trim() });
    nickname.style.display = 'none';
    text.value = '';
    text.focus();
});