//
// Abilities
//

var selected_abilities = [];

var counter_abilities = [];


//
// Heroes
// 

var selected_heroes = [];

var available_heroes = heroes_from_abilities(abilities);

var enemy_heroes = [];

var suggested_counters = [];

var suggestion_explanations = [];

$(function() {

    rivets.bind(
        $('#selected_heroes'), {
            selected_heroes: selected_heroes
        }
    );

    rivets.bind(
        $('#available_heroes'), {
            available_heroes: available_heroes
       }
    );

    rivets.bind(
        $('#enemy_heroes'), {
            enemy_heroes: enemy_heroes
        }
    );

    rivets.bind(
        $('#suggested_counters'), {
            suggested_counters: suggested_counters
        }
    );

    $(document).on("click", "#available_heroes .hero", function(e) {
        // Normal click
        if (!e.shiftKey) { 
            if (selected_heroes.length == 5) {
                return;
            }
            selected_heroes.push($(this).attr("hero"));
            recalculate_counters();
        }

        // Shift click
        if (e.shiftKey) {
            if (enemy_heroes.length == 5) {
                return;
            }
            enemy_heroes.push($(this).attr("hero"));
        }
    });

    $(document).on("click", "#selected_heroes .hero", function(e) {
        selected_heroes.splice(
            selected_heroes.indexOf(
                $(this).attr("hero")
            ),
            1
        );
        recalculate_counters();
    });

    $(document).on("click", "#enemy_heroes .hero", function(e) {
        enemy_heroes.splice(
            enemy_heroes.indexOf(
                $(this).attr("hero")
            ),
            1
        );
    });

});


function recalculate_counters() {
    // Can't just clear the array or rivets won't pick up on the change
    counter_abilities.splice(0, counter_abilities.length);
    counter_abilities.push();
    counter_abilities.pop();
    selected_abilities.splice(0, selected_abilities.length);
    selected_abilities.push();
    selected_abilities.pop();

    _.each(
        selected_heroes,
        function (hero) {
            _.each(
                abilities_by_hero(abilities, hero),
                function (ability) {
                    selected_abilities.push(ability);
                }
            );
        }
    );

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

    // Update the list of heroes suggested, based on these newly calculated
    // abilities.
    suggested_counters.splice(0, suggested_counters.length);
    suggested_counters.push();
    suggested_counters.pop();

    _.each(most_frequent_heroes(counter_abilities, 5),
        function (hero) {
            suggested_counters.push(hero);
        }
    );

    //
    // Suggestion Explanations
    //
    suggestion_explanations.splice(0, suggestion_explanations.length);
    suggestion_explanations.push();
    suggestion_explanations.pop();

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

});
