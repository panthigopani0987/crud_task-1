const express = require('express');

const routes = express.Router();

const fileupload = require('../config/fileupload');

const crudcontroller = require('../controllers/crud');

routes.get('/',crudcontroller.index);
routes.post('/insertData',fileupload,crudcontroller.insertdata);
routes.get('/deleteData',crudcontroller.deleteData);
routes.get('/updateData',crudcontroller.updateData);
routes.get('/search',crudcontroller.searchData);
routes.get('/allshow',crudcontroller.allshow);


module.exports = routes;