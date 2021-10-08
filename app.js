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

   
       `;       
      // User is signed out.
      // ...
    }
  });
}
observer();



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
