const BASE_URl = "https://v6.exchangerate-api.com/v6/00f94399cab56bebf35b41d4/pair"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")
for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode ==="USD"){
            newOption.selected = "selected"
        }
        if(select.name === "to" && currCode ==="INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
    }


select.addEventListener("change",(evt) => {
    updateFlag(evt.target);
});
}

const updateFlag = (element) =>{
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newSrc;
};



btn.addEventListener("click", async(evt) =>{
evt.preventDefault();
let amount = document.querySelector(".amount input");
let amtVal = amount.value;
if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
}
//console.log(fromCurr.value, toCurr.value);
const URL = `${BASE_URl}/${fromCurr.value}/${toCurr.value}`;
// /USD/INR

let response = await fetch(URL);
let data = await response.json();


// let rate = data[toCurr.value]
fetch(`https://v6.exchangerate-api.com/v6/00f94399cab56bebf35b41d4/pair/${fromCurr.value}/${toCurr.value}`)
  .then(response => response.json())  // Convert response to JSON
  .then(data => {
    let rate = data.conversion_rate;  // Store conversion rate in a variable
    // console.log(rate);  // Print the value

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  })
});