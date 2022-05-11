const questionArr = [document.querySelector("#q1"), 
                      document.querySelector("#q2"),
                      document.querySelector("#q3"),
                      document.querySelector("#q4"),
                      document.querySelector("#q5")];
const answerArr = [document.querySelector("#a1"), 
                    document.querySelector("#a2"),
                    document.querySelector("#a3"),
                    document.querySelector("#a4"),
                    document.querySelector("#a5")];

const scoreText = document.querySelector("#score");

const rectangleArr = {
  "Library": null,
  "Sierra":null,
  "Manzanita":null,
  "Eucalyptus":null,
  "Planetarium":null
};

let rectangleBounds = {
  "Library":{
    north: 34.24038598390434,
    south: 34.239496009203584,
    east: -118.52861123162042,
    west: -118.53003328628176,
  },
  "Sierra":{
    north: 34.23844518771778,
    south: 34.23811375503722,
    east: -118.53004516408123,
    west: -118.53137721355785,
  },
  "Manzanita":{
    north: 34.23782490909815,
    south: 34.23758742683437,
    east: -118.52948021171552,
    west: -118.53061946321276,
  },
  "Eucalyptus":{
    north: 34.238755196426624,
    south: 34.23855229377107,
    east: -118.52763555076304,
    west: -118.528799319071,
  },
  "Planetarium":{
    north: 34.239127755205374,
    south: 34.238984170540334,
    east: -118.52837576480108,
    west: -118.52855934293262,
  }
}

const buildingArr = ["Library", "Sierra", "Manzanita", "Eucalyptus", "Planetarium"];

let currQuestion = 0;
let numCorrect = 0;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: { lat: 34.2391, lng: -118.5292 },
    mapTypeId: "roadmap",
    gestureHandling: "none",
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    clickableIcons: false,
  });

  const styles = {
    default: [],
    hide: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off"}],
      },
    ],
  };

  map.setOptions({styles: styles["hide"]});

  for(let i = 0; i < answerArr.length; i++){
    answerArr[i].style.display = "none";
    questionArr[i].style.display = "none";
  }
  scoreText.style.display = "none";

  spawnQuestion();
  map.addListener('dblclick', function(e){
    if(currQuestion < 5)
      clickedMap(e, map);
  });
}

window.initMap = initMap;

function clickedMap(e, map){
  if(e.latLng.lng() >= rectangleBounds[buildingArr[currQuestion]].west
    && e.latLng.lng() <= rectangleBounds[buildingArr[currQuestion]].east
    && e.latLng.lat() >= rectangleBounds[buildingArr[currQuestion]].south
    && e.latLng.lat() <= rectangleBounds[buildingArr[currQuestion]].north)
  {
    numCorrect++;
    placeRectangles(map, true);
    spawnAnswer(true);
  }
  else
  {
    placeRectangles(map, false);
    spawnAnswer(false);
  }
}

function spawnQuestion(){
  if(currQuestion < 5)
    questionArr[currQuestion].style.display = "block";
  else
  {
    scoreText.innerHTML = "You got (" + numCorrect + "/5) correct!";
    scoreText.style.display = "block";
  }
}

function spawnAnswer(correct){
  if(correct === true)
  {
    answerArr[currQuestion].style.color = "green";
    answerArr[currQuestion].innerHTML = "Your answer is CORRECT!";
  }
  else
  {
    answerArr[currQuestion].style.color = "red";
    answerArr[currQuestion].innerHTML = "Your answer is INCORRECT!";
  }
  answerArr[currQuestion].style.display = "block";
  currQuestion++;
  spawnQuestion();
}

function placeRectangles(map, correct){
  let color;
  if(correct === true)
    color = "#50C878";
  else
    color = "#FF0000";

  switch(currQuestion){
    case 0:
      rectangleArr["Library"] = new google.maps.Rectangle({
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35,
        map,
        bounds: rectangleBounds["Library"],
      });
      break;
    case 1:
      rectangleArr["Sierra"] = new google.maps.Rectangle({
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35,
        map,
        bounds: rectangleBounds["Sierra"],
      });
      break;
    case 2:
      rectangleArr["Manzanita"] = new google.maps.Rectangle({
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35,
        map,
        bounds: rectangleBounds["Manzanita"],
      });
      break;
      case 3:
        rectangleArr["Eucalyptus"] = new google.maps.Rectangle({
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
          map,
          bounds: rectangleBounds["Eucalyptus"],
        });
        break;
      case 4:
        rectangleArr["Planetarium"] = new google.maps.Rectangle({
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
          map,
          bounds: rectangleBounds["Planetarium"],
        });
        break;
  }
}