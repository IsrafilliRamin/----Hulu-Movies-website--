const data = localStorage.getItem("movie");
const obj = JSON.parse(data);
console.log(obj);
const container = document.querySelector(".container");
const BASE_URL = "https://image.tmdb.org/t/p/original";

window.addEventListener("load", () => {
  const newData = [];
  newData.push(obj);
  console.log(newData);
  const bgImage = BASE_URL + newData[0].backdrop_path;
  container.innerHTML = "";
  let moviesData = newData
    .map((item, index) => {
      let img = BASE_URL + item.poster_path;
      return `
                <div class="obacity">
                <div class="movie">
                <a href="../movie/movie.html"> <div class="close"><i class="fa-solid fa-rotate-left"></i></div></a>
                <div class="imageContainer">
                <img src=${img} alt="">    
                </div>
                </div>
                <div class="textContainer">
                    <h1>${item.title}</h1>
                    <div class="imdb">
                        <span>${item.vote_average}</span>
                    </div>
                    <p class="desc">${item.overview}</p><br>
                    <span class="date">${item.release_date}</span>
                </div>
                
                <div class="videoContainer">
                  <video src="../movie/mainVideo.mp4" controls class="video"/>
                </div>
                </div>
              
                
                `;
    })
    .join();

  console.log(bgImage);
  container.style.backgroundImage = `url(${bgImage})`;
  container.innerHTML = moviesData;
});
