import json
import sqlite3
from .cp_global_settings import *
from .cp_utilities import *

def init_db():
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()

    try:
        cur.execute(
            "CREATE TABLE simulation_main(simulation_main_id, user_name, customer_name, simulation_name, create_time, region, \
                                          currency, input_file, summary_file)"
        )
        cur.execute(
            "CREATE TABLE simulations_details(simulation_main_id, user_name, simulations_details_id, battery_size, battery_power, battery_cost, \
                                              pv_size, pv_cost, grid_connection, roi, output_file, investment, yearly_cost, yearly_income, \
                                              yearly_operation_profit, pv_income, battery_income, npv_10_years, npv_15_years, npv_20_years, \
                                              npv_25_years, irr_10_years, irr_15_years, irr_20_years, irr_25_years)"
        )
    except sqlite3.OperationalError:
        pass
        
    conn.commit()
    conn.close()
    return

def sim_id_from_db():
    sim_id = [0] * db_length()
    db_all = get_all_db()
    if db_all:
        for i in range(db_length()):
            sim_id[i] = db_all[i][0]
    return sim_id

def db_length():
    db_all = get_all_db()
    if db_all:
        l = len(db_all)
    else:
        l = 0
    return (l)

def get_simulation_main_table_from_db(user_name):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = ("""SELECT simulation_main_id, user_name, customer_name, simulation_name, create_time, region, currency,
                                summary_file FROM simulation_main WHERE user_name = ?""")
        res = cur.execute(sql_select_query, (user_name,))
        data = res.fetchall()
        conn.close()
                
        row_number = {}
        if data:
            for i in range(len(data)):
                row_data = {}
                row_data["simulationMainId"] = data[i][0]
                row_data["userName"] = data[i][1]
                row_data["customerName"] = data[i][2]
                row_data["simulationName"] = data[i][3]
                row_data["createTime"] = data[i][4]
                row_data["region"] = data[i][5]
                row_data["currency"] = data[i][6]
                row_data["summary file"] = data[i][7]
                row_number[i] = i
                row_number[i] = row_data
        return row_number
    except:
        pass

def get_simulation_details_table_from_db(user_name, id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT simulation_main_id, user_name, simulations_details_id, battery_size, battery_power, battery_cost, pv_size,
                              pv_cost, grid_connection, roi, output_file FROM simulations_details WHERE user_name = ? and simulation_main_id = ?"""
        res = cur.execute(sql_select_query, ((user_name, id,)))
        data = res.fetchall()
        conn.close()
        row_number = {}
        if data:
            for i in range(len(data)):
                row_data = {}
                row_data["simulationMainId"] = data[i][0]
                row_data["userName"] = data[i][1]
                row_data["simulationsDetailsId"] = data[i][2]
                row_data["batterySize"] = data[i][3]
                row_data["batteryPower"] = data[i][4]
                row_data["batteryCost"] = data[i][5]
                row_data["pvSize"] = data[i][6]
                row_data["pvCost"] = data[i][7]
                row_data["gridConnection"] = data[i][8]
                row_data["roi"] = data[i][9]
                row_data["outputFile"] = data[i][10]
                row_number[i] = i
                row_number[i] = row_data
        
        return row_number
    except:
        pass

def get_simulation_file_from_details_table_from_db(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT output_file FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        tmp = res.fetchone()
        data = tmp[0]
        conn.close()
        if data:
            return data
    except:
        pass

def simulation_main_table_length():
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    res = cur.execute("""SELECT COUNT(*) FROM simulation_main""")
    length = res.fetchone()
    conn.close()
    return length[0]

def simulation_details_table_length():
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    res = cur.execute("""SELECT COUNT(*) FROM simulations_details""")
    length = res.fetchone()
    conn.close()
    return length

def update_db_simulation_main_table(user_name, customer_name, simulation_name, create_time, region, currency, input_file, summary_file):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    id = simulation_main_table_length()
    cur.execute("""
                INSERT INTO simulation_main(simulation_main_id, user_name, customer_name, simulation_name, create_time, region,
                currency, input_file, summary_file)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (id, user_name, customer_name, simulation_name, create_time, region, currency, input_file, summary_file))
    conn.commit()
    conn.close()
    return id

