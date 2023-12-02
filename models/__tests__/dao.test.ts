import { SessionModel, Dao } from '../';
import { CosmosClient } from '@azure/cosmos';

describe('saveToDatabase', () => {
    let session: SessionModel;

    beforeEach(() => {
        session = new SessionModel('userId');
    });

    test('saveToDatabase calls the saveToDatabase function in Dao class', async () => {
        const spy = jest.spyOn(Dao.prototype, 'save');
        spy.mockImplementation(() => Promise.resolve());

        await session.save();

        expect(spy).toHaveBeenCalled();

        spy.mockRestore();
    });
});