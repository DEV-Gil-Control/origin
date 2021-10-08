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
           location.href = 'https://global.gotomeeting.com/join/589781757';
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






