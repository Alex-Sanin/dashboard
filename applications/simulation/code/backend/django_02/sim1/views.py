import os
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .cp.cp_utilities import *
from .cp.cp_db_handler import *
from .cp.cp_loop import *
from datetime import datetime

import csv

def get_all_data(request):
    #print("get_all_data", json.dumps(request.GET, indent=4))

    data = {}

    init_db()

    username = request.GET.get('username')
    token = request.GET.get('authorization')
    user = request.GET.get('user_name')
    if get_user_key(username, token) == 'None':
        data['message'] = 'Invalid user'
        return JsonResponse(data)

    if os.path.exists(simulation_db):
        data[0] = "main table"
        data[1] = get_simulation_main_table_from_db(user)
        #data["main table"] = get_simulation_main_table_from_db()
        
        data[2] = "details table"
        simulation_main_table_last_row_id = simulation_main_table_length() - 1
        data[3] = get_simulation_details_table_from_db(user, simulation_main_table_last_row_id)
        data[4] = "roi bar graph"
        best_roi_column = get_best_roi(user, simulation_main_table_last_row_id)
        data[5] = best_roi_column
        
        npv_25_years_arr = get_all_npv_25_years(user, simulation_main_table_last_row_id)
        npv_25_years_arr_formatted = [0] * len(npv_25_years_arr)
        for i in range(len(npv_25_years_arr)):
            npv_25_years_arr_formatted[i] = "{:,.2f}".format(npv_25_years_arr[i][0]/1000000)

        irr_25_years_arr = get_all_irr_25_years(user, simulation_main_table_last_row_id)
        irr_25_years_arr_formatted = [0] * len(irr_25_years_arr)
        for i in range(len(irr_25_years_arr)):
            irr_25_years_arr_formatted[i] = "{:,.2f}".format(irr_25_years_arr[i][0])

        roi_arr = get_all_roi(user, simulation_main_table_last_row_id)
        roi_arr_formatted = [0] * len(roi_arr)
        for i in range(len(roi_arr)):
            roi_arr_formatted[i] = "{:,.1f}".format(roi_arr[i][0])

        data['summary_graph_roi'] = roi_arr_formatted
        data['summary_graph_npv'] = npv_25_years_arr_formatted
        data['summary_graph_irr'] = irr_25_years_arr_formatted

        data[7] = "p&l summary table"
        pl_summary_data, pl_cash_flow, pl_details_data, pl_diagram_data = get_pl_data(user, simulation_main_table_last_row_id, best_roi_column)
        data[8] = pl_summary_data
        data[9] = "p&l cash flow graph"
        data[10] = pl_cash_flow
        data[11] = "p&l details table"
        data[12] = pl_details_data
        data[13] = "p&l diagram"
        data[14] = pl_diagram_data
        data[15] = "p&l diagram properties"
        pl_diagram_properties = {
            'gird_connection': get_grid_connection(user, simulation_main_table_last_row_id, best_roi_column),
            'battery_size': get_battery_size(user, simulation_main_table_last_row_id, best_roi_column),
            'battery_power': get_battery_power(user, simulation_main_table_last_row_id, best_roi_column),
            'battery_cost': get_battery_cost(user, simulation_main_table_last_row_id, best_roi_column),
            'pv_size': get_pv_size(user, simulation_main_table_last_row_id, best_roi_column),
            'pv_cost': get_pv_cost(user, simulation_main_table_last_row_id, best_roi_column),
        }
        data[16] = pl_diagram_properties
        data[17] = "download example input file (as part of the upload file tooltip)"
        data[18] = get_default_input_folder(user)+input_file
        data[19] = "download data file"
        data[20] = get_result_file(user, simulation_main_table_last_row_id, best_roi_column)

        data['information'] = "Click here to start"
        data['executive_summary_general'] = "Simulation results are shown across the application, here you can find the executive summary"
        data['executive_summary_configuration'] = "Here you can find the configuration of the simulation"
        data['executive_summary_results'] = "Here are the simulation's key results"
        data['executive_summary_yearly_contribution_graph'] = "The graph presents the pv and battery yearly income contribution"
        data['executive_summary_npv_irr_table'] = "Table presents the expected irr and npv"
        data['configuration_general'] = "Your site's configuration goes here"
        data['configuration_upload_data'] = "Upload your specific data here, you can download an example data file"
        data['configuration_run_button'] = "Click here to start running the simulation, note the expected run time though"
        data['configuration_messages'] = "The place for error messages (god forbid) and progress bar"
        data['configuration_messages'] = "The place for error messages (god forbid) and progress bar"
        data['summary_general'] = "Summary section provides the main and detailed tables outlining all the simulations and their detailed respectively"
        data['summary_main_table_general'] = "List of all configurations"
        data['summary_main_table_click'] = "Click a specific configurations to get all the respective simulations including the best"
        data['summary_details_table_general'] = "Deatiled description of all simulations per selected configuration"
        data['summary_details_table_click'] = "Click a spcific simulation to get all the respective data"
        data['summary_summary_graph'] = "3 graph at your fingertips offering (use the dropdown) ROI, NPV and IRR per selected simulation"
        data['results_general'] = "Results section provides the detailed of a selected simulations"
        data['results_pl_cash_flow'] = "Offering the expected cash flow and cumulative cash flow in a graph representation"
        data['results_energy_flow_diagram'] = "Sketching the energy flow across the site"
        data['results_pl_summary'] = "P&L summary table offering the simulation's financial main key points"
        data['results_pl_details'] = "P&L Details table offering the simulation's financial details description"
        
        executive_summary = get_executive_summary(user, simulation_main_table_last_row_id)
        data.update(executive_summary)

        #print("get_all_data", json.dumps(data, indent=4))

    return JsonResponse(data)

