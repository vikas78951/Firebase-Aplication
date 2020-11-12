///////////////
// FUNCTIONS
///////////////

////////////
// CLOSE ALL MODAL FUNCTION
///////////
function closePopupModal() {
  var AllModals = document.querySelectorAll(".popupContainer");
  AllModals.forEach(element => {
    element.classList.remove('open');
    Applicationbody.classList.remove("disabledBody");
  });
}


////////////
// EMPTY FIELDS
///////////
function emptyField() {
  var field = document.querySelectorAll(".inputfield");
  field.forEach(field => {
    field.value = "";
  })
}









////////////////////////////////////////////////////////////////////
//  SCRIPT JS CODE
/////////////////////////////////////////////////////////////////////

//////////
// PAGE LOADING ANIMATION
//////////
var application = document.querySelector(".application");
var loading = document.querySelector('.loadingContainer');
application.style.display = "none";
window.addEventListener('load', function() {
  window.setTimeout(function() {
    window.setTimeout(function() {
      loading.style.display = "none";
    }, 500);
    loading.classList.add('exit');
    application.style.display = "block";
  }, 3000);
});


///////////////
// HMBURGER BUTTON
////////
var hamburger = document.querySelector(".hamburgerContainer");
var menuContaienr = document.querySelector(".menusContainer");

hamburger.addEventListener("click", function() {
  hamburger.classList.toggle("active");
  menuContaienr.classList.toggle("active");

})

////////////
// DROPDOWN MENUS
///////////
var menus = document.querySelectorAll(".menusContainer .menu");
window.addEventListener('resize', function() {
  var width = window.outerWidth;
  if (width <= 950) {
    menus.forEach(element => {
      element.classList.remove("open");
    });
  }
})
menus.forEach(element => {
  element.addEventListener('click', function() {
    element.classList.toggle("open");
  })
});


///////////
// POPUP MODAL
var Applicationbody = document.querySelector(".application");

function popup(id) {

  Applicationbody.classList.toggle("disabledBody");
  emptyField();
  var modal = document.getElementById(id);
  if (modal.classList.contains('open')) {
    closePopupModal();
  } else {
    closePopupModal();
    modal.classList.add('open');
    Applicationbody.classList.add("disabledBody");

  }
}


//////////
//INITIALIZING FIREBASE
//////////
var firebaseConfig = {
  apiKey: "AIzaSyBhCei_DM26QruEtPtITTkyCeq5hIDA2wI",
  authDomain: "web-application-78951.firebaseapp.com",
  databaseURL: "https://web-application-78951.firebaseio.com",
  projectId: "web-application-78951",
  storageBucket: "web-application-78951.appspot.com",
  messagingSenderId: "401271669770",
  appId: "1:401271669770:web:419aa72fb5baaedc4f8bf3",
  measurementId: "G-LL27MELVD8"
};
firebase.initializeApp(firebaseConfig);


////////////
// USER SIGNUP
//////////////
var signinForm = document.querySelector(".signinForm");
signinForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var btn = document.querySelector(".signupbtn");
  btn.classList.add("processing");
  //GETING VALUES
  var userName = document.getElementById("usernameField").value;
  var Email = document.getElementById("emailField").value;
  var Pass = document.getElementById("passwordField").value;

  // CREATING ACCOUNT
  firebase.auth().createUserWithEmailAndPassword(Email, Pass).then(function() {

    // IF ACCOUNT CREATED UPDATE DISPLAY NAME
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: userName,
    }).then(function() {
      document.getElementById('logedinUser').innerHTML = userName;
    }).catch(function(error) {
      // IF ACCOUNT DOESN'T CREATE
      console.log(error)
    });

    // remove processing from btn
    btn.classList.remove("processing");
    // CLOSE ALL POPUP MODALS
    closePopupModal();
  }).catch(function(error) {
    // remove processing from btn
    btn.classList.remove("processing");

    // if error crated
    console.log(error);
  })

})
//////////////
// USER LOGIN
//////////
var loginForm = document.querySelector('.loginFrom');
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var btn = document.querySelector('.loginbtn');
  var email = document.getElementById('loginEmailField').value;
  var password = document.getElementById('loginPassField').value;
  btn.classList.add("processing");
  firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    //remove processing class
    btn.classList.remove("processing");
    // close all modals
    closePopupModal();
  }).catch(function(error) {
    btn.classList.remove("processing");
    console.log(error);
  });
  return false;
});




///////////////
// USER LOGOUT
//////////////
function logout() {
  firebase.auth().signOut().then(function() {
    // IF SIGHOUT SUCCUSSFULL
  }).catch(function(error) {
    console.log(error);
  });
}

//////////////
// AUTH STATE CHANGE
///////////////

var loginContainer = document.querySelector(".loginContainer");
var userContainer = document.querySelector(".userContainer");
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // LOGIN
    loginContainer.style.display = "none";
    userContainer.style.display = "initial";
    if (user.displayName) {
      document.getElementById('logedinUser').innerHTML = user.displayName;
    } else {
      document.getElementById('logedinUser').innerHTML = user.email;
    }
  } else {
    //LOGOUT
    loginContainer.style.display = "initial";
    userContainer.style.display = "none";
  }

});
