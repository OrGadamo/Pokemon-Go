let pokemonAnime = [];
class PokeAnime {
  constructor(pic, title, description, episodes, score, start, end) {
    this.pic = pic;
    this.title = title;
    this.description = description;
    this.episodes = episodes;
    this.score = score;
    this.start = PokeAnime.getCleanDate(start);
    this.end = PokeAnime.getCleanDate(end);
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
          anime["end_date"]
        )
      );
    });
    return classArr;
  }
}
//Pokemo Anime Fetch
async function getAnimeAPI() {
  try {
    return await fetch("https://api.jikan.moe/v3/search/anime?q=pokemon")
      .then((res) => res.json())
      .then((res) => res.results);
  } catch (e) {
    console.log(e);
  }
}
function check() {
  getAnimeAPI().then((res) => {
    pokemonAnime = PokeAnime.switchAPIDataToClass(res);
    console.log(pokemonAnime);
  });
}
