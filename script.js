/* 
   ==========================================
   SCRIPT.JS - MINI GAME DO ENCONTRO
   (VERSÃO COMPLETA ATUALIZADA)
   ==========================================
*/

// ==================== VARIÁVEIS GLOBAIS ====================
var tentativasNao = 0;
var escolhaData = '';
var escolhaHorario = '';
var escolhaLugar = '';
var escolhaEmoji = '';

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
    criarParticles();
    
    var inputData = document.getElementById('input-data');
    if (inputData) {
        var hoje = new Date().toISOString().split('T')[0];
        inputData.min = hoje;
    }
});

// ==================== PARTICLES (CORAÇÕES FLUTUANDO) ====================
function criarParticles() {
    var container = document.getElementById('particles');
    var coracoes = ['❤️', '💕', '💗', '💖', '💘'];
    
    for (var i = 0; i < 15; i++) {
        setTimeout(function() {
            if (!container) return;
            
            var heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = coracoes[Math.floor(Math.random() * coracoes.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (10 + Math.random() * 5) + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(heart);
        }, i * 800);
    }
}

// ==================== TROCAR DE TELA ====================
function irParaTela(idTela) {
    document.querySelectorAll('.screen').forEach(function(screen) {
        screen.classList.remove('active');
    });
    
    var tela = document.getElementById(idTela);
    if (tela) {
        tela.classList.add('active');
    }
}

// ==================== TELA 1: ENVELOPE ====================
function abrirEnvelope() {
    var envelope = document.querySelector('.envelope');
    var msg = document.getElementById('tela1-mensagem');
    
    if (envelope) {
        envelope.classList.add('aberto');
    }
    
    setTimeout(function() {
        if (msg) {
            msg.classList.remove('hidden');
        }
    }, 600);
}

function irParaTela2() {
    irParaTela('tela-2');
}

// ==================== TELA 2: BOTÃO NÃO FUGIDEIRO ====================
function fugirBotao() {
    var btnNao = document.getElementById('btn-nao');
    var msgFuga = document.getElementById('msg-fuga');
    
    if (!btnNao) return;
    
    tentativasNao++;
    
    var x = Math.random() * 150 - 75;
    var y = Math.random() * 100 - 50;
    
    btnNao.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    
    if (tentativasNao === 1) {
        if (msgFuga) {
            msgFuga.innerText = 'Tem certeza?';
            msgFuga.classList.add('visible');
        }
    } else if (tentativasNao === 3) {
        if (msgFuga) msgFuga.innerText = 'Tá ficando doida é?';
    } else if (tentativasNao === 5) {
        if (msgFuga) msgFuga.innerText = 'Amorzinho, esse botão não é uma opção kk';
    } else if (tentativasNao === 7) {
        if (msgFuga) msgFuga.innerText = 'Tenta de novo';
    } else if (tentativasNao >= 10) {
        if (msgFuga) msgFuga.innerText = 'Ta me deixando brava hein';
    }
}

function cliqueiSim() {
    irParaTela('tela-3');
    criarConfetes();
}

// ==================== TELA 3: CONFETES ====================
function criarConfetes() {
    var container = document.getElementById('confetti-canvas');
    var confetes = ['❤️', '💕', '🤟', '🎉', '✨'];
    
    // Limpa confetes anteriores
    if (container) {
        container.innerHTML = '';
    }
    
    for (var i = 0; i < 50; i++) {
        setTimeout(function() {
            if (!container) return;
            
            var confete = document.createElement('div');
            confete.className = 'confetti';
            confete.innerHTML = confetes[Math.floor(Math.random() * confetes.length)];
            confete.style.position = 'absolute';
            confete.style.left = Math.random() * 100 + '%';
            confete.style.top = '-20px';
            confete.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
            confete.style.animationDuration = (2 + Math.random() * 2) + 's';
            confete.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(confete);
            
            // Remove após 4 segundos
            setTimeout(function() {
                if (confete && confete.parentNode) {
                    confete.parentNode.removeChild(confete);
                }
            }, 4000);
        }, i * 30);
    }
}

function irParaTela4() {
    irParaTela('tela-4');
}

// ==================== TELA 4: DATA ====================
function salvarData() {
    var input = document.getElementById('input-data');
    
    if (!input || !input.value) {
        alert('❤️ Paixão, escolhe uma data aí!');
        return;
    }
    
    escolhaData = input.value;
    irParaTela('tela-5');
}

// ==================== TELA 5: HORÁRIO ====================
function salvarHorario() {
    var input = document.getElementById('input-horario');
    
    if (!input || !input.value) {
        alert('❤️ Escolhe um horário!');
        return;
    }
    
    escolhaHorario = input.value;
    irParaTela('tela-6');
}

// ==================== TELA 6: ESCOLHER LUGAR ====================
function selecionarLugar(elemento, lugar, emoji) {
    escolhaLugar = lugar;
    escolhaEmoji = emoji;
    
    // Remove seleção anterior de todos os cards
    var todosCards = document.querySelectorAll('.food-card');
    todosCards.forEach(function(card) {
        card.classList.remove('selecionado');
    });
    
    // Seleciona o card clicado
    elemento.classList.add('selecionado');
    
    // Mensagens divertidas
    var mensagens = {
        'Fondue': '🍫 Já vou pegar o vinho pra acompanhar!',
        'Pizza': '🍕 Pizza sempre é uma boa. Topo!',
        'Botequim': '🍻 Amo demais, vc + comida de boteco + cervejinha trincando = date perfeito!',
        'Hambúrguer': '🍔 Clássico, minha barriga ta até roncando!',
        'Hangar 51': '✈️ Tô chorando aqui kkkk, queria que pudesse ser lá também!'
    };
    
    // Mostra mensagem de confirmação
    var msgDiv = document.getElementById('msg-lugar-escolhido');
    var texto = document.getElementById('texto-escolha');
    var btn = document.getElementById('btn-continuar-lugar');
    
    if (texto) {
        texto.innerText = mensagens[lugar];
    }
    
    if (msgDiv) {
        msgDiv.classList.remove('hidden');
    }
    
    if (btn) {
        btn.classList.remove('hidden');
    }
}

function irParaTela7() {
    // Preenche o resumo
    var dataObj = new Date(escolhaData);
    var dia = dataObj.getDate();
    var mes = dataObj.getMonth() + 1;
    var ano = dataObj.getFullYear();
    var dataFormatada = dia + '/' + mes + '/' + ano;
    
    var elData = document.getElementById('resumo-data');
    var elHora = document.getElementById('resumo-hora');
    var elLugar = document.getElementById('resumo-lugar');
    
    if (elData) elData.innerText = dataFormatada;
    if (elHora) elHora.innerText = escolhaHorario;
    if (elLugar) elLugar.innerText = escolhaEmoji + ' ' + escolhaLugar;
    
    irParaTela('tela-7');
}

// ==================== REVELAÇÃO FINAL ====================
function mostrarCartaFinal() {
    irParaTela('tela-final');
}

// ==================== FIM ====================