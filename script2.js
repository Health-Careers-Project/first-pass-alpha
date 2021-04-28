const fileSelect = document.getElementById("fileSelect"),
fileElem = document.getElementById("fileElem");
fileSelect.addEventListener("click", function (e) {
  console.log("test")
  if (fileElem) {
    fileElem.click();
    console.log("test3")
  }
}, false);
