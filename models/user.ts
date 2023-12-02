import { Dao } from "./dao";
import { database } from "./db";

interface User {
  id: string;
  type: string;
  userId: string;
  username: string;
  password_hash: string;
  recentSessions?: string[];
}

class UserModel extends Dao<UserModel> implements User {
    public type: string;
    public userId: string;
    public username: string;
    public password_hash: string;
    public recentSessions?: string[];

    constructor(username: string, password_hash: string) {
        super();
        this.type = 'User';
        this.userId = this.id;
        this.username = username;
        this.password_hash = password_hash;
        this.recentSessions = [];
    }

    protected get containerId(): string {
        return 'user';
    }

    protected get partitionKeyField(): string {
        return 'username';
    }

    protected uniqueKeyField(): string {
        return 'username';
    }

    public addSession(sessionId: string): void {
        if (!this.recentSessions) {
            this.recentSessions = [];
        }
        this.recentSessions.push(sessionId);
        if (this.recentSessions.length > 10) {
            this.recentSessions.shift();
        }
    }
}

async function get_user(username: string): Promise<UserModel> {
    const container = database.container("user");
    const querySpec = {
        query: "SELECT * FROM user WHERE user.username = @uniqueKey",
        parameters: [
            {
                name: '@uniqueKey',
                value: username
            }
        ]
    };
    const { resources: results } = await container.items.query(querySpec).fetchAll();
    return results[0];
}

export { UserModel, get_user };    export type { User };