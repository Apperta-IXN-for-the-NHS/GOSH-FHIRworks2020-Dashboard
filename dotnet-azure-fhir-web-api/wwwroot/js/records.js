
const uri = 'api/Patient';


function getRecords() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function _displayBundleCount(data) {

  var numberBundle = data.length
  document.getElementById('bundleCounter').innerText = ` ${numberBundle}`;

}

function _displayPatientRecordsCount(data) {
  //count to interate through bundles
  var numberRecords = 0;
  for (i = 0; i < data.length; i++) {
    numberRecords += data[i].entry.length;
  }
  document.getElementById('recordCounter').innerText = ` ${numberRecords}`;
}

function checkdataexists(data) {
  var results = "";
  if (typeof data != undefined) {
    results = "Authenticated"
  } else {
    results = "Not Authenticated"
  }
  document.getElementById('auth').innerText = ` ${results}`;
}


function _displayItems(data) {

  const tBody = document.getElementById('bundle');
  tBody.innerHTML = '';




  _displayPatientRecordsCount(data);
  _displayBundleCount(data);
  checkdataexists(data);
  for (x = 0; x < data.length; x++) {
    for (y = 0; y < data[x].entry.length; y++) {
      let tr = tBody.insertRow();
      let td1 = tr.insertCell(0);
      let givenTextNode = document.createTextNode(data[x].entry[y].resource.name[0].given[0]);
      td1.appendChild(givenTextNode);
      let td2 = tr.insertCell(1);
      let familyTextNode = document.createTextNode(data[x].entry[y].resource.name[0].family);
      td2.appendChild(familyTextNode);
      let td3 = tr.insertCell(2);
      let genderTextNode = document.createTextNode(data[x].entry[y].resource.gender);
      td3.appendChild(genderTextNode);
      let td4 = tr.insertCell(3);
      let birthDateTextNode = document.createTextNode(data[x].entry[y].resource.birthDate);
      td4.appendChild(birthDateTextNode);
      let td5 = tr.insertCell(4);
      let marStatusTextNode = document.createTextNode(data[x].entry[y].resource.maritalStatus.text);
      td5.appendChild(marStatusTextNode);
      let td6 = tr.insertCell(5);
      var idElement = document.createElement('a');
      let idTextNode = document.createTextNode("Click for full record");
      idElement.setAttribute('href', "/api/Patient/" + data[x].entry[y].resource.id);
      idElement.appendChild(idTextNode);
      td6.appendChild(idElement);


    }


  }

  $(document).ready(function () {
    $('#table').DataTable();
  });
}

