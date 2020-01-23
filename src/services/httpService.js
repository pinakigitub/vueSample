import axios from 'axios'



export default  class RestResource {
    constructor() {
        this.AxoisObj = this.CreateDefaultAxoisObj();
      }
     CreateDefaultAxoisObj()
      {
         return axios.create({
            baseURL: 'http://localhost:8001/api/',
            timeout: 5000,
            headers: {
              'Content-Type': 'application/json'
            }
          })
      }
      GetAxiosObject()
      {
        return  this.AxoisObj;
      }
      
    
 }