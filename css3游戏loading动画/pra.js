var per = 0;
var bar = document.getElementsByClassName('bar')[0];
var loadingPage = document.getElementsByClassName('pageLoading')[0];
var timer = setInterval(function(){
    bar.style.width = per + '%';
    per += 1;
    if(per > 100){
        loadingPage.classList.add('complate');
        clearInterval(timer);
    }
},30); 