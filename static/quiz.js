async function carregar() {
    const res = await fetch('/api/proxima_pergunta');
    const data = await res.json();
    if (data.finalizado) {
        document.getElementById('dialogue-box').innerHTML = `<h2>FIM! Acertos: ${data.pontos}/40</h2>`;
        return;
    }
    document.getElementById('categoria-tag').innerText = data.cat;
    document.getElementById('pergunta-texto').innerText = data.pergunta;
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    data.opcoes.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.innerText = o;
        btn.onclick = () => responder(o);
        grid.appendChild(btn);
    });
}

async function responder(r) {
    await fetch('/api/verificar_resposta', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({resposta: r})
    });
    carregar();
}
window.onload = carregar;