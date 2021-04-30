import express from "express";

export abstract class AbstractApi {
    // creates user
    public abstract createUserAsync(request: express.Request, response: express.Response): Promise<void>;

    // updates user
    public abstract updateUserAsync(request: express.Request, response: express.Response): Promise<void>;

    // gets every user
    public abstract listUsersAsync(request: express.Request, response: express.Response): Promise<void>;

    // deletes user
    public abstract deleteUserAsync(request: express.Request, response: express.Response): Promise<void>;


    public abstract createLogMessageAsync(request: express.Request, response: express.Response): Promise<void>;
    public abstract listLogMessagesAsync(request: express.Request, response: express.Response): Promise<void>;
    public abstract dropTableAsync(request: express.Request, response: express.Response): Promise<void>;
    public abstract dropDatabaseAsync(request: express.Request, response: express.Response): Promise<void>;



    // creates login session
    public abstract createSessionAsync(request: express.Request, response: express.Response): Promise<void>;

    // handles unspecified routes
    public abstract handleNotFound(request: express.Request, response: express.Response): void;

    // initializes api
    public abstract initializeApi(): void;

    // starts this service
    public abstract start(): void;
}