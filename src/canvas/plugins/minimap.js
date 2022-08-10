import G6 from "@antv/g6";

// Instantialize the Minimap plugin
const minimap = new G6.Minimap({
    size: [100, 100],
    type: "delegate"
});

export default minimap