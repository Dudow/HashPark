document.getElementById('formulario').addEventListener('submit', cadastraVeiculo)

function cadastraVeiculo(e) {

    var modeloCarro = document.getElementById('modeloCarro').value;
    var placaCarro = document.getElementById('placaCarro').value;
    var time = new Date();

    carro = {
        modelo: modeloCarro,
        placa: placaCarro,
        hora: time.getHours(),
        minutos: time.getMinutes()
    }

    if (!modeloCarro) {
        alert("Por favor, informe o modelo do carro");
        return false;
    } else if (!placaCarro) {
        alert("Por favor, informe a placa do carro");
        return false;
    }

    if (placaRepetida(placaCarro)) {
        return;
    }


    if (localStorage.getItem('patio') === null) {
        var carros = [];
        carros.push(carro);
        localStorage.setItem('patio', JSON.stringify(carros));
    } else {
        var carros = JSON.parse(localStorage.getItem('patio'));
        carros.push(carro);
        localStorage.setItem('patio', JSON.stringify(carros));
    }

    document.getElementById('formulario').addEventListener('submit', cadastraVeiculo).reset();

    mostrarPatio();

    e.preventDefault();
}

function mostrarPatio() {
    var carros = JSON.parse(localStorage.getItem('patio'));
    var carrosResultado = document.getElementById('resultados');

    carrosResultado.innerHTML = '';

    for (let i = 0; i < carros.length; i++) {
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;

        carrosResultado.innerHTML +=
            '<tr><td>' + modelo +
            '</td><td class="text-uppercase">' + placa +
            '</td><td>' + hora +
            ":" +
            minutos +
            '</td><td>' +
            '<button class="btn btn-danger" onclick="retirarVeiculo(\'' + placa + '\')">Retirar Veículo</button>' +
            '</td></tr>';
    }
}

function retirarVeiculo(placa) {
    var carros = JSON.parse(localStorage.getItem('patio'));

    for (let i = 0; i < carros.length; i++) {
        if (carros[i].placa == placa) {
            carros.splice(i, 1);
        }

        localStorage.setItem('patio', JSON.stringify(carros));
    }

    mostrarPatio();
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