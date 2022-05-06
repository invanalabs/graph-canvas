
export const nodeGroupModels: any = {
        "Flight Number": {
            idField : "id",
            // groupField: ,
            labelField: "name",
            propertyFields: {
                // TODO - add data types also for the properties
                name: "Flight Number",
                launch_date: "Launch Date",
                launch_time: "Launch Time"                
            }
        },
        "Launch Site": {
            idField: "id",
            // groupField: "Launch Site",
            labelField: "name",
            propertyFields: {name: "Launch Site"}
        },
        "Vehicle Type": {
            idField: "id",
            // groupField: "Vehicle Type",
            labelField: "name",
            propertyFields: {name: "Vehicle Type"}            
        },
        "Customer Country": {
            idField: "id",
            // groupField: "Vehicle Type",
            labelField: "name",
            propertyFields: {name: "Customer Country"}         
        }
    }


export const edgeGroupModels: any = {
        "Flight Number launched_from Launch Site": {
            groupName: "launched_from",
            targetGroup: "Launch Site",
            sourceGroup: "Flight Number",
            // idField: "id",
            // labelField: "",
            propertyFields: {}
        },
        "Flight Number launched_from Customer Country": {
            groupName: "has_customer_country",
            targetGroup: "Customer Country",
            sourceGroup: "Flight Number",
            // idField: "id",
            // labelField: "",
            propertyFields: {}
        },
        "Flight Number launched_from Vehicle Type": {
            groupName: "used_vehicle",
            targetGroup: "Vehicle Type",
            sourceGroup: "Flight Number",
            // idField: "id",
            // labelField: "",
            propertyFields: {}
        },
    }