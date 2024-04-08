import axios from 'axios';
import { Axios } from 'axios';

const PET = "https://petstore.swagger.io/v2/pet";

//@@@Uploads an Image
export function postUploadImage(petId, additionalMetadata, file) {
    const api = `${PET}/${petId}/uploadImage`;
    const formData = new FormData();
    formData.append('additionalMetadata', additionalMetadata);
  if(file!==null){
    formData.append('file', file);
  }
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  
    return axios.post(api,formData,config);
  }
//@@@Finds Pets by Status
  export function getStatus(Status) {
    let api = `${PET}/findByStatus`;
    const any =  {
                params: {
                    status: Status
                },
                headers: {
                    accept: 'application/json'
                }
            }
    return axios.get(api, any)
  }
//@@Finds a single pet using Id
  export function getSinglePet(petId) {
    let api = `${PET}/${petId}`;
    const any =  {
                headers: {
                    accept: 'application/json'
                }
            }
    return axios.get(api, any)
  }
//@@Updates a pet in the store
  export function postUpdateId(petId,Name,Status) {
    let api = `${PET}/${petId}`;
    const data = 
        {
            name: Name,
            status: Status
        };
    const any = {  
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                
       }   };
    return axios.post(api, data, any )
  }
//@@Add a pet to the store
  export function postAddPet(data) {
    let api = `${PET}`;
    
    const any = {  
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                
       }   };
    return axios.post(api, data, any )
  }
//@@Update an existing pet in the store 
  export function putPet(data) {
    let api = `${PET}`;
    
    const any = {  
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                
       }   };
    return axios.put(api, data, any )
  }
//@@Deletes a pet in the store
  export function deletePet(key,petId) {
    let api = `${PET}/${petId}`;
    
    const any = {  
                headers: {
                    accept: 'application/json',
                    'api_key':key
                
       }   };
    return axios.delete(api, any )
  }