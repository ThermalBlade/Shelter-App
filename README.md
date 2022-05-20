# Forum Brands Full Stack Application Exercise
***Hi! We are super excited to see what you are able to create***

***Duration***: We don't expect you to take more than 2~4h to finish the exercise.

## The Exercise
You are in the forefront of creating a new internal dashboard for an amazing Shelter. 

This particular shelter only allows the intake of 2 types of animals ***Cats*** and ***Dogs*** both of which can always be adopted
at any stage. 

As an Animal Care specialist I would love to be able to manage different aspects in this application:
- Identify the animal in an easy and intuitive way
- Understand how long the animal has been in the shelter 
- Understand who has adopted our animals
- Be able to change information about the Cat or Dog easily. 

Finally, you overheard the Shelter Manager mentioning that soon there is going to be a new shelter in a new location. 
Not sure what this means now, but probably good to know. 

***What are we looking for***

The following criteria will be used to evaluate your solution: 
- ER diagram
- The application starts and doesn't have any visible errors
- Showcase your skills to us!

***Important to know***

We are not expecting you to create any database or any sql code, though we would like to see how you are thinking about the 
database structure. It can also be a simple image or a readable hand drawing. All the data of the endpoints (Graphql or REST) 
can be hardcoded as a JSON object return. 

## System requirements
Make sure these application are installed in you machine. Those are necessary for the application to work

- [Nodejs]() - We are using v14.17.1
- [NPM]() - Latest version with the current system

## Starting the environment 
First you need to install all the dependencies

```shell
npm i
```

Then you should be able to run the application with

```shell
npm start
```

## Notes
> The first thing of note is that the server is a very simple json file launched through npm module "json-server"
> There are limitations to "json-server", the largest being the inability to nest information and then alter that information.
> With more time, or consideration for a larger database, something far more robust should be used, and a different structure should be figured out.
> For the purposes of this assignment however, "json-server" works fine.

> The application should start on local host 9000, and listed to server on local host 3000
> The application will allow you to search for animals based on criteria and edit if they are adopted or not.
> A good future idea would to allow the front end to edit other animal attributes after search, or remove them from the database entirely
> The application also allows you to add animals. It should be noted that you must fill out all the fields to add an animal to the database.

> Thank you so much for your consideration!
