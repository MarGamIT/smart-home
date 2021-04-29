import { AbstractLogger } from "../../library/services/abstract-logger";
import { AbstractDBMS } from "./abstract-dbms";
import { AbstractApi } from "./abstract-api";
import bodyParser from 'body-parser';
import express from "express";
import cors from "cors";
import { User } from "../../library/models/user.model";

export class ExpressApiService extends AbstractApi {

    // constructor of this class
    public constructor(private port: number, private dbms: AbstractDBMS, private logger: AbstractLogger, private app: express.Express) {
        super();
    }

    // creates user
    public createUserAsync = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            if (!request.body.name || !request.body.password) {
                response.sendStatus(400);
                return;
            }

            const result = await this.dbms.insertUserAsync(request.body);

            if (result) {
                this.logger.logInfo("Inserted new user");
                response.status(201).send({ status: "201" });
                return;
            }

            response.sendStatus(400);
        }
        catch (error) {
            this.logger.logError('Can\'t connect to database');
            response.sendStatus(500);
        }
    }

    // updates user
    public updateUserAsync = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            if (!request.params.id || !request.body.id || (request.params.id !== request.body.id)) {
                response.sendStatus(400);
                return;
            }

            const result = await this.dbms.updateUserAsync(request.body);

            if (!result) {
                response.sendStatus(400);
                return;
            }

            if (result?.replaced > 0) {
                this.logger.logInfo("Updated user");
            }

            response.status(200).send({ status: "200" });
        }
        catch (error) {
            this.logger.logError('Can\'t connect to database');
            response.sendStatus(500);
        }
    }

    // gets every user
    public listUsersAsync = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            let result: User[] = await this.dbms.getUsersAsync();
            this.logger.logInfo("Sent available users");
            response.status(200).send(result);
        }
        catch (error) {
            this.logger.logError('Can\'t connect to database');
            response.sendStatus(500);
        }
    }

    // deletes user
    public deleteUserAsync = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            if (!request.params.id) {
                response.sendStatus(400);
                return;
            }

            const result = await this.dbms.deleteUserAsync(request.params.id);

            if (result?.deleted > 0) {
                this.logger.logInfo("Deleted user");
            }

            response.status(200).send({ status: "200" });
        }
        catch (error) {
            this.logger.logError('Can\'t connect to database');
            response.sendStatus(500);
        }
    }

    // updates user
    public updateHomeAsync = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            if (!request.params.id || !request.body.id || (request.params.id !== request.body.id)) {
                response.sendStatus(400);
                return;
            }

            const result = await this.dbms.updateHomeAsync(request.body);

            if (!result) {
                response.sendStatus(400);
                return;
            }

            if (result?.replaced > 0) {
                this.logger.logInfo("Updated Home");
            }

            response.status(200).send({ status: "200" });
        }
        catch (error) {
            this.logger.logError('Can\'t connect to database');
            response.sendStatus(500);
        }
    }

    public createHomeAsync = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // if (!request.body.name || !request.body.password) {
            //     response.sendStatus(400);
            //     return;
            // }

            const result = await this.dbms.insertHomeAsync(request.body);

            if (result) {
                this.logger.logInfo("Inserted new home");
                response.status(201).send({ status: "201" });
                return;
            }

            response.sendStatus(400);
        }
        catch (error) {
            this.logger.logError('Can\'t connect to database');
            response.sendStatus(500);
        }
    }

    // get home
    public getHomeAsync = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            let result = await this.dbms.getHomeAsync(request.body.id);
            this.logger.logInfo("Sent home");
            response.status(200).send(result);
        }
        catch (error) {
            this.logger.logError('Can\'t connect to database');
            response.sendStatus(500);
        }
    }

    // creates login session
    public createSessionAsync = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            if (!request.body.name || !request.body.password) {
                response.sendStatus(400);
                return;
            }

            const result = await this.dbms.getUserAsync(request.body.name);

            if (result && result.password === request.body.password) {
                this.logger.logInfo("Created login session");
                response.status(200).send(result);
                return;
            }

            response.sendStatus(400);
        }
        catch (error) {
            this.logger.logError('Can\'t connect to database');
            response.sendStatus(500);
        }
    }

    // handles unspecified routes
    public handleNotFound(request: express.Request, response: express.Response): void {
        response.status(404).end('404 - PAGE NOT FOUND');
    }

    // initializes api
    public initializeApi(): void {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.route('/users')
            .get(this.listUsersAsync)
            .post(this.createUserAsync);

        this.app.route('/users/:id')
            .put(this.updateUserAsync)
            .delete(this.deleteUserAsync);

        this.app.route('/login')
            .post(this.createSessionAsync);

        this.app.route('/home')
            .get(this.getHomeAsync)
            .post(this.createHomeAsync);

        this.app.use(this.handleNotFound);
    }

    // starts this service
    public start(): void {
        this.app.listen(this.port, async () => {
            this.logger.logInfo(`Server started on port ${this.port}`);

            try {
                const result = await this.dbms.initializeSystemAsync();

                if (result) {
                    this.logger.logInfo(`Database and tables created`);
                }
            }
            catch (error) {
                this.logger.logError(`Can't connect to database`);
            }
        });
    }
}