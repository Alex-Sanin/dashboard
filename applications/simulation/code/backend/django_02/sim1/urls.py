from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('run_simulation/', views.run_simulation, name='run-simulation'),
    path('simulation_main_table_selected_row/', views.simulation_main_table_selected_row, name='simulation-main-table-selected-row'),
    path('simulation_details_table_selected_row/', views.simulation_details_table_selected_row, name='simulation-details-table-selected-row'),
    path('get_all_data/', views.get_all_data, name='get-all-data'),
    path('user_authentication/', user_authentication, name='user_authentication'),
    path('download_file/', download_file, name='download-file'),
    path('get_simulation_run_time/', get_simulation_run_time, name='get-simulation-run-time'),
    path('progress_bar/', progress_bar , name='progress-bar'),
    path('get_customers_list/', get_customers_list , name='get-customers-list'),
    path('best_results/', best_results , name='best-results'),
]