# exercise-exoplanet-catalogue
Program that downloads a catalog of exoplanet data and displays required information

## About the exercise
Program that downloads a catalog of exoplanet data and displays the following information:

`The number of orphan planets (no star).`
`The name (planet identifier) of the planet orbiting the hottest star.`
`A timeline of the number of planets discovered per year grouped by size. Use the following groups: “small” is less than 1 Jupiter radii, “medium” is less than 2 Jupiter radii, and anything bigger is considered “large”. For example, in 2004 we discovered 2 small planets, 5 medium planets, and 0 large planets.`

The dataset can be found in JSON format here: https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets

And is documented here: https://www.kaggle.com/mrisdal/open-exoplanet-catalogue

## Instructions for execution of program
Language used : JavaScript
Runtime environment : NodeJs

Pre-requisites: 
1] Ensure the latest stable Nodejs is installed in the system before executing the below command.
2] Ensure the directory where the NodeJs (& bundled npm package) is to be installed, has write permissions.

Navigate to the project root directory and execute the `start script` defined in `package.json` file.

`npm run start`
Note : pre-start step has been configured to install the required project dependencies here using `npm install`.
This will install the necessary packages under .node_modules directory.

## Instructions for execution of tests.
Navigate to the project root directory and execute the `test script` defined in `package.json` file.

`npm run test`
Note : pre-test step has been configured to install the required project dependencies here using `npm install`
This will install the necessary packages under .node_modules directory.

## Results

C:\Users\kusha\Desktop\work\git\exercise-exoplanet-catalogue>npm run start

Successfully fetched the exoplanet data set...
The number of orphan planets (no star):  2
The name (planet identifier) of the planet orbiting the hottest star:  V391 Peg b
--------------------------TIMELINE Data--------------------------
In 1781 we discovered 1 small planets, 0 medium planets and 0 large planets
In 1846 we discovered 1 small planets, 0 medium planets and 0 large planets
In 1930 we discovered 1 small planets, 0 medium planets and 0 large planets
In 1992 we discovered 0 small planets, 0 medium planets and 0 large planets
In 1994 we discovered 0 small planets, 0 medium planets and 0 large planets
In 1995 we discovered 0 small planets, 0 medium planets and 0 large planets
In 1996 we discovered 0 small planets, 0 medium planets and 0 large planets
In 1997 we discovered 0 small planets, 0 medium planets and 0 large planets
In 1998 we discovered 0 small planets, 0 medium planets and 0 large planets
In 1999 we discovered 0 small planets, 1 medium planets and 0 large planets
In 2000 we discovered 0 small planets, 0 medium planets and 0 large planets
In 2001 we discovered 1 small planets, 0 medium planets and 0 large planets
In 2002 we discovered 0 small planets, 1 medium planets and 0 large planets
In 2003 we discovered 0 small planets, 0 medium planets and 0 large planets
In 2004 we discovered 2 small planets, 5 medium planets and 0 large planets
In 2005 we discovered 1 small planets, 3 medium planets and 0 large planets
In 2006 we discovered 1 small planets, 6 medium planets and 0 large planets
In 2007 we discovered 4 small planets, 16 medium planets and 0 large planets
In 2008 we discovered 1 small planets, 21 medium planets and 1 large planets
In 2009 we discovered 4 small planets, 6 medium planets and 0 large planets
In 2010 we discovered 15 small planets, 39 medium planets and 0 large planets
In 2011 we discovered 32 small planets, 48 medium planets and 1 large planets
In 2012 we discovered 52 small planets, 21 medium planets and 0 large planets
In 2013 we discovered 58 small planets, 30 medium planets and 2 large planets
In 2014 we discovered 830 small planets, 30 medium planets and 0 large planets
In 2015 we discovered 104 small planets, 30 medium planets and 0 large planets
In 2016 we discovered 1267 small planets, 26 medium planets and 0 large planets

# docker build command
docker build . -t exercise-exoplanet-catalogue

# Project file content
1] package.json - contains the necessary NodeJs npm project information and is the main.entry point for meta data.
2] test > helper.js - contains the relevant helper packages and setup required for executing Mocha unit tests.
3] .mocharc.js & test > mocha.opts - Mocha configuration file. Contains the arguments to be passed for mocha setup.