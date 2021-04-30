import { AbstractDBMS } from "./abstract-dbms";
import { User } from "../../library/models/user.model";
import { Role } from "../../library/models/role.model";
import { Home } from "../../library/models/home.model";
import { Connection, DBChangeResult, r, RDatum, TableChangeResult, WriteResult } from "rethinkdb-ts";

export class RethinkDBMSService extends AbstractDBMS {

    public constructor(private host: string, private port: number, private database: string, private userTable: string, private homeTable: string) {
        super();
    }

    // inserts user into database
    public async insertUserAsync(user: User): Promise<WriteResult> {
        if (!user || await this.getUserAsync(user.name)) {
            return null;
        }

        user.id = await this.getUniqueID();

        const connection = await this.connectAsync();
        return r.db(this.database)
            .table(this.userTable)
            .insert(user)
            .run(connection);
    }

    // gets specific user from database
    public async getUserAsync(name: string): Promise<User> {
        if (!name) {
            return null;
        }

        const connection = await this.connectAsync();
        const result = await r.db(this.database)
            .table(this.userTable)
            .filter({ name: name })
            .run(connection);

        if (result.length == 0) {
            return null;
        }

        return result[0];
    }

    // updates user from database
    public async updateUserAsync(user: User): Promise<WriteResult> {
        if (!user) {
            return null;
        }

        const existingUser = await this.getUserAsync(user.name);

        if (existingUser && existingUser.id != user.id) {
            return null;
        }

        const connection = await this.connectAsync();
        return r.db(this.database)
            .table(this.userTable)
            .filter({ id: user.id })
            .update(user)
            .run(connection);
    }

    // gets every user from database
    public async getUsersAsync(): Promise<User[]> {
        const connection = await this.connectAsync();
        return r.db(this.database)
            .table(this.userTable)
            .run(connection);
    }

    // deletes user from database
    public async deleteUserAsync(id: string): Promise<WriteResult> {
        if (!id) {
            return null;
        }

        const connection = await this.connectAsync();
        return r.db(this.database)
            .table(this.userTable)
            .filter({ id: id })
            .delete()
            .run(connection);
    }

    // inserts user into database
    public async insertHomeAsync(home: Home): Promise<WriteResult> {
        // if (!user || await this.getUserAsync(user.id)) {
        //     return null;
        // }

        home.id = await this.getUniqueID();

        const connection = await this.connectAsync();
        return r.db(this.database)
            .table(this.homeTable)
            .insert(home)
            .run(connection);
    }

    // updates user from database
    public async updateHomeAsync(home: Home): Promise<WriteResult> {
        if (!home) {
            return null;
        }

        const existingHome = await this.getHomeAsync(home.id);

        if (existingHome && existingHome.id != home.id) {
            return null;
        }

        const connection = await this.connectAsync();

        return r.db(this.database)
            .table(this.homeTable)
            .filter({ id: home.id })
            .update(home)
            .run(connection);
    }

    // gets home by id from database
    public async getHomeAsync(id: any): Promise<Home> {
        if (!id) {
            return null;
        }

        const connection = await this.connectAsync();
        const result = await r.db(this.database)
            .table(this.homeTable)
            .filter({ id: id })
            .run(connection);

        if (result.length == 0) {
            return null;
        }

        return result[0];
    }

    // initializes dbms
    public async initializeSystemAsync(): Promise<boolean> {
        const connection = await this.connectAsync();
        const databaseResult = await this.createDatabaseAsync(connection);
        const userTableResult = await this.createTableAsync(connection, this.userTable);
        const entryTableResult = await this.createTableAsync(connection, this.homeTable);

        await this.insertUserAsync({ id: "1000000000000000", role: Role.Admin, name: "admin", password: "admin" });
        await this.insertHomeAsync({ id: "0000000000000001", members: [], modules: [] });


        return !!databaseResult.dbs_created || !!userTableResult.tables_created || !!entryTableResult.tables_created;
    }


    // builds a database connection
    protected connectAsync(): Promise<Connection> {
        return r.connect({ host: this.host, port: this.port });
    }

    // creates database 
    protected createDatabaseAsync(connection: Connection): Promise<DBChangeResult> {
        return r.dbList()
            .contains(this.database)
            .do((containsDatabase: RDatum<boolean>) => {
                return r.branch(containsDatabase, { dbs_created: 0 }, r.dbCreate(this.database));
            }).run(connection);
    }

    // creates table
    protected createTableAsync(connection: Connection, table: string): Promise<TableChangeResult> {
        return r.db(this.database)
            .tableList()
            .contains(table)
            .do((containsTable: RDatum<boolean>) => {
                return r.branch(containsTable, { tables_created: 0 }, r.db(this.database).tableCreate(table));
            }).run(connection);
    }

    // gets uuid
    private async getUniqueID(): Promise<string> {
        const connection = await this.connectAsync();
        return r.uuid().run(connection);
    }
}
