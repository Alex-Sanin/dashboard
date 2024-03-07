from cp_loop import *
from cp_user_input_validation import *

battery_sizes = []
battery_sizes_range = {
    "min": 8,
    "max": 8,
    "steps":1
}
battery_charge_powers = []
battery_charge_power_range = {
    "min": 2,
    "max": 2,
    "steps": 1
}
kwh_battery_costs = []
kwh_battery_cost_range = {
    "min": 300,
    "max": 300,
    "steps": 30
}

customer_name = "c1"
simulation_name = "s1"

validation = validate_user_inputs(customer_name, simulation_name, battery_sizes_range, battery_charge_power_range, kwh_battery_cost_range)
if validation == "ok":
    create_customer_folder(customer_name)
    create_simulation_folder(customer_name, simulation_name)
    battery_sizes = calc_range(battery_sizes_range)
    battery_charge_powers = calc_range(battery_charge_power_range)
    kwh_battery_costs = calc_range(kwh_battery_cost_range)
    #save input file()
    #print_principles(customer_name, simulation_name, battery_sizes, battery_charge_powers, kwh_battery_costs)
    cp_loop(customer_name, simulation_name, battery_sizes, battery_charge_powers, kwh_battery_costs)
else:
    print("file else validation:", validation)

