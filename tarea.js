// Función para agregar una nueva tarea
function Tarea() {
    var agregarTarea = document.getElementById("agregarTarea");
    var agregarLista = document.getElementById("agregarLista");

    if (agregarTarea.value.trim() === "") {
        alert("Por favor, ingrese una tarea.");
        return;
    }

    // Crear un objeto que represente la tarea
    var nuevaTarea = {
        texto: agregarTarea.value,
        completada: false
    };

    // Almacenar la tarea en el almacenamiento local
    guardarTarea(nuevaTarea);

    // Crear un elemento de tarea en el DOM
    var crearTarea = document.createElement("div");
    crearTarea.className = "tarea";
    crearTarea.innerHTML = `
        <span>${nuevaTarea.texto}</span>
        <button onclick="CompletarTarea(this, ${nuevaTarea.completada})">Completar</button>
    `;

    // Marcar la tarea como completa si es necesario
    if (nuevaTarea.completada) {
        crearTarea.classList.add("tareaCompleta");
        crearTarea.querySelector('button').classList.add("botonCompletar");
    }

    agregarLista.appendChild(crearTarea);
    agregarTarea.value = "";

    // Verificar si todas las tareas están completas
    verificarTodasLasTareasCompletas();
}

// Función para completar una tarea
function CompletarTarea(button, completada) {
    var crearTarea = button.parentElement;
    crearTarea.classList.toggle("tareaCompleta");

    // Aplicar la clase "botonCompletar" al botón
    button.classList.toggle("botonCompletar");

    // Actualizar el estado de la tarea en el almacenamiento local
    var tareaTexto = crearTarea.querySelector('span').innerText;
    actualizarEstadoTarea(tareaTexto, !completada);

    // Verificar si todas las tareas están completas
    verificarTodasLasTareasCompletas();
}

// Función para almacenar una tarea en el almacenamiento local
function guardarTarea(tarea) {
    var tareas = obtenerTareas();
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para obtener todas las tareas desde el almacenamiento local
function obtenerTareas() {
    var tareas = localStorage.getItem('tareas');
    return tareas ? JSON.parse(tareas) : [];
}

// Función para actualizar el estado de una tarea en el almacenamiento local
function actualizarEstadoTarea(texto, completada) {
    var tareas = obtenerTareas();
    var tareaIndex = tareas.findIndex(t => t.texto === texto);
    if (tareaIndex !== -1) {
        tareas[tareaIndex].completada = completada;
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
}

// Función para verificar si todas las tareas están completas
function verificarTodasLasTareasCompletas() {
    var tareas = obtenerTareas();
    var todasCompletas = tareas.every(t => t.completada);
    
    // Habilitar o deshabilitar el botón según el estado de las tareas
    var iniciarOtroDiaBtn = document.getElementById("iniciarOtroDiaBtn");
    iniciarOtroDiaBtn.disabled = !todasCompletas;
}

// Función para cargar las tareas almacenadas en el almacenamiento local al cargar la página
window.onload = function() {
    var tareas = obtenerTareas();
    var agregarLista = document.getElementById("agregarLista");

    tareas.forEach(function(tarea) {
        var crearTarea = document.createElement("div");
        crearTarea.className = "tarea";

        crearTarea.innerHTML = `
            <span>${tarea.texto}</span>
            <button onclick="CompletarTarea(this, ${tarea.completada})">Completar</button>
        `;

        if (tarea.completada) {
            crearTarea.classList.add("tareaCompleta");
            crearTarea.querySelector('button').classList.add("botonCompletar");
        }

        agregarLista.appendChild(crearTarea);
    });

    // Verificar si todas las tareas están completas al cargar la página
    verificarTodasLasTareasCompletas();
};

function IniciarOtroDia() {
    var agregarLista = document.getElementById("agregarLista");
    agregarLista.innerHTML = ""; // Elimina todas las tareas existentes en el DOM

    // Limpiar el almacenamiento local
    localStorage.removeItem('tareas');

    // Deshabilitar el botón después de reiniciar
    var iniciarOtroDiaBtn = document.getElementById("iniciarOtroDiaBtn");
    iniciarOtroDiaBtn.disabled = true;
}








