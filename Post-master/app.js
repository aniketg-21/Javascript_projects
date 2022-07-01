function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', ()=>{
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', ()=>{
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

let addParamCount = 1;
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', ()=>{
    let x = ++addParamCount;
    let params = document.getElementById('params');
    let string = `<div class="my-2" style="display:flex;">
                    <legend class="col-form-label col-sm-2">Parameter ${x}</legend>
                    <div class="col-md-4 mx-1">
                      <input type="text" class="form-control" id="parameterKey${x}" placeholder="Enter Parameter ${x} key">
                    </div>
                    <div class="col-md-4 mx-1">
                      <input type="text" class="form-control" id="parameterValue${x}" placeholder="Enter Parameter ${x} value">
                    </div>
                    <button class="btn btn-primary mx-1 deleteParam">-</button>
                  </div>`;
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    let deleteParam = document.getElementsByClassName('deleteParam');
    for (let item of deleteParam){
        item.addEventListener('click', (e)=>{
            // confirm fun
            e.target.parentElement.remove();
        })
    }
})

let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    // document.getElementById('responseJsonText').value = "Please wait... fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait... fetching response...";
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    if (contentType == 'params'){
        data = {};
        for (i=0; i< addParamCount; i++){
            if(document.getElementById('parameterKey' + i) != undefined){
              let key = document.getElementById('parameterKey' + i).value;
              let value = document.getElementById('parameterValue' + i).value;
              data[key] = value;
            }
            data = JSON.stringify(data);
        }
    }else {
        data = document.getElementById('requestJsonText').value;
    }
    console.log('URL', url);
    console.log('requestType', requestType);
    console.log('contentType', contentType);
    console.log('data',data);

    if (requestType == 'GET'){
        fetch(url, {
            method: 'GET'
        }).then(response=> response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                       'Content-type': 'application/json; charset=UTF-8',
                     }
        }).then(response=> response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
})
