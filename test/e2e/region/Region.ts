import { api } from './lib/api';
import { DatabaseResetCommand } from '../../src/console/DatabaseResetCommand';
import { createAdminUser, getToken } from './lib/auth';


describe('/region-regions', () => {

    const keys = [
        'vlId', 'number', 'name', 'description', 'type', 'goalRate', 'updateVl', 'updatedBy', 'updated', 'created'
    ];

    const testData = {
        vlId: undefined, // TODO: Add test value
        number: undefined, // TODO: Add test value
        name: undefined, // TODO: Add test value
        description: undefined, // TODO: Add test value
        type: undefined, // TODO: Add test value
        goalRate: undefined, // TODO: Add test value
        updateVl: undefined, // TODO: Add test value
        updatedBy: undefined, // TODO: Add test value
        updated: undefined, // TODO: Add test value
        created: undefined // TODO: Add test value
    };

    const testDataUpdated = {
        vlId: undefined, // TODO: Add test value
        number: undefined, // TODO: Add test value
        name: undefined, // TODO: Add test value
        description: undefined, // TODO: Add test value
        type: undefined, // TODO: Add test value
        goalRate: undefined, // TODO: Add test value
        updateVl: undefined, // TODO: Add test value
        updatedBy: undefined, // TODO: Add test value
        updated: undefined, // TODO: Add test value
        created: undefined // TODO: Add test value
    };

    let token;
    let auth;
    let createdId;
    beforeAll(async () => {
        const command = new DatabaseResetCommand();
        await command.run();
        await createAdminUser();
        token = getToken();
        auth = {
            token
        };
    });

    test('POST      /region-regions        Should create a new region region', async () => {
        const res = await api('POST', '/api/region-regions', {
            token,
            body: testData
        });
        res.expectJson();
        res.expectStatusCode(201);
        res.expectData(keys);
        createdId = res.getData()['id'];
    });

    test('POST      /region-regions        Should fail because we want to create a empty region region', async () => {
        const res = await api('POST', '/api/region-regions', {
            token,
            body: {}
        });
        res.expectJson();
        res.expectStatusCode(400);
    });

    test('GET       /region-regions        Should list of region regions with our new create one', async () => {
        const res = await api('GET', '/api/region-regions', auth);
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(keys);
        const data = res.getData<any[]>();
        expect(data.length).toBe(2);

        const result = data[1];
        expect(result.vlId).toBe(testData.vlId);
        expect(result.number).toBe(testData.number);
        expect(result.name).toBe(testData.name);
        expect(result.description).toBe(testData.description);
        expect(result.type).toBe(testData.type);
        expect(result.goalRate).toBe(testData.goalRate);
        expect(result.updateVl).toBe(testData.updateVl);
        expect(result.updatedBy).toBe(testData.updatedBy);
        expect(result.updated).toBe(testData.updated);
        expect(result.created).toBe(testData.created);
    });

    test('GET       /region-regions/:id    Should return one region region', async () => {
        const res = await api('GET', `/api/region-regions/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(keys);

        const result: any = res.getData();
        expect(result.vlId).toBe(testData.vlId);
        expect(result.number).toBe(testData.number);
        expect(result.name).toBe(testData.name);
        expect(result.description).toBe(testData.description);
        expect(result.type).toBe(testData.type);
        expect(result.goalRate).toBe(testData.goalRate);
        expect(result.updateVl).toBe(testData.updateVl);
        expect(result.updatedBy).toBe(testData.updatedBy);
        expect(result.updated).toBe(testData.updated);
        expect(result.created).toBe(testData.created);
    });

    test('PUT       /region-regions/:id    Should update the region region', async () => {
        const res = await api('PUT', `/api/region-regions/${createdId}`, {
            token,
            body: testDataUpdated
        });
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(keys);

        const result: any = res.getData();
        expect(result.vlId).toBe(testDataUpdated.vlId);
        expect(result.number).toBe(testDataUpdated.number);
        expect(result.name).toBe(testDataUpdated.name);
        expect(result.description).toBe(testDataUpdated.description);
        expect(result.type).toBe(testDataUpdated.type);
        expect(result.goalRate).toBe(testDataUpdated.goalRate);
        expect(result.updateVl).toBe(testDataUpdated.updateVl);
        expect(result.updatedBy).toBe(testDataUpdated.updatedBy);
        expect(result.updated).toBe(testDataUpdated.updated);
        expect(result.created).toBe(testDataUpdated.created);
    });

    test('PUT       /region-regions/:id    Should fail because we want to update the region region with a invalid email', async () => {
        const res = await api('PUT', `/api/region-regions/${createdId}`, {
            token,
            body: {
                email: 'abc'
            }
        });
        res.expectJson();
        res.expectStatusCode(400);
    });

    test('DELETE    /region-regions/:id    Should delete the region region', async () => {
        const res = await api('DELETE', `/api/region-regions/${createdId}`, auth);
        res.expectStatusCode(200);
    });

    /**
     * 404 - NotFound Testing
     */
    test('GET       /region-regions/:id    Should return with a 404, because we just deleted the region region', async () => {
        const res = await api('GET', `/api/region-regions/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

    test('DELETE    /region-regions/:id    Should return with a 404, because we just deleted the region region', async () => {
        const res = await api('DELETE', `/api/region-regions/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

    test('PUT       /region-regions/:id    Should return with a 404, because we just deleted the region region', async () => {
        const res = await api('PUT', `/api/region-regions/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

});