def simulation_main_table_selected_row(request):

    data = {}

    username = request.GET.get('username')
    token = request.GET.get('authorization')
    user = request.GET.get('user_name')
    if get_user_key(username, token) == 'None':
        data['message'] = 'Invalid user'
        return JsonResponse(data)
    
    simulation_main_table_id = int(request.GET.get('simulation_main_table_id'))
    
    data[0] = get_simulation_details_table_from_db(user, simulation_main_table_id)
    
    npv_25_years_arr = get_all_npv_25_years(user, simulation_main_table_id)
    npv_25_years_arr_formatted = [0] * len(npv_25_years_arr)
    for i in range(len(npv_25_years_arr)):
        npv_25_years_arr_formatted[i] = "{:,.2f}".format(npv_25_years_arr[i][0]/1000000)

    irr_25_years_arr = get_all_irr_25_years(user, simulation_main_table_id)
    irr_25_years_arr_formatted = [0] * len(irr_25_years_arr)
    for i in range(len(irr_25_years_arr)):
        irr_25_years_arr_formatted[i] = "{:,.2f}".format(irr_25_years_arr[i][0])

    roi_arr = get_all_roi(user, simulation_main_table_id)
    roi_arr_formatted = [0] * len(roi_arr)
    for i in range(len(roi_arr)):
        roi_arr_formatted[i] = "{:,.1f}".format(roi_arr[i][0])

    data['summary_graph_roi'] = roi_arr_formatted
    data['summary_graph_npv'] = npv_25_years_arr_formatted
    data['summary_graph_irr'] = irr_25_years_arr_formatted

    # Get roi graph data
    data[1] = "roi bar graph"
    best_roi_column = get_best_roi(user, simulation_main_table_id)
    data[2] = best_roi_column

    # Get p&l summary table
    pl_summary_data, pl_cash_flow, pl_details_data, pl_diagram_data = get_pl_data(user, simulation_main_table_id, best_roi_column)
    data[4] = "p&l summary table"
    data[5] = pl_summary_data

    # Get p&l summary graph
    data[6] = "p&l cash flow graph"
    data[7] = pl_cash_flow

    # Get p&l details table
    data[8] = "p&l details table"
    data[9] = pl_details_data

    # Get p&l diagram
    data[10] = "p&l diagram"
    data[11] = pl_diagram_data
    
    data[12] = "p&l diagram properties"
    pl_diagram_properties = {
        'gird_connection': get_grid_connection(user, simulation_main_table_id, best_roi_column),
        'battery_size': get_battery_size(user, simulation_main_table_id, best_roi_column),
        'battery_power': get_battery_power(user, simulation_main_table_id, best_roi_column),
        'battery_cost': get_battery_cost(user, simulation_main_table_id, best_roi_column),
        'pv_size': get_pv_size(user, simulation_main_table_id, best_roi_column),
        'pv_cost': get_pv_cost(user, simulation_main_table_id, best_roi_column),
    }
    data[13] = pl_diagram_properties

    data[14] = "download example input file (as part of the upload file tooltip)"
    data[15] = get_default_input_folder(user)+input_file
    
    data[16] = "download data file"
    data[17] = ip_address + get_result_file(user, simulation_main_table_id, best_roi_column)

    executive_summary = get_executive_summary(user, simulation_main_table_id)

    data.update(executive_summary)

    return JsonResponse(data)

