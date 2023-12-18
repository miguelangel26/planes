document.addEventListener("DOMContentLoaded", function() {
    // Obtén referencias a los elementos HTML relevantes
    const usernameInput = document.querySelector('input[placeholder="Username"]');
    const passwordInput = document.querySelector('input[placeholder="Password"]');
    const loginButton = document.getElementById('loginButton');
  
    // Agrega un evento de clic al botón de login
    loginButton.addEventListener('click', function() {
      // Obtiene los valores ingresados por el usuario
      const enteredUsername = usernameInput.value.trim();
      const enteredPassword = passwordInput.value.trim();
  
      // Realiza la validación (puedes personalizar estas condiciones según tus requisitos)
      if (validateCredentials(enteredUsername, enteredPassword)) {
        // Si las credenciales son válidas, redirige a tarea.html
        window.location.href = 'tarea.html';
      } else {
        // Si las credenciales no son válidas, puedes mostrar un mensaje de error o realizar otras acciones
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    });
  
    // Función de validación de credenciales (puedes personalizar según tus necesidades)
    function validateCredentials(username, password) {
      // Verifica si el nombre de usuario es "janely" y la contraseña es "123456"
      return username === 'janely' && password === '0803';
      // Puedes ajustar esto según tus necesidades, por ejemplo, haciendo una solicitud al servidor para validar las credenciales.
    }
  });
  
  