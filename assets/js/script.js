var locationInput = $("#searchLocation");
var submitForm = $("#sForm");


var formSubmitHandler = function (event) {
event.preventDefault();
var searchLocation = locationInput.value
console.log(searchLocation);

}
