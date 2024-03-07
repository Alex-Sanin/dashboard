import json
import csv
from datetime import datetime
from .cp_utilities import *
from .cp_db_handler import *
from .cp_algo_post_processing import *

# Read data from a file
def read_data(user_name, customer_name, simulation_name, simulation_input_file):

    # Variables
    date = []
    time = []
    supplier_buy_tariff_virtual = []
    battery_buy_tariff = []
    consumer_buy_tariff = []
    energy_demand = []
    energy_supply = []
    simulation_input_file = get_simulation_folder(user_name, customer_name, simulation_name)+"/input/"+input_file

    if not os.path.exists(simulation_input_file):
        simulation_input_file = get_default_input_folder(user_name)+input_file

    # Read consumption data
    with open(simulation_input_file, "r") as file:
        csv_reader = csv.reader(file)

        # Skip headers lines
        for i in range(1):
            next(csv_reader)

        # Read data
        for line in csv_reader:
            date.append(line[0])
            time.append(line[1])
            energy_demand.append(float(line[2]))
            energy_supply.append(float(line[3]))
            consumer_buy_tariff.append(line[4])
            battery_buy_tariff.append(line[5])
            supplier_buy_tariff_virtual.append(line[5])
        file.close()

        #print("read_data: energy_supply", energy_supply)
        #for i in range(len(energy_supply)):
        #    energy_supply[i] = energy_supply[i] * pv_size
        
        for i in range(len(energy_demand)):
            energy_demand[i] = energy_demand[i]

    return date, time, consumer_buy_tariff, battery_buy_tariff, energy_demand, energy_supply

