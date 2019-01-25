import { api } from './lib/api';
import { DatabaseResetCommand } from '../../src/console/DatabaseResetCommand';
import { createAdminUser, getToken } from './lib/auth';


describe('/params', () => {

    const keys = [
        'id', 'key', 'desc', 'type', 'value', 'enabled', 'siteConfig', 'regionConfig', 'isRawValue'
    ];

    const testData = {
        id: undefined, // TODO: Add test value
        key: undefined, // TODO: Add test value
        desc: undefined, // TODO: Add test value
        type: undefined, // TODO: Add test value
        value: undefined, // TODO: Add test value
        enabled: undefined, // TODO: Add test value
        siteConfig: undefined, // TODO: Add test value
        regionConfig: undefined, // TODO: Add test value
        isRawValue: undefined // TODO: Add test value
    };

    const testDataUpdated = {
        id: undefined, // TODO: Add test value
        key: undefined, // TODO: Add test value
        desc: undefined, // TODO: Add test value
        type: undefined, // TODO: Add test value
        value: undefined, // TODO: Add test value
        enabled: undefined, // TODO: Add test value
        siteConfig: undefined, // TODO: Add test value
        regionConfig: undefined, // TODO: Add test value
        isRawValue: undefined // TODO: Add test value
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

    test('POST      /params        Should create a new params', async () => {
        const res = await api('POST', '/api/params', {
            token,
            body: testData
        });
        res.expectJson();
        res.expectStatusCode(201);
        res.expectData(keys);
        createdId = res.getData()['id'];
    });

    test('POST      /params        Should fail because we want to create a empty params', async () => {
        const res = await api('POST', '/api/params', {
            token,
            body: {}
        });
        res.expectJson();
        res.expectStatusCode(400);
    });

    test('GET       /params        Should list of paramss with our new create one', async () => {
        const res = await api('GET', '/api/params', auth);
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(keys);
        const data = res.getData<any[]>();
        expect(data.length).toBe(2);

        const result = data[1];
        expect(result.id).toBe(testData.id);
        expect(result.key).toBe(testData.key);
        expect(result.desc).toBe(testData.desc);
        expect(result.type).toBe(testData.type);
        expect(result.value).toBe(testData.value);
        expect(result.enabled).toBe(testData.enabled);
        expect(result.siteConfig).toBe(testData.siteConfig);
        expect(result.regionConfig).toBe(testData.regionConfig);
        expect(result.isRawValue).toBe(testData.isRawValue);
    });

    test('GET       /params/:id    Should return one params', async () => {
        const res = await api('GET', `/api/params/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(keys);

        const result: any = res.getData();
        expect(result.id).toBe(testData.id);
        expect(result.key).toBe(testData.key);
        expect(result.desc).toBe(testData.desc);
        expect(result.type).toBe(testData.type);
        expect(result.value).toBe(testData.value);
        expect(result.enabled).toBe(testData.enabled);
        expect(result.siteConfig).toBe(testData.siteConfig);
        expect(result.regionConfig).toBe(testData.regionConfig);
        expect(result.isRawValue).toBe(testData.isRawValue);
    });

    test('PUT       /params/:id    Should update the params', async () => {
        const res = await api('PUT', `/api/params/${createdId}`, {
            token,
            body: testDataUpdated
        });
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(keys);

        const result: any = res.getData();
        expect(result.id).toBe(testDataUpdated.id);
        expect(result.key).toBe(testDataUpdated.key);
        expect(result.desc).toBe(testDataUpdated.desc);
        expect(result.type).toBe(testDataUpdated.type);
        expect(result.value).toBe(testDataUpdated.value);
        expect(result.enabled).toBe(testDataUpdated.enabled);
        expect(result.siteConfig).toBe(testDataUpdated.siteConfig);
        expect(result.regionConfig).toBe(testDataUpdated.regionConfig);
        expect(result.isRawValue).toBe(testDataUpdated.isRawValue);
    });

    test('PUT       /params/:id    Should fail because we want to update the params with a invalid email', async () => {
        const res = await api('PUT', `/api/params/${createdId}`, {
            token,
            body: {
                email: 'abc'
            }
        });
        res.expectJson();
        res.expectStatusCode(400);
    });

    test('DELETE    /params/:id    Should delete the params', async () => {
        const res = await api('DELETE', `/api/params/${createdId}`, auth);
        res.expectStatusCode(200);
    });

    /**
     * 404 - NotFound Testing
     */
    test('GET       /params/:id    Should return with a 404, because we just deleted the params', async () => {
        const res = await api('GET', `/api/params/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

    test('DELETE    /params/:id    Should return with a 404, because we just deleted the params', async () => {
        const res = await api('DELETE', `/api/params/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

    test('PUT       /params/:id    Should return with a 404, because we just deleted the params', async () => {
        const res = await api('PUT', `/api/params/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

});