def update_db_simulations_details_table(simulation_main_table_id, user_name, summary_results):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    for i in range(len(summary_results)):
        cur.execute("""
                    INSERT INTO simulations_details(simulation_main_id, user_name, simulations_details_id, battery_size, battery_power,
                    battery_cost, pv_size, pv_cost, grid_connection, roi, output_file, investment, yearly_cost, yearly_income,
                    yearly_operation_profit, pv_income, battery_income, npv_10_years, npv_15_years, npv_20_years, npv_25_years,
                    irr_10_years, irr_15_years, irr_20_years, irr_25_years)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (simulation_main_table_id, user_name, i,
                    summary_results[i][2], summary_results[i][3], summary_results[i][4],
                    summary_results[i][5], summary_results[i][6], summary_results[i][7],
                    summary_results[i][8], summary_results[i][9], summary_results[i][10],
                    summary_results[i][11], summary_results[i][12], summary_results[i][13],
                    summary_results[i][14], summary_results[i][15], summary_results[i][16],
                    summary_results[i][17], summary_results[i][18], summary_results[i][19],
                    summary_results[i][20], summary_results[i][21], summary_results[i][22],
                    summary_results[i][23]))
        conn.commit()
    conn.close()
    return

def get_customer_name(user_name, main_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT customer_name FROM simulation_main WHERE simulation_main_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, (main_table_id, user_name,))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_simulation_name(user_name, main_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT simulation_name FROM simulation_main WHERE simulation_main_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, (main_table_id, user_name,))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_summary_file(user_name, main_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT summary_file FROM simulation_main WHERE simulation_main_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, (main_table_id, user_name,))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_grid_connection(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT grid_connection FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_battery_size(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT battery_size FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_battery_power(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT battery_power FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_battery_cost(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT battery_cost FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_pv_size(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT pv_size FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_pv_cost(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT pv_cost FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_roi(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT roi FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_investment(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT investment FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_yearly_cost(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT yearly_cost FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_yearly_income(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT yearly_income FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_yearly_operation_profit(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT yearly_operation_profit FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        data = res.fetchone()
        conn.close()
        if data:
            return data[0]
    except:
        pass

def get_result_file(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT output_file FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        tmp = res.fetchone()
        data = tmp[0]
        conn.close()
        if data:
            return data
    except:
        pass

def get_pv_income(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT pv_income FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        tmp = res.fetchone()
        data = tmp[0]
        conn.close()
        if data:
            return data
    except:
        pass

def get_battery_income(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT battery_income FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        tmp = res.fetchone()
        data = tmp[0]
        conn.close()
        if data:
            return data
    except:
        pass

def get_npv_10_years(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT npv_10_years FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        tmp = res.fetchone()
        data = tmp[0]
        conn.close()
        if data:
            return data
    except:
        pass

def get_npv_15_years(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT npv_15_years FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        tmp = res.fetchone()
        data = tmp[0]
        conn.close()
        if data:
            return data
    except:
        pass

def get_npv_20_years(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT npv_20_years FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        tmp = res.fetchone()
        data = tmp[0]
        conn.close()
        if data:
            return data
    except:
        pass

def get_npv_25_years(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT npv_25_years FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        tmp = res.fetchone()
        data = tmp[0]
        conn.close()
        if data:
            return data
    except:
        pass

def get_irr_10_years(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT irr_10_years FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        tmp = res.fetchone()
        data = tmp[0]
        conn.close()
        if data:
            return data
    except:
        pass

def get_irr_15_years(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT irr_15_years FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        tmp = res.fetchone()
        data = tmp[0]
        conn.close()
        if data:
            return data
    except:
        pass

def get_irr_20_years(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT irr_20_years FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        tmp = res.fetchone()
        data = tmp[0]
        conn.close()
        if data:
            return data
    except:
        pass

def get_irr_25_years(user_name, main_table_id, details_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT irr_25_years FROM simulations_details WHERE simulation_main_id = ? and simulations_details_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, details_table_id, user_name,)))
        tmp = res.fetchone()
        data = tmp[0]
        conn.close()
        if data:
            return data
    except:
        pass

def get_all_customers(user_name):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT customer_name FROM simulation_main WHERE user_name = ?"""
        res = cur.execute(sql_select_query, (user_name,))
        data = res.fetchall()
        conn.close()
        if data:
            non_duplication_data = list(set(data))
            return non_duplication_data
    except:
        pass

def get_all_npv_25_years(user_name, main_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT npv_25_years FROM simulations_details WHERE simulation_main_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, user_name,)))
        data = res.fetchall()
        conn.close()
        return data
    except:
        pass

def get_all_irr_25_years(user_name, main_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT irr_25_years FROM simulations_details WHERE simulation_main_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, user_name)))
        data = res.fetchall()
        conn.close()
        return data
    except:
        pass

def get_all_roi(user_name, main_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT roi FROM simulations_details WHERE simulation_main_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, user_name,)))
        data = res.fetchall()
        conn.close()
        return data
    except:
        pass

def get_best_roi(user_name, main_table_id):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    try:
        sql_select_query = """SELECT roi FROM simulations_details WHERE simulation_main_id = ? and user_name = ?"""
        res = cur.execute(sql_select_query, ((main_table_id, user_name)))
        data = res.fetchall()
        conn.close()
        return data.index(min(data))
    except:
        pass

def is_simulation_name_exist(user_name, customer_name, simulation_name):
    conn = sqlite3.connect(simulation_db)
    cur = conn.cursor()
    query = "SELECT * FROM simulation_main WHERE customer_name = ? and simulation_name = ? and user_name = ?"
    cur.execute(query, (customer_name, simulation_name, user_name))
    if cur.fetchone() is None:
        r = "not exists"
    else:
        r = "exists"
    conn.close()
    return r
