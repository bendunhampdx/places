// Business logic for My Vacations
function MyVacations() {
  this.places = {};
  this.currentId = 0;
}

MyVacations.prototype.addPlace = function(place) {
  place.id = this.assignId();
  this.places[place.id] = place;
};

MyVacations.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

MyVacations.prototype.findPlace = function(id) {
  if (this.places[id] != undefined) {
    return this.places[id];
  }
  return false;
};

// Business logic for Places
function Place(location, landmarks, timeOfYear, notes) {
  this.location = location;
  this.landmarks = landmarks;
  this.timeOfYear = timeOfYear;
  this.notes = notes;
}


// UI Logic
let myVacations = new MyVacations();

function displayVacationDetails(myVacationsToDisplay) {
  let placesList = $("ul#places");
  let htmlForPlacesInfo = "";
  Object.keys(myVacationsToDisplay.places).forEach(function(key) {
    const places = myVacationsToDisplay.findPlace(key);
    htmlForPlacesInfo += "<li id=" + places.id + ">" + places.location +  "</li>";
  });
  placesList.html(htmlForPlacesInfo);
}

function attachPlacesListeners() {
  $("ul#places").on("click", "li", function() {
    showPlace(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    myVacations.deletePlace(this.id);
    $("#show-place").hide();
    displayPlaceDetails(myVacations);
  });
}

function showPlace(placeId) {
  const place = myVacations.findPlace(placeId);
  $("#show-place").show();
  $(".location").html(place.location);
  $(".landmarks").html(place.landmarks);
  $(".time-of-year").html(place.timeOfYear);
  $(".notes").html(place.notes);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + places.id + ">Delete</button>");
}

$(document).ready(function()  {
  attachPlacesListeners();
  $("form#new-place").submit(function(event)  {
    event.preventDefault();
    const inputtedLocation = $("input#new-location").val();
    const inputtedLandmark = $("input#new-landmark").val();
    const inputtedTimeOfYear = $("input#new-time-of-year").val();
    const inputtedNotes = $("input#new-notes").val();
    $("input#new-location").val("");
    $("input#new-landmark").val("");
    $("input#new-time-of-year").val("");
    $("input#new-notes").val("");
    let newPlace = new Place(inputtedLocation, inputtedLandmark, inputtedTimeOfYear, inputtedNotes);
    myVacations.addPlace(newPlace);
    displayVacationDetails(myVacations);
  });
});

