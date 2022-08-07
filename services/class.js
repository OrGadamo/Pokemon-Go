//new pokemon class
class Pokemon {
  constructor(
    name,
    front_pic,
    back_pic,
    species,
    pastType,
    stats,
    type,
    moves,
    abilities
  ) {
    this.name = Pokemon.getPokemonNameCaptilise(name);
    this.front_pic = front_pic;
    this.back_pic = back_pic;
    this.species = species;
    this.pastType = pastType;
    this.stats = stats;
    this.type = type;
    this.moves = moves;
    this.abilities = abilities;
  }
  static getPokemonNameCaptilise(name) {
    return name[0].toUpperCase() + name.substr(1);
  }
  static switchAPIPokemonToClass(pokemon) {
    return new Pokemon(
      pokemon.name,
      pokemon.sprites.other.dream_world.front_default,
      pokemon.sprites.back_default,
      pokemon.species.name,
      Pokemon.CheckPastTypes(pokemon.past_types),
      Pokemon.getCleanStats(pokemon.stats),
      Pokemon.getCleanTypes(pokemon.types),
      Pokemon.getMoveList(pokemon.moves),
      Pokemon.getAbillities(pokemon.abilities)
    );
  }
  static CheckPastTypes(pastArr) {
    return pastArr.length > 0 ? pastArr : null;
  }
  static getCleanStats(stats) {
    let newStats = [];
    stats.forEach((stat) => {
      newStats.push({
        num_stat: stat["base_stat"],
        name_stat: stat["stat"]["name"],
      });
    });
    return newStats;
  }
  static getCleanTypes(types) {
    let newType = [];
    if (Array.isArray(types)) {
      types.forEach((type) => {
        newType.push(type["type"]["name"]);
      });
    } else {
      newType.push(types["type"]["name"]);
    }
    return newType;
  }
  static getMoveList(moves) {
    let movesList = [];
    moves.map((move) => {
      if (movesList.length < 6) movesList.push(move["move"]["name"]);
    });
    return movesList;
  }
  static getAbillities(abilities) {
    let abilitiesList = [];
    if (Array.isArray(abilities)) {
      abilities.forEach((ability) => {
        abilitiesList.push(ability.ability.name);
      });
    } else {
      abilitiesList.push(abilities ? abilities.ability.name : null);
    }
    return abilitiesList;
  }
  getStringStats() {
    let result = "";
    this.stats.forEach((stat) => {
      result += `${stat.num_stat}-${stat.name_stat} `;
    });
    return result;
  }
  getStringTypes() {
    let result = "";
    this.type.forEach((type_name) => {
      result += result == "" ? type_name : `, ${type_name}`;
    });
    return result;
  }
  getStringAbilities() {
    let result = "";
    this.abilities.forEach((ability) => {
      result += result == "" ? ability : `, ${ability}`;
    });
    return result;
  }
  getStringMoves() {
    let result = "";
    this.moves.forEach((move) => {
      result += result == "" ? move : `, ${move}`;
    });
    return result;
  }
  getSpecificStats(stat_name) {
    let numStat;
    this.stats.map((obj) => {
      if (obj.name_stat == stat_name) numStat = obj.num_stat;
    });
    return numStat;
  }
}
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
//berries class
class Berry {
  constructor(id, name, power, type, size) {
    this.id = id;
    this.power = power;
    this.name = name;
    this.type = type;
    this.size = size;
    this.cost = power / 2;
  }
  static getBerriesArr(data) {
    let arr = [];
    for (let berry of data) {
      arr.push(
        new Berry(
          berry.id,
          berry.name,
          berry.natural_gift_power,
          berry.natural_gift_type.name,
          berry.size
        )
      );
    }
    return arr;
  }
}
