/**User Story:
 * A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening. -> pulled from the API
 * Next to each party in the list is a delete button. The user clicks the delete button for one of the parties. -> click event listener
 * That party is then removed from the list. -> fetch delete
 * There is also a form that allows the user to enter information about a new party that they want to schedule. outline form in HTML with ids -> add functionality to save the input in the JS -> submit event listener
 * After filling out the form and submitting it, the user observes their party added to the list of parties. rerender the updated information -> mockAPI? */

//Step 1: Create a state object with the empty array for the API data to go into
const state = {
    plannedParties: [],
    fakeParties: [
        {
            "name": "Happy Hour at Grandad's",
            "description": "Come joing the team at Grandad's for some drinks and good conversation!",
            "date": "2025-03-20T00:00:00.000Z",
            "location": "Grandad's Pizzeria and Pub"
        }
    ],
}
/**{
 * "id": 1,
 * "name":,
 * description": 
 * "date":,
 * "locaiton": }
 */




//Step 2: Store the HTML parts as variables
const fullStackURL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-FTB-ET-WEB-PT/events`;

const root = document.querySelector("#root");
const form = document.querySelector("#form");
const submitButton = document.querySelector("#submitButton");
submitButton.setAttribute("type", "submit");



form.append(submitButton);


form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const newParty = {};
    Array.from(form.elements).forEach((element)=>{
        newParty[element.id]=element.value;
    })
    // addParty(event);
    console.log(newParty);
    addNewParty(newParty)});


//Step 3: Create a render function to display the data on the page
const render = (content) => {
    if (Array.isArray(content)){
    content.forEach((party) => {
        const partyContainer = document.createElement(`div`);
        partyContainer.classList.add(`partyContainer`);
        partyContainer.innerHTML = `
        <h1>Party Name: ${party.name}</h1>
        <p>Party Description: ${party.description}</p>
        <p>Party Date: ${party.date}</p>
        <p> Party Location: ${party.location}
        <br>
        <button id="deleteParty"> Delete Party </button>`
        root.append(partyContainer);
    })
} 
}




//Step 4: Write an async function to fetch the information from the API, using the try/catch model
const getParties = async() => {
    try{
        const res = await fetch(fullStackURL);
        const partyData = await res.json();
        state.plannedParties = partyData.data;
        console.log(state.plannedParties)
        render(state.plannedParties);
    } catch (error){
        console.error (`Error when fetching parties`, error);
    } 
    }
getParties();

//Step 4: write a function that add a json object to the plannedParties array
function addParty(event){
    event.preventDefault();
    const newParty = {};
    Array.from(form.elements).forEach((element)=>{
        newParty[element.id]=element.value;
    })
    console.log(newParty);
}

const addNewParty = async (party) => {
    console.log(party);
    try{
    const res = await fetch(fullStackURL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            name: party.name,
            description: party.description,
            date: `${party.date}T23:00:00.000Z`,
            location:party.location
        })
    })
    const data = await res.json();
    state.plannedParties = data;
    console.log("101 data",data);
}catch(error){
    console.error(error);
}
}


//Step 5: create a function that deletes the party object
const removeParty = async() => {
    try{
        if (!state.plannedParties.id){
            return}
        await fetch(`${fullStackURL}/${state.plannedParties.id}`, {method:"DELETE"});
        state.plannedParties = {};
    }catch{
        console.error(error);
    }

}
