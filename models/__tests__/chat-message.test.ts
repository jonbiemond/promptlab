import { MessageModel} from "../";

describe('MessageModel', () => {
    let message: MessageModel;

    beforeEach(() => {
        message = new MessageModel('sessionId', 'sender', null, 'text');
    });

    test('MessageModel constructor sets the correct properties', () => {
        expect(message.id).toBeDefined();
        expect(message.type).toBe('Message');
        expect(message.sessionId).toBe('sessionId');
        expect(message.sender).toBe('sender');
        expect(message.tokens).toBeNull();
        expect(message.timeStamp).toBeDefined();
        expect(message.text).toBe('text');
    });
});