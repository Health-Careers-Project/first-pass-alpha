var days = 31;
var numofrows = 22;
var table = document.getElementById('healthtable');
var table2 = document.getElementById('keytable');
var row;
let selectedDay = false;
let selectedRow = false;
var reader = new FileReader();
var d = new Date();
var m = d.getMonth();
var dy = d.getDate();
var y = d.getFullYear();
var date = "".concat(m + 1,"-", dy,"-", y);
var h = d.getHours();
var mn = d.getMinutes()
var time = "".concat(h,"-",mn)
var datetime = "".concat(date," ",time)
var oldfile = 0;
let name = ''
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let month = months[m]
let year = d.getFullYear()
var operation = ['WEIGHT', 'HEIGHT', "BLOOD PRESSURE", 'TEMPERATURE', 'PULSE', 'RESPIRATION', 'DIET (% CONSUMED)', 'POSITIONING', 'TRANSFER', 'NAIL CARE', 'BATHING', 'CATHETER CARE', 'HAIR CARE', 'ROM EXERCISES', 'ORAL HYGIENE', 'UNDRESSING', 'DRESSING', 'COMMODE', 'PERINEAL CARE', 'SKIN CARE', 'BED PAN', 'INITIALS'];
const iadOps = [8,9,10,11,12,13,14,15,16,17,18,19,20,21]
const apOps = [];
let info = []
let shift = 0;
for(var s = 0; s<3; s++){
  info.push([])
  for(var y=0;y<22; y++){
    info[s].push([])
    for(var x=0; x<31; x++){
      info[s][y].push(" ")
    }
  }
}
for (var i=0; i < days + 1; i++) {
  if (i === 0) {
    row = table.insertRow(0);
  }
  var header = document.createElement('th');
  row.appendChild(header);
  if (i === 0) {
    header.innerHTML = 'DATE';
  } 
  else {
    header.innerHTML = i;
    header.className = 'day';
  }
}
document.getElementById('month').value = months[m]
document.getElementById('year').value = d.getFullYear()

for (var i2=0; i2 < numofrows; i2++) {
  r = table.insertRow(i2 + 1)
  for (var i3=0; i3 < days + 1; i3++) {
    c = r.insertCell(i3)
    if (i3 === 0) {
      c.innerHTML = operation[i2]
      if(iadOps.includes(i2+1) && i2 !==13){
       // c.innerHTML += '<br> IAD'
      } else if(i2 == 13){

      } 
    }
    else {
      c.innerHTML = '' 
      c.setAttribute( "onClick", "javascript: editCell("+(i2+1)+","+i3+");" )
    }
  }
}

function editCell(row,day){
    if(iadOps.includes(row) && row !== 7 && row !== 14){
      clearSelection();
      if(table.rows[row].cells[day].innerHTML == 'I'){
        table.rows[row].cells[day].innerHTML = 'A'
      }else if(table.rows[row].cells[day].innerHTML == 'A'){
        table.rows[row].cells[day].innerHTML = 'D'
      }else if(table.rows[row].cells[day].innerHTML == 'D'){
        table.rows[row].cells[day].innerHTML = ''
      }else{
        table.rows[row].cells[day].innerHTML = 'I'
      }
      table.rows[row].cells[day].className = 'noselect'
    }else if(row == 7){
      clearSelection();
      if(table.rows[row].cells[day].innerHTML == '100%'){
        table.rows[row].cells[day].innerHTML = '50%'
      }else if(table.rows[row].cells[day].innerHTML == '50%'){
        table.rows[row].cells[day].innerHTML = '25%'
      }else if(table.rows[row].cells[day].innerHTML == '25%'){
        table.rows[row].cells[day].innerHTML = ' '
      }else{
        table.rows[row].cells[day].innerHTML = '100%'
      }
      table.rows[row].cells[day].className = 'noselect'
    }else if(row == 14){
      clearSelection();
      if(table.rows[row].cells[day].innerHTML == 'AC'){
        table.rows[row].cells[day].innerHTML = 'P'
      }else if (table.rows[row].cells[day].innerHTML == 'P'){
        table.rows[row].cells[day].innerHTML = ' '
      }else{
        table.rows[row].cells[day].innerHTML = 'AC'
      }
      table.rows[row].cells[day].className = 'noselect'
    }else{
      if(selectedDay !== day || selectedRow !== row){
        clearSelection();
      table.rows[row].cells[day].innerHTML = "<input id=\"contentEditor\" value=\""+table.rows[row].cells[day].innerHTML+"\" type=\"text\" autocomplete=\"off\">"
      }
    }
  
  selectedDay = day
  selectedRow = row
}
function clearSelection(){
  if(selectedDay && selectedRow){
      //test if the text box has content
      if(document.getElementById("contentEditor")){
        if(document.getElementById("contentEditor").value){
       // if it has content, set the cell to the text box's value
          table.rows[selectedRow].cells[selectedDay].innerHTML = document.getElementById("contentEditor").value
          updateTable()
        }else{
          //if it doesnt have content, set the cell to an empty string
           table.rows[selectedRow].cells[selectedDay].innerHTML = " "
        }
     
      }
  }
}
// For this to work best, remember to clear selection
function tableContents(){
  let containz = "";
  for(var i1 = 0; i1 < 3; i1++){
    for (var i2=0; i2 < numofrows; i2++) {
      for (var i3=0; i3 < days; i3++) {
        containz+= info[i1][i2][i3]
        containz+="╗"
      }
    containz+="║"
    }
  containz+="╣" 
  }
  containz += "»" + month + "«" + year + '‹' + name
  return containz;
}
// ╗ = cell seperator
// ║ = row seperator
// ╣ = shift seperator
// wouldnt reccommend naming the function this, coulc co

