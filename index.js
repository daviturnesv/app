
//organização de um meta
let meta = {
    value: "ler um livro todo mês",
    checked: true,
}

// organização de varias metas
let metas = [
    meta,
    {
        value: "caminhar 30 min todo dia",
        checked: false,
    },
    {
        value: "limpar a casa",
        checked: true,
    }
] 

console.log(metas[2].value)
