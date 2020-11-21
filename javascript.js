///////////////////
// NEEDED VARIABLES
///////////////
var alertboxs = document.querySelector(".alertContainer");
var alertCloseBtn = document.querySelector(".alertCloseBtn");
var success = "#27AE60";
var failed = "#E74C3C";
var normal = "#3498DB "
var application = document.querySelector(".application");
var loading = document.querySelector('.loadingContainer');
var hamburger = document.querySelector(".hamburgerContainer");
var menuContaienr = document.querySelector(".menusContainer");
var signinForm = document.querySelector(".signinForm");
var loginForm = document.querySelector('.loginFrom');
var loginContainer = document.querySelector(".loginContainer");
var userContainer = document.querySelector(".userContainer");
var Applicationbody = document.querySelector(".application");
var innerApplication  = document.querySelector(".innerApplication");

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
// EMPTY FIELDS FUNCTION
///////////
function emptyField() {
  var field = document.querySelectorAll(".inputfield");
  field.forEach(field => {
    field.value = "";
  })
}

///////////
// CUSTOM ALERT BOX
//////////
function alertbox(status, msg) {
  var stautsbox = document.querySelector(".status");
  var msgbox = document.querySelector(".errorMessage");
  if (status == "success") {
    alertboxs.style.background = success;
    alertboxs.style.boxShadow = "0px 0px 5px 1px " + success;
    stautsbox.innerHTML = status;
    msgbox.innerHTML = msg;
    alertboxs.classList.add("alertOpen");
  } else if (status == "failed") {
    alertboxs.style.background = failed;
    alertboxs.style.boxShadow = "0px 0px 5px 1px " + failed;
    stautsbox.innerHTML = status;
    msgbox.innerHTML = msg;
    alertboxs.classList.add("alertOpen");
  } else if (status == "normal") {
    alertboxs.style.background = normal;
    alertboxs.style.boxShadow = "0px 0px 5px 1px " + normal;
    stautsbox.innerHTML = status;
    msgbox.innerHTML = msg;
    alertboxs.classList.add("alertOpen");
  } else {
    console.log("invalid status")
  }

  window.setTimeout(function(){
  alertboxs.classList.remove("alertOpen");
  },5000)

}








////////////////////////////////////////////////////////////////////
//  SCRIPT JS CODE
/////////////////////////////////////////////////////////////////////

//////////
// PAGE LOADING ANIMATION
//////////
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

/////////////
// CLOSIGN ALERT BOX
/////////////
alertCloseBtn.addEventListener("click",function(){
    alertboxs.classList.remove("alertOpen");
})


///////////
// Window Scroll Activity
////////////
innerApplication.addEventListener('scroll', function(){
  // console.log("scrolled")
  var nav = document.querySelector('.navContainer');
  var scrolled =   innerApplication.scrollTop;
  if(scrolled > 0){
    nav.style.boxShadow = " 0px 0px 8px 0px lightgray"
  }else {
    nav.style.boxShadow = "none"
  }

})


//////////
//INITIALIZING FIREBASE
//////////

// Using Project : web-application-78951
// ///////
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
    alertbox("success" , "Account Successfully Created");
  }).catch(function(error) {
    // remove processing from btn
    btn.classList.remove("processing");
    // if error crated
      alertbox("failed" ,  error.message);
  })

});

var actionCodeSettings ={
 url:
}









//////////////
// USER LOGIN
//////////
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var btn = document.querySelector('.loginbtn');
  var email = document.getElementById('loginEmailField').value;
  var password = document.getElementById('loginPassField').value;
  btn.classList.add("processing");
  firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    //remove processing class
    btn.classList.remove("processing");
      alertbox("success", "LogedIn Successfull");
    // close all modals
    closePopupModal();
  }).catch(function(error) {
      btn.classList.remove("processing");
      alertbox("failed", error.message);
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
