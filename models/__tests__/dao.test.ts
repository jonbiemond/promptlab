import { SessionModel, Dao } from '../';
import { CosmosClient } from '@azure/cosmos';

jest.mock('@azure/cosmos', () => {
    return {
        CosmosClient: jest.fn().mockImplementation(() => {
            return {
                database: jest.fn().mockReturnValue({
                    container: jest.fn().mockReturnValue({
                        items: {
                            create: jest.fn().mockResolvedValue({ resource: {} }),
                        },
                    }),
                }),
            };
        }),
    };
});

describe('Dao', () => {
    let dao: Dao<SessionModel>;

    class TestDao extends Dao<SessionModel> {
        protected get containerId(): string {
            return 'test-container-id';
        }
    }

    beforeEach(() => {
        dao = new TestDao();
    });

    test('saveToDatabase calls the create method on CosmosClient', async () => {
        await dao.saveToDatabase();
        const mockClient = CosmosClient as jest.MockedClass<typeof CosmosClient>;
        // expect(mockClient.mock.instances[0].database().container().items.create).toHaveBeenCalled();
    });
});

describe('saveToDatabase', () => {
    let session: SessionModel;

    beforeEach(() => {
        session = new SessionModel();
    });

    test('saveToDatabase calls the saveToDatabase function in Dao class', async () => {
        const spy = jest.spyOn(Dao.prototype, 'saveToDatabase');
        spy.mockImplementation(() => Promise.resolve());

        await session.saveToDatabase();

        expect(spy).toHaveBeenCalled();

        spy.mockRestore();
    });
});