# Write data to a file
def write_data(date,
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
               total_pv_cost):

    validation = 0

    t_pv_income = 0
    
    for i in range(0, len(battery_buy_tariff)):
        validation = validation + float(battery_buy_tariff[i]) + float(consumer_buy_tariff[i]) + float(
            energy_demand[i]) + float(available_capacity_to_charge[i]) + \
                     float(battery_charge_plan[i]) + float(battery_levels_of_energy[i]) + float(supplier_sell_money_to_battery[i]) + \
                     float(battery_sell_money_to_consumer[i]) + \
                     float(battery_sell_money_to_supplier[i]) + \
                     float(battery_sell_energy_to_consumer[i]) + float(supplier_sell_energy_to_consumer[i]) + \
                     float(battery_sell_energy_to_supplier[i]) + float(supplier_sell_energy_to_battery[i]) + \
                     float(amount_of_energy_to_full_battery_from_the_grid[i]) + \
                     float(surplus_energy_till_tariff_is_high[i]) + float(pv_sell_energy_to_consumer[i]) + \
                     float(pv_sell_money_to_consumer[i]) + float(pv_sell_energy_to_battery[i]) + \
                     float(pv_sell_money_to_battery[i]) + float(pv_sell_energy_to_supplier[i]) + float(pv_sell_money_to_supplier[i])
    #print("Validation =", round(validation)%10000)

    #pv_cost = pv_size * pv_cost_per_mw
    t_battery_cost_nis = t_battery_cost * dollar_to_nis
    total_investment = t_battery_cost_nis + total_pv_cost
    pv_maintenance = pv_maintenance_per_mw * pv_size
    t_supplier_sell_money_to_consumer = sum(supplier_sell_money_to_consumer)
    t_supplier_sell_money_to_battery = sum(supplier_sell_money_to_battery)
    t_battery_sell_money_to_consumer = sum(battery_sell_money_to_consumer)
    t_battery_sell_money_to_supplier = sum(battery_sell_money_to_supplier)
    t_pv_sell_money_to_consumer = sum(pv_sell_money_to_consumer)
    t_pv_sell_money_to_supplier = sum(pv_sell_money_to_supplier)
    t_supplier_sell_energy_to_consumer = sum(supplier_sell_energy_to_consumer)
    t_supplier_sell_energy_to_battery = sum(supplier_sell_energy_to_battery)
    t_battery_sell_energy_to_consumer = sum(battery_sell_energy_to_consumer)
    t_battery_sell_energy_to_supplier = sum(battery_sell_energy_to_supplier)
    t_pv_sell_energy_to_consumer = sum(pv_sell_energy_to_consumer)
    t_pv_sell_energy_to_battery = sum(pv_sell_energy_to_battery)
    t_pv_sell_energy_to_supplier = sum(pv_sell_energy_to_supplier)
    # t_supplier_buy_money_to_consumer = sum(supplier_buy_money_to_consumer)
    # t_supplier_buy_money_to_battery = sum(supplier_buy_money_to_battery)
    # t_cost = t_supplier_buy_money_to_consumer + t_supplier_buy_money_to_battery + pv_maintenance
    t_cost = t_supplier_sell_money_to_consumer + t_supplier_sell_money_to_battery + pv_maintenance    
    t_pv_income = t_pv_sell_money_to_consumer + t_pv_sell_money_to_supplier
    t_battery_income = t_battery_sell_money_to_consumer + t_battery_sell_money_to_supplier
    t_income = t_supplier_sell_money_to_consumer + t_pv_income + t_battery_income
               
    # t_income = t_supplier_sell_money_to_consumer + t_supplier_sell_money_to_battery + t_battery_sell_money_to_consumer + \
    #           t_battery_sell_money_to_supplier + t_pv_sell_money_to_consumer + t_pv_sell_money_to_supplier
    operation_profit = t_income - t_cost
    roi = total_investment / operation_profit

    npv_10_years, irr_10_years = cp_get_npv_irr(total_investment, operation_profit, 10)
    npv_15_years, irr_15_years = cp_get_npv_irr(total_investment, operation_profit, 15)
    npv_20_years, irr_20_years = cp_get_npv_irr(total_investment, operation_profit, 20)
    npv_25_years, irr_25_years = cp_get_npv_irr(total_investment, operation_profit, 25)
    

    # P&L results
    i = -1200
    r = 400
    c = -100
    pl = [[]*9]*6
    pl.insert(0, ['', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040', '2041', '2042', '2043', '2044', '2045', '2046', '2047', '2048'])
    pl.insert(1, ['Investment', fr(-total_investment), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''])
    pl.insert(2, ['Revenue', '', fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income), fr(t_income)])
    pl.insert(3, ['Cost', '', fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost), fr(-t_cost)])
    pl.insert(4, ['Operation profit', fr(-total_investment), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit), fr(operation_profit)])
    pl.insert(5, ['Accumulative cash', fr(-total_investment), fr(operation_profit-total_investment), fr(operation_profit*2-total_investment), fr(operation_profit*3-total_investment), fr(operation_profit*4-total_investment), fr(operation_profit*5-total_investment), fr(operation_profit*6-total_investment), fr(operation_profit*7-total_investment), fr(operation_profit*8-total_investment), fr(operation_profit*9-total_investment), fr(operation_profit*10-total_investment), fr(operation_profit*11-total_investment), fr(operation_profit*12-total_investment), fr(operation_profit*13-total_investment), fr(operation_profit*14-total_investment), fr(operation_profit*15-total_investment), fr(operation_profit*16-total_investment), fr(operation_profit*17-total_investment), fr(operation_profit*18-total_investment), fr(operation_profit*19-total_investment), fr(operation_profit*20-total_investment), fr(operation_profit*21-total_investment), fr(operation_profit*22-total_investment), fr(operation_profit*23-total_investment), fr(operation_profit*24-total_investment), fr(operation_profit*25-total_investment)])

    # Detail results
    detail = [[]*6]*20
    detail.insert(0, ['', '', '', '', '', '', 'Cost', 'Income'])
    detail.insert(1, ['Investment', '', '', '', '', '', '', ''])
    detail.insert(2, ['', 'Battery', str(battery_size)  + " (MWh)", '', '', '', fr(-t_battery_cost_nis), ''])
    detail.insert(3, ['', 'PV', str(pv_size) + " (MW)", '', '', '', fr(-total_pv_cost), ''])
    detail.insert(4, ['Total investment', '', '', '', '', '', fr(-total_investment), ''])
    detail.insert(5, ['', '', '', '', '', '', '', ''])
    detail.insert(6, ['Operation', '', 'Action', 'From', 'To', 'Energy (MWh)', 'Cost', 'Income'])
    detail.insert(7, ['', 'Energy', 'Buy', 'Supplier', 'Customer', fr(t_supplier_sell_energy_to_consumer), fr(-t_supplier_sell_money_to_consumer), ''])
    detail.insert(8, ['', 'Energy', 'Buy', 'Supplier', 'Battery', fr(t_supplier_sell_energy_to_battery), fr(-t_supplier_sell_money_to_battery), ''])
    detail.insert(9, ['', 'Energy', 'Sell', 'Supplier', 'Customer', fr(t_supplier_sell_energy_to_consumer), '', fr(t_supplier_sell_money_to_consumer)])
    detail.insert(10, ['', 'Energy', 'Sell', 'Supplier', 'Battery', fr(t_supplier_sell_energy_to_battery), '', ''])
    detail.insert(11, ['', 'Energy', 'Sell', 'Battery', 'Customer', fr(t_battery_sell_energy_to_consumer), '', fr(t_battery_sell_money_to_consumer)])
    detail.insert(12, ['', 'Energy', 'Sell', 'Battery', 'Supplier', fr(t_battery_sell_energy_to_supplier), '', fr(t_battery_sell_money_to_supplier)])
    detail.insert(13, ['', 'Energy', 'Sell', 'PV', 'Customer', fr(t_pv_sell_energy_to_consumer), '', fr(t_pv_sell_money_to_consumer)])
    detail.insert(14, ['', 'Energy', 'Sell', 'PV', 'Battery', fr(t_pv_sell_energy_to_battery), '', ''])
    detail.insert(15, ['', 'Energy', 'Sell', 'PV', 'Supplier', fr(t_pv_sell_energy_to_supplier), '', fr(t_pv_sell_money_to_supplier)])
    #detail.insert(16, ['', 'Maintenances', '', '', '', '', fr(-pv_maintenance)])
    detail.insert(17, ['Total cash flow', '', '', '', '', '', fr(-t_cost), fr(t_income)])
    detail.insert(18, ['Operation profit', '', '', '', '', '', '', fr(operation_profit)])
    detail.insert(19, ['ROI', '', '', '', '', '', '', fr(roi, 1)])

    #with open(get_simulation_folder(customer_name, simulation_name)+"/output/"+results_file_name, 'w') as file:
    with open(output_file, 'w') as file:
        csv_writer = csv.writer(file)

        #csv_writer.writerow(['Configuration'])
        csv_writer.writerow([sim_dict[0], '2023'])
        csv_writer.writerow([sim_dict[1], customer_name])
        csv_writer.writerow([sim_dict[2], input_file])
        csv_writer.writerow([sim_dict[3], grid_power])
        csv_writer.writerow([sim_dict[4], battery_size])
        csv_writer.writerow([sim_dict[5], battery_power])
        csv_writer.writerow([sim_dict[6], fr(t_battery_cost)+"/"+fr(t_battery_cost_nis)])
        csv_writer.writerow([sim_dict[7], fr(kwh_battery_cost)+"/"+fr(kwh_battery_cost*dollar_to_nis)])
        csv_writer.writerow([sim_dict[8], fr(pv_size)])
        csv_writer.writerow([sim_dict[9], fr(total_pv_cost)])
        csv_writer.writerow([sim_dict[10], fr(roi, 1)])

        csv_writer.writerow([''])

        csv_writer.writerow(pl[0])
        csv_writer.writerow(pl[1])
        csv_writer.writerow(pl[2])
        csv_writer.writerow(pl[3])
        csv_writer.writerow(pl[4])
        csv_writer.writerow(pl[5])

        csv_writer.writerow([''])

        csv_writer.writerow(detail[0])
        csv_writer.writerow(detail[1])
        csv_writer.writerow(detail[2])
        csv_writer.writerow(detail[3])
        csv_writer.writerow(detail[4])
        csv_writer.writerow(detail[5])
        csv_writer.writerow(detail[6])
        csv_writer.writerow(detail[7])
        csv_writer.writerow(detail[8])
        csv_writer.writerow(detail[9])
        csv_writer.writerow(detail[10])
        csv_writer.writerow(detail[11])
        csv_writer.writerow(detail[12])
        csv_writer.writerow(detail[13])
        csv_writer.writerow(detail[14])
        csv_writer.writerow(detail[15])
        #csv_writer.writerow(detail[16])
        csv_writer.writerow(detail[17])
        csv_writer.writerow(detail[18])
        csv_writer.writerow(detail[19])

        csv_writer.writerow([''])

        csv_writer.writerow(['Input', '', '', '', '', '', 'Output'])
        csv_writer.writerow(['date',
                             'time',
                             'battery_buy_tariff (NIS/MWh)',
                             'consumer_buy_tariff (NIS/MWh)',
                             'energy_demand (MWh)',
                             'energy_supply (MWh)',
                             ' ',
                             'amount_of_energy_to_full_battery_from_the_grid (MWh)',
                             'surplus_energy_till_tariff_is_high (MWh)',
                             'available_capacity_to_charge (MW)',
                             'battery_charge_plan (MW)',
                             'battery_charge_reason',
                             'battery_levels_of_energy (MWh)',
                             'supplier_sell_energy_to_battery (MWh)',
                             'supplier_sell_money_to_battery (NIS)',
                             'supplier_sell_energy_to_consumer (MWh)',
                             'supplier_sell_money_to_consumer (NIS)',
                             'battery_sell_energy_to_consumer (MWh)',
                             'battery_sell_money_to_consumer (NIS)',
                             'battery_sell_energy_to_supplier (MWh)',
                             'battery_sell_money_to_supplier (NIS)',
                             'pv_sell_energy_to_consumer (MWh)',
                             'pv_sell_money_to_consumer (NIS)',
                             'pv_sell_energy_to_battery (MWh)',
                             'pv_sell_money_to_battery (NIS)',
                             'pv_sell_energy_to_supplier (MWh)',
                             'pv_sell_money_to_supplier (NIS)',
                             ])
        for i in range(0, len(battery_buy_tariff)):
            csv_writer.writerow([date[i],
                                 time[i],
                                 battery_buy_tariff[i],
                                 consumer_buy_tariff[i],
                                 energy_demand[i],
                                 energy_supply[i],
                                 '',
                                 amount_of_energy_to_full_battery_from_the_grid[i],
                                 surplus_energy_till_tariff_is_high[i],
                                 available_capacity_to_charge[i],
                                 battery_charge_plan[i],
                                 battery_charge_reason[i],
                                 battery_levels_of_energy[i],
                                 supplier_sell_energy_to_battery[i],
                                 supplier_sell_money_to_battery[i],
                                 supplier_sell_energy_to_consumer[i],
                                 supplier_sell_money_to_consumer[i],
                                 battery_sell_energy_to_consumer[i],
                                 battery_sell_money_to_consumer[i],
                                 battery_sell_energy_to_supplier[i],
                                 battery_sell_money_to_supplier[i],
                                pv_sell_energy_to_consumer[i],
                                pv_sell_money_to_consumer[i],
                                pv_sell_energy_to_battery[i],
                                pv_sell_money_to_battery[i],
                                pv_sell_energy_to_supplier[i],
                                pv_sell_money_to_supplier[i],
                                ])
        file.close()
    return roi, total_investment, t_cost, t_income, operation_profit, int(t_pv_income), t_battery_income, npv_10_years, npv_15_years, npv_20_years, npv_25_years, irr_10_years, irr_15_years, irr_20_years, irr_25_years


