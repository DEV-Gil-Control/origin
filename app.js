function register() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    console.log( email , password);

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode , " -" + errorMessage)
    });
}

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

function observer() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      show();
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
      console.log(`Usuario activo: ${email}`)
    } else {
      console.log('Ningun Usuario Activo')
      // User is signed out.
      // ...
    }
  });
}
observer();

function show() {
  var content = document.getElementById('content');
  content.innerHTML = "Solo lo puede ver el usuario Activo";
}