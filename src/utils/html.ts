

export interface IToolBarButton {
  label: string
  helpText: string
  onClickListener(): void
}

export const createToolBarButton = (options: IToolBarButton ) => {
  const button = document.createElement('button');
  button.classList.add('toolbar-btn')
  button.innerHTML = options.label;
  button.title = options.helpText;
  button.addEventListener('click', options.onClickListener)
  return button
}