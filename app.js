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

        db.collection("messages").add({
            email: data["email"],
            namemenor: data["namemenor"],
            apaternomenor: data["apaternomenor"],
            amaternomenor: data["amaternomenor"],
            curpmenor: data["curpmenor"],
              nametutor: data["nametutor"],
              apaternotutor: data["apaternotutor"],
              amaternotutor: data["amaternotutor"],
              domiciliotutor: data["domiciliotutor"],
              coloniatutor: data["coloniatutor"],
              cptutor: data["cptutor"],
              mpiotutor: data["mpiotutor"],
              teltutor: data["teltutor"],
              celtutor: data["celtutor"],
              redtutor: data["redtutor"],
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
        var namemenor = document.getElementById("namemenor");
        var apaternomenor = document.getElementById("apaternomenor");
        var amaternomenor = document.getElementById("amaternomenor");
        var curpmenor = document.getElementById("curpmenor");  
          var nametutor = document.getElementById("nametutor");
          var apaternotutor = document.getElementById("apaternotutor");
          var amaternotutor = document.getElementById("amaternotutor");
          var domiciliotutor = document.getElementById("domiciliotutor");
          var coloniatutor = document.getElementById("coloniatutor");
          var cptutor = document.getElementById("cptutor");
          var mpiotutor = document.getElementById("mpiotutor");
          var teltutor = document.getElementById("teltutor");
          var celtutor = document.getElementById("celtutor");
          var redtutor = document.getElementById("redtutor");

        var data = {
            "email": email.value,
          "namemenor": namemenor.value,
          "apaternomenor": apaternomenor.value,
          "amaternomenor": amaternomenor.value,
          "curpmenor": curpmenor.value,
            "nametutor": nametutor.value,
            "apaternotutor": apaternotutor.value,
            "amaternotutor": amaternotutor.value,
            "domiciliotutor": domiciliotutor.value,
            "coloniatutor": coloniatutor.value,
            "cptutor": cptutor.value,
            "mpiotutor": mpiotutor.value,
            "teltutor": teltutor.value,
            "celtutor": celtutor.value,
            "redtutor": redtutor.value
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
      <div class="container mt-5">
        <div class="card">
          <h5 class="card-header">Bienvenido al sistema de registro y descarga de documentación, por favor sigue las siguientes instrucciones:</h5>
          <div class="card-body">
            <p>1. Haz clic en el botón "Registrar" en la parte superior para proceder al registro del/la menor de edad a tu cargo.</p>
            <p>2. Una vez registrado, tendrás acceso a descargar la documentación legal, solo escribe tu correo, contraseña registrada y haz clic en "Ingresar", una vez descargado el documento en formato PDF, debes imprimirlo y firmarlo.</p>
            <p>3. Revisa y completa la documentación que se describe al final del documento descargado, y adjúntala a los documentos que entregarás a tu diputado.</p>
            <p>4. Para registrar otro menor, puedes hacerlo una vez confirmado tu correo electrónico.</p>
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
          <h5 class="card-header"><div>Bienvenido ${user.email}</h5> <button class="btn btn-outline-dark" onclick="singOut()">Cerrar</button></div>
          <div class="card-body">
            <p class="card-text">Ingresa a tu cuenta de correo registrada y verifica tu cuenta por favor.</p> 
          
          <div class="container mt-5"> 
           <div class="modal-header">
                  <h5 class="modal-title" id="modalRegisterUser">Para registrar a otro menor, ingresa los datos del nuevo niño/niña:</h5>
                  </div>
    <form style="padding-left:5px;">
      <label for="namemenor"></label>
      <input type="text" id="namemenor" name="namemenor" placeholder="Nombre completo" style="width: 95.5%; margin-top:10px;">
      
      <label for="apaternomenor"></label>
      <input type="text" id="apaternomenor" name="apaternomenor" placeholder="Apellido Paterno" style="width: 95.5%; margin-left: 5px; margin-top:5px;">
      
      <label for="amaternomenor"></label>
      <input type="text" id="amaternomenor" name="amaternomenor" placeholder="Apellido Materno" style="width: 95.5%; margin-left: 5px; margin-top:5px;">
      
      <label for="curpmenor"></label>
      <input type="text" id="curpmenor" name="curpmenor" placeholder="CURP" style="width: 95.5%; margin-left: 5px; margin-top:5px;">
      <p style="width: 95.5%; padding-left: 5px; margin-top:5px;"><a href="https://www.gob.mx/curp/">Si no conoces su curp puedes obtenerlo aquí</a></p>
      
                  </form>
                  
                   <div class="modal-footer">
          
          <button class="btn btn-primary btn-sm" onclick="contact_submit();">Guardar</button>
        </div>
        <embed src="https://chaledelafuente.com/docs/AMP-MENORES-DIPUTADOS-PAN.pd" width="800px" height="2100px" />
             </div>     
          </div>
        </div>
      </div>
    `;
  }
}
