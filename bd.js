const mongoose=require('mongoose');
const assert=require('assert');
    before(function(done){
	            mongoose.connect('mongodb://localhost/bdusers');
	            mongoose.connection.once('open',function(){
		            console.log("succ");
		            done();
                }).on('error',function(error){
	                console.log("Connection error:"+error);
});
});
function check(){
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passerr=document.getElementById("errpass");
    var emerr=document.getElementById("errem");
    var em=document.getElementById("em");
    var pass=document.getElementById("pass");
    if(em.value=="" || mailformat.test(em.value)==false){
        emerr.innerHTML="please fill in a valid mail";
        em.value=""
        setTimeout(function(){ emerr.innerHTML="";}, 2000);
        if(pass.value=="" || pass.value.search(/[A-Z]/) < 0 || pass.value.length<6){
            passerr.innerHTML="please fill in your password";
            pass.value="";
            setTimeout(function(){ passerr.innerHTML="";}, 2000);
        }
    }
    else{

        window.location.href = "/thank.ejs";
    }
}