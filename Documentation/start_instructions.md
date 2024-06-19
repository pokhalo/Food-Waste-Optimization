To start, first clone the project: git clone https://github.com/Food-Waste-Optimization/Food-Waste-Optimization.git

# To Start with Back End:

- Make sure you have python (3.9) and poetry installed
- Create folder for data: src/data/basic_mvp_data/
- Add data files from slack-channel #data (or channel: files) into data folder
- Set up ssh-redirect for database connection. Currently our databases on the UH servers can only be accessed from the Megasense server, so you will need access to set this up:
`ssh -L 5433:possu-test.it.helsinki.fi:5432 username@megasense-server.cs.helsinki.fi`
- Go to root and run:
  
`poetry install`

- To start app in development mode:
  
`poetry run invoke start-development`

# To Start with Front End:

- If not installed yet, install npm  and run:

`npm install vite`
  
- Go to folder /frontend
- Initialize React project by running:
```
npm create vite@latest ReactFrontEnd -- --template react
cd ReactFrontEnd
npm install
```

- Currently, these additional libraries are installed into project: axios, react-router-dom, bulma, chart.js, react-chartjs-2

- To install dependencies go to React root folder (src/frontend) and run:
  
`npm install`

- To run React in dev-mode:

`npm run dev`
