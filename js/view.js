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

function deselect_ability(ability_node) {
    for (var i = 0; i < selected_abilities.length; i++) {
        if (
            selected_abilities[i].name == ability_node.attr("name") &&
            selected_abilities[i].hero == ability_node.attr("hero")
        ) {
            selected_abilities.splice(i, 1);
            break;
        }
    }
}

function recalculate_counters() {
    // Can't just clear the array or rivets won't pick up on the change
    counter_abilities.length = 0;
    counter_abilities.push();
    counter_abilities.pop();

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

    $(document).on("click", "#available_abilities .ability", function() {
        select_ability($(this));
        recalculate_counters();
    });

    $(document).on("click", "#selected_abilities .ability", function() {
        deselect_ability($(this));
        recalculate_counters();
    });

});
