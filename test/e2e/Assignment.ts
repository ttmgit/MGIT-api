import { api } from './lib/api';
import { DatabaseResetCommand } from '../../src/console/DatabaseResetCommand';
import { createAdminUser, getToken } from './lib/auth';


describe('/assignments', () => {

    const keys = [
        'vlId', 'number', 'splitNumber', 'workId', 'partialWorkId', 'priority', 'sequenceNumber', 'originalSequence', 'operatorId', 'status', 'type', 'regionId', 'groupNumber', 'requestedOrderNo', 'groupPosition', 'groupCount', 'route', 'deliveryDate', 'deliveryLocation', 'customerId', 'goalTime', 'startTime', 'endTime', 'calculatedBaseItems', 'exportStatus', 'purgable', 'reservedBy', 'departureDatetime', 'loadingRegionId', 'printStatus', 'reportStatus', 'productivityStatus', 'updatedBy', 'updated', 'created', 'routeId', 'lpn'
    ];

    const testData = {
        vlId: undefined, // TODO: Add test value
        number: undefined, // TODO: Add test value
        splitNumber: undefined, // TODO: Add test value
        workId: undefined, // TODO: Add test value
        partialWorkId: undefined, // TODO: Add test value
        priority: undefined, // TODO: Add test value
        sequenceNumber: undefined, // TODO: Add test value
        originalSequence: undefined, // TODO: Add test value
        operatorId: undefined, // TODO: Add test value
        status: undefined, // TODO: Add test value
        type: undefined, // TODO: Add test value
        regionId: undefined, // TODO: Add test value
        groupNumber: undefined, // TODO: Add test value
        requestedOrderNo: undefined, // TODO: Add test value
        groupPosition: undefined, // TODO: Add test value
        groupCount: undefined, // TODO: Add test value
        route: undefined, // TODO: Add test value
        deliveryDate: undefined, // TODO: Add test value
        deliveryLocation: undefined, // TODO: Add test value
        customerId: undefined, // TODO: Add test value
        goalTime: undefined, // TODO: Add test value
        startTime: undefined, // TODO: Add test value
        endTime: undefined, // TODO: Add test value
        calculatedBaseItems: undefined, // TODO: Add test value
        exportStatus: undefined, // TODO: Add test value
        purgable: undefined, // TODO: Add test value
        reservedBy: undefined, // TODO: Add test value
        departureDatetime: undefined, // TODO: Add test value
        loadingRegionId: undefined, // TODO: Add test value
        printStatus: undefined, // TODO: Add test value
        reportStatus: undefined, // TODO: Add test value
        productivityStatus: undefined, // TODO: Add test value
        updatedBy: undefined, // TODO: Add test value
        updated: undefined, // TODO: Add test value
        created: undefined, // TODO: Add test value
        routeId: undefined, // TODO: Add test value
        lpn: undefined // TODO: Add test value
    };

    const testDataUpdated = {
        vlId: undefined, // TODO: Add test value
        number: undefined, // TODO: Add test value
        splitNumber: undefined, // TODO: Add test value
        workId: undefined, // TODO: Add test value
        partialWorkId: undefined, // TODO: Add test value
        priority: undefined, // TODO: Add test value
        sequenceNumber: undefined, // TODO: Add test value
        originalSequence: undefined, // TODO: Add test value
        operatorId: undefined, // TODO: Add test value
        status: undefined, // TODO: Add test value
        type: undefined, // TODO: Add test value
        regionId: undefined, // TODO: Add test value
        groupNumber: undefined, // TODO: Add test value
        requestedOrderNo: undefined, // TODO: Add test value
        groupPosition: undefined, // TODO: Add test value
        groupCount: undefined, // TODO: Add test value
        route: undefined, // TODO: Add test value
        deliveryDate: undefined, // TODO: Add test value
        deliveryLocation: undefined, // TODO: Add test value
        customerId: undefined, // TODO: Add test value
        goalTime: undefined, // TODO: Add test value
        startTime: undefined, // TODO: Add test value
        endTime: undefined, // TODO: Add test value
        calculatedBaseItems: undefined, // TODO: Add test value
        exportStatus: undefined, // TODO: Add test value
        purgable: undefined, // TODO: Add test value
        reservedBy: undefined, // TODO: Add test value
        departureDatetime: undefined, // TODO: Add test value
        loadingRegionId: undefined, // TODO: Add test value
        printStatus: undefined, // TODO: Add test value
        reportStatus: undefined, // TODO: Add test value
        productivityStatus: undefined, // TODO: Add test value
        updatedBy: undefined, // TODO: Add test value
        updated: undefined, // TODO: Add test value
        created: undefined, // TODO: Add test value
        routeId: undefined, // TODO: Add test value
        lpn: undefined // TODO: Add test value
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

    test('POST      /assignments        Should create a new assignment', async () => {
        const res = await api('POST', '/api/assignments', {
            token,
            body: testData
        });
        res.expectJson();
        res.expectStatusCode(201);
        res.expectData(keys);
        createdId = res.getData()['id'];
    });

    test('POST      /assignments        Should fail because we want to create a empty assignment', async () => {
        const res = await api('POST', '/api/assignments', {
            token,
            body: {}
        });
        res.expectJson();
        res.expectStatusCode(400);
    });

    test('GET       /assignments        Should list of assignments with our new create one', async () => {
        const res = await api('GET', '/api/assignments', auth);
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(keys);
        const data = res.getData<any[]>();
        expect(data.length).toBe(2);

        const result = data[1];
        expect(result.vlId).toBe(testData.vlId);
        expect(result.number).toBe(testData.number);
        expect(result.splitNumber).toBe(testData.splitNumber);
        expect(result.workId).toBe(testData.workId);
        expect(result.partialWorkId).toBe(testData.partialWorkId);
        expect(result.priority).toBe(testData.priority);
        expect(result.sequenceNumber).toBe(testData.sequenceNumber);
        expect(result.originalSequence).toBe(testData.originalSequence);
        expect(result.operatorId).toBe(testData.operatorId);
        expect(result.status).toBe(testData.status);
        expect(result.type).toBe(testData.type);
        expect(result.regionId).toBe(testData.regionId);
        expect(result.groupNumber).toBe(testData.groupNumber);
        expect(result.requestedOrderNo).toBe(testData.requestedOrderNo);
        expect(result.groupPosition).toBe(testData.groupPosition);
        expect(result.groupCount).toBe(testData.groupCount);
        expect(result.route).toBe(testData.route);
        expect(result.deliveryDate).toBe(testData.deliveryDate);
        expect(result.deliveryLocation).toBe(testData.deliveryLocation);
        expect(result.customerId).toBe(testData.customerId);
        expect(result.goalTime).toBe(testData.goalTime);
        expect(result.startTime).toBe(testData.startTime);
        expect(result.endTime).toBe(testData.endTime);
        expect(result.calculatedBaseItems).toBe(testData.calculatedBaseItems);
        expect(result.exportStatus).toBe(testData.exportStatus);
        expect(result.purgable).toBe(testData.purgable);
        expect(result.reservedBy).toBe(testData.reservedBy);
        expect(result.departureDatetime).toBe(testData.departureDatetime);
        expect(result.loadingRegionId).toBe(testData.loadingRegionId);
        expect(result.printStatus).toBe(testData.printStatus);
        expect(result.reportStatus).toBe(testData.reportStatus);
        expect(result.productivityStatus).toBe(testData.productivityStatus);
        expect(result.updatedBy).toBe(testData.updatedBy);
        expect(result.updated).toBe(testData.updated);
        expect(result.created).toBe(testData.created);
        expect(result.routeId).toBe(testData.routeId);
        expect(result.lpn).toBe(testData.lpn);
    });

    test('GET       /assignments/:id    Should return one assignment', async () => {
        const res = await api('GET', `/api/assignments/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(keys);

        const result: any = res.getData();
        expect(result.vlId).toBe(testData.vlId);
        expect(result.number).toBe(testData.number);
        expect(result.splitNumber).toBe(testData.splitNumber);
        expect(result.workId).toBe(testData.workId);
        expect(result.partialWorkId).toBe(testData.partialWorkId);
        expect(result.priority).toBe(testData.priority);
        expect(result.sequenceNumber).toBe(testData.sequenceNumber);
        expect(result.originalSequence).toBe(testData.originalSequence);
        expect(result.operatorId).toBe(testData.operatorId);
        expect(result.status).toBe(testData.status);
        expect(result.type).toBe(testData.type);
        expect(result.regionId).toBe(testData.regionId);
        expect(result.groupNumber).toBe(testData.groupNumber);
        expect(result.requestedOrderNo).toBe(testData.requestedOrderNo);
        expect(result.groupPosition).toBe(testData.groupPosition);
        expect(result.groupCount).toBe(testData.groupCount);
        expect(result.route).toBe(testData.route);
        expect(result.deliveryDate).toBe(testData.deliveryDate);
        expect(result.deliveryLocation).toBe(testData.deliveryLocation);
        expect(result.customerId).toBe(testData.customerId);
        expect(result.goalTime).toBe(testData.goalTime);
        expect(result.startTime).toBe(testData.startTime);
        expect(result.endTime).toBe(testData.endTime);
        expect(result.calculatedBaseItems).toBe(testData.calculatedBaseItems);
        expect(result.exportStatus).toBe(testData.exportStatus);
        expect(result.purgable).toBe(testData.purgable);
        expect(result.reservedBy).toBe(testData.reservedBy);
        expect(result.departureDatetime).toBe(testData.departureDatetime);
        expect(result.loadingRegionId).toBe(testData.loadingRegionId);
        expect(result.printStatus).toBe(testData.printStatus);
        expect(result.reportStatus).toBe(testData.reportStatus);
        expect(result.productivityStatus).toBe(testData.productivityStatus);
        expect(result.updatedBy).toBe(testData.updatedBy);
        expect(result.updated).toBe(testData.updated);
        expect(result.created).toBe(testData.created);
        expect(result.routeId).toBe(testData.routeId);
        expect(result.lpn).toBe(testData.lpn);
    });

    test('PUT       /assignments/:id    Should update the assignment', async () => {
        const res = await api('PUT', `/api/assignments/${createdId}`, {
            token,
            body: testDataUpdated
        });
        res.expectJson();
        res.expectStatusCode(200);
        res.expectData(keys);

        const result: any = res.getData();
        expect(result.vlId).toBe(testDataUpdated.vlId);
        expect(result.number).toBe(testDataUpdated.number);
        expect(result.splitNumber).toBe(testDataUpdated.splitNumber);
        expect(result.workId).toBe(testDataUpdated.workId);
        expect(result.partialWorkId).toBe(testDataUpdated.partialWorkId);
        expect(result.priority).toBe(testDataUpdated.priority);
        expect(result.sequenceNumber).toBe(testDataUpdated.sequenceNumber);
        expect(result.originalSequence).toBe(testDataUpdated.originalSequence);
        expect(result.operatorId).toBe(testDataUpdated.operatorId);
        expect(result.status).toBe(testDataUpdated.status);
        expect(result.type).toBe(testDataUpdated.type);
        expect(result.regionId).toBe(testDataUpdated.regionId);
        expect(result.groupNumber).toBe(testDataUpdated.groupNumber);
        expect(result.requestedOrderNo).toBe(testDataUpdated.requestedOrderNo);
        expect(result.groupPosition).toBe(testDataUpdated.groupPosition);
        expect(result.groupCount).toBe(testDataUpdated.groupCount);
        expect(result.route).toBe(testDataUpdated.route);
        expect(result.deliveryDate).toBe(testDataUpdated.deliveryDate);
        expect(result.deliveryLocation).toBe(testDataUpdated.deliveryLocation);
        expect(result.customerId).toBe(testDataUpdated.customerId);
        expect(result.goalTime).toBe(testDataUpdated.goalTime);
        expect(result.startTime).toBe(testDataUpdated.startTime);
        expect(result.endTime).toBe(testDataUpdated.endTime);
        expect(result.calculatedBaseItems).toBe(testDataUpdated.calculatedBaseItems);
        expect(result.exportStatus).toBe(testDataUpdated.exportStatus);
        expect(result.purgable).toBe(testDataUpdated.purgable);
        expect(result.reservedBy).toBe(testDataUpdated.reservedBy);
        expect(result.departureDatetime).toBe(testDataUpdated.departureDatetime);
        expect(result.loadingRegionId).toBe(testDataUpdated.loadingRegionId);
        expect(result.printStatus).toBe(testDataUpdated.printStatus);
        expect(result.reportStatus).toBe(testDataUpdated.reportStatus);
        expect(result.productivityStatus).toBe(testDataUpdated.productivityStatus);
        expect(result.updatedBy).toBe(testDataUpdated.updatedBy);
        expect(result.updated).toBe(testDataUpdated.updated);
        expect(result.created).toBe(testDataUpdated.created);
        expect(result.routeId).toBe(testDataUpdated.routeId);
        expect(result.lpn).toBe(testDataUpdated.lpn);
    });

    test('PUT       /assignments/:id    Should fail because we want to update the assignment with a invalid email', async () => {
        const res = await api('PUT', `/api/assignments/${createdId}`, {
            token,
            body: {
                email: 'abc'
            }
        });
        res.expectJson();
        res.expectStatusCode(400);
    });

    test('DELETE    /assignments/:id    Should delete the assignment', async () => {
        const res = await api('DELETE', `/api/assignments/${createdId}`, auth);
        res.expectStatusCode(200);
    });

    /**
     * 404 - NotFound Testing
     */
    test('GET       /assignments/:id    Should return with a 404, because we just deleted the assignment', async () => {
        const res = await api('GET', `/api/assignments/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

    test('DELETE    /assignments/:id    Should return with a 404, because we just deleted the assignment', async () => {
        const res = await api('DELETE', `/api/assignments/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

    test('PUT       /assignments/:id    Should return with a 404, because we just deleted the assignment', async () => {
        const res = await api('PUT', `/api/assignments/${createdId}`, auth);
        res.expectJson();
        res.expectStatusCode(404);
    });

});
