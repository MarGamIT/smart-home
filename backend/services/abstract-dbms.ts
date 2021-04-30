import { Connection, DBChangeResult, TableChangeResult, WriteResult } from "rethinkdb-ts";
import { Home } from "../../library/models/home.model";
import { LogMessage } from "../../library/models/logMessage.model";
import { User } from "../../library/models/user.model";

export abstract class AbstractDBMS {
    // inserts user into database
    public abstract insertUserAsync(user: User): Promise<WriteResult>;

    // gets specific user from database
    public abstract getUserAsync(name: string): Promise<User>;

    // updates user from database
    public abstract updateUserAsync(user: User): Promise<WriteResult>;

    // gets every user from database
    public abstract getUsersAsync(): Promise<User[]>;

    // deletes user from database
    public abstract deleteUserAsync(id: string): Promise<WriteResult>;

    // inserts home into database
    public abstract insertHomeAsync(home: Home): Promise<WriteResult>;

    // gets specific user from database
    public abstract getHomeAsync(id: string): Promise<Home>;

    public abstract updateHomeAsync(home: Home): Promise<WriteResult>;



    // gets every Log Message from database
    public abstract getLogMessagesAsync(): Promise<LogMessage[]>;

    // inserts log message into database
    public abstract insertLogMessageAsync(home: LogMessage): Promise<WriteResult>;

    // drop the database to reset values
    public abstract resetDatabase(): Promise<DBChangeResult>;

    public abstract resetTableName(nameOfTable: string): Promise<TableChangeResult>;


    // initializes dbms
    public abstract initializeSystemAsync(): Promise<boolean>;

    // builds a database connection
    protected abstract connectAsync(): Promise<Connection>;

    // creates database 
    protected abstract createDatabaseAsync(connection: Connection): Promise<DBChangeResult>;

    // creates table
    protected abstract createTableAsync(connection: Connection, table: string): Promise<TableChangeResult>;
}