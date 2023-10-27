class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;

    species;
    height;
    abilities = [];
    hp;
    attack;
    defense;

    convertAbilitiesToList = (pokemonAbilities) =>
      pokemonAbilities.map((ability) => ability.ability.name)

      convertMovesToList = (pokemonMoves) =>
      pokemonMoves.map((move) => move.move.name)
}
