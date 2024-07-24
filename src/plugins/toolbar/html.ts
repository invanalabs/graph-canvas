

export interface IToolBarButton {
  htmlType: "button" | "seperator" | "toggle"
  label: string
  helpText?: string
  onClickListener?(): void
}

export const createToolBarButton = (options: IToolBarButton ) => {
  const button = document.createElement('button');
  button.classList.add('toolbar-btn')
  button.innerHTML = options?.label;
  if (options.helpText){
    button.title = options?.helpText;
  }
  if (options.onClickListener){
    button.addEventListener('click', options.onClickListener)
  }
  return button
}

export const createToolBarToggleButton = (options: IToolBarButton ) => {
  // const 
  const button = document.createElement('button');
  button.classList.add('toolbar-toggle')
  button.innerHTML = options?.label;
  if (options.helpText){
    button.title = options?.helpText;
  }
  // if (options.onClickListener){
  //   button.addEventListener('click', options.onClickListener)
  // }
  // document.addEventListener('DOMContentLoaded', (event) => {
    // const button = document.getElementById('toggleButton');

    button.addEventListener('click', () => {
        if (button.classList.contains('off')) {
            button.classList.remove('off');
            button.classList.add('on');
            button.textContent = 'ON';
        } else {
            button.classList.remove('on');
            button.classList.add('off');
            button.textContent = 'OFF';
        }
    });
// });
  return button
}



