import { SessionModel, MessageModel } from '../';

describe('SessionModel', () => {
    let session: SessionModel;

    beforeEach(() => {
        session = new SessionModel();
    });

    test('addMessage adds a message to the session', () => {
        const message = new MessageModel('sessionId', 'sender', null, 'text');
        session.addMessage(message);
        expect(session.messages).toContain(message);
    });

    test('updateMessage updates a message in the session', () => {
        const message = new MessageModel('sessionId', 'sender', null, 'text');
        session.addMessage(message);
        message.text = 'updated text';
        session.updateMessage(message);
        if (session.messages) {
            const updatedMessage = session.messages.find(m => m.id === message.id);
            if (updatedMessage) {
                expect(updatedMessage.text).toBe('updated text');
            }
        }
    });
});
