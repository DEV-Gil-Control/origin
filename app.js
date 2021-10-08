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


    $(document).ready(function() {
  validate();
  $('input').on('keyup', validate);
});

function validate() {
  var inputsWithValues = 0;
  
  // get all input fields except for type='submit'
  var myInputs = $("input:not([type='submit'])");

  myInputs.each(function(e) {
    // if it has a value, increment the counter
    if ($(this).val()) {
      inputsWithValues += 1;
    }
  });

  if (inputsWithValues == myInputs.length) {
    $("button[type=submit]").prop("disabled", false);
  } else {
    $("button[type=submit]").prop("disabled", true);
  }
}  
      
      
      
