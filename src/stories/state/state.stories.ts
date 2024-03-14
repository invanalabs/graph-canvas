import DataBase from '../../canvas/core';
import type { Meta, StoryObj } from '@storybook/html';



export const createPage = () => {

    const data = new DataBase('Hello World');
    const html = document.createElement("div");

    const input = document.createElement("input");
    input.style.width = "600px";

    const button = document.createElement("button")


    // create event list 
    const eventbar = document.createElement('div');
        eventbar.classList.add("eventbar");
        eventbar.style.top = "60px";
        eventbar.style.left = "10px";
        eventbar.style.maxHeight = "855px";
        eventbar.style.width = "600px";
        // eventbar.style.background = "red";
        eventbar.style.position = "absolute";
        eventbar.style.overflowY = "hidden"; 



    const showEvent = (eventType: string, message: string)=> {
        // notify event 
        const eventDiv = document.createElement('div')
        eventDiv.innerHTML = `${eventType}: - ${message}`;
        eventDiv.style.borderBottom = "2px solid #999"
        eventDiv.style.padding = "10px "
        eventDiv.style.marginBottom = "5px"
        eventDiv.style.background = "#000"
        eventDiv.style.opacity = "0.5"
        eventDiv.style.color = "white"
        eventbar.prepend(eventDiv)

        setTimeout(function(){
            eventbar.removeChild(eventDiv);
        }, 6000);
        
    }




    const displayValue = (v: string) => {
        input.value = v;

    }

    
    displayValue(data.value);
    data.on('update', (updatedData: DataBase, oldValue: string) => {
        console.log("Data updated. New value: " + updatedData.value + ", Old value: " + oldValue);
        displayValue(updatedData.value);
        showEvent("updated", updatedData.value)

    });


 

    button.innerText = "Update Me!";
    button.onclick = () => { data.update(Date.now().toString())}


    html.appendChild(input)
    html.appendChild(button)
    html.appendChild(eventbar)

    return html;
};


const meta = {
  title: 'State/DataBase',
  render: () => createPage(),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};

 
 
