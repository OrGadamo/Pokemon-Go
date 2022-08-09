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
