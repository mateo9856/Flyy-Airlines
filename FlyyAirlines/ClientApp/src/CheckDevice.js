class CheckDevice {

    constructor() {
        this.width = window.innerWidth;
        this.mobile = false;
    }

    SetDeviceWidth() {
        this.width = window.innerWidth;
        this.mobile = this.isAMobile();
    }

    isAMobile() {
        return window.innerWidth < 722 ? true : false;
    }
}

export default new CheckDevice();