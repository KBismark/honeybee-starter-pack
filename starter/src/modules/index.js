//<@imports>

import HoneyBee from "honeybee-client"; 

//</>

const { UI } = HoneyBee; 
const pagelocker = {};
// Lock page creation
UI.lockPageCreation(pagelocker);

const PageInstance = UI.CreateComponent('main', function () {
    return (
        <view>
            <div id="page" style="text-align:center;">
                <h1>Hello Genius, welcome to your first HoneyBee project.</h1>
                <p>Keep yourself busy and produce some honey.</p>
                <p>Don't know what to do? We got your back.</p>
            </div>
        </view>
    )
}).instance();


export default PageInstance;

// Unlock app creation and create page
UI.unlockPageCreation(pagelocker)
UI.CreatePage(typeof document != 'undefined' ? location.pathname : '', PageInstance);