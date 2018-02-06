export class JsonConverter {

    convertAndStoreJson(object, prototype, objectList) {
        let jsonData = JSON.parse(object.detail);

        jsonData.map(function(jsonObject) {
            let attributeList = [];

            for(let attribute in jsonObject) {
			    attributeList.push(jsonObject[attribute]);  
            }

            let newObject =  new prototype(attributeList);
            objectList.push(newObject);
        });

        let listUpdated = new CustomEvent('list-updated');
        document.dispatchEvent(listUpdated);
    }
};