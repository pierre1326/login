$("#form").submit(function(e) {
  e.preventDefault();
});

const iniciarSesion = () => {
  const user = $("#usuario").val()
  const pass = $("#password").val()
  const data = {user: user, password: pass}
  $.ajax({
    type: "POST",
    url: "/login",
    async: false,
    data: data,
    success: function(response) {
      if(response.status === 'Success') {
        $("#estado").text("Sesion iniciada!");
      } 
      else {
        $("#estado").text("El usuario no existe");
      }
    }
  });
}