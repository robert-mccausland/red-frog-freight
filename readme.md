# Mock Carrier

This is a system that we can use as a mock endpoint for the GFS services in order to test systems without using the real carriers. It is also possible to customize the data that this carrier will return so its possible to do more focused testing that what we could do with a real carrier.

## Getting Started

The carrier has two parts, the API and Web. The API part is a REST API which takes and returns data in the JSON format. There is also no authentication on any of the APIs as they are only serving test data. The Web part is a web app built using the Vue framework with Vue Material to implement the Material Design design language.

There is a docker-compose file in the root folder that will spin up the api, web and associated mongodb to host the data. running `docker-compose up --build` will get it up and running. You need to map your docker host to docker hostname in your hosts file for it to work (this is normally localhost) and then you can access the web on http://docker:8080. (if you go to http://localhost:8080 it will server the web app but it won't be able to access the api which the app tries to reach on http://docker:8081).

This is an example of how to configure host file config to point the `docker` hostname at your docker host, which on my machine (Windows 10) is at `C:\Windows\System32\drivers\etc\hosts`:

```hosts
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.

 ...

127.0.0.1 docker # <-- Add this line to map localhost the docker hostname.
```

If you have a different docker host than put that as the IP in the hosts file instead of `127.0.0.1`. Or if you don't want to bother with any of this you can modify `docker-compose.yml` and change the `API_HOST` to be `http://localhost:8081` and then access it on `localhost` like normal.

## Web

This is a Vue application, we are using webpack to bundle and transpile all the javascript. As always you will need to run `npm install` to get all the dependencies. To run the dev server, which is quick and will automatically rebuild and reload whenever you change files run `npm start`, or to do the full prod build then `npm run build` will do that and put the built files in the `dist` folder. The dockerfile that builds the web container uses the `servor` in order to serve the built files over http.

### Structure

The app is initialized from the `main.js` module, which is the entry point for the webpack build. To add a new page then it will be needed to be added as a Vue component to the `pages` folder, and you will need to update the routes in the `src/routes.js` module to point a route at that component. There is a common layout around all the pages that is defined in the `App.vue` component.

The `src/constants.js` module is where all the constants are defined (they are similar to environment variables but set at build time). To add new ones they will need to be added to the `DefinePlugin` in the `webpack.config.js` and then referenced from the `constants.js` module. These can then be specified when building the app using the following syntax: `npm run build -- --env.var_name=VALUE`.

All data access should be abstracted to a module defined in the `src/data` folder in order to keep the presentation layer separated from the data layer, an example of this is `src/data/parcels.js`. Any error handling should still be done in the component that calls the data method however, so messages can be displayed to the user.

### Tests

TBD.

plan - aswell as the end to end test we should unit test the handlers to check for error handling and stuff.

## API

The API is a simple express application that talks to a Mongo DB database, running `npm install` then `npm start` should be enough to get you started. There are some environment variables that the application reads, `MONGO_URL` and `DB_NAME`, which specify the url and database name of the mongodb server to connect to. They will default to `localhost` and `red_frog_freight` respectively, so if you have a local install of Mongo DB running it should work fine. Also the `PORT` environment variable will determine which port the app listens too, which by default is `8080`.

### Structure

The API is very simple, it just has a `parcelHandler.js` module which take the requests, validates them and if happy calls and returns the result of the relevant methods in the `parcelData.js` module. The `parcelData.js` module just handles running queries and returning data from the database. Other than that the `index.js` file will initialize the application and handle graceful shutdowns.

### Tests

TBD.

plan - we should use cypress to test the UI, which should include an end to end test as well as a unit test for each page component with a mock data layer to test error handling and stuff.