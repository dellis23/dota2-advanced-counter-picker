abilities = [
    {
        "hero": "omniknight",
        "name": "Repel",
        "attributes": [
            {
                "target": "unit",
                "team": ["allies", "enemies"],
                "type": ["magic-immunity"],
            },
            {
                "target": "unit",
                "team": ["allies"],
                "type": ["negative-dispel"],
            },
            {
                "target": "unit",
                "team": ["enemies"],
                "type": ["positive-dispel"],
            },
        ],
    },
    {
        "hero": "omniknight",
        "name": "Purification",
        "attributes": [
            {
                "target": "unit",
                "team": ["allies"],
                "type": ["heal"],
            },
            {
                "target": "aoe",
                "team": ["enemies"],
                "type": ["pure-damage"],
            },
        ],
    },
    {
        "hero": "omniknight",
        "name": "Degen Aura",
        "attributes": [
            {
                "target": "aura",
                "team": ["enemies"],
                "type": ["slow-attack-speed", "slow-move-speed"],
            },
        ],
    },
    {
        "hero": "omniknight",
        "name": "Guardian Angel",
        "attributes": [
            {
                "target": "none",
                "team": ["allies"],
                "type": ["physical-immunity"],
            },
        ],
    },
    {
        "hero": "abbadon",
        "name": "Curse of Avernus",
        "attributes": [
            {
                "target": "passive",
                "team": ["enemies"],
                "type": ["slow-move-speed", "slow-attack-speed"],
            },
            {
                "target": "passive",
                "team": ["allies"],
                "type": ["bonus-move-speed", "bonus-attack-speed"],
            },
        ],
    },
    {
        "hero": "ancient-apparition",
        "name": "Ice Blast",
        "attributes": [
            {
                "target": "point",
                "team": ["enemies"],
                "type": [
                    "pierces-magic-immunity", "magic-damage", 
                    "damage-over-time", "global"
                ],
            },
        ],
    },
    {
        "hero": "anti-mage",
        "name": "Mana Void",
        "attributes": [
            {
                "target": "unit",
                "team": ["enemies"],
                "type": ["pierces-magic-immunity", "stun"],
            },
            {
                "target": "aoe",
                "team": ["enemies"],
                "type": ["pierces-magic-immunity", "magic-damage"],
            },
        ],
    },
];
