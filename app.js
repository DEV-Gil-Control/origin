function register(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log( email , password);
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      verification()
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode , " -" + errorMessage)
    });
}

   
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//

var push_to_firebase = function(data){
        alert("Registro creado exitosamente, continúa para descargar el documento")
        var db = firebase.firestore();

        db.collection("users").add({
            email: data["email"],
            timestamp: Date.now()
        })
        .then(function(docRef) {
            console.log("Message sent, ID: ", docRef.id);
            location.reload();
        })
        .catch(function(error) {
            console.error("Message could not be sent: ", error);
        });
      }

      var contact_submit = function(){
           var email = document.getElementById("email");

        var data = {
            "email": email.value
        }
        push_to_firebase(data);
          

      }
      
  //  document.getElementById("submit_msg").addEventListener("click", contact_submit);


    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//

function login() {
  var email = document.getElementById("email_login").value;
  var password = document.getElementById("password_login").value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode , " -" + errorMessage)
  });email-password.html
}

function observer(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      show(user);
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
      console.log(`Usuario activo: ${email}, Estado: ${emailVerified}`)
    } else {
      console.log('Ningun Usuario Activo')
      content.innerHTML = `
<div style="padding-top: 30px;"> </div>
<div class="card" style="width: 30rem; margin: auto; width: 50%; padding: 10px;">
  <div class="card-body">
<form>
  <div class="form-group">
    <label for="email">Correo Electrónico</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Escriba su correo electrónico">
    <small id="emailHelp" class="form-text text-muted">Sus datos no serán compartidos con nadie.</small>
  </div>
  <div class="form-group">
    <label for="empresa">Empresa en la que labora actualmente</label>
    <input type="empresa" class="form-control" id="empresa" placeholder="Nombre de la empresa">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Acepto el Aviso de Privacidad</label>
  </div>
  <div style="padding-top: 10px;"> </div>
  <button type="submit" class="btn btn-success">Entrar</button>
</form>
  </div>
</div>
   
       `;       
      // User is signed out.
      // ...
    }
  });
}
observer();

function singOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log(' Saliendo... ')
  }).catch(function(error) {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
      // ...
    console.log(' Codigo de error (${errorCode}), Mensaje de error (${errorMessage})')
  });
}

function verification(){
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    // Email sent.
    console.log(`Enviando correo...`);
  }).catch(function(error) {
    // An error happened.
    console.log(`Error (${error})`);

  });
}

function show(user) {
  var user = user;
  var content = document.getElementById('content');

  if (user.emailVerified) {
    location.href = 'https://global.gotomeeting.com/join/589781757'
  }else{
location.href = 'https://global.gotomeeting.com/join/589781757'
  }
}
