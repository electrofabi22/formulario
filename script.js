function enviarFormulario(event) {
  event.preventDefault();
  const formData = new FormData(document.getElementById("formInscripcion"));
  fetch("TU_URL_DEL_SCRIPT", {
    method: "POST",
    body: formData
  })
  .then(res => alert("Inscripción enviada correctamente"))
  .catch(err => alert("Error al enviar: " + err));
}
// En lugar de: const pais = document.getElementById('pais').value;
const select = document.getElementById('pais');
const paises = Array.from(select.selectedOptions).map(opt => opt.value).join(', ');
// Seleccionar los campos de entrada
const campos = document.querySelectorAll("#nombre, #apellido");

// Función para bloquear números al escribir
function bloquearNumeros(event) {
    const teclaPresionada = event.key;

    // Expresión regular para permitir solo letras, espacios y teclas de control como "Backspace"
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]$/.test(teclaPresionada) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(teclaPresionada)) {
        event.preventDefault(); // Evita que el número se ingrese
    }
}

// Función para eliminar números mientras el usuario escribe
function validarTexto(event) {
    event.target.value = event.target.value.replace(/\d/g, ''); // Elimina todos los números
}

// Aplicar la validación en tiempo real a ambos campos
campos.forEach(campo => {
    campo.addEventListener("input", validarTexto);
});

// Validar el campo de correo electrónico
const emailInput = document.getElementById("email");
emailInput.addEventListener("input", function() {
    const valor = this.value;
    // Expresión regular para validar el formato del correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(valor)) {
        this.setCustomValidity("Formato de correo electrónico no válido");
    } else {
        this.setCustomValidity("");
    }
});
function enviarFormulario(event) {
  event.preventDefault();
  
  const formData = {
    nombre: document.querySelector('input[name="nombre"]').value,
    apellido: document.querySelector('input[name="apellido"]').value,
    email: document.querySelector('input[name="email"]').value,
    DNI: document.querySelector('input[name="DNI"]').value,
    Cursos: Array.from(document.querySelectorAll('input[name="Cursos"]:checked')).map(input => input.value)
  };

  fetch("https://script.google.com/macros/s/TU_URL_DEL_SCRIPT_AQUÍ/exehttps://script.google.com/macros/s/AKfycbyLc7XQe7hTUk_EIBAKsSzw3vR3CArlZaqo0JuZgLydBMzZfUQJTO1nk5sLGufpj7Uh/execc", { 
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  })
  .then(() => alert("Inscripción exitosa"))
  .catch(() => alert("Hubo un error al enviar los datos"));
}
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("1mwkpkzl9NmiQT6zfO7cQtzmbhIg8U_r6LBrMr-kgnjs").getSheetByName("Hoja 1");
    
    // Verifica si hay datos en e.postData
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput("Error: No se recibieron datos correctamente.");
    }
    
    var datos = JSON.parse(e.postData.contents);

    sheet.appendRow([
      datos.nombre || "",
      datos.apellido || "",
      datos.email || "",
      datos.DNI || "",
      (datos.Cursos && datos.Cursos.length > 0) ? datos.Cursos.join(", ") : ""
    ]);

    return ContentService.createTextOutput("Datos guardados correctamente");

  } catch (error) {
    return ContentService.createTextOutput("Error en doPost: " + error.message);
  }
}

