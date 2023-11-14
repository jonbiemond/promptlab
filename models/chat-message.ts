import { v4 as uuidv4 } from 'uuid';

interface Message {
    id: string;
    type: string;
    sessionId: string;
    timeStamp: Date;
    sender: string;
    tokens?: number | null;
    text: string;
}

class MessageModel implements Message {
    public id: string;
    public type: string;
    public sessionId: string;
    public timeStamp: Date;
    public sender: string;
    public tokens?: number | null;
    public text: string;

    constructor(sessionId: string, sender: string, tokens: number | null, text: string) {
        this.id = uuidv4();
        this.type = 'Message';
        this.sessionId = sessionId;
        this.sender = sender;
        this.tokens = tokens;
        this.timeStamp = new Date();
        this.text = text;
    }
}

export {MessageModel};    export type { Message };

