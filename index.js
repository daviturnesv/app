
const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "App de Metas";

let metas

async function carregarMetas() {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

async function salvarMetas() {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

async function cadastrarMeta(){
    const meta = await input( {message: "Digite a meta: "} )

    if (meta.length == 0){
        mensagem = "A meta não pode ser vazia!"
        return
    }

    metas.push({ value: meta, checked: false})

    mensagem = "Meta cadastrada com sucesso!"
}

async function listarMetas(){
    if(metas.length == 0){
        mensagem = "Não existem metas!"
        return
    }

    const respostas = await checkbox({
        message: "Use as Setas para mudar de meta, o Espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada!"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcada(s) como concluída(s)"
}

async function metasRealizadas(){
    if(metas.length == 0){
        mensagem = "Não existem metas!"
        return
    }
    
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = "Não existem metas realizadas"
        return
    }
    
    await select({
        message: "Metas Realizadas ( qnt:" + realizadas.length + " )",
        choices: [...realizadas]
    })
}

async function metasAbertas(){
    if(metas.length == 0){
        mensagem = "Não existem metas!"
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0){
        mensagem = "Não existem metas abertas"
        return
    }

    await select({
        message: "Metas Abertas ( qnt:" + abertas.length + " )",
        choices: [...abertas]
    })
}

async function deletarMeta(){
    if(metas.length == 0){
        mensagem = "Não existem metas!"
        return
    }

    const metasDesmarcadas = metas.map((meta)=> {
        return { value: meta.value, checked: false }
    })
    const metas_a_deletar = await checkbox({
        message: "Selecione Item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(metas_a_deletar.length == 0){
        mensagem = "Nenhuma meta para deletar!"
        return
    }
    
    metas_a_deletar.forEach((item) => {
        metas.filter((meta)=>{
            return meta.value != item
        })
    })
    
    mensagem = "Meta(s) deletadas com sucesso"
}

function mostrarMensagem(){
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

async function start(){
    await carregarMetas()

    while(true){
        mostrarMensagem()
        await salvarMetas()

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })
        
        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
                case "deletar":
                await deletarMeta()
                break
            case "sair":
                mensagem = "Até a próxima!"
                return
        }
    }
}

start()