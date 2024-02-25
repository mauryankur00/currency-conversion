const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const select = document.querySelectorAll(".dropdown select");
const button = document.querySelector("#btn");
const amount = document.querySelector(".value");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const revers =  document.querySelector(".exchange");
for (let option of select) {
    for (const val in countryList) {
        let addElement= document.createElement("option");
        addElement.innerText = val;
        addElement.value = val;
        option.append(addElement);
        
        if (option.name === "to"&& val === "INR"){
            addElement.selected = "selected";
        }
    else if(option.name == "from" && val == "USD")
    {
        addElement.selected = "selected";
    }
    
    }
    option.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag = (element)=>{
    let countryCode = countryList[element.value];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
const calculate = async (evt)=>{
    evt.preventDefault();
    console.log("pressed")
    console.log(amount.value)
    if (amount.value < 1 || amount.value == ""){
        amount.value = 1
    }
    console.log(fromCurr.value.toLowerCase())
    let url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
  let rate = data[toCurr.value.toLowerCase()];
  console.log(rate)
  if (rate) {
    let final = parseInt(amount.value) * rate;
    document.querySelector(".final").innerText = `${final} `;
    console.log(final);
} else {
    console.error("Invalid conversion rate");
}

}

 async function reverse(){
  

    [fromCurr.value, toCurr.value] = [toCurr.value, fromCurr.value];
    updateFlag(fromCurr);
    updateFlag(toCurr);
    amount.value = Math.max(1, amount.value || 1);
    calculate(new Event("click")); // Trigger the calculate function
}
button.addEventListener("click" , calculate);
revers.addEventListener("click",reverse);
