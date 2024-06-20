const html = document.querySelector('html');
const titulo = document.querySelector('.app__title');
const banner = document.querySelector('.app__image');
const displayTempo = document.querySelector('#timer');
const botoes = document.querySelectorAll('.app__card-button');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const focoBT = document.querySelector('.app__card-button--foco');
const curtoBT = document.querySelector('.app__card-button--curto');
const longoBT = document.querySelector('.app__card-button--longo');
const startPauseBT = document.querySelector('#start-pause');
const iniciarOuPausarBT = document.querySelector('#start-pause')

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500;
let intervaloID = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
});

focoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBT.classList.add('active')
});

curtoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBT.classList.add('active')
});

longoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBT.classList.add('active')
});

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}


startPauseBT.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloID) {
        audioPausa.play();
        zerar()
        return // early return -- circuit breaker
    }
    audioPlay.play();
    iniciarOuPausarBT.textContent = "Pausar"
    intervaloID = setInterval(contagemRegressiva, 1000)
}


function zerar() {
    clearInterval(intervaloID)
    iniciarOuPausarBT.textContent = "Começar"
    intervaloID = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br',{minute:'2-digit', second:'2-digit'})
    displayTempo.innerHTML = `${tempoFormatado}`
}

mostrarTempo()