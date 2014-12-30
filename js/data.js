function tags_for_ability(ability) {
    return _.flatten(
        _.map(
            ability.attributes, function (attributes) {
                return attributes.type;
            }
        )
    );
}

function ability_satisfies_tags(ability, tags) {
    return _.isEqual(
        _.intersection(
            tags_for_ability(ability), tags
        ).length,
        tags.length
    );
}

function abilities_by_tags(abilities, tags) {
    return _.filter(
        abilities, function (ability) {
            return ability_satisfies_tags(ability, tags)
        }
    );
}
