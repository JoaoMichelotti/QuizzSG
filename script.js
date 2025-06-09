const perguntas = [
    {
        pergunta: "Qual dessas é uma linguagem de programação?",
        alternativas: ["JavaScript", "Nargor", "Browser", "Computer Hacking"],
        alternativa_correta: 0
    },
    {
        pergunta: "Qual dessas é uma linguagem de marcação usada para criar sites?",
        alternativas: ["C++", "HTML", "Excel", "Python"],
        alternativa_correta: 1
    },
    {
        pergunta: "Qual dispositivo é usado para armazenar dados de forma permanente?",
        alternativas: ["Memória RAM", "Processador", "Disco rígido (HD)", "Monitor"],
        alternativa_correta: 2
    },
    {
        pergunta: "Qual dessas linguagens é muito usada no desenvolvimento de aplicativos para iOS?",
        alternativas: ["Java", "Swift", "C#", "Kotlin"],
        alternativa_correta: 1
    },
    {
        pergunta: "O que é um sistema operacional?",
        alternativas: ["Um software que gerencia o hardware e os programas", "Um tipo de rede", "Uma linguagem de programação", "Um antivírus"],
        alternativa_correta: 0
    },
    {
        pergunta: "Qual desses é um exemplo de navegador de internet?",
        alternativas: ["Photoshop", "Google Chrome", "WhatsApp", "Linux"],
        alternativa_correta: 1
    },
    {
        pergunta: "O que significa a sigla CPU?",
        alternativas: ["Central Processing Unit", "Computer Personal Utility", "Control Panel User", "Centralized Program Usage"],
        alternativa_correta: 0
    },
    {
        pergunta: "Qual desses itens NÃO é um periférico de entrada?",
        alternativas: ["Teclado", "Mouse", "Impressora", "Microfone"],
        alternativa_correta: 2
    }
]

let cont = 0 
let acertos = 0
let playerAleatorio = ""
let jogador = ""

document.getElementById("jogar").addEventListener("click", () => {
   
    if (document.getElementById("nome").value == "")
         playerAleatorio = "Player" + Math.floor(Math.random() * 10000)
    else 
        jogador = document.getElementById("nome").value

    // esconde o menu principal
    document.getElementById("menuPrincipal").classList.add("hide")

    // mostra menu de perguntas
    document.getElementById("menuQuestoes").classList.remove("hide")

    document.getElementById("nome").value = ""

    startQuizz()
})

document.getElementById("btnRanking").addEventListener("click", () => {

    document.getElementById("ranking").classList.remove("hide")

    // esconde o menu principal
    document.getElementById("menuPrincipal").classList.add("hide")

    const container =  document.getElementById("corpoTabela")   

    container.innerHTML = ""

    let htmlFinal = "" 

    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.forEach((item, index) => {

        htmlFinal = `<td>
            ${index + 1}   
        </td>
        <td>
            ${item.nome}
        </td>
        <td>
            ${item.pontos}
        </td>
        `

        container.innerHTML += htmlFinal
    })

})

function startQuizz() {


    document.getElementById("pergunta").innerHTML = `
        <h2> ${perguntas[cont].pergunta} </h2>
    `

    let htmlFinal = ""

    for (let i = 0; i < 4; i++) {
        htmlFinal += `
            <button onclick="(checarResposta(${i}))" id="${i}" class="botoesResposta">${perguntas[cont].alternativas[i]}</button>
        ` 

    }

    document.getElementById("respostas").innerHTML = htmlFinal

    
}

function checarResposta(alternativa) {
    
    let errou = false

    if (perguntas[cont].alternativa_correta == alternativa) {
        document.getElementById(alternativa).classList.add("bg_Green")
        acertos++
    }
    else {
        document.getElementById(alternativa).classList.add("bg_Red")
        document.getElementById(perguntas[cont].alternativa_correta).classList.add("bg_Green")
        errou = true
    }

    const botoes = document.getElementsByClassName("botoesResposta")

    for (let i = 0; i < botoes.length; i++) {

        if (i != alternativa){
            if (errou == false)
                botoes[i].classList.add("hoverless")
            else if (i != perguntas[cont].alternativa_correta)
                botoes[i].classList.add("hoverless")
        }
        
        botoes[i].disabled = true
    }

    errou = false
    cont++

    if (perguntas.length > cont) {
        setTimeout(startQuizz, 2000)
    }
    else {
        setTimeout(Finalizacao, 2000)
    }
}


function Finalizacao() {

    document.getElementById("menuQuestoes").classList.add("hide")

    document.getElementById("Final").classList.remove("hide")

    document.getElementById("qtdAcertos").innerText = acertos + " de 8"

    adicionarAoRanking(playerAleatorio != "" ? playerAleatorio : jogador, acertos)

    setTimeout(Reset, 4000)

}

function Reset () {

    document.getElementById("menuPrincipal").classList.remove("hide")

    document.getElementById("Final").classList.add("hide")

    cont = 0
    acertos = 0
    playerAleatorio = ""
    jogador = ""
}

function adicionarAoRanking(nome, pontos) {
  // Pega o ranking atual do localStorage
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  // Adiciona o novo jogador
  ranking.push({ nome, pontos });

  // Ordena do maior para o menor
  ranking.sort((a, b) => b.pontos - a.pontos);

  // Salva de volta no localStorage
  localStorage.setItem("ranking", JSON.stringify(ranking));

  console.log(ranking)
}

document.getElementById("voltar").addEventListener("click", () => {

    document.getElementById("ranking").classList.add("hide")

    // esconde o menu principal
    document.getElementById("menuPrincipal").classList.remove("hide")

})