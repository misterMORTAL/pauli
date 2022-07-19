const $btnSignIn = document.querySelector('.sign-in-btn'),
    $btnSignUp = document.querySelector('.sign-up-btn'),
    $signUp = document.querySelector('.sign-up'),
    $signIn = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active');
    }
});

function getDataRegister() {
    var self = this;
    var name = document.getElementById('name').value;
   var email1 = document.getElementById('email1').value;
    var pswd = document.getElementById('pswd').value;
    var pswd1 = document.getElementById('pswd1').value;
    console.log('ontencion de datos regitro');
    console.log(name) 
    console.log(email1);
    console.log(pswd);
    console.log(pswd1);
    self.export_name = name;
    self.export_pswd = pswd;
    alert("BIENVENIDO " + name + "\nTE HAS REGISTRADO CON EXITO");
    

    
}

function iniciarSesion() {
    var name_login, pswd_login;
    name_login = document.getElementById("name_login").value;
    pswd_login = document.getElementById('pswd_login').value;
   
    if (name_login == "Pauli" && pswd_login == "12345" || self.export_name == name_login && self.export_pswd == pswd_login || name_login == "1729391697" && pswd_login == "123" || name_login == "1722732698" && pswd_login == "123" || name_login == "1722385232" && pswd_login == "123" || name_login == "1729242980" && pswd_login == "123") {
        window.location = "páginaprincipal.html"
    } else if (name_login == '' && pswd_login == '') {
        alert('No se permite iniciar sesion con el nombre de usuario y la contrasena vacia');
    } else if (name_login == '' || pswd_login == '') {
        alert('No se permite iniciar sesion con el nombre de usuario o la contrasena vacia');
    } else {
        alert("Su usuario o contraseña son incorrectos");
    }

}