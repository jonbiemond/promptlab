import { MessageModel } from './';
import { Dao } from './dao';

interface Session {
    id: string;
    type: string;
    sessionId: string;
    userId: string;
    tokensUsed?: number | null;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    messages?: MessageModel[];
}

class SessionModel extends Dao<SessionModel> implements Session {
    public type: string;
    public sessionId: string;
    public userId: string;
    public tokensUsed?: number | null;
    public name: string;
    public createdAt: Date;
    public updatedAt: Date;
    public messages?: MessageModel[];

    constructor(userId: string) {
        super();
        this.type = 'Session';
        this.sessionId = this.id;
        this.userId = userId;
        this.tokensUsed = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.name = 'New Chat';
        this.messages = [];
    }

    protected get containerId(): string {
        return 'chat';
    }

    protected get partitionKeyField(): string {
        return 'userId';
    }

    protected uniqueKeyField(): string {
        return '';
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

    public async update(): Promise<void> {
        this.updatedAt = new Date();
        await super.update();
    }
}

export { SessionModel };    export type { Session };

