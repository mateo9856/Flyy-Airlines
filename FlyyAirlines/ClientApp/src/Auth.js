class Auth {
    constructor() {
        this.authenticated = false;
        this.token = "";
        this.userData = {};
        this.userRole = "";
    }

     getUserRole() {
        try {
            const getUser = JSON.parse(localStorage.getItem("login"));
            this.userData = getUser;
            this.userRole = this.userData.userRole;
            console.log(this.userRole);
        } catch(error) {
            return "USER_IS_NOT_LOGGED";
        }
    }

    authHeader() {
        console.log(this.userData.token)
            return { Authorization: this.userData.token };
    }

    checkIsLogged() {
        try {
            const getUser = JSON.parse(localStorage.getItem('login'));
            console.log(getUser.getUser);
            if (getUser.user.length <= 0 || getUser.user === undefined) {
                this.authenticated = false;
                return false;
            } else {
                this.authenticated = true;
                this.getUserRole();
                return true;
            }
        } catch(error) {
            return false;
        }
        
    }


     login() {
        this.authenticated = true;
    }
     logout() {
        localStorage.removeItem("login");
        this.authenticated = false;
    }
    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();