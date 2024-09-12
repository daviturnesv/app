
function start(){
    let count = 1
    console.log("Entrou, iniciando contagem (1-10)...")

    const intervaloValido = setInterval(() => {
        if (count < 10){
            console.log(count + "s");
            count++;
        } else {
            console.log(count + "s - *Contagem Concluída*");
            clearInterval(intervaloValido);
        }
    }, 1000);
}

start()