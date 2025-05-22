import { Express } from 'express';
import { IndexController } from '../controllers/index';

export function setRoutes(app: Express) {
    const indexController = new IndexController();

    app.get('/', indexController.home);
    app.get('/api/data', indexController.getData);
    // Add more routes as needed
}