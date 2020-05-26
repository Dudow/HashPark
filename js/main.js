document.getElementById('formulario').addEventListener('submit', cadastraVeiculo)
document.getElementById('confirmar').addEventListener('click', cadastraVeiculo)

function cadastraVeiculo(e) {

    var modeloCarro = document.getElementById('modeloCarro').value
    var placaCarro = document.getElementById('placaCarro').value
    var time = new Date()

    carro = {
        modelo: modeloCarro,
        placa: placaCarro,
        hora: time.getHours(),
        minuto: time.getMinutes()
    }

    if (placaRepetida(placaCarro)) {
        return;
    }


    if (localStorage.getItem('patio') === null) {
        var carros = []
        carros.push(carro)
        localStorage.setItem('patio', JSON.stringify(carros))
    } else {
        var carros = JSON.parse(localStorage.getItem('patio'))
        carros.push(carro)
        localStorage.setItem('patio', JSON.stringify(carros))
    }

    document.getElementById('formulario').addEventListener('submit', cadastraVeiculo).reset();

    mostrarPatio()

    e.preventDefault()

}

function mostrarPatio() {
    var patio = JSON.parse(localStorage.getItem('patio'))
    var carros = document.getElementById('resultados')
    var retirar = document.getElementById("confirmar")

    retirar.onclick = () => retirarVeiculo(placa);

    carros.innerHTML = ''

    for (let i = 0; i < patio.length; i++) {
        var modelo = patio[i].modelo;
        var placa = patio[i].placa;
        var hora = patio[i].hora;
        var minuto = patio[i].minuto;

        carros.innerHTML += '<tr><td>' + modelo +
            '</td><td class="text-uppercase">' + placa +
            '</td><td>' + hora + ':' + minuto +
            '</td><td>' + '<button data-toggle="modal" data-target="#modalDelete" class="btn btn-danger">Retirar</button>' +
            '</td></tr>'
    }
}



function retirarVeiculo(placa) {

    var patio = JSON.parse(localStorage.getItem('patio'))

    for (var i = 0; i < patio.length; i++) {
        if (patio[i].placa == placa) {
            patio.splice(i, 1)
        }

        localStorage.setItem('patio', JSON.stringify(patio))
    }

    mostrarPatio()
}

function placaRepetida(placaCarro) {
    var carrosrep = JSON.parse(localStorage.getItem('patio'));

    for (let i = 0; i < carrosrep.length; i++) {
        var placa = carrosrep[i].placa;

        if (placaCarro == placa) {
            alert("Placa repetida");
            return true;
        }
    }
}