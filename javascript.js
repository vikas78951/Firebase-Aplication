
var hamburger = document.querySelector(".hamburgerContainer");
var menuContaienr = document.querySelector(".menusContainer");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    menuContaienr.classList.toggle("active");

})


var menus = document.querySelectorAll(".menusContainer .menu");



window.addEventListener('resize', function () {
    var width = window.outerWidth;
    if (width <= 700) {
        menus.forEach(element => {
            element.classList.remove("open");
        });
    }
})

menus.forEach(element => {
    element.addEventListener('click', function () {
        element.classList.toggle("open");
    })
});


// popup action 

var Applicationbody = document.querySelector(".application");
var AllModals = document.querySelectorAll(".popupContainer");


var body = document.querySelector("body");
function popup(id) {
    Applicationbody.classList.toggle("disabledBody");

    var modal = document.getElementById(id);
    if (modal.classList.contains('open')) {
        AllModals.forEach(element => {
            element.classList.remove('open');
            Applicationbody.classList.remove("disabledBody");
        });

    }
    else {
        AllModals.forEach(element => {
            element.classList.remove('open')

        });
        modal.classList.add('open');
        Applicationbody.classList.add("disabledBody");

    }
}


//////////
// Working with firebase 
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


var loginContainer = document.querySelector(".loginContainer");
var userContainer = document.querySelector(".userContainer");
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        // If user is Loged in 
        loginContainer.style.display="none";
        userContainer.style.display="initial";
        console.log(user.email)

    }
    else{
        //If user is Loged out
        loginContainer.style.display="initial";
        userContainer.style.display="none";
    }
});




function signup(){
    var fName = document.getElementById("firstnameField").value ;
    var lName = document.getElementById("lastnameField").value ;
    var Email = document.getElementById("emailField").value ;
    var Pass  = document.getElementById("passwordField").value ;

    console.log(fName + '' +lName+ '' +Email + '' +Pass )

    firebase.auth().creteUserWithFirstNameAndLastNameAndEmailAndPassword(fName , lName , Email , Pass).catch(function(error){
        console.log(error)
    })
}

















// var email ="", password ="" ;
// firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
//      alert(error);
// })