def simulation_details_table_selected_row(request):
    data = {}

    username = request.GET.get('username')
    token = request.GET.get('authorization')
    user = request.GET.get('user_name')
    if get_user_key(username, token) == 'None':
        data['message'] = 'Invalid user'
        return JsonResponse(data)
    
    simulation_main_table_id = int(request.GET.get('simulation_main_table_id'))
    
    data['customer_name'] = get_customer_name(user, simulation_main_table_id)
    data['simulaiton_name'] = get_simulation_name(user, simulation_main_table_id)

    simulation_details_table_id = int(request.GET.get('simulation_details_table_id'))

    npv_25_years_arr = get_all_npv_25_years(user, simulation_main_table_id)
    npv_25_years_arr_formatted = [0] * len(npv_25_years_arr)
    for i in range(len(npv_25_years_arr)):
        npv_25_years_arr_formatted[i] = "{:,.2f}".format(npv_25_years_arr[i][0]/1000000)

    irr_25_years_arr = get_all_irr_25_years(user, simulation_main_table_id)
    irr_25_years_arr_formatted = [0] * len(irr_25_years_arr)
    for i in range(len(irr_25_years_arr)):
        irr_25_years_arr_formatted[i] = "{:,.2f}".format(irr_25_years_arr[i][0])

    roi_arr = get_all_roi(user, simulation_main_table_id)
    roi_arr_formatted = [0] * len(roi_arr)
    for i in range(len(roi_arr)):
        roi_arr_formatted[i] = "{:,.1f}".format(roi_arr[i][0])
        
    # Get p&l summary table
    pl_summary_data, pl_cash_flow, pl_details_data, pl_diagram_data = get_pl_data(user, simulation_main_table_id, simulation_details_table_id)
    data[0] = "p&l summary table"
    data[1] = pl_summary_data

    # Get p&l summary graph
    data[2] = "p&l cash flow graph"
    data[3] = pl_cash_flow

    # Get p&l details table
    data[4] = "p&l details table"
    data[5] = pl_details_data

    # Get p&l diagram
    data[6] = "p&l diagram"
    data[7] = pl_diagram_data
    
    data[8] = "p&l diagram properties"
    pl_diagram_properties = {
        'gird_connection': get_grid_connection(user, simulation_main_table_id, simulation_details_table_id),
        'battery_size': get_battery_size(user, simulation_main_table_id, simulation_details_table_id),
        'battery_power': get_battery_power(user, simulation_main_table_id, simulation_details_table_id),
        'battery_cost': get_battery_cost(user, simulation_main_table_id, simulation_details_table_id),
        'pv_size': get_pv_size(user, simulation_main_table_id, simulation_details_table_id),
        'pv_cost': get_pv_cost(user, simulation_main_table_id, simulation_details_table_id),
    }
    data[9] = pl_diagram_properties

    data[10] = "download example input file (as part of the upload file tooltip)"
    data[11] = get_default_input_folder(user)+input_file
    
    data[12] = "download data file"
    data[13] = ip_address +  get_result_file(user, simulation_main_table_id, simulation_details_table_id)

    executive_summary = get_executive_summary(user, simulation_main_table_id, simulation_details_table_id)
     
    data.update(executive_summary)
    
    return JsonResponse(data)

