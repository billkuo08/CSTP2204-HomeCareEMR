/* eslint-disable no-undef */
import {createUser, getAllUsers} from "../API/users";
import { getAllPatients } from "../API/patients";
import express from 'express';
import * as admin from 'firebase-admin';
import request from 'supertest';
import { exposeMockFirebaseAdminApp } from 'mock-firebase';


describe("createUser", () => {
    it("should create a user", async () => {
        const payload = {
            username: "test",
            password: "test",
            role: "admin",
        };
        const response = createUser(payload);
        console.log(response);
        expect(response).resolves.toEqual(true);
        expect(response.username).toEqual("test");


    });
});

const server = express();
server.use('/users', getAllUsers);

const firebaseApp = admin.initializeApp({});
const mocked = exposeMockFirebaseAdminApp(firebaseApp);

describe('Api Endpoint: productCount', () => {
  afterEach(() => {
    mocked.firestore().mocker.reset();
  });

    it('should return 200', async () => {
        mocked.firestore().mocker.fromMockCollection('users').withDocs([
        { id: '1', username: 'test', password: 'test', role: 'admin' },
        { id: '2', username: 'test2', password: 'test2', role: 'nurse' },
        ]);
    
        await request(server).get('/users').expect(200);
    });

});