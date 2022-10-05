/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

function executeElement(guid, action, input) {
    fetch('http://127.0.0.1:/script/updateScript', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                guid: guid,
                action: action,
                data: input
            }
        )
    })
}

function newElement(type, className, textContent, style, inputType, href) {
    var element = document.createElement(type);
    element.className = className;
    element.textContent = textContent;
    element.style = style;
    element.type = inputType;
    element.href = href;
    return element;
}

function newFormElement(type, className, textContent, inputType, name, id, placeholder ) {
    var element = document.createElement(type);
    element.className = className;
    element.textContent = textContent;
    element.type = inputType; 
    element.name = name;
    element.id = id;
    element.placeholder = placeholder;
    element.autocomplete = false;
    return element;
}

async function populateComponents() {
    fetch("http://127.0.0.1:/script/getScriptJson").then(function(response) {
        return response.json();
    }).then(function(json) {
        json.data.forEach(function(script) {
            var container = document.getElementById("draggablePanelList");
            var scriptLi = container.appendChild(newElement("li", "panel scriptCont panel-info"))
            scriptLi.appendChild(newElement("div", "scriptHeader panel-heading", script.data.details.name));
            var scriptBody = scriptLi.appendChild(newElement("div", "panel-body"));
            scriptBody.appendChild(newElement("p", null, script.data.details.description));
            scriptBody.appendChild(newElement("hr", "scriptsHr"));
            var contact = scriptBody.appendChild(newElement("p", null, "If you experience any issues during usage please reach out to the scripts author "));
            contact.appendChild(newElement("a", "scriptLink", "@" + script.data.details.author, null, null, script.data.details.url));
            contact.setAttribute("href", script.data.details.url);

            var count = 0;
            var scriptContent;
            var scriptTextBox;
            script.data.dashboard.forEach(function(dash) {
                if(count % 2 == 0) { 
                    scriptContent = scriptBody.appendChild(newElement("div", "scriptContent"));
                }
                if (dash.type == "textbox") {
                    scriptTextBox = scriptContent.appendChild(newElement("div", "textBox scriptTextBox"));
                    scriptTextBox.appendChild(newElement("h5", "textLabel", dash.description));
                    var scriptText = scriptTextBox.appendChild(newFormElement("input", "searchBarInput scriptText", dash.name, dash.name, null, null, dash.placeholder));
                    scriptText.addEventListener('change', function (evt) { //Input event listener will allow live changes as typed
                        executeElement(script.guid, dash.onClick, evt.target.value);
                        Notification(true, `${dash.name} - Script executed!`);
                    });
                }
                if (dash.type == "button") {
                    scriptTextBox = scriptContent.appendChild(newElement("div", "textBox scriptTextBox"));
                    scriptTextBox.appendChild(newElement("h5", "textLabel", dash.description));
                    var scriptButton = scriptTextBox.appendChild(newElement("button", "btn scriptButton", dash.name));
                    scriptButton.addEventListener('click', async (event) => {
                        executeElement(script.guid, dash.onClick);
                        Notification(true, `${dash.name} - Script executed!`);
                    });
                }
                count++;
            });

            scriptBody.appendChild(newElement("hr", "scriptsHr"));
            scriptBody.appendChild(newElement("p", null, "For more information check out you can view the support Discord!"));
            var scriptFooter = scriptBody.appendChild(newElement("div", "scriptFooter"));
            var footerLeft = scriptFooter.appendChild(newElement("div", "footerLeft"));
            footerLeft.appendChild(newElement("p", "scriptAuthorText", script.data.details.author));
            var footerRight = scriptFooter.appendChild(newElement("div", "footerRight"));
            footerRight.appendChild(newElement("button", "btn btn-primary disabled", "Enable", "width: 150px; margin: 0px 4px;", "button")); //add onlcik
            footerRight.appendChild(newElement("button", "btn btn-primary", "Download", "width: 150px;", "button")); //add onlcik 
        });
    });
};

await populateComponents();
