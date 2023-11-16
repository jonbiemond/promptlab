import { SessionModel, MessageModel } from './models';

async function insertSampleSession() {
    // Create a new SessionModel instance
    const session = new SessionModel();

    // Populate it with sample data
    session.tokensUsed = 10;
    session.name = 'Sample Chat';
    session.messages = [
        new MessageModel(session.sessionId, 'user1', null, 'Hello, this is a sample message.'),
        new MessageModel(session.sessionId, 'llm', null, 'Hello, this is another sample message.')
    ];

    // Save the session to the database
    await session.saveToDatabase();

    // Retrieve the session from the database
    const retrievedSession = await session.getFromDatabase(session.sessionId);

    // Check if the retrieved session matches the sample session
    if (JSON.stringify(retrievedSession) === JSON.stringify(session)) {
        console.log('Sample session has been inserted into the database.');
    } else {
        console.log('Failed to insert sample session into the database.');
    }
}

insertSampleSession().catch(console.error);