function defenitelynotsaveFile(){
  clearSelection()
  updateTable()
  var blob = new Blob([tableContents()], {type: "text/plain;charset=utf-8"});
  var newmonthsave = months.indexOf(document.getElementById("month").value) + 1;
  var savename;
  if (oldfile !== 0){
    savename = string.concat(newmonthsave, oldfile)
  }else {
    savename = datetime
  }

  saveAs(blob, savename)
}

function updateTable(){
  for(var x = 0; x<31; x++){
    for(var y = 0; y<22; y++){
      info[shift][y][x]= table.rows[y+1].cells[x+1].innerHTML
    }
  }
  month = document.getElementById('month').value
  year = document.getElementById('year').value
  name = document.getElementById('name').value
}
function setShift(shiftnew){
  clearSelection();
  updateTable();
  if(shift !== shiftnew){
    document.getElementById('shift'+shiftnew+'button').className = 'selected'
    document.getElementById('shift'+shift+'button').className = 'voided'
    shift = shiftnew;
    selectedDay=false;
    selectedRow=false;
    for(var x = 0; x<31; x++){
      for(var y = 0; y<22; y++){
        table.rows[y+1].cells[x+1].innerHTML = info[shift][y][x]
      }
    }

  }
}
var filename;

function importFile(){
  var fileToRead = document.getElementById("fileElem").files[0];
  // attach event, that will be fired, when read is end
  reader.addEventListener("loadend", function() {
     // reader.result contains the contents of blob as a typed array
     //
    // we insert content of file in DOM here
    takein(reader.result);
  });

  // start reading a loaded file
  reader.readAsText(fileToRead);
}

function takein(code){
let x = 0;
let y = 0;
let sft = 0;
let out = [];
let stage = 'grid'
name = ''
month = ''
year = ''
for(var s = 0; s<3; s++){
  out.push([])
  for(var l=0;l<22; l++){
    out[s].push([])
    for(var w=0; w<31; w++){
      out[s][l].push("")
    }
  }
}
for(var chr=0; chr<code.length;chr++){
    if(code.charAt(chr) == '╣'){
      sft++;
      y=0
      x=0
    }else if(code.charAt(chr) == '║'){
      y++;
      x=0
    }else if(code.charAt(chr) == '╗'){
      x++;
    }else if(code.charAt(chr) == '»'){
      //take month
       stage = 'month'
    }else if(code.charAt(chr) == '«'){
      // take year ‹
      stage = 'year'
    }else if(code.charAt(chr) == '‹'){
      // take year 
      stage = 'name'
    }else{
      if(stage == 'grid'){
      out[sft][y][x] += code.charAt(chr)
      } else if(stage == 'month'){
        month += code.charAt(chr)
      }else if(stage == 'year'){
        year += code.charAt(chr)
      }else if(stage == 'name'){
        name += code.charAt(chr)
      }
    }
  }
  for(var l=0;l<22; l++){
    for(var w=0; w<31; w++){
      table.rows[l+1].cells[w+1].innerHTML = out[shift][l][w]
    }
  }
  document.getElementById('month').value = month;
  document.getElementById('year').value = year;
  info = out;
}

function instructions(){
  var para = document.getElementById('instructions')
  if (para.innerHTML !== ""){
    para.innerHTML = "";
  }else{
    para.innerHTML = "How to Use Online Record / Daily Flow Sheet:<br> To use this online table, simply click a box, a area that you can type in will show up, which you can then type in to write into the table. When you finish writing, hit the Clear Selection button or click on any other box in the document to store it into the table. On the top left of the screen, you will see three buttons representing three different shifts. You can click each of these to switch to another table which stores information for that shift. When finished, click the Save File button to download a copy to your computer. You can then share that file with whoever needs to see it, and to import a file, simply click the Import File button, and select the file.";
  }
}