# Intended to be run via ipython
#
#   ipython -i load-json.py
#

import os
import simplejson

from leven import levenshtein as leven


DATA_PATH = os.path.join(
    os.path.dirname(os.path.realpath(__file__)), "../js/data/")


def load_json(filename, strip):
    """
    strip - a list of strings to find a replace to make the file file json
    """
    with open(os.path.join(DATA_PATH, filename), 'r') as f:
        data = "".join(f.readlines())
        for s in strip:
            data = data.replace(s, "")
        return simplejson.loads(data)


def write_json(filename, add, data):
    with open(os.path.join(DATA_PATH, filename), 'w') as f:
        data = "".join(simplejson.dumps(abilities, indent=2))
        data = add[0] + data + add[1]
        f.write(data)


def _merge_dicts(i, j):
    new = {}
    for k, v in i.iteritems():
        if k in j and isinstance(v, list):
            new[k] = v + j[k]
            j.pop(k)
    for k, v in j.iteritems():
        new[k] = v
    return new


def merge_duplicate_abilities(abilities):
    """
    Usage:

        abilities = merge_duplicate_abilities(abilities)
    """
    merged = []
    for i, i_item in enumerate(abilities):
        for j, j_item in enumerate(abilities):
            if j == i or j in merged or i in merged:
                continue
            if leven(i_item['name'], j_item['name']) <= 1 and \
                    leven(i_item['hero'], i_item['hero']) <= 1:
                print "Merging duplicates: ", i_item, j_item
                abilities[i] = _merge_dicts(i_item, j_item)
                merged.append(j)
    return [v for i, v in enumerate(abilities) if i not in merged]


def fix_hero_names(abilities):
    """
    abilities = fix_hero_names(abilities)
    """
    for i, item in enumerate(abilities):
        abilities[i]['hero'] = item['hero'].lower().replace(' ', '_').replace(
            '-', '_')
    return abilities


abilities = load_json("abilities.js", ["var abilities = ", ";"])

write_abilities = lambda: write_json(
    "abilities.js", ["var abilities = ", ";"], abilities)
