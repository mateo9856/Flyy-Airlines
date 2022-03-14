class CheckDevice {

    constructor() {
        this.height = window.innerWidth;
    }

    SetDeviceWidth() {
        this.height = window.innerWidth;
        console.log(this.height);
    }

    isAMobile() {
        console.log("render mobile");
        return window.innerWidth < 722 ? true : false;
    }
}

export default new CheckDevice();