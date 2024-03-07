from datetime import datetime
from .cp_algo import cp_algo
from .cp_utilities import *
from .cp_file_handler import *
from .cp_global_settings import *

def cp_loop(user_name, customer_name, simulation_name, battery_sizes, battery_charge_powers, kwh_battery_costs,
            pv_sizes, pv_costs, grid_connection, simulation_input_file):

    created_time = datetime.now().strftime("%d-%m-%Y_%H:%M:%S")
    permutations = 0
    results_files = []
    per = len(battery_sizes) * len(battery_charge_powers) * len(kwh_battery_costs) * len(pv_sizes) * len(pv_costs)
    summary_results = [[0 for x in range(24)] for y in range(per)]

    date, time, consumer_buy_tariff, battery_buy_tariff, energy_demand, energy_supply = read_data(user_name, customer_name,
                                                                                                  simulation_name, simulation_input_file)

    for battery_size in battery_sizes:
        for battery_power in battery_charge_powers:
            for kwh_battery_cost in kwh_battery_costs:
                for pv_size in pv_sizes:
                    for pv_cost in pv_costs:
                        total_battery_cost = total_cost_of_battery(battery_size, kwh_battery_cost)
                        total_pv_cost = total_cost_of_battery(pv_size, pv_cost)
                        permutations_attributes = "bs" + str(battery_size) + "(MWh)_" + \
                        "bp" + str(battery_power) + "(MW)_" + \
                        "bc" + str(kwh_battery_cost) + "($)_" + \
                        "ps" + str(pv_size) + "(MW)_" + \
                        "pc" + str(pv_cost) + "($)_" + \
                        "gc" + str(grid_connection) + "(MW)_"
                        print(get_current_number_of_simulations(), ": " + permutations_attributes)
                        permutations = permutations + 1
                        output_file = get_simulation_folder(user_name, customer_name, simulation_name)+"/output/cp_" + permutations_attributes + created_time+".csv"
                        results_files.append(output_file)
                        roi, investment, cost, income, operation_profit, pv_income, battery_income, npv_10_years, npv_15_years, npv_20_years, npv_25_years, irr_10_years, irr_15_years, irr_20_years, irr_25_years = cp_algo(
                                                date, time, consumer_buy_tariff,
                                                battery_buy_tariff, energy_demand,
                                                energy_supply, battery_size, battery_power, kwh_battery_cost,
                                                total_battery_cost,
                                                grid_connection, output_file, customer_name, simulation_name, grid_connection,
                                                total_pv_cost, pv_size)
    
                        summary_results[get_current_number_of_simulations()-1][1] = created_time
                        summary_results[get_current_number_of_simulations()-1][2] = battery_size
                        summary_results[get_current_number_of_simulations()-1][3] = battery_power
                        summary_results[get_current_number_of_simulations()-1][4] = total_battery_cost
                        summary_results[get_current_number_of_simulations()-1][5] = pv_size
                        summary_results[get_current_number_of_simulations()-1][6] = total_pv_cost
                        summary_results[get_current_number_of_simulations()-1][7] = grid_connection
                        summary_results[get_current_number_of_simulations()-1][8] = round(roi, 1)
                        summary_results[get_current_number_of_simulations()-1][9] = output_file
                        summary_results[get_current_number_of_simulations()-1][10] = investment
                        summary_results[get_current_number_of_simulations()-1][11] = -cost
                        summary_results[get_current_number_of_simulations()-1][12] = income
                        summary_results[get_current_number_of_simulations()-1][13] = operation_profit
                        summary_results[get_current_number_of_simulations()-1][14] = pv_income
                        summary_results[get_current_number_of_simulations()-1][15] = battery_income
                        summary_results[get_current_number_of_simulations()-1][16] = npv_10_years
                        summary_results[get_current_number_of_simulations()-1][17] = npv_15_years
                        summary_results[get_current_number_of_simulations()-1][18] = npv_20_years
                        summary_results[get_current_number_of_simulations()-1][19] = npv_25_years
                        summary_results[get_current_number_of_simulations()-1][20] = irr_10_years
                        summary_results[get_current_number_of_simulations()-1][21] = irr_15_years
                        summary_results[get_current_number_of_simulations()-1][22] = irr_20_years
                        summary_results[get_current_number_of_simulations()-1][23] = irr_25_years
                        set_current_number_of_simulations(get_current_number_of_simulations()+1)

    summary_file = write_summary(user_name, customer_name, simulation_name, results_files)
    return summary_results, summary_file