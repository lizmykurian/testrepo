import * as PET from './api.action.js';
import { expect } from 'chai';


const petId = '123';
const file = new File(['file contents'], 'test.txt', { type: 'text/plain' }); // Example file
const additionalMetadata = 'try';

const requestData = {
    id: 13,
    category: {
        id: 0,
        name: 'string'
    },
    name: 'doggie',
    photoUrls: ['string'],
    tags: [{
        id: 0,
        name: 'string'
    }],
    status: 'available'
};
//@@@All POST endpoint operation tests         
describe('Test Pet Endpoint - POST', () => {
      it("POST Pet - for field entries petId, additionalMetadata, file ", async () => {
        let response = await PET.postUploadImage(petId, additionalMetadata, file);
        expect(response.status).to.equal(200);
        expect(response.data.code).to.equal(200);
        expect(response.data.type).to.equal('unknown');
        expect(response.data.message).to.equal('additionalMetadata: try\nFile uploaded to ./test.txt, 13 bytes');
      });

      it("POST Pet - without field additionalMetadata", async () => {
         let response = await PET.postUploadImage(petId, 'null', file);
         expect(response.status).to.equal(200);
         expect(response.data.code).to.equal(200);
         expect(response.data.type).to.equal('unknown');
         expect(response.data.message).to.equal('additionalMetadata: null\nFile uploaded to ./test.txt, 13 bytes');
       });

       it("POST Pet - without file", async () => {
        try {
            await PET.postUploadImage(petId, 'hjk', null);
            throw new Error('Expected promise to reject');
        } catch (error) {
            expect(error.response.status).to.equal(500);
        }
       });

       it("POST Pet - petId to be added", async () => {
        let response = await PET.postAddPet(requestData);
        expect(response.status).to.equal(200);
        expect(response.data.id).to.equal(13);
        expect(response.data.name).to.equal('doggie');
        expect(response.data.status).to.equal('available');
      });

       it("POST Pet - petId to be updated", async () => {
        let response = await PET.postUpdateId(13, 'asd', 'pending');
        expect(response.status).to.equal(200);
        expect(response.data.code).to.equal(200);
        expect(response.data.type).to.equal('unknown');
        expect(response.data.message).to.equal('13');
      });     

});
//@@@All GET endpoint operation tests     
describe('Test Pet Endpoint - GET', () => { 
        let Data = ['available','pending','sold'];
        Data.forEach(Status => { //loop through different Status
        it(`GET Pet - should return pets with status ${Status}`, async () => {
            const response = await PET.getStatus(Status);
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
        });
    });
    it(`GET Pet - should return a single pet ${petId}`, async () => {
        const response = await PET.getSinglePet(13);
        expect(response.status).to.equal(200);
        expect(response.data.id).to.equal(13);
        expect(response.data.name).to.equal('asd');
    });
    it(`GET Pet - should return pet not found`, async () => {
        try {
         await PET.getSinglePet(0);
         throw new Error('Expected promise to reject');
        } catch (error) {
            expect(error.response.status).to.equal(404);
            expect(error.response.data.code).to.equal(1);
            expect(error.response.data.type).to.equal('error');
            expect(error.response.data.message).to.equal('Pet not found');
        }
    });

});
//@@@All PUT endpoint operation tests     
describe('Test Pet Endpoint - PUT', () => {
    it("PUT Pet - update an existing pet", async () => {
      let response = await PET.putPet(requestData);
      expect(response.status).to.equal(200);
      expect(response.data.id).to.equal(13);
      expect(response.data.name).to.equal('doggie');
    });
});

//@@@All DELETE endpoint operation tests     
describe('Test Pet Endpoint - DELETE', () => {
    it("DELETE Pet - delete an existing pet", async () => {
      let response = await PET.deletePet('api_key',13);
      expect(response.status).to.equal(200);
      expect(response.data.code).to.equal(200);
      expect(response.data.type).to.equal('unknown');
      expect(response.data.message).to.equal('13');
    });

    it("DELETE Pet - pet not found 404 for id 0", async () => {
        try {
            await PET.deletePet(0);
            throw new Error('Expected promise to reject');
           } catch (error) {
               expect(error.response.status).to.equal(404);
           }
      });
});
