function getFormData() {
    var elements = document.getElementById("cForm").elements; // all form elements
    var fields = Object.keys(elements).map(function(k) {
        if (elements[k].name !== undefined) {
            return elements[k].name;
        }
    }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
    });
    var data = {};
    fields.forEach(function(k) {
        data[k] = elements[k].value;
    });
    console.log(data);
    return data;
}

function handleFormSubmit(event) {
    event.preventDefault();
    var data = getFormData(); // get the values submitted in the form
    var url = event.target.action; //
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        //console.log(xhr.status, xhr.statusText)
        //console.log(xhr.responseText);
        document.getElementById('divForm').style.display = 'none'; // hide form
        document.getElementById('divFormSent').style.display = 'block';
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
}

function loaded() {
    var form = document.getElementById('cForm');
    form.addEventListener("submit", handleFormSubmit, false);
};
document.addEventListener('DOMContentLoaded', loaded, false);