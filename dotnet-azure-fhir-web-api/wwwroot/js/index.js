
const uri = 'api/Patient';

const metadataUri = 'https://gosh-fhir-synth.azurehealthcareapis.com/metadata';

function getRecords() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function getMetadata() {
  fetch(metadataUri)
    .then(metadataresponse => metadataresponse.json())
    .then(metadata => _displayMetaData(metadata))
    .catch(error => console.error('Unable to get items.', error));
}


function _displayBundleCount(data) {
  
    var numberBundle = data.length
     document.getElementById('bundleCounter').innerText = ` ${numberBundle}`;
  
}

function _displayPatientRecordsCount(data) {
    //count to interate through bundles
    var numberRecords = 0;
    for(i = 0; i<data.length;i++){
     numberRecords += data[i].entry.length;
    }  
  document.getElementById('recordCounter').innerText = ` ${numberRecords}`;
  }

function checkdataexists(data){
var results = "";
if(typeof data != undefined){
results = "Authenticated"
}else{
  results = "Not Authenticated"
}
document.getElementById('auth').innerText = ` ${results}`;
}


function _displayMetaData(metadata){


// Server metadata
document.getElementById('serverName').innerText = ` ${metadata.name}`;
document.getElementById('serverVersion').innerText = ` ${metadata.version}`;
document.getElementById('serverPublisher').innerText = ` ${metadata.publisher}`;
document.getElementById('serverStatus').innerText = ` ${metadata.status}`;

//FHIR metadata
document.getElementById('fhirVersion').innerText = ` ${metadata.fhirVersion}`;
document.getElementById('fhirFormat').innerText = ` ${metadata.format[0]}`;
document.getElementById('softwareVersion').innerText = ` ${metadata.software.version}`;

}

function _displayItems(data) {
 
const tBody = document.getElementById('bundle');

  tBody.innerHTML = '';
 
  
  
  
    _displayPatientRecordsCount(data);  
    _displayBundleCount(data);
    checkdataexists(data);
    $(document).ready(function () {
      $('#table').DataTable({"iDisplayLength":25});
        $('.dataTables_length').addClass('bs-select');
       
    
        });
       
    for(x = 0; x<data.length;x++){
        
            let tr = tBody.insertRow();
            let td1 = tr.insertCell(0);
            let numberNode = document.createTextNode(x);
            td1.appendChild(numberNode);
            let td2 = tr.insertCell(1);
            let idNode = document.createTextNode(data[x].id);
             td2.appendChild(idNode);
             let td3 = tr.insertCell(2);
             let lastmodifiedNode = document.createTextNode(data[x].meta.lastUpdated);
              td3.appendChild(lastmodifiedNode);
 }

 $(document).ready(function() {
  $('#table').DataTable();
} );    
  
}

