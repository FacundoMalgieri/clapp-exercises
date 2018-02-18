# clapps-exercises

This repository is to present a technical test to Clapps company. It's divided in exercise-one and exercise-two.
You'll find every needed documentantion in the code itself.

## exercise-one
To see how it works just copy and paste the code inside a browser console (f12) or run it in debugging mode in Visual Studio Code (f5)

## exercise-two

This exercise is divided in two. The `server` and the `client`. 

### Server
Composed by a REST API and a MySQL DB. To get started, first you'll need [xampp](https://www.apachefriends.org/es/index.html) and install
apache and MySQL, then start both services, get into [phpmyadmin](http://localhost/phpmyadmin), create a new database called `clapps`
and run the following query:

```sql
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL UNIQUE,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```
Then, `npm install` all server's dependencies, server's root folder and `node app.js`. This will start the REST service and you can see the
available routes [here](https://github.com/FacundoMalgieri/clapps-exercises/blob/master/exercise-two/server/routes/product.routes.js).
You can test them with postman or from the client itself.

### Client
Built with Angular, this client consumes the API to display products and manage the stock. Envolves all CRUD and sorting operations.
To start using, just download and `npm install` all the dependencies and [here] (https://github.com/FacundoMalgieri/clapps-exercises/tree/master/exercise-two/client#client) 
you can all the commands to start using.


