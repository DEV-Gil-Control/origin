var push_to_firebase = function(data){
        alert("Registro exitoso")
        var db = firebase.firestore();
        

        db.collection("messages").add({
                nombre: data["nombre"],
           mailreg: data["mailreg"],
            empresa: data["empresa"],
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
         var nombre = document.getElementById("nombre");
         var mailreg = document.getElementById("mailreg");
         var empresa = document.getElementById("empresa");


        var data = {
           "nombre": nombre.value,
           "mailreg": mailreg.value,
           "empresa": empresa.value
        }
        push_to_firebase(data);   

      }
      



  //  document.getElementById("submit_msg").addEventListener("click", contact_submit);


    //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//



function observer(){
 
      content.innerHTML = `
<div style="padding-top: 30px;"> </div>
<div class="card" style="width: 30rem; margin: auto; width: 50%; padding: 10px;">
  <div class="card-body">


<div>
    <div>

        
      
     <div>
                 <h5>Escriba los siguientes datos para entrar al evento</h5>
                 </div>
                 

      <label for="nombre"></label>
      <input class="form-control" type="text" id="nombre" name="nombre" placeholder="Escriba Su Nombre Completo" style="width: 95.5%;">
     
      <label for="mailreg"></label>
      <input class="form-control" type="text" id="mailreg" name="mailreg" placeholder="Escriba Su Correo Electrónico" style="width: 95.5%;">
      
      <label for="empresa"></label>
      <input class="form-control" type="text" id="empresa" name="empresa" placeholder="Escriba la empresa en la que labora" style="width: 95.5%; margin-top:5px;">
      
    
    <div style="padding-top: 30px;"></div>
    <div>
          
          <button class="btn btn-primary btn-sm" onclick="contact_submit();">Ir al Evento</button>
        </div>



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

function eventos() {
 location.href = 'https://global.gotomeeting.com/join/589781757';
}
