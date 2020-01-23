
export default  class UtilityResource {
    static  CheckLoggedInUser(){
         let userinfo=this.GetUserInfo();
         if(userinfo==null)
         {
             return false;
         }
         else{
             return true;
         }
       

     }
     static  SetUserInfo(obj){
       sessionStorage.setItem("userInfo",obj);
    }
    static  GetUserInfo(){
      
        return JSON.parse(sessionStorage.getItem("userInfo"));
     }
     static  RemoveUserInfo(){
        sessionStorage.clear();
     }
 }