def get_executive_summary(user_name, main_table_id, details_table_id=None):
    data = {
        'title': 'executive summary',
        'configuration': {
            'customer_name': '',
            'simulation_name': '',
            'battery_size': '',
            'battery_power': '',
            'battery_cost': '',
            'pv_size': '',
            'pv_cost': '',
            'grid_connection': '',
        },
        'results': {
            'return_on_investment': '',
            'investment': '',
            'yearly_cost': '',
            'yearly_income': '',
            'yearly_operation_profit': '',
            'simulation #': ''
        },
        'contribution_bar_graph': {
            'graph_title': 'Yearly contribution',
            'pv': {
                'income': '',
                '%': ''
            },
            'battery': {
                'income': '',
                '%': '',
            },
        },
        'npv_irr': {
            'graph_title': 'NPV & IRR',
            '10_years': {
                'NPV ($)': '',
                'IRR': '',
            },
            '15_years': {
                'NPV': '',
                'IRR': '',
            },
            '20_years': {
                'NPV': '',
                'IRR': '',
            },
            '25_years': {
                'NPV': '',
                'IRR': '',
            },
        }
    }

    summary_file = get_summary_file(user_name, main_table_id)
    if details_table_id == None:
        details_table_id = get_best_roi(user_name, main_table_id)

    
    battery_size = get_battery_size(user_name, main_table_id, details_table_id)
    battery_power = get_battery_power(user_name, main_table_id, details_table_id)
    battery_cost = get_battery_cost(user_name, main_table_id, details_table_id)
    pv_size = get_pv_size(user_name, main_table_id, details_table_id)
    pv_cost = get_pv_cost(user_name, main_table_id, details_table_id)
    grid_connection = get_grid_connection(user_name, main_table_id, details_table_id)

    data['configuration']['customer_name'] = get_customer_name(user_name, main_table_id)
    data['configuration']['simulation_name'] = get_simulation_name(user_name, main_table_id)
    data['configuration']['battery_size'] = str(battery_size) + ' (MWh)'
    data['configuration']['battery_power'] = str(battery_power) + ' (MW)'
    data['configuration']['battery_cost'] = fr(battery_cost) + ' ($)'
    data['configuration']['pv_size'] = str(pv_size) + ' (MW)'
    data['configuration']['pv_cost'] = fr(pv_cost) + ' ($)'
    data['configuration']['grid_connection'] = str(grid_connection) + ' (MW)'
    data['results']['return_on_investment'] = str(get_roi(user_name, main_table_id, details_table_id))  + ' (years)'
    data['results']['investment'] = fr(round(get_investment(user_name, main_table_id, details_table_id)))  + ' (NIS)'
    data['results']['yearly_cost'] = fr(round(get_yearly_cost(user_name, main_table_id, details_table_id)))  + ' (NIS)'
    data['results']['yearly_income'] = fr(round(get_yearly_income(user_name, main_table_id, details_table_id)))  + ' (NIS)'
    data['results']['yearly_operation_profit'] = fr(round(get_yearly_operation_profit(user_name, main_table_id, details_table_id)))  + ' (NIS)'
    data['results']['simulation #'] = details_table_id
    pv_income = get_pv_income(user_name, main_table_id, details_table_id)
    if pv_income == None:
        pv_income = 0
    battery_income = get_battery_income(user_name, main_table_id, details_table_id)
    data['contribution_bar_graph']['pv']['income'] = round(pv_income)
    data['contribution_bar_graph']['pv']['%'] = round(pv_income/(pv_income+battery_income), 2)*100  
    data['contribution_bar_graph']['battery']['income'] = round(battery_income)
    data['contribution_bar_graph']['battery']['%'] = round(battery_income/(pv_income+battery_income), 2)*100
    data['npv_irr']['10_years']['NPV'] = "{:,.0f}".format(get_npv_10_years(user_name, main_table_id, details_table_id))
    data['npv_irr']['10_years']['IRR'] = "{:.2%}".format(get_irr_10_years(user_name, main_table_id, details_table_id))
    data['npv_irr']['15_years']['NPV'] = "{:,.0f}".format(get_npv_15_years(user_name, main_table_id, details_table_id))
    data['npv_irr']['15_years']['IRR'] = "{:.2%}".format(get_irr_15_years(user_name, main_table_id, details_table_id))
    data['npv_irr']['20_years']['NPV'] = "{:,.0f}".format(get_npv_20_years(user_name, main_table_id, details_table_id))
    data['npv_irr']['20_years']['IRR'] = "{:.2%}".format(get_irr_20_years(user_name, main_table_id, details_table_id))
    data['npv_irr']['25_years']['NPV'] = "{:,.0f}".format(get_npv_25_years(user_name, main_table_id, details_table_id))
    data['npv_irr']['25_years']['IRR'] = "{:.2%}".format(get_irr_25_years(user_name, main_table_id, details_table_id))

    return data

