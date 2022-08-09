//pokemon anime class
class PokeAnime {
  constructor(pic, title, description, episodes, score, start, end, link) {
    this.pic = pic;
    this.title = title;
    this.description = description;
    this.episodes = episodes;
    this.score = score;
    this.start = PokeAnime.getCleanDate(start);
    this.end = PokeAnime.getCleanDate(end);
    this.link = link;
  }

  static getCleanDate(str) {
    if (!str) return null;
    let newstr = str.substr(0, 10);
    newstr = newstr.replace("-", "/");
    newstr = newstr.split();
    newstr = newstr.reverse();
    newstr = newstr.join("");
    return newstr;
  }

  static switchAPIDataToClass(data) {
    let classArr = [];
    data.forEach((anime) => {
      classArr.push(
        new PokeAnime(
          anime["image_url"],
          anime["title"],
          anime["synopsis"],
          anime["episodes"],
          anime["score"],
          anime["start_date"],
          anime["end_date"],
          anime["url"]
        )
      );
    });
    return classArr;
  }

  getAnimeStars() {
    let score = Math.floor(this.score);
    let result = "";
    for (let i = 0; i < score; i++) {
      result += `<i class="fas fa-star anime_star"></i>`;
    }
    if (this.score - score > 0)
      result += `<i class="fas fa-star-half anime_star"></i>`;
    return result;
  }

  getAnimeCard() {
    return ` 
      <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 d-flex justify-content-center">
      <div class="card text-white bg-dark">
      <a href="${this.link}" target="_blank">
      <img src="${this.pic}" class="card-img-top" alt="Fissure in Sandstone"/>
      </a>  
      <div class="card-body">
          <h2 class="card-title">${this.title}</h2>
          <h5>Episodes: ${this.episodes} </h5>
          <h5>Start Date:${this.start} </h5>
          <h5>End Date:${this.end ? this.end : "none"} </h5>
          <h5>Score: ${this.getAnimeStars()} </h5>
          <h5>Description:  </h5>
          <p>${this.description}</p>
        </div>
      </div>
    </div>
      `;
  }
}
