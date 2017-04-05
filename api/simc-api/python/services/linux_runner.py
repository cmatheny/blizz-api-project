import subprocess


def get_simc_armory_to_json_command(locale, realm, character, id):
    armory_string = "armory={},{},{}".format(locale, realm, character)
    json_string = "json2={}.json".format(id)
    call_list = ["simc", armory_string, json_string]
    return call_list


def run_command(proc):
    exit_code = subprocess.call(proc['command'])
    return exit_code
