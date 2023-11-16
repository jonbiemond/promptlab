import { v4 as uuidv4 } from 'uuid';
import { MessageModel } from './';
import { Dao } from './dao';

interface Session {
    id: string;
    type: string;
    sessionId: string;
    tokensUsed?: number | null;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    messages?: MessageModel[];
}

class SessionModel extends Dao<SessionModel> implements Session {
    public id: string;
    public type: string;
    public sessionId: string;
    public tokensUsed?: number | null;
    public name: string;
    public createdAt: Date;
    public updatedAt: Date;
    public messages?: MessageModel[];

    constructor() {
        super();
        this.id = uuidv4();
        this.type = 'Session';
        this.sessionId = this.id;
        this.tokensUsed = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.name = 'New Chat';
        this.messages = [];
    }

    public addMessage(message: MessageModel): void {
        if (!this.messages) {
            this.messages = [];
        }
        this.messages.push(message);
    }

    public updateMessage(updatedMessage: MessageModel): void {
        if (!this.messages) {
            return; // Handle the case where messages array is not initialized
        }

        const index = this.messages.findIndex((m) => m.id === updatedMessage.id);

        if (index !== -1) {
            this.messages[index] = updatedMessage;
        }
    }
}

export { SessionModel };    export type { Session };

