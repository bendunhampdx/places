// Business logic for My Vacations
function MyVacations() {
  this.places = {};
  this.currentId = 0;
}

MyVacations.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

MyVacations.prototype.addPlace = function(place) {
  place.id = this.assignId();
  this.places[place.id] =place;
};

// Business logic for Places
function Place(location, landmarks, timeOfYear, notes) {
  this.location = location;
  this.landmarks = landmarks;
  this.timeOfYear = timeOfYear;
  this.notes = notes;
}