# Write to summary file
def write_summary(user_name, customer_name, simulation_name, results_files):
    results = [[] for i in range(len(results_files))]
    tmp = [0] * (len(results)+1)
    summary_file = get_simulation_folder(user_name, customer_name, simulation_name)+"/output/cp_summary_results_"+datetime.now().strftime("%d-%m-%Y_%H:%M:%S")+".csv"

    j = 0
    for f in results_files:
        with open(f, 'r') as file:
            csv_reader = csv.reader(file)
            csv_data = list(csv_reader)
            for i in range(len(sim_dict)):
                results[j].append(csv_data[i][1])
        j = j + 1
        file.close()

    with open(summary_file, 'w') as file:
        for i in range(len(results[0])):
            for j in range(len(tmp)):
                if j == 0:
                    tmp[0] = sim_dict[i]
                else:
                    tmp[j] = results[j-1][i]
            csv_writer = csv.writer(file)
            csv_writer.writerow(tmp)
        file.close()
    return summary_file

def get_roi_graph(results_files, num_of_results):
    roi_line = len(sim_dict)-1
    roi_data = {}
    best_roi = 1000000
    best_roi_column = 0

    with open(results_files, "r") as file:
        csv_reader = csv.reader(file)
        csv_data = list(csv_reader)
        for i in range(num_of_results):
            roi_data[i] = csv_data[roi_line][i+1]
            if float(csv_data[roi_line][i+1]) < float(best_roi):
                best_roi = csv_data[roi_line][i+1]
                best_roi_column = i
        file.close()
    return roi_data, best_roi_column

