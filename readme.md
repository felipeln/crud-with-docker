# Crud with docker

A basic crud with EJS, BOOTSTRAP, NODE, SEQUELIZE and POSTGRES using docker to run an app and database containers.

# Result

![video](https://gist.githubusercontent.com/felipeln/c83ee37e6d3b08b8c22d51adaeea2f50/raw/137d82453cb6d84b904e572637cbc6045a7422f0/crud-docker.gif)


# How to use

1. clone this repository
```git
    git clone https://github.com/felipeln/crud-with-docker.git
```
2. build the database container
```bash
    docker compose up -d node_db
```

3. build app container
```bash
    docker compose build
```
4. set up the app
```bash
    docker compose up --build
```
5. the app should be running on your `localhost:2020`