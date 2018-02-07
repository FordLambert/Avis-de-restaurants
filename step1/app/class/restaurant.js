export default class Restaurant {
    constructor(array) {
        this.name = array[0];
        this.adress = array[1];
        this.lat = array[2];
        this.long = array[3];
        this.ratings = array[4];
    }
};