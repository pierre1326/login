$("#form").submit(function(e) {
  e.preventDefault();
});

const crearUsuario = () => {
  const user = $("#usuario").val()
  const pass = $("#password").val()
  const data = {user: user, password: pass}
  $.ajax({
    type: "POST",
    url: "/createUser",
    async: false,
    data: data,
    success: function(_) {
      window.location.replace('/');
    }
  });
}