

export function enableInterceptor(currentobj,UtilityResource) {
        let tempthis=currentobj;
        tempthis.axiosInterceptor = tempthis.axiosInstance.interceptors.request.use((config) => {
            let token=UtilityResource.CheckLoggedInUser()? UtilityResource.GetUserInfo().Token: "";
           config.headers['Authorization'] = 'Bearer ' + token;
           tempthis.isLoading = true
            return config
        }, (error) => {
          tempthis.isLoading = false  
            return Promise.reject(error)
        })
        tempthis.axiosInstance.interceptors.response.use((response) => {
          tempthis.isLoading = false    
            return response
        }, function(error) {
          tempthis.isLoading = false
          if(error.response.status==403)
          {
              tempthis.$bvToast.toast(`Please Login Again`, {
                  title: 'BootstrapVue Toast',
                  autoHideDelay: 3000,
                  appendToast: true,
                  variant: 'danger',
                })
              // tempthis.$bvToast.show('example-toast');
              tempthis.$router.push({ name: 'Logins'}).catch(err => {});
          }
            return Promise.reject(error)
        })
    }

