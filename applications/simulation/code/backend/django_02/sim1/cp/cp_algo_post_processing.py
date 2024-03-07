import numpy_financial as npf

def cp_get_npv_irr(total_investment, operation_profit, years):
    operation_profit_arr1 = [-total_investment]
    operation_profit_arr2 = [round(operation_profit, 0)] * years
    operation_profit_arr = operation_profit_arr1 + operation_profit_arr2
    interest_rate = 0.10
    npv = npf.npv(interest_rate, operation_profit_arr)
    irr = npf.irr(operation_profit_arr)
    return npv, irr