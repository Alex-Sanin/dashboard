import os

sim_dict = [
        "Period",
        "Customer",
        "Input file name",
        "Grid Connection (MW)",
        "Battery Size (MWh)",
        "Battery Power (MW)",
        "Battery Cost ($/NIS)",
        "Battery Cost per kWh ($/kWh)",
        "PV Size (MW)",
        "PV Cost (NIS)",
        "ROI (years)"
    ]

root_folder = "/home/ubuntu/v045_ec2/applications/simulation"
simulation_db = root_folder+"/db/simulation.db"

battery_initial_level_of_energy = 0
pv_maintenance_per_mw = 0
dollar_to_nis = 3.42
input_file = "input_data.csv"
ip_address = "http://18.158.182.8:8001"