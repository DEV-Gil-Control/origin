
//- - - - - - - get data- - - - - - - - - - - - - //
var get_user = function(email) {
   var db = firebase.firestore();
   db.collection("messages").where("email", "==", email) 
   .get() 
   .then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   console.log(doc.id, " => ", doc.data());
       var todosd = document.getElementById("todosd");
       todosd.innerHTML = `<div>Nombre del padre, madre o tutor: ${doc.data().nametutor} ${doc.data().apaternotutor} ${doc.data().amaternotutor}</div>
       <div>Nombre del menor: ${doc.data().namemenor} ${doc.data().apaternomenor} ${doc.data().amaternomenor}</div>
       <div>Edad de el/la menor de edad: ${doc.data().edadmenor}</div>
       <div>CURP: ${doc.data().curpmenor}</div>
       <div>Domicilio: ${doc.data().domiciliotutor}</div>
       <div>Colonia: ${doc.data().coloniatutor}</div>
       <div>Código Postal: ${doc.data().cptutor}</div>
       <div>Colonia: ${doc.data().coloniatutor}</div>
       <div>Municipio: ${doc.data().mpiotutor}</div>
       <div>Correo electrónico: ${doc.data().email}</div>
       <div>Teléfono de casa u oficina: ${doc.data().teltutor}</div>
       <div>Celular: ${doc.data().celtutor}</div>
       <div>Red Social para seguimiento: ${doc.data().redtutor}</div>
       `;
        })
    })
   .catch(function(error) {
          console.error(error);
        });
 }    

  


//- - - - - - - - -  push data - - - - - - - - - - - -//

var push_to_firebase = function(data){
        alert("Registro creado exitosamente, continúa para descargar el documento")
        var db = firebase.firestore();

        db.collection("messages").add({
            email: data["email"],
            namemenor: data["namemenor"],
           edadmenor: data["edadmenor"],
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
         var edadmenor = document.getElementById("edadmenor");
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
           "edadmenor": edadmenor.value,
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
      get_user(email)
        
    } else {
      console.log('Ningun Usuario Activo')
      content.innerHTML = `
      <div class="container mt-5">
        <div class="card">
          <h5 class="card-header">Saliendo....</h5>
          </div></div></div>`;       
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
location.href = 'index.html'      
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
          <h3 class="card-header">1. DATOS GENERALES</h3>
            <div id="bientutor" style="margin-left:22px; margin-top:20px; font-weight: bold;">
            </div>
          <div class="card-body">
            <div id="todosd" class="shadow-none p-3 mb-5 bg-light rounded">
            </div>

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
            <p class="card-text">Ingresa a tu cuenta de correo registrada y verifica tu cuenta por favor.</p> 
         
          
 <button class="btn btn-outline-dark" onclick="singOut()">Haz Click Aquí Si Deseas Cerrar Esta Sesión</button>
             </div>     
          </div>
        </div>
      </div>
    `;
  }
}
