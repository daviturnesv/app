// arrays, objetos
let meta = {
    value: "ler um livro todo mês",
    checked: false,
    log: (info) => {
        console.log(info)
    }
}

// function // arrow function // named function

function alterarMeta(novaMeta) { 
    meta.value = novaMeta
    console.log("* Meta Alterada *")
    console.log("Nova meta: " + meta.value)
}

// Função Main
console.log("Meta Atual: "+ meta.value)
alterarMeta("Correr 5km todo dia")