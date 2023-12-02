import { v4 as uuidv4 } from 'uuid';
import { Dao } from "./dao";

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

export { UserModel };    export type { User };