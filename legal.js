//- - - - - - - get data- - - - - - - - - - - - - //
var get_user = function(email) {
   var db = firebase.firestore();
   db.collection("messages").where("email", "==", email) 
   .get() 
   .then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   console.log(doc.id, " => ", doc.data());
       var menor = document.getElementById("menor");
       menor.innerHTML = `<div>Menor registrado: ${doc.data().namemenor} ${doc.data().apaternomenor} ${doc.data().amaternomenor}</div>
       <div>CURP: ${doc.data().curpmenor}</div>`;
       var tutor = document.getElementById("tutor");
       tutor.innerHTML = `<div>${doc.data().nametutor} ${doc.data().apaternotutor} ${doc.data().amaternotutor}</div>
       <div>Correo Electrónico: ${doc.data().email}</div>
       <div>Teléfono Celular: ${doc.data().celtutor}</div>`;
       var bientutor = document.getElementById("bientutor");
       bientutor.innerHTML = `<div>Tutor registrado: ${doc.data().nametutor} ${doc.data().apaternotutor} ${doc.data().amaternotutor}</div>
       <div>Correo Electrónico: ${doc.data().email}</div>`;
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

