//set initial variables
const search = document.getElementById(searchForm);
let imageList = document.getElementById("images");
const btn = document.getElementById("reset");

  

//add event listener to searchForm listening for event. runs async function with parameter e
searchForm.addEventListener("submit", async function (e) {
  e.preventDefault(); //prevents default search submit
  const userInput = searchForm.elements.query.value; //assigns search form user value to variable
  const response = await axios.get( //axios to api fetch
    `https://api.tvmaze.com/search/shows?q=${userInput}` //api link with userInput from search form as endpoint
  );
  console.log(response.data[0].show.image.medium);
  makeImages(response.data); //calls function with parameter response.data
  searchForm.elements.query.value = ""; //clears search form 
});
const makeImages = (shows) => {
  for (let result of shows) { //for loop to iterate over all shows from userinput endpoint
    console.log(result);
    const img = document.createElement("img"); //create new image element each loop
    img.src = result.show.image.medium; //sets image source to dot notation of object getting medium image
    imageList.appendChild(img);
    setTimeout(() => {
      document.body.style.backgroundColor = 'gray';
    }, 1000) //appends each img to imageList empty div
    btn.addEventListener("click", (e) => {   //event listener on reset button to remove all added children elements
      if (e.target.id === "reset") {
        imageList.removeChild(img);
        document.body.style.backgroundColor = '#faa307';
      }
    });
  }
};

