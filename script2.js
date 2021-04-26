const fileSelect = document.getElementById("fileSelect"),
fileElem = document.getElementById("fileElem");
fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
}, false);

function ChangeColor(){  
  document.getElementById('btn1').style.backgroundColor = 'Red';   
}  
  
function ChangeColor2(){  
  document.getElementById('btn1').style.backgroundColor = 'Pink';   
}  
  
function ChangeColor3(){  
  document.getElementById('btn1').style.backgroundColor = 'Green';  
}  