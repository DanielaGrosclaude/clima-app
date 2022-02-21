const container = document.querySelector ('.container');
const resultado = document.querySelector (' #resultado');
const formulario =document.querySelector ('#formulario');

window.addEventListener('load', ()=> {
    formulario.addEventListener('submit', buscarClima )
})


function buscarClima (e){
    e.preventDefault();
    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;


    if (ciudad === '' || pais === ''){

        mostrarError ("Ambos campos son obligatorios");

        return;
        }

        //consulta a la api

        consultarApi(ciudad, pais);
    }

    function mostrarError(mensaje){

    const alerta = document.querySelector('.bg-red-100');

    if(!alerta ){

    const alerta =document.createElement('div');
    
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-400', 'px-4', 'py-3', 'rounded',
    'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = `
    <strong class="font-bold"> ERROR! </strong>
    <span class ="block"> ${mensaje} </span>


    `;
    container.appendChild(alerta);

    //Elimina la alerta despues de 5 seg 

    setTimeout (()=>{
        alerta.remove();
    },5000);

}}


function consultarApi(ciudad, pais){


    const appId = '457a97c46f080325fe9c49780bfce255';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            console.log(datos);

            limpiarHTML();
            console.log(datos);

            if (datos.cod === "404"){
                mostrarError ("Ciudad no encontrada")      
                retur; 
            }

            //Impre la resp en el html
            mostrarClima(datos);
        })

    console.log(url);
}

const KelvinACentigrados = grados => parseInt (grados -273.150);


function mostrarClima(datos){
    const {name, main: {temp, temp_max, temp_min}} = datos;

    //para que muestre grados celcius
    const centigrados = KelvinACentigrados(temp);
    const max = KelvinACentigrados(temp_max);
    const min = KelvinACentigrados(temp_min);

    //para qe aparezca el nombre de la ciudad que quiero ver
    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name} `;
    nombreCiudad.classList.add('font-bold', 'text-2xl');


    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451 `;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML =  `Max: ${max} &#8451 `;
    tempMaxima.classList.add('text-xl'); 

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML =  `Min: ${min} &#8451 `;
    tempMinima.classList.add('text-xl'); 

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMinima);
    resultadoDiv.appendChild(tempMaxima);

    resultado.appendChild(resultadoDiv);
}





    
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


function Spinner (){

    limpiarHTML();
    const divSpinner =document.createElement ('div');
    divSpinner.classList.add ('spinner');

    divSpinner.innerHTML = `
        <div class="cube1"></div>
        <div class="cube2"></div>
    `;

    resultado.appendChild(divSpinner);
}