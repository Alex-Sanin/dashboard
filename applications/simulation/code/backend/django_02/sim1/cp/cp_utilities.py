import os
from .cp_global_settings import *

def fr(num, r=0):
    if r == 0:
        a = "{:,}".format(round(num))
    else:
        a = "{:,}".format(round(num, r))
    return a

def zero_out (number):
    if number < 0.00001:
        number = 0
    return number

def total(number):
    tmp = 0
    for i in range(len(number)):
        tmp = tmp + number[i]
    return tmp

def total_cost_of_battery(battery_size, kwh_battery_cost):
    return (battery_size * 1000 * kwh_battery_cost)

def total_cost_of_battery(pv_size, kwh_pv_cost):
    return (pv_size * 1000 * kwh_pv_cost)

def calc_range(obj):
    min = obj["min"]
    min = min * 100
    max = obj["max"]
    max = max * 100
    steps = obj["steps"]
    steps = steps * 100
    arr = []
    for i in range(int(min), int(max+steps), int(steps)):
            arr.append(i/100)
    return arr

def calc_range_min_max(min, max):
    arr = []
    if min == max:
        arr.append(min)
    else:
        min = min * 100
        max = max * 100
        mid = max - (max - min)/2
        arr.append(min/100)
        arr.append(mid/100)
        arr.append(max/100)
    return arr

def create_customer_folder(u_name, c_name):
    if ' ' in c_name:
        tmp_c_name = c_name.replace(" ", "_")
    try:
        create_folder(root_folder+"/users/"+u_name+"/"+tmp_c_name)
    except:
        pass
    return

def get_customer_folder(c_name):
    if ' ' in c_name:
        tmp_c_name = c_name.replace(" ", "_")
    return user_folder+"/"+tmp_c_name

def create_simulation_folder(u_name, c_name, s_name):
    if ' ' in c_name:
        tmp_c_name = c_name.replace(" ", "_")
    if ' ' in s_name:
        tmp_s_name = s_name.replace(" ", "_")
    try:
        create_folder(root_folder+"/users/"+u_name+"/"+tmp_c_name+"/"+tmp_s_name)
        create_folder(root_folder+"/users/"+u_name+"/"+tmp_c_name+"/"+tmp_s_name+"/output")
        create_folder(root_folder+"/users/"+u_name+"/"+tmp_c_name+"/"+tmp_s_name+"/input")
    except:
        pass
    return

def get_simulation_folder(u_name, c_name, s_name):
    if ' ' in c_name:
        tmp_c_name = c_name.replace(" ", "_")
    if ' ' in s_name:
        tmp_s_name = s_name.replace(" ", "_")
    return root_folder+"/users/"+u_name+"/"+tmp_c_name+"/"+tmp_s_name

def get_default_input_folder(u_name):
    return root_folder+"/users/"+u_name+"/deafult_input/"

def create_folder(name):
    try:
        os.mkdir(name)
    except:
        pass
    return

def delete_db_file():
    try:
        os.remove(simulation_db)
    except:
        pass
    return

############## User authentication ##############
############## Not the right way of doing things, but i don't know how to use django built-in authentication ##############
global users_authentication_dict
users_authentication_dict = {}

def set_user_key(user, token):
    users_authentication_dict[user] = str(token)
    return

def get_user_key(user, token):
    saved_token = users_authentication_dict.get(user)
    if saved_token is None or saved_token != token:
        r = 'None'
    else:
        r = 'Ok'
    return r
############## END - User authentication ##############

############## Progress bar ##############
single_simulation_run_time_in_seconds = 0.66
#global current_number_of_simulations
current_number_of_simulations = 0
#global total_number_of_simulations
total_number_of_simulations = 0

def set_total_number_of_simulations(num):
    #print("set_total_number_of_simulations num",num )
    #print("set_total_number_of_simulations: total_number_of_simulations", total_number_of_simulations)
    global total_number_of_simulations
    total_number_of_simulations = num
    #print("set_total_number_of_simulations: total_number_of_simulations", total_number_of_simulations)
    return

def get_total_number_of_simulations():
    #print("get_total_number_of_simulations: total_number_of_simulations", total_number_of_simulations)
    return total_number_of_simulations

def set_current_number_of_simulations(num):
    global current_number_of_simulations
    current_number_of_simulations = num
    return

def get_current_number_of_simulations():
    return current_number_of_simulations
############## END - Progress bar ##############
