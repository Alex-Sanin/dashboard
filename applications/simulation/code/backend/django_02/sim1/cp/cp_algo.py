# if date[i] == '01/01/2023' and time[i] == '17:00:00':

from .cp_file_handler import *

def cp_algo(date, time, consumer_buy_tariff, battery_buy_tariff, energy_demand,
            energy_supply, battery_size, battery_power, kwh_battery_cost, t_battery_cost, grid_power,
            output_file, customer_name, simulation_name, grid_connection, total_pv_cost, pv_size):

    for i in range(len(energy_supply)):
            energy_supply[i] = energy_supply[i] * pv_size

    # Energy variables
    supplier_sell_energy_to_consumer = [0] * len(consumer_buy_tariff)
    supplier_sell_money_to_consumer = [0] * len(consumer_buy_tariff)
    supplier_sell_energy_to_battery = [0] * len(consumer_buy_tariff)
    supplier_sell_money_to_battery = [0] * len(consumer_buy_tariff)
    battery_sell_energy_to_consumer = [0] * len(consumer_buy_tariff)
    battery_sell_money_to_consumer = [0] * len(consumer_buy_tariff)
    battery_sell_energy_to_supplier = [0] * len(consumer_buy_tariff)
    battery_sell_money_to_supplier = [0] * len(consumer_buy_tariff)
    supplier_buy_tariff = battery_buy_tariff
    battery_charge_plan = [0] * len(consumer_buy_tariff)
    battery_levels_of_energy = [0] * len(consumer_buy_tariff)
    battery_prev_energy_level = battery_initial_level_of_energy
    available_capacity_to_charge = [0] * len(consumer_buy_tariff)
    battery_charge_reason = [0] * len(consumer_buy_tariff)

    # ---------------------------- PV ----------------------------
    surplus_energy_till_tariff_is_high = [0] * len(consumer_buy_tariff)
    amount_of_energy_to_full_battery_from_the_grid = [0] * len(consumer_buy_tariff)
    pv_sell_energy_to_consumer = [0] * len(consumer_buy_tariff)
    pv_sell_energy_to_battery = [0] * len(consumer_buy_tariff)
    pv_sell_energy_to_supplier = [0] * len(consumer_buy_tariff)
    pv_sell_money_to_consumer = [0] * len(consumer_buy_tariff)
    pv_sell_money_to_battery = [0] * len(consumer_buy_tariff)
    pv_sell_money_to_supplier = [0] * len(consumer_buy_tariff)
    # ---------------------------- PV ----------------------------

    # Go over all data
    for i in range(len(consumer_buy_tariff)):

        # ---------------------------- SETTINGS ----------------------------
        # Available power to charge / discharge
        if float(grid_power) > float(energy_demand[i]):
            available_capacity_to_charge[i] = float(grid_power) - float(energy_demand[i])
        else:
            available_capacity_to_charge[i] = float(grid_power)

        # Current tariff
        if float(supplier_buy_tariff[i]) < float(consumer_buy_tariff[i]):
            tariff_now = "Low"
        else:
            tariff_now = "High"

        # Current surplus
        if float(energy_supply[i]) > float(energy_demand[i]):
            surplus_energy_now = float(energy_supply[i]) - float(energy_demand[i])
        else:
            surplus_energy_now = 0
        # ---------------------------- END SETTINGS ----------------------------

        # ---------------------------- PV SURPLUS ----------------------------
        # Amount to charge from the PV
        # Amount ot charge from the grid
        if tariff_now == "Low":
            for j in range(i, len(consumer_buy_tariff)):
                surplus_energy_next = float(energy_supply[j]) - float(energy_demand[j])
                if float(supplier_buy_tariff[j]) < float(consumer_buy_tariff[j]):
                    if surplus_energy_next > 0:
                        surplus_energy_till_tariff_is_high[i] = surplus_energy_till_tariff_is_high[i] + surplus_energy_next
                else:
                    break;
            amount_of_energy_to_full_battery_from_the_grid[i] = zero_out(battery_size - battery_prev_energy_level -
                                                                         surplus_energy_till_tariff_is_high[i])
        # ---------------------------- END PV SURPLUS ----------------------------

        # ---------------------------- CHARGING ----------------------------
        pv_remaining = 0
        if tariff_now == "Low":
            if surplus_energy_now > 0:
                pv_sell_energy_to_consumer[i] = float(energy_demand[i])
                battery_charge_plan[i] = min(surplus_energy_now, battery_power)
                if battery_charge_plan[i] + battery_levels_of_energy[i-1] > battery_size:
                    battery_charge_plan[i] = battery_size - battery_levels_of_energy[i-1]
                if battery_charge_plan[i] > 0:
                    battery_charge_reason[i] = 'Over Production'
                pv_sell_energy_to_battery[i] = float(battery_charge_plan[i])
                if energy_supply[i] > pv_sell_energy_to_consumer[i] + pv_sell_energy_to_battery[i]:
                    pv_remaining = energy_supply[i] - (pv_sell_energy_to_consumer[i] + pv_sell_energy_to_battery[i])
                    pv_sell_energy_to_supplier[i] = min(float(pv_remaining), float(grid_connection))
                    #pv_sell_energy_to_supplier[i] = min(pv_remaining, grid_connection)
            else: # Charge from the grid
                pv_sell_energy_to_consumer[i] = float(energy_supply[i])
                supplier_sell_energy_to_consumer[i] = min((float(energy_demand[i]) - pv_sell_energy_to_consumer[i]), float(grid_connection))
                if amount_of_energy_to_full_battery_from_the_grid[i] > 0:
                    battery_charge_plan[i] = min(available_capacity_to_charge[i],
                                                  amount_of_energy_to_full_battery_from_the_grid[i])
                    battery_charge_reason[i] = 'Low Tariff'
                    supplier_sell_energy_to_battery[i] = battery_charge_plan[i]
                    #if date[i] == '01/01/2023' and time[i] == '10:00:00':
                    #    print("available_capacity_to_charge[i]", available_capacity_to_charge[i])
                    #    print("amount_of_energy_to_full_battery_from_the_grid[i]", amount_of_energy_to_full_battery_from_the_grid[i])
                    #    print("supplier_sell_energy_to_battery[i]", supplier_sell_energy_to_battery[i])
        # ---------------------------- END CHARGING ----------------------------

        # ---------------------------- DISCHARGING ----------------------------
        consumer_demand_remaining = 0
        pv_remaining = 0
        if tariff_now == "High":
            if (float(energy_supply[i]) > float(energy_demand[i])): # supply > demand
                pv_sell_energy_to_consumer[i] = float(energy_demand[i]) # all demand from pv
                pv_remaining = float(energy_supply[i]) - float(pv_sell_energy_to_consumer[i]) # remaining pv
            else: # supply < demand
                pv_sell_energy_to_consumer[i] = energy_supply[i] # all pv to demand
                consumer_demand_remaining = float(energy_demand[i]) - float(pv_sell_energy_to_consumer[i]) # consumer need more energy
                pv_remaining = 0 # nothing left in the pv
                if battery_levels_of_energy[i-1] > consumer_demand_remaining and battery_power > consumer_demand_remaining:
                    # do we have enough energy in the battery and can we fully discharge
                    battery_sell_energy_to_consumer[i] = consumer_demand_remaining
                    battery_charge_plan[i] = -battery_sell_energy_to_consumer[i]
                    battery_charge_reason[i] = 'High Tariff'
                else: # battery cannot give all needed energy to consumer
                    battery_sell_energy_to_consumer[i] = min(battery_levels_of_energy[i-1], battery_power)
                    battery_charge_plan[i] = -battery_sell_energy_to_consumer[i]
                    battery_charge_reason[i] = 'High Tariff'
                    consumer_demand_remaining = consumer_demand_remaining - battery_sell_energy_to_consumer[i]
                    if consumer_demand_remaining > battery_sell_energy_to_consumer[i]: # consumer need more energy
                        supplier_sell_energy_to_consumer[i] = consumer_demand_remaining

            if pv_remaining > 0: # some left in the pv after satisfying entire consumer's demand
                #if (pv_remaining > grid_connection): # can we push all energy to the grid
                if (float(pv_remaining) > float(grid_connection)): # can we push all energy to the grid
                    pv_sell_energy_to_supplier[i] = float(grid_connection) # pv sell to supplier up to grid connection limit
                    #pv_remaining = pv_remaining - pv_sell_energy_to_supplier[i] # some still remaining in the pv
                    pv_remaining = float(pv_remaining) - float(pv_sell_energy_to_supplier[i]) # some still remaining in the pv
                else: # pv less than grid connection
                    pv_sell_energy_to_supplier[i] = float(pv_remaining)
                    pv_remaining = 0

            if battery_charge_plan[i] < battery_power: # some left in the battery after satisfying entire consumer's demand
                #remaining_energy_to_supplier_after_pv = float(grid_connection) - pv_sell_energy_to_supplier[i]
                remaining_energy_to_supplier_after_pv = float(grid_connection) - float(pv_sell_energy_to_supplier[i])
                remaining_power_to_discharge = battery_power - abs(battery_charge_plan[i])
                remaining_energy_in_the_battery = battery_levels_of_energy[i-1] - abs(battery_charge_plan[i])
                battery_sell_energy_to_supplier[i] = min(remaining_energy_to_supplier_after_pv, battery_levels_of_energy[i-1],
                                                         remaining_power_to_discharge, remaining_energy_in_the_battery,
                                                         float(grid_connection)) # sell battery energy to the supplier
                battery_charge_plan[i] = battery_charge_plan[i] -battery_sell_energy_to_supplier[i]
                battery_charge_reason[i] = 'High Tariff'
                #if date[i] == '01/01/2023' and time[i] == '17:00:00':
                #    print("time = ", time[i])
                #    print("remaining_energy_to_supplier_after_pv", remaining_energy_to_supplier_after_pv)
                #    print("remaining_power_to_discharge", remaining_power_to_discharge)
                #    print("battery_levels_of_energy[i-1]", battery_levels_of_energy[i-1])
                #    print("battery_levels_of_energy[i]", battery_levels_of_energy[i])
                #    print("battery_sell_energy_to_supplier[i]", battery_sell_energy_to_supplier[i])
                #    print("remaining_energy_in_the_battery", remaining_energy_in_the_battery)
        # ---------------------------- END DISCHARGING ----------------------------

        # ---------------------------- NEW LEVEL OF ENERGY ----------------------------
        battery_new_energy_level = battery_prev_energy_level + battery_charge_plan[i]
        # ---------------------------- END NEW LEVEL OF ENERGY ----------------------------

        # ---------------------------- NOT OVER BATTERY SIZE ----------------------------
        if battery_new_energy_level > battery_size:
            battery_charge_plan[i] = battery_size - battery_levels_of_energy[i-1]
            battery_new_energy_level = battery_size
            if battery_charge_plan[i] == 0:
                battery_charge_reason[i] = ''
        # ---------------------------- END NOT OVER BATTERY SIZE ----------------------------

        # ---------------------------- NOT BELOW ZERO ----------------------------
        if battery_new_energy_level <= 0:
            battery_charge_plan[i] = 0 - battery_levels_of_energy[i-1]
            battery_new_energy_level = 0
            if battery_charge_plan[i] == 0:
                battery_charge_reason[i] = ''
        # ---------------------------- END NOT BELOW ZERO ----------------------------

        # ---------------------------- NEW LEVEL OF ENERGY ----------------------------
        battery_prev_energy_level = battery_new_energy_level
        battery_levels_of_energy[i] = battery_levels_of_energy[i-1] + battery_charge_plan[i]
        # ---------------------------- END NEW LEVEL OF ENERGY ----------------------------

        # ---------------------------- COST DATA ----------------------------
        supplier_sell_money_to_consumer[i] = float(supplier_sell_energy_to_consumer[i]) * float(consumer_buy_tariff[i])
        supplier_sell_money_to_battery[i] = float(supplier_sell_energy_to_battery[i]) * float(supplier_buy_tariff[i])
        battery_sell_money_to_consumer[i] = battery_sell_energy_to_consumer[i] * float(consumer_buy_tariff[i])
        battery_sell_money_to_supplier[i] = battery_sell_energy_to_supplier[i] * float(supplier_buy_tariff[i])
        pv_sell_money_to_consumer[i] = float(pv_sell_energy_to_consumer[i]) * float(consumer_buy_tariff[i])
        pv_sell_money_to_battery[i] = float(pv_sell_energy_to_battery[i]) * float(supplier_buy_tariff[i])
        pv_sell_money_to_supplier[i] = float(pv_sell_energy_to_supplier[i]) * float(supplier_buy_tariff[i])
        # ---------------------------- COST DATA ----------------------------

    # ---------------------------- WRITE TO FILE ----------------------------
    roi, total_investment, t_cost, t_income, operation_profit, pv_income, battery_income, npv_10_years, npv_15_years, npv_20_years, npv_25_years, irr_10_years, irr_15_years, irr_20_years, irr_25_years = write_data(
               date,
               time,
               supplier_buy_tariff,
               consumer_buy_tariff,
               battery_buy_tariff,
               energy_demand,
               energy_supply,
               amount_of_energy_to_full_battery_from_the_grid,
               surplus_energy_till_tariff_is_high,
               available_capacity_to_charge,
               battery_charge_plan,
               battery_charge_reason,
               battery_levels_of_energy,
               supplier_sell_energy_to_battery,
               supplier_sell_money_to_battery,
               supplier_sell_energy_to_consumer,
               supplier_sell_money_to_consumer,
               battery_sell_energy_to_consumer,
               battery_sell_money_to_consumer,
               battery_sell_energy_to_supplier,
               battery_sell_money_to_supplier,
               pv_sell_energy_to_consumer,
               pv_sell_money_to_consumer,
               pv_sell_energy_to_battery,
               pv_sell_money_to_battery,
               pv_sell_energy_to_supplier,
               pv_sell_money_to_supplier,
               battery_size,
               battery_power,
               kwh_battery_cost,
               t_battery_cost,
               grid_power,
               output_file,
               customer_name,
               simulation_name,
               pv_size,
               total_pv_cost)
    return roi, total_investment, t_cost, t_income, operation_profit, pv_income, battery_income, npv_10_years, npv_15_years, npv_20_years, npv_25_years, irr_10_years, irr_15_years, irr_20_years, irr_25_years