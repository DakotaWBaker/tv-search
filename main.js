const search = document.getElementById(searchForm);
let imageList = document.getElementById("images");
const btn = document.getElementById("reset");

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userInput = searchForm.elements.query.value;
  const response = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${userInput}`
  );
  console.log(response.data[0].show.image.medium);
  makeImages(response.data);
  searchForm.elements.query.value = "";
});
const makeImages = (shows) => {
  for (let result of shows) {
    console.log(result);
    const img = document.createElement("img");
    img.src = result.show.image.medium;
    imageList.appendChild(img);
    btn.addEventListener("click", (e) => {
      if (e.target.id === "reset") {
        imageList.removeChild(img);
      }
    });
  }
};