@csrf_exempt
def run_simulation(request):
    
    data = {}

    username = request.GET.get('username')
    token = request.GET.get('authorization')
    user = request.GET.get('user_name')
    if get_user_key(username, token) == 'None':
        print(f'run_simulation: Invalid user')
        data['message'] = 'Invalid user'
        return JsonResponse(data)

    created_time = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    data['message'] = 'Simulation was running successfully'

    init_db()
    battery_sizes = []
    battery_charge_powers = []
    kwh_battery_costs = []
    pv_sizes = []
    pv_costs = []

    if request.POST.get('customerName') != 'None':
        customer_name = request.POST.get('customerName')
        create_customer_folder(user, customer_name)
    else:
        data['message'] = 'Simulation did NOT run as customer name was not provided'
        return JsonResponse(data)
    
    if request.POST.get('simulationName') != 'None':
        simulation_name = request.POST.get('simulationName')
        # Check that simulation name is not exist already
        #create_simulation_folder(customer_name, simulation_name)
        if is_simulation_name_exist(user, customer_name, simulation_name) == "not exists":
            create_simulation_folder(user, customer_name, simulation_name)
        else:
            data['message'] = 'Simulation did NOT run as simulation name already exists'
            return JsonResponse(data)
    else:
        data['message'] = 'Simulation did NOT run as simulation name was not provided'
        return JsonResponse(data)
    
    if request.POST.get('region') != 'None':
        region = request.POST.get('region')
    else:
        data['message'] = 'Simulation did NOT run as region was not provided'
        return JsonResponse(data)

    if request.POST.get('currency') != 'None':
        currency = request.POST.get('currency')
    else:
        data['message'] = 'Simulation did NOT run as currency was not provided'
        return JsonResponse(data)

    if request.POST.get('batteryMinSize') != 'None':
        batteryMinSize = request.POST.get('batteryMinSize')
    else:
        data['message'] = 'Simulation did NOT run as battery min size was not provided'
        return JsonResponse(data)

    if request.POST.get('batteryMaxSize') != 'None':
        batteryMaxSize = request.POST.get('batteryMaxSize')
    else:
        data['message'] = 'Simulation did NOT run as battery max size was not provided'
        return JsonResponse(data)
    
    i = int(batteryMinSize)
    while i <= int(batteryMaxSize):
        battery_sizes.append(i)
        i += 1

    if request.POST.get('batteryMinPower') != 'None':
        batteryMinPower = request.POST.get('batteryMinPower')
    else:
        data['message'] = 'Simulation did NOT run as battery min power was not provided'
        return JsonResponse(data)

    if request.POST.get('batteryMaxPower') != 'None':
        batteryMaxPower = request.POST.get('batteryMaxPower')
    else:
        data['message'] = 'Simulation did NOT run as battery max power was not provided'
        return JsonResponse(data)

    i = int(batteryMinPower)
    while i <= int(batteryMaxPower):
        battery_charge_powers.append(i)
        i += 1

    if request.POST.get('batteryMinCost') != 'None':
        batteryMinCost = request.POST.get('batteryMinCost')
    else:
        data['message'] = 'Simulation did NOT run as battery min cost was not provided'
        return JsonResponse(data)

    if request.POST.get('batteryMaxCost') != 'None':
        batteryMaxCost = request.POST.get('batteryMaxCost')
    else:
        data['message'] = 'Simulation did NOT run as battery max power was not provided'
        return JsonResponse(data)

    i = int(batteryMinCost)
    while i <= int(batteryMaxCost):
        kwh_battery_costs.append(i)
        i += 10
        
    if request.POST.get('pvMinSize') != 'None':
        pvMinSize = request.POST.get('pvMinSize')
    else:
        data['message'] = 'Simulation did NOT run as pv min size was not provided'
        return JsonResponse(data)

    if request.POST.get('pvMaxSize') != 'None':
        pvMaxSize = request.POST.get('pvMaxSize')
    else:
        data['message'] = 'Simulation did NOT run as pv max size was not provided'
        return JsonResponse(data)

    i = int(pvMinSize)
    while i <= int(pvMaxSize):
        pv_sizes.append(i)
        i += 1

    if request.POST.get('pvMinCost') != 'None':
        pvMinCost = request.POST.get('pvMinCost')
    else:
        data['message'] = 'Simulation did NOT run as pv min cost was not provided'
        return JsonResponse(data)

    if request.POST.get('pvMaxCost') != 'None':
        pvMaxCost = request.POST.get('pvMaxCost')
    else:
        data['message'] = 'Simulation did NOT run as pv max cost was not provided'
        return JsonResponse(data)

    i = int(pvMinCost)
    while i <= int(pvMaxCost):
        pv_costs.append(i)
        i += 100

    if request.POST.get('grid') != 'None':
        grid_connection = request.POST.get('grid')
    else:
        data['message'] = 'Simulation did NOT run as gird connection was not provided'
        return JsonResponse(data)
    
    if 'file' in request.FILES and request.FILES['file']:
        simulation_input_file = save_uploaded_data_file(user_name, customer_name, simulation_name, request.FILES.get('file'))
    else:
        simulation_input_file = ""
    
    # Run actuall simulation
    summary_results, summary_file = cp_loop(user, customer_name, simulation_name, battery_sizes, battery_charge_powers, kwh_battery_costs,
                                            pv_sizes, pv_costs, grid_connection, simulation_input_file)

    # Update db simulation main table and return prepear data
    simulation_main_table_id = update_db_simulation_main_table(user, customer_name, simulation_name, created_time,
                                                               region, currency, input_file, summary_file)
    
    # Update db simulation details table and return prepear data
    update_db_simulations_details_table(simulation_main_table_id, user, summary_results)
    
    return JsonResponse(data)

