import {BsFillBuildingsFill} from "react-icons/bs";


 const exampleData = [{
    id: "2.1",
    type: "CardNode",
    data: {
      label: "Card with Html String based Form",
      icon: <BsFillBuildingsFill/>,
      body: `
<label>name</label>
<input type='text'>      
<button>submit</button>
      `
    }
  },
  {
    id: "2.3",
    type: "CardNode",
    data: {
      label: "No Icon Node",
      body: `
  <img src='https://picsum.photos/200/300' style='    margin: 0 auto;
  width: 100%; height: auto' />
      `
 
    }
  },
  {
    id: "2.2",
    type: "CardNode",
    data: {
      label: "url based Icon",
      // icon: "https://avatars.githubusercontent.com/u/4606947?v=4",
      icon: "https://i.stack.imgur.com/6Zy0g.jpg?s=256&g=1",
      properties: {
        "title": "string",
        "identifier": "string",
        "is_active": false,
        "description": "string"
      }
    }
  }];

export default exampleData;