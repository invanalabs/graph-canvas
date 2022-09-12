// https://graphin.antv.vision/en-US/graphin/register/behaviors/

// https://github.com/antvis/G6/search?q=activate-relations
// graph.findAllByState('edge', 'inactive').length

https://github.com/antvis/G6/blob/master/packages/pc/src/behavior/activate-relations.ts


//
// Graphin.registerBehavior('sampleBehavior', {
//   getEvents() {
//     return {
//       'node:click': 'onClick',
//     };
//   },
//   onClick(evt: IG6GraphEvent) {
//     const node = evt.item as INode;
//     const model = node.getModel() as NodeConfig;
//     message.info(model.id);
//     // TODO
//   },
// });