import math
@csrf_exempt
def get_simulation_run_time(request):
    data = {}
    
    #username = request.GET.get('username')
    #token = request.GET.get('authorization')
    #user = request.GET.get('user_name')
    #if get_user_key(username, token) == 'None':
    #    print(f'run_simulation: Invalid user')
    #    data['message'] = 'Invalid user'
    #    return JsonResponse(data)

    batteryMinSize = request.POST.get('batteryMinSize')
    batteryMaxSize = request.POST.get('batteryMaxSize')
    number_of_battery_sizes = len(range(int(batteryMinSize), int(batteryMaxSize))) + 1

    batteryMinPower = request.POST.get('batteryMinPower')
    batteryMaxPower = request.POST.get('batteryMaxPower')
    number_of_battery_powers = len(range(int(batteryMinPower), int(batteryMaxPower))) + 1
    
    batteryMinCost = request.POST.get('batteryMinCost')
    batteryMaxCost = request.POST.get('batteryMaxCost')
    number_of_battery_costs = (len(range(int(batteryMinCost), int(batteryMaxCost), 10)) + 1)
            
    pvMinSize = request.POST.get('pvMinSize')
    pvMaxSize = request.POST.get('pvMaxSize')
    number_of_pv_sizes = len(range(int(pvMinSize), int(pvMaxSize))) + 1
    
    pvMinCost = request.POST.get('pvMinCost')
    pvMaxCost = request.POST.get('pvMaxCost')
    number_of_pv_costs = len(range(int(pvMinCost), int(pvMaxCost), 100)) + 1

    tmp_total_number_of_simulations = number_of_battery_sizes * number_of_battery_powers * number_of_battery_costs * number_of_pv_sizes * number_of_pv_costs
    set_total_number_of_simulations(tmp_total_number_of_simulations)
    set_current_number_of_simulations(0)
    data['total_number_of_simulations'] = get_total_number_of_simulations()
    data['total_time_to_run_all_simulations_in_seconds'] = math.ceil(get_total_number_of_simulations() * single_simulation_run_time_in_seconds)
    
    #print("get_simulation_run_time", json.dumps(data, indent=4))
    return JsonResponse(data)

