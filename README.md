Testing site: ec2-18-158-182-8.eu-central-1.compute.amazonaws.com
username: ubuntu

## Installing
```
git clone https://github.com/Lucioric2000/Emek_Sadot_energy_package.git
cd Emek_Sadot_energy_package
git submodule init
git submodule update
```
then go to the folder dashboard and run:
```
npm install
npm start
```

then open another windows, where you should execute the commands:
```
cd Emek_Sadot_energy_package/simulation
python3 -mvenv venv
source venv/bin/activate
pip install pipenv
pipenv install
```
connect there via SSH, and go to the folder Emek_Sadot_energy_package

## Executing:
In one window execute the commands:
```
cd Emek_Sadot_energy_package/dashboard
npm start
```
While in another window execute the commands:
```
cd Emek_Sadot_energy_package/simulation
 source venv/bin/activate
python django_02/manage.py runserver
```
Then go to the browser and enter the address: http://ec2-18-158-182-8.eu-central-1.compute.amazonaws.com:3000/