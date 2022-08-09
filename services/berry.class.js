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