def progress_bar(request):
    data = {}

    #username = request.GET.get('username')
    #token = request.GET.get('authorization')
    #user = request.GET.get('user_name')
    #if get_user_key(username, token) == 'None':
    #    print(f'run_simulation: Invalid user')
    #    data['message'] = 'Invalid user'
    #    return JsonResponse(data)

    data['current_%_of_simulations'] = get_current_number_of_simulations() / get_total_number_of_simulations() * 100
    print("progress_bar: current_%_of_simulations", data['current_%_of_simulations'])
    return JsonResponse(data)
    
def get_customers_list(request):
    data = {}

    username = request.GET.get('username')
    token = request.GET.get('authorization')
    user = request.GET.get('user_name')
    if get_user_key(username, token) == 'None':
        print(f'run_simulation: Invalid user')
        data['message'] = 'Invalid user'
        return JsonResponse(data)

    data['customers_list'] = get_all_customers(user)
    return JsonResponse(data)

def best_results(request):
    data = {}
    
    #username = request.GET.get('username')
    #token = request.GET.get('authorization')
    #user = request.GET.get('user_name')
    #if get_user_key(username, token) == 'None':
    #    print(f'run_simulation: Invalid user')
    #    data['message'] = 'Invalid user'
    #    return JsonResponse(data)
    
    response = get_all_data(request)  # Assuming `JsonResponse` returns a JSON-encoded response
    json_data = response.content.decode('utf-8')  # Extract the JSON-encoded data from the response content
    data = json.loads(json_data)  # Parse the JSON data into a Python dictionary
    return JsonResponse(data)   

################# Added for user autentication ##################
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

from django.contrib.auth.models import User # DELETE

@csrf_exempt
def user_authentication(request):

    data = {}

    users = list(User.objects.all())

    if request.method == 'POST':
        payload_bytes = request.body
        payload_str = payload_bytes.decode('utf-8') # Decode bytes to string
        payload_dict = json.loads(payload_str) # Parse string to dictionary
        username = payload_dict['email']
        password = payload_dict['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            Token.objects.filter(user=user).delete()
            token, created = Token.objects.get_or_create(user=user)
            set_user_key(username, token) # not the right way, but i don't know how to do it using django built-in authentication
            data['user first name'] = user.first_name
            data['user last name'] = user.last_name
            data['token'] = token.key
            data['message'] = 'Login successful'
        else:
            data['message'] = 'Invalid credentials'
    return JsonResponse(data)

################# Doanload results file ##################
from django.http import HttpResponse

def download_file(request):

    data = {}

    username = request.GET.get('username')
    token = request.GET.get('authorization')
    user = request.GET.get('user_name')
    if get_user_key(username, token) == 'None':
        data['message'] = 'Invalid user'
        return JsonResponse(data)
    file_name = request.GET.get('file')
    with open(file_name, 'rb') as file:
        response = HttpResponse(file.read(), content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file_name}"'
    return response