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


firebase.initializeApp(firebaseConfig);

      var push_to_firebase = function(data){
        alert("Thanks for sending a message. I'll try and get back to you as soon as possible.")
        var db = firebase.firestore();

        db.collection("messages").add({
            name: data["name"],
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
        var name = document.getElementById("name");

        var data = {
          "name": name.value,
        }
        push_to_firebase(data);

      }

      document.getElementById("submit_msg").addEventListener("click", contact_submit);
    });
}


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
      <div class="container mt-5">
        <div class="card">
          <h5 class="card-header">Bienvenido al sistema de registro y descarga de documentación, por favor sigue las siguientes instrucciones:</h5>
          <div class="card-body">
            <p>1. Haz clic en el botón "Registrar" en la parte superior para proceder al registro del/la menor de edad a tu cargo.</p>
            <p>2. Una vez registrado, tendrás acceso a descargar la documentación legal, solo escribe tu correo, contraseña registrada y haz clic en "Ingresar", una vez descargado el documento en formato PDF, debes imprimirlo y firmarlo.</p>
            <p>3. Revisa y completa la documentación que se describe al final del documento descargado, y adjúntala a los documentos que entregarás a tu diputado.</p>
            <p>4. Repite el proceso por cada menor que desees registrar.</p>
       </div></div></div></div>`;       
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
    content.innerHTML = `
      <div class="container mt-5">
        <div class="card">
          <h5 class="card-header">Bienvenido ${user.email}</h5>
          <div class="card-body">
            <h5 class="card-title">Gracias por registrarte</h5>
            <p class="card-text"><a href="https://chaledelafuente.com/docs/AMP-MENORES-DIPUTADOS-PAN.pdf">Ya puedes descargar aqui el formato de amparo</a></p>
            <button class="btn btn-outline-dark" onclick="singOut()">Cerrar</button>
          </div>
        </div>
      </div>
    `;
  }else{
    content.innerHTML = `
      <div class="container mt-5">
        <div class="card">
          <h5 class="card-header">Bienvenido ${user.email}</h5>
          <div class="card-body">
            <p class="card-text">Ingresa a tu email y verifica tu cuenta por favor.</p> 
            <p class="card-text"><a href="https://chaledelafuente.com/docs/AMP-MENORES-DIPUTADOS-PAN.pdf">Recomendamos registrar tu correo, puedes descargar aqui el formato de amparo</p>    
            <button class="btn btn-outline-dark" onclick="singOut()">Cerrar</button>
          </div>
        </div>
      </div>
    `;
  }
}
