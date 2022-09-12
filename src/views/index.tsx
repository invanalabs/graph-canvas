import React from "react";

function Header() {
    const [darkMode, setDarkMode] = React.useState(false)

    React.useEffect(() => {
        const body = document.body
        const toggle = document.querySelector('.toggle-inner')

        // If dark mode is enabled - adds classes to update dark-mode styling.
        // Else, removes and styling is as normal.
        if (darkMode) {
            body.classList.add('dark-mode')
            // @ts-ignore
            toggle.classList.add('toggle-active')
        } else {
            body.classList.remove('dark-mode')
            // @ts-ignore
            toggle.classList.remove('toggle-active')
        }
    }, [darkMode])

    return (
        <header>
            <div
                id="toggle"
                onClick={() => !darkMode ? setDarkMode(true) : setDarkMode(false)}
            >
                <div className="toggle-inner"/> aa
            </div>
        </header>
    )
}

function App() {
    return (
        <main>
            <Header/>
            <div id="container">
                <h1>Simple React Dark Mode.</h1>
                <p>Uses state to set a class on the body if dark mode is enabled.</p>
            </div>
        </main>
    )
}

export default App;