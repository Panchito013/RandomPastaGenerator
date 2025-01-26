atLeastOneRadio();
// JSON data containing pasta and sauce options
const data = {
  "pasta": [
      { "id": 1, "name": "imperiali", "type" : "nonfilled", "price": {"s": 6, "m":8, "l":10} },
      { "id": 2, "name": "imperiali di ceci", "type" : "nonfilled", "price": {"s": 6, "m":8, "l":10} },
      { "id": 3, "name": "gnocchi", "type" : "nonfilled", "price": {"s": 6, "m":8, "l":10} },
      { "id": 4, "name": "taglierini", "type" : "nonfilled", "price": {"s": 6, "m":8, "l":10} },
      { "id": 5, "name": "trenette", "type" : "nonfilled", "price": {"s": 6, "m":8, "l":10} },
      { "id": 6, "name": "trofie", "type" : "nonfilled", "price": {"s": 6, "m":8, "l":10} },
      { "id": 7, "name": "torchiette", "type" : "nonfilled", "price": {"s": 6, "m":8, "l":10} },
      { "id": 8, "name": "pasta all'uovo", "type" : "nonfilled", "price": {"s": 6, "m":8, "l":10} },
      { "id": 9, "name": "casarecce", "type" : "nonfilled", "price": {"s": 6, "m":8, "l":10} },
      { "id": 10, "name": "paccheri", "type" : "nonfilled", "price": {"s": 6, "m":8, "l":10} },
      { "id": 11, "name": "taglierini al nero di seppia", "type" : "fishy", "price": {"s": 6, "m":8, "l":10} },
      { "id": 12, "name": "ravioli", "type" : "filled", "price": {"s": 7, "m":9, "l":11} },
      { "id": 13, "name": "ravioli salame sant'olcese", "type" : "filled", "price": {"s": 7, "m":9, "l":11} },
      { "id": 14, "name": "ravioli salame e provola", "type" : "filled", "price": {"s": 7, "m":9, "l":11} },
      { "id": 15, "name": "ravioli zucca e arancia", "type" : "filled", "price": {"s": 7, "m":9, "l":11} },
      { "id": 16, "name": "ravioli vegani", "type" : "filled", "price": {"s": 7, "m":9, "l":11} },
      { "id": 17, "name": "ravioli di carne alla genovese", "type" : "filled", "price": {"s": 7, "m":9, "l":11} },
      { "id": 18, "name": "ravioli al tartufo", "type" : "filled", "price": {"s": 8, "m":10, "l":12} },
      { "id": 19, "name": "pansoti fatti a mano", "type" : "filled", "price": {"s": 8, "m":10, "l":12} },
      { "id": 20, "name": "cappelletti fatti a mano", "type" : "filled", "price": {"s": 8, "m":10, "l":12} },
      { "id": 21, "name": "le oege de ma", "type" : "special", "price": {"s": 8, "m":10, "l":12} },
      { "id": 22, "name": "lasagne al ragù", "type" : "lasagna", "price": {"s": 8, "m":8, "l":8} },
      { "id": 23, "name": "lasagne al pesto", "type" : "lasagna", "price": {"s": 8, "m":8, "l":8} }
    ],
  "sauces": [      
        { "id": 1, "name": "pesto", "prob": 0.9, "excludedPastaTypes": ["filled","fishy"]},
        { "id": 2, "name": "pesto al mortaio", "prob": 0.9,"excludedPastaTypes": ["filled","fishy"] },
        { "id": 3, "name": "salsa di noci", "prob": 0.6, "excludedPastaTypes": ["fishy"]},
        { "id": 4, "name": "ragù", "prob": 0.8, "excludedPastaTypes": ["fishy"]},
        { "id": 5, "name": "ragù di nocciole vegan", "prob": 0.2 },
        { "id": 6, "name": "arrabbiata", "prob": 0.6 },
        { "id": 7, "name": "cacio e pepe", "prob": 0.7,"excludedPastaTypes": ["fishy"] },
        { "id": 8, "name": "burro e salvia", "prob": 0.6 },
        { "id": 9, "name": "bottarga", "prob": 0.4,"excludedPastaTypes": ["filled"] },
        { "id": 10, "name": "pomodoro e basilico", "prob": 0.6 },
        { "id": 11, "name": "crema di nocciole", "prob": 0.1 },
        { "id": 12, "name": "noce vegan", "prob": 0.3 },
        { "id": 13, "name": "nocciole vegan", "prob": 0.2 },
        { "id": 14, "name": "sugo del giorno", "prob": 0.6 }
]
};



// Function to get a random item from an array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomWeightedItem(array){
    const totalWeight = array.reduce((sum, item) => sum + item.prob, 0);
    const random = Math.random() * totalWeight;
    let accumulatedWeight = 0;

    for (const item of array) {
        accumulatedWeight += item.prob;
        if (random < accumulatedWeight) {
            return item; // array[item.id -1];
        }
    }
}

// Function to generate a random pasta and sauce pairing
function prandomizePairing() {
  const randomPasta = getRandomItem(data.pasta);   
  const presultDiv = document.getElementById('p-result');
  presultDiv.textContent = capitalizeFirstLetter(`${randomPasta.name}`);
  if(randomPasta.type == "lasagna"){
    document.getElementById("sauceDiv").hidden = true;
    document.getElementById("p-randomizeButton").disabled = true;
    document.getElementById("inlineRadio1").disabled = true;
    document.getElementById("inlineRadio2").disabled = true;
    document.getElementById("inlineRadio3").disabled = true;
  }
  let selectedSize = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
  let cost = randomPasta.price[selectedSize];

  document.getElementById('price').innerText = `Costo: ${cost} €`
  document.getElementById("p-randomizeButton").disabled = true;
  document.getElementById("s-randomizeButton").disabled = false;

}

function validateExclusions(pasta, souceArrayExclusions){
    for (ex in souceArrayExclusions){
        if(pasta.type == souceArrayExclusions[ex]){
            return false;
        }
    }
    return true;
}

function srandomizePairing() {
    const pastaName = document.getElementById('p-result').innerHTML;
    let pasta = getItemByName(pastaName, data.pasta);

    let randomSauce = getRandomWeightedItem(data.sauces);  
  
    if(randomSauce.excludedPastaTypes != undefined && !validateExclusions(pasta,randomSauce.excludedPastaTypes)){
        do{
            randomSauce =  getRandomWeightedItem(data.sauces); 
        }while(!validateExclusions(pasta,randomSauce.excludedPastaTypes))
    }

  

    const sresultDiv = document.getElementById('s-result');
    sresultDiv.textContent =  capitalizeFirstLetter(`${randomSauce.name}`);
    document.getElementById("s-randomizeButton").disabled = true;

}

function getItemByName(itemName,array){
    return array.find((item) => item.name.toLowerCase() == itemName.toLowerCase());
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function reset(){
    window.location.reload();
}

function atLeastOneRadio() {
    let s = document.getElementById('inlineRadio1').checked;
    let m = document.getElementById('inlineRadio2').checked;
    let l = document.getElementById('inlineRadio3').checked;
    if(s || m || l){
        document.getElementById('p-randomizeButton').disabled = false;
    }
}



// Add event listener to the button
document.getElementById('p-randomizeButton').addEventListener('click', prandomizePairing);
document.getElementById('s-randomizeButton').addEventListener('click', srandomizePairing);
document.getElementById('reset').addEventListener('click', reset);
