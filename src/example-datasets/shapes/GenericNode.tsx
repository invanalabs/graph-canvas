import {BsFillBuildingsFill} from "react-icons/bs";


 const exampleData = [{
    id: "2.1",
    type: "GenericNode",
    data: {
      label: "Reactjs icon",
      icon: <BsFillBuildingsFill/>,
      properties: {
        "identifier": "string",
        "is_active": false
      }
    }
  },
  {
    id: "2.2",
    type: "GenericNode",
    data: {
      label: "url based Icon",
      icon: "https://avatars.githubusercontent.com/u/4606947?v=4",
      properties: {
        "title": "string",
        "identifier": "string",
        "is_active": false,
        "description": "string"
      }
    }
  }];

export default exampleData;