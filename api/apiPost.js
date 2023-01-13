const RegisterForm = document.querySelector("#register");

RegisterForm.addEventListener("submit", function (event) {
  // Stop the default submit and page load
  event.preventDefault();

  const usuario = document.querySelector("#usuario").value;
  const password = document.querySelector("#password").value;
  console.log(usuario, password);
  // Handle validations
  axios
    // .post("https://amado-melguizo.github.io/minesWeeperWarApi/", { usuario, password })

    .post("http://localhost:3000/usuarios", { usuario, password })
    .then((response) => {
      console.log(response);
      // Handle response
    });
});

// try {
//   axios.post("http://localhost:3000/usuarios", { usuario, password });
//   return response.data;
// } catch (error) {
//   console.log("Fallo al publicar usuarios");
//   console.error(error);
// }
// });
