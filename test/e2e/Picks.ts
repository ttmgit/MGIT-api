import { api } from './lib/api';
import { DatabaseResetCommand } from '../../src/console/DatabaseResetCommand';
import { createAdminUser, getToken } from './lib/auth';


describe('/picks', () => {

    const keys = [
        'vlId', 'assignmentId', 'locationId', 'itemId', 'sequenceNumber', 'caseLabelCheckDigit', 'cartonNumber', 'triggerReplenishment', 'uomId', 'quantityToPick', 'baseItemOverride', 'targetContainerIndicator', 'promptMessage', 'quantityPicked', 'quantityAdjusted', 'isBaseItem', 'operatorId', 'pickTime', 'type', 'status', 'originalPickId', 'shortedDate', 'updatedBy', 'updated', 'created'
    ];

    const testData = {
        vlId: undefined, // TODO: Add test value
        assignmentId: undefined, // TODO: Add test value
        locationId: undefined, // TODO: Add test value
        itemId: undefined, // TODO: Add test value
        sequenceNumber: undefined, // TODO: Add test value
        caseLabelCheckDigit: undefined, // TODO: Add test value
        cartonNumber: undefined, // TODO: Add test value
        triggerReplenishment: undefined, // TODO: Add test value
        uomId: undefined, // TODO: Add test value
        quantityToPick: undefined, // TODO: Add test value
        baseItemOverride: undefined, // TODO: Add test value
        targetContainerIndicator: undefined, // TODO: Add test value
        promptMessage: undefined, // TODO: Add test value
        quantityPicked: undefined, // TODO: Add test value
        quantityAdjusted: undefined, // TODO: Add test value
        isBaseItem: undefined, // TODO: Add test value
        operatorId: undefined, // TODO: Add test value
        pickTime: undefined, // TODO: Add test value
        type: undefined, // TODO: Add test value
        status: undefined, // TODO: Add test value
        originalPickId: undefined, // TODO: Add test value
        shortedDate: undefined, // TODO: Add test value
        updatedBy: undefined, // TODO: Add test value
        updated: undefined, // TODO: Add test value
        created: undefined // TODO: Add test value
    };

    const testDataUpdated = {
        vlId: undefined, // TODO: Add test value
        assignmentId: undefined, // TODO: Add test value
        locationId: undefined, // TODO: Add test value
        itemId: undefined, // TODO: Add test value
        sequenceNumber: undefined, // TODO: Add test value
        caseLabelCheckDigit: undefined, // TODO: Add test value
        cartonNumber: undefined, // TODO: Add test value
        triggerReplenishment: undefined, // TODO: Add test value
        uomId: undefined, // TODO: Add test value
        quantityToPick: undefined, // TODO: Add test value
        baseItemOverride: undefined, // TODO: Add test value
        targetContainerIndicator: undefined, // TODO: Add test value
        promptMessage: undefined, // TODO: Add test value
        quantityPicked: undefined, // TODO: Add test value
        quantityAdjusted: undefined, // TODO: Add test value
        isBaseItem: undefined, // TODO: Add test value
        operatorId: undefined, // TODO: Add test value
        pickTime: undefined, // TODO: Add test value
        type: undefined, // TODO: Add test value
        status: undefined, // TODO: Add test value
        originalPickId: undefined, // TODO: Add test value
        shortedDate: undefined, // TODO: Add test value
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

    test('POST      /picks        Should create a new picks', async () => {
        const res = await api('POST', '/api/picks', {
            token,
            body: testData
        });
        res.expectJson();
        res.expectStatusCode(201);
        res.expectData(keys);
        createdId = res.getData()['id'];
    });

    test('POST      /picks        Should fail because we want to create a empty picks', async () => {
        const res = await api('POST', '/api/picks', {
            token,
            body: {}
        });
        res.expectJson();
        res.expectStatusCode(400);
    });

    test('GET       /picks        Should list of pickss with our new create one', async () => {
        const res = await api('GET', '/api/picks', auth);
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(keys);
        const data = res.getData<any[]>();
        expect(data.length).toBe(2);

        const result = data[1];
        expect(result.vlId).toBe(testData.vlId);
        expect(result.assignmentId).toBe(testData.assignmentId);
        expect(result.locationId).toBe(testData.locationId);
        expect(result.itemId).toBe(testData.itemId);
        expect(result.sequenceNumber).toBe(testData.sequenceNumber);
        expect(result.caseLabelCheckDigit).toBe(testData.caseLabelCheckDigit);
        expect(result.cartonNumber).toBe(testData.cartonNumber);
        expect(result.triggerReplenishment).toBe(testData.triggerReplenishment);
        expect(result.uomId).toBe(testData.uomId);
        expect(result.quantityToPick).toBe(testData.quantityToPick);
        expect(result.baseItemOverride).toBe(testData.baseItemOverride);
        expect(result.targetContainerIndicator).toBe(testData.targetContainerIndicator);
        expect(result.promptMessage).toBe(testData.promptMessage);
        expect(result.quantityPicked).toBe(testData.quantityPicked);
        expect(result.quantityAdjusted).toBe(testData.quantityAdjusted);
        expect(result.isBaseItem).toBe(testData.isBaseItem);
        expect(result.operatorId).toBe(testData.operatorId);
        expect(result.pickTime).toBe(testData.pickTime);
        expect(result.type).toBe(testData.type);
        expect(result.status).toBe(testData.status);
        expect(result.originalPickId).toBe(testData.originalPickId);
        expect(result.shortedDate).toBe(testData.shortedDate);
        expect(result.updatedBy).toBe(testData.updatedBy);
        expect(result.updated).toBe(testData.updated);
        expect(result.created).toBe(testData.created);
    });

    test('GET       /picks/:id    Should return one picks', async () => {
        const res = await api('GET', `/api/picks/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(keys);

        const result: any = res.getData();
        expect(result.vlId).toBe(testData.vlId);
        expect(result.assignmentId).toBe(testData.assignmentId);
        expect(result.locationId).toBe(testData.locationId);
        expect(result.itemId).toBe(testData.itemId);
        expect(result.sequenceNumber).toBe(testData.sequenceNumber);
        expect(result.caseLabelCheckDigit).toBe(testData.caseLabelCheckDigit);
        expect(result.cartonNumber).toBe(testData.cartonNumber);
        expect(result.triggerReplenishment).toBe(testData.triggerReplenishment);
        expect(result.uomId).toBe(testData.uomId);
        expect(result.quantityToPick).toBe(testData.quantityToPick);
        expect(result.baseItemOverride).toBe(testData.baseItemOverride);
        expect(result.targetContainerIndicator).toBe(testData.targetContainerIndicator);
        expect(result.promptMessage).toBe(testData.promptMessage);
        expect(result.quantityPicked).toBe(testData.quantityPicked);
        expect(result.quantityAdjusted).toBe(testData.quantityAdjusted);
        expect(result.isBaseItem).toBe(testData.isBaseItem);
        expect(result.operatorId).toBe(testData.operatorId);
        expect(result.pickTime).toBe(testData.pickTime);
        expect(result.type).toBe(testData.type);
        expect(result.status).toBe(testData.status);
        expect(result.originalPickId).toBe(testData.originalPickId);
        expect(result.shortedDate).toBe(testData.shortedDate);
        expect(result.updatedBy).toBe(testData.updatedBy);
        expect(result.updated).toBe(testData.updated);
        expect(result.created).toBe(testData.created);
    });

    test('PUT       /picks/:id    Should update the picks', async () => {
        const res = await api('PUT', `/api/picks/${createdId}`, {
            token,
            body: testDataUpdated
        });
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(keys);

        const result: any = res.getData();
        expect(result.vlId).toBe(testDataUpdated.vlId);
        expect(result.assignmentId).toBe(testDataUpdated.assignmentId);
        expect(result.locationId).toBe(testDataUpdated.locationId);
        expect(result.itemId).toBe(testDataUpdated.itemId);
        expect(result.sequenceNumber).toBe(testDataUpdated.sequenceNumber);
        expect(result.caseLabelCheckDigit).toBe(testDataUpdated.caseLabelCheckDigit);
        expect(result.cartonNumber).toBe(testDataUpdated.cartonNumber);
        expect(result.triggerReplenishment).toBe(testDataUpdated.triggerReplenishment);
        expect(result.uomId).toBe(testDataUpdated.uomId);
        expect(result.quantityToPick).toBe(testDataUpdated.quantityToPick);
        expect(result.baseItemOverride).toBe(testDataUpdated.baseItemOverride);
        expect(result.targetContainerIndicator).toBe(testDataUpdated.targetContainerIndicator);
        expect(result.promptMessage).toBe(testDataUpdated.promptMessage);
        expect(result.quantityPicked).toBe(testDataUpdated.quantityPicked);
        expect(result.quantityAdjusted).toBe(testDataUpdated.quantityAdjusted);
        expect(result.isBaseItem).toBe(testDataUpdated.isBaseItem);
        expect(result.operatorId).toBe(testDataUpdated.operatorId);
        expect(result.pickTime).toBe(testDataUpdated.pickTime);
        expect(result.type).toBe(testDataUpdated.type);
        expect(result.status).toBe(testDataUpdated.status);
        expect(result.originalPickId).toBe(testDataUpdated.originalPickId);
        expect(result.shortedDate).toBe(testDataUpdated.shortedDate);
        expect(result.updatedBy).toBe(testDataUpdated.updatedBy);
        expect(result.updated).toBe(testDataUpdated.updated);
        expect(result.created).toBe(testDataUpdated.created);
    });

    test('PUT       /picks/:id    Should fail because we want to update the picks with a invalid email', async () => {
        const res = await api('PUT', `/api/picks/${createdId}`, {
            token,
            body: {
                email: 'abc'
            }
        });
        res.expectJson();
        res.expectStatusCode(400);
    });

    test('DELETE    /picks/:id    Should delete the picks', async () => {
        const res = await api('DELETE', `/api/picks/${createdId}`, auth);
        res.expectStatusCode(200);
    });

    /**
     * 404 - NotFound Testing
     */
    test('GET       /picks/:id    Should return with a 404, because we just deleted the picks', async () => {
        const res = await api('GET', `/api/picks/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

    test('DELETE    /picks/:id    Should return with a 404, because we just deleted the picks', async () => {
        const res = await api('DELETE', `/api/picks/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

    test('PUT       /picks/:id    Should return with a 404, because we just deleted the picks', async () => {
        const res = await api('PUT', `/api/picks/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

});
