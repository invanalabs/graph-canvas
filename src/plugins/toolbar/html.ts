

export interface IToolBarButton {
  htmlType: "button" | "seperator"
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



