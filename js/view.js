var selected_abilities = [];

var counter_abilities = [];

var available_abilities = abilities;

function select_ability(ability_node) {
    selected_abilities.push(
        get_ability(
            abilities, ability_node.attr("hero"), ability_node.attr("name")
        )
    );
}

function recalculate_counters() {
    counter_abilities.length = 0;
    _.each(
        _.flatten(
            _.map(
                selected_abilities,
                _.partial(
                    get_abilities_countering_ability, counters, abilities
                )
            )
        ), function(ability) {
            counter_abilities.push(ability);
        }
    );
}

document.addEventListener("DOMContentLoaded", function(event) {

    rivets.bind(
        $('#selected_abilities'), {
            selected_abilities: selected_abilities
        }
    );

    rivets.bind(
        $('#counter_abilities'), {
            counter_abilities: counter_abilities
        }
    );

    rivets.bind(
        $('#available_abilities'), {
            available_abilities: available_abilities
        }
    );

    $("#available_abilities .ability").on("click", function() {
        select_ability($(this));
        recalculate_counters();
    });

});