def get_pl_data(user_name, main_table_id, best_roi_column):
    pl_summary_start = 12
    pl_summary_rows = 6
    pl_summary_cols = 27
    pl_summary_years_row = 0
    pl_summary_operation_profit_row = 4
    pl_summary_accumulative_cash_row = 5
    pl_summary_data = []
    pl_cash_flow = []
    pl_details_start = 19
    pl_details_rows = 19
    pl_details_cols = 8
    pl_details_data = []
    pl_diagram_start = 25
    pl_diagram_col_offset = 2
    pl_diagram_cols = 6
    pl_diagram_rows = 10
    pl_diagram_data = []

    cp_file = get_simulation_file_from_details_table_from_db(user_name, main_table_id, best_roi_column)
    if cp_file == None:
        return pl_summary_data, pl_cash_flow, pl_details_data, pl_diagram_data 
    #print(f'cp file {cp_file}')

    # P&L summary table
    with open(cp_file, "r") as file:
        csv_reader = csv.reader(file)
        for i in range(pl_summary_start):
            next(csv_reader)
        csv_data = list(csv_reader)
        for i in range(pl_summary_rows):
            col = [] * pl_summary_cols
            for j in range(pl_summary_cols):
                col.append(csv_data[i][j].replace(",", ""))
            pl_summary_data.insert(i, col)
        file.close()

    # P&L cash flow (graph)
    with open(cp_file, "r") as file:
        csv_reader = csv.reader(file)
        for i in range(pl_summary_start):
            next(csv_reader)
        csv_data = list(csv_reader)
        for i in range(1, pl_summary_cols):
            pl_cash_flow_tmp = {
                    'year': '',
                    'operation profit': '',
                    'accumulative cash': '',
                    }
            for j in range(pl_summary_rows):
                if j == pl_summary_years_row:
                    pl_cash_flow_tmp['year'] = csv_data[j][i].replace(",", "")
                if j == pl_summary_operation_profit_row:
                    pl_cash_flow_tmp['operation profit'] = csv_data[j][i].replace(",", "")
                if j == pl_summary_accumulative_cash_row:
                    pl_cash_flow_tmp['accumulative cash'] = csv_data[j][i].replace(",", "")
            pl_cash_flow.append(pl_cash_flow_tmp)
      
        file.close()

    # P&L details table
    with open(cp_file, "r") as file:
        csv_reader = csv.reader(file)
        for i in range(pl_details_start):
            next(csv_reader)
        csv_data = list(csv_reader)
        for i in range(pl_details_rows):
            col = [] * pl_details_cols
            for j in range(pl_details_cols):
                col.append(csv_data[i][j].replace(",", ""))
            pl_details_data.insert(i, col)
        file.close()
    
    # P&L diagram
    with open(cp_file, "r") as file:
        csv_reader = csv.reader(file)
        for i in range(pl_diagram_start):
            next(csv_reader)
        csv_data = list(csv_reader)
        for i in range(pl_diagram_rows):
            pl_diagram_data_tmp = {
                    'action': '',
                    'from': '',
                    'to': '',
                    'energy': '',
                    'cost': '',
                    'income': '',
                    }
            for j in range(pl_diagram_cols):
                if j == 0:
                    pl_diagram_data_tmp['action'] = csv_data[i][pl_diagram_col_offset+j].replace(",", "")
                if j == 1:
                    pl_diagram_data_tmp['from'] = csv_data[i][pl_diagram_col_offset+j].replace(",", "")
                if j == 2:
                    pl_diagram_data_tmp['to'] = csv_data[i][pl_diagram_col_offset+j].replace(",", "")
                if j == 3:
                    pl_diagram_data_tmp['energy'] = csv_data[i][pl_diagram_col_offset+j].replace(",", "")
                if j == 4:
                    pl_diagram_data_tmp['cost'] = csv_data[i][pl_diagram_col_offset+j].replace(",", "")
                if j == 5:
                    pl_diagram_data_tmp['income'] = csv_data[i][pl_diagram_col_offset+j].replace(",", "")
            pl_diagram_data.append(pl_diagram_data_tmp)            
        file.close()
    #print("pl_diagram_data", json.dumps(pl_diagram_data, indent=4))
    return pl_summary_data, pl_cash_flow, pl_details_data, pl_diagram_data

def save_uploaded_data_file(user_name, customer_name, simulation_name, file):
    #print(user_name, customer_name, simulation_name, file)
    simulation_input_file = get_simulation_folder(user_name, customer_name, simulation_name) + "/input/" + str(file)
    #print("data_file", data_file)
    with open(simulation_input_file, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
        file.close()
    return simulation_input_file