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
    });

});
