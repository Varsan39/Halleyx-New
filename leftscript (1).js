
function showInputDialog() {
    var inputOptions = document.getElementById("input-options");
    inputOptions.style.display = "block";

}

function splitContent() {
    var rowsInput = document.getElementById("rows");
    var columnsInput = document.getElementById("columns");
    var mergedRowsInput = document.getElementById("mergedRows");
    var mergedColumnsInput = document.getElementById("mergedColumns");

    var rows = parseInt(rowsInput.value);
    var columns = parseInt(columnsInput.value);
    var mergedRows = parseInt(mergedRowsInput.value);
    var mergedColumns = parseInt(mergedColumnsInput.value);


    rows = (isNaN(rows) || rows <= 0) ? 1 : rows;
    columns = (isNaN(columns) || columns <= 0) ? 1 : columns;
    mergedRows = (isNaN(mergedRows) || mergedRows <= 0) ? 0 : mergedRows; 
    mergedColumns = (isNaN(mergedColumns) || mergedColumns <= 0) ? 0 : mergedColumns; 

    var inputOptions = document.getElementById("input-options");
    inputOptions.style.display = "none";

    var content = document.getElementById("content");
    content.innerHTML = "";

    content.style.display = "grid";
    content.style.gridTemplateRows = `repeat(${rows + mergedRows}, 1fr)`;
    content.style.gridTemplateColumns = `repeat(${columns + mergedColumns}, 1fr)`;

    for (let i = 0; i < (rows + mergedRows) * (columns + mergedColumns); i++) {
        var cell = document.createElement("div");
        cell.classList.add("cell");
        content.appendChild(cell);
    }
  
}


function drag(event, elementType) {
    event.dataTransfer.setData("elementType", elementType);
}
function allowDrop(event) {
    event.preventDefault();
}
function drop(event) {
    event.preventDefault();
    var elementType = event.dataTransfer.getData("elementType");
    var content = document.getElementById("content");
    var element;
   
    if (elementType === "button") {
    
        var container = createButtonContainer();
        var button = createButtonElement();
        var textInput = createTextInput();
        container.appendChild(button);
        container.appendChild(textInput);
        container.draggable = true;
        container.ondragstart = function (event) {
            drag(event, "button");
        };
        container.onmousedown = function (event) {
            moveElement(event, container);
        };
        content.appendChild(container);
       
    } 
    else {
        var element = createElement(elementType);
        content.appendChild(element);
    }


    switch (elementType) {
        case "textbox":
            element = createElement("input", ["floating-textbox"], { type: "text", placeholder: "Enter text..." });
            break;
            case "radio":
                createRadioOrCheckboxWithText("radio");
                break;
        case "dropdown":
            element = createElement("select", ["floating-dropdown"]);
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            for (const day of days) {
                const option = document.createElement("option");
                option.text = day;
                element.add(option);
            }
            content.appendChild(element);
            selectedDropdown = element;
            openDropdownEditModal();
            
            break;
         case "checkbox":
                createRadioOrCheckboxWithText("checkbox");
                break;
            
        case 'navButton':
            element = createElement("button", [], { id: "navButton", innerHTML: "Navigation" });
            break;
    }


    function createButtonContainer() {
        var container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = (event.clientX - content.getBoundingClientRect().left) + "px";
        container.style.top = (event.clientY - content.getBoundingClientRect().top) + "px";
        container.classList.add("button-container");
        container.draggable = true;
    
        container.ondragstart = function (event) {
            drag(event, "button-container");
        };
    
        return container;
    }
    
    function createButtonElement() {
        var button = document.createElement("button");
        button.classList.add("button-element");
        return button;
    }
    
    function createTextInput() {
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter button text...";
        input.classList.add("floating-textbox");
        input.style.display = "right"; 
        input.style.border = "none";
        
        return input;
    }
    

    function createElement(type, classNames = [], additionalProperties = {}) {
        const element = document.createElement(type);
        element.classList.add(...classNames);
        element.style.position = "absolute";
        element.style.left = (event.clientX - content.getBoundingClientRect().left) + "px";
        element.style.top = (event.clientY - content.getBoundingClientRect().top) + "px";
        element.draggable = true;

        for (const property in additionalProperties) {
            element[property] = additionalProperties[property];
        }

        element.ondragstart = function (event) {
            drag(event, elementType);
        };
        element.onmousedown = function (event) {
            moveElement(event, element);
        };

        content.appendChild(element);

        return element;
    }
}



function moveElement(event, element) {
    const offsetX = event.clientX - element.getBoundingClientRect().left;
    const offsetY = event.clientY - element.getBoundingClientRect().top;

    document.onmousemove = function (event) {
        element.style.left = event.clientX - offsetX + "px";
        element.style.top = event.clientY - offsetY + "px";
    };

    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    };
}



function createRadioOrCheckboxWithText(elementType) {
    var container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = (event.clientX - content.getBoundingClientRect().left) + "px";
    container.style.top = (event.clientY - content.getBoundingClientRect().top) + "px";
    container.classList.add("radio-checkbox-container");
    container.draggable = true;
    

    container.ondragstart = function (event) {
        drag(event, elementType);
    };

    var radioOrCheckbox = document.createElement("input");
    radioOrCheckbox.type = elementType;

    var textInput = document.createElement("input");
    textInput.type = "text";
    textInput.placeholder = "Enter text...";
    textInput.classList.add("floating-textbox");
    textInput.style.border = "none";

    container.appendChild(radioOrCheckbox);
    container.appendChild(textInput);

    container.onmousedown = function (event) {
        moveElement(event, container);
    };

    content.appendChild(container);
}


function openModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
});

document.addEventListener("contextmenu", function (event) {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
    event.preventDefault();
});


function openTextSettingsModal() {
    var modal = document.getElementById("textSettingsModal");
    var overlay = document.getElementById("modalOverlay");
    modal.style.display = "block";
    overlay.style.display = "block";
}


function closeTextSettingsModal() {
    var modal = document.getElementById("textSettingsModal");
    var overlay = document.getElementById("modalOverlay");
    modal.style.display = "none";
    overlay.style.display = "none";
}


function applyTextStyles() {
    var fontSize = document.getElementById("fontSize").value + "px";
    var isBold = document.getElementById("fontStyle").value.includes("bold");
    var isItalic = document.getElementById("fontStyle").value.includes("italic");
    var isUnderline = document.getElementById("fontStyle").value.includes("underline");
    var color = document.getElementById("fontColor").value;

    document.execCommand("fontSize", false, fontSize);
    document.execCommand("bold", false, isBold);
    document.execCommand("italic", false, isItalic);
    document.execCommand("underline", false, isUnderline);
    document.execCommand("foreColor", false, color);

    closeTextSettingsModal();
}


//dropbdown

function openDropdownEditModal() {
    var dropdownEditModal = document.getElementById("dropdownEditModal");
    dropdownEditModal.style.display = "block";
    var numOptionsInput = document.getElementById("numOptions");
    var optionValuesInput = document.getElementById("optionValues");

    numOptionsInput.value = selectedDropdown.options.length;

    optionValuesInput.value = "";
    for (var i = 0; i < selectedDropdown.options.length; i++) {
        optionValuesInput.value += selectedDropdown.options[i].text;
        if (i < selectedDropdown.options.length - 1) {
            optionValuesInput.value += ",";
        }
    }
}
function closeDropdownEditModal() {
    var dropdownEditModal = document.getElementById("dropdownEditModal");
    dropdownEditModal.style.display = "none";
}

function applyDropdownChanges() {
    var numOptionsInput = document.getElementById("numOptions");
    var optionValuesInput = document.getElementById("optionValues");

    var numOptions = parseInt(numOptionsInput.value);
    var optionValues = optionValuesInput.value.split(",");

    if (numOptions <= 0) {
        alert("Invalid input. Please provide a valid number of options.");
        return;
    }

    if (optionValues.length < numOptions) {
        alert("Invalid input. Please provide values for all options.");
        return;
    }

    if (selectedDropdown) {
        selectedDropdown.innerHTML = ""; 

        for (var i = 0; i < numOptions; i++) {
            var option = document.createElement("option");
            option.text = optionValues[i] || "Option " + (i + 1);
            selectedDropdown.add(option);
        }
    }

    closeDropdownEditModal();
}



//clear

function clearContent() {
    var content = document.getElementById("content");
    content.innerHTML = "";
    hideBottomSection();
}

//preview

document.getElementById("previewButton").addEventListener("click", function () {
    openPreviewWindow();
});

function openPreviewWindow() {
    var previewWindow = window.open("", "_blank");
    var previewDocument = previewWindow.document;

    previewDocument.open();
    previewDocument.write("<html><head><title>Preview</title></head><body>");

    var content = document.getElementById("content");
    var elements = content.children; 
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var clonedElement = element.cloneNode(true); 

        var rect = element.getBoundingClientRect();
        var x = rect.left;
        var y = rect.top;
        clonedElement.style.position = "absolute";
        clonedElement.style.left = x + "px";
        clonedElement.style.top = y + "px";

        previewDocument.body.appendChild(clonedElement);
    }

    previewDocument.write("</body></html>");
    previewDocument.close();
}


//image

document.getElementById("imageInput").addEventListener("change", function (event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.style.position = "absolute"; 
            image.style.left = "0px";
            image.style.top = "0px";

            var initialSize = "10%";
            image.style.width = initialSize;
            image.style.height = "auto"; 

            interact(image)
                .draggable({
                    listeners: {
                        start(event) {
                            
                        },
                        move(event) {
                            var target = event.target;
                            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                            target.setAttribute('data-x', x);
                            target.setAttribute('data-y', y);
                        },
                        end(event) {
                            
                        },
                    }
                })
                .resizable({
                    edges: { left: true, right: true, bottom: true, top: true },
                    listeners: {
                        move(event) {
                            var target = event.target;
                            var x = (parseFloat(target.getAttribute('data-x')) || 0);
                            var y = (parseFloat(target.getAttribute('data-y')) || 0);

                            var width = event.rect.width;
                            var height = event.rect.height;

                            target.style.width = width + 'px';
                            target.style.height = height + 'px';

                            target.setAttribute('data-x', x);
                            target.setAttribute('data-y', y);
                        },
                    }
                });

            content.appendChild(image);
        };

        reader.readAsDataURL(file);
    }
});


function openImageDialog() {
    var imageInput = document.getElementById("imageInput");
    imageInput.click();
}
function openNavSettings() {
    var navSettingsModal = document.getElementById("navSettingsModal");
    navSettingsModal.style.display = "block";
}

function closeNavSettings() {
    var navSettingsModal = document.getElementById("navSettingsModal");
    navSettingsModal.style.display = "none";
}

function applyNavSettings() {
    var navId = document.getElementById("navId").value;
    var navLink = document.getElementById("navLink").value;

    var content = document.getElementById("content");

    var navContainer = document.createElement("div");
    navContainer.classList.add("nav-element", "draggable");

    var idElement = document.createElement("span");
    idElement.classList.add("nav-info", "draggable");
    idElement.innerText = navId;

    var linkElement = document.createElement("span");
    linkElement.classList.add("nav-info", "draggable");

    var linkAnchor = document.createElement("a");
    linkAnchor.href = navLink;
    linkAnchor.target = "_blank";
    linkAnchor.innerText = navLink;

    linkAnchor.addEventListener("mouseover", function () {
        linkAnchor.style.cursor = "pointer";
    });

    linkAnchor.addEventListener("click", function (e) {
        e.preventDefault();
        window.open(navLink, "_blank");
    });

    linkElement.appendChild(linkAnchor);
    navContainer.appendChild(idElement);
    navContainer.appendChild(linkElement);

    navContainer.setAttribute("draggable", "true");
    navContainer.style.position = "absolute";
    navContainer.style.left = "0";
    navContainer.style.top = "0";

    interact(navContainer).draggable({
        listeners: {
            start(event) {
                event.target.classList.add('dragging');
            },
            move(event) {
                var target = event.target;
                var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            end(event) {
                event.target.classList.remove('dragging');
            },
        }
    });

    content.appendChild(navContainer);
}

//Table
let tableCounter = 1; 

function openTableModal() {
    var tableModal = document.getElementById("tableModal");
    tableModal.style.display = "block";
}

function closeTableModal() {
    var tableModal = document.getElementById("tableModal");
    tableModal.style.display = "none";
}


function createTable() {
    var numRows = parseInt(document.getElementById("numRows").value);
    var numCols = parseInt(document.getElementById("numCols").value);
    var colHeaders = document.getElementById("colHeaders").value.split(',');

    var content = document.getElementById("content");

  
    var table = document.createElement("table");
    table.style.border = "1px solid black";

   
    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");

    for (var i = 0; i < numCols; i++) {
        var th = document.createElement("th");
        th.innerText = colHeaders[i] || ''; 
        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

   
    var tbody = document.createElement("tbody");

    for (var i = 0; i < numRows; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < numCols; j++) {
            var cell = document.createElement("td");
            cell.innerText = ''; 
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    table.setAttribute("border", "1");
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "5");
    content.appendChild(table);
        table.id = "draggableTable";

    content.appendChild(table);
    makeTableInteractive();

}

function makeTableInteractive() {
   
    var table = document.getElementById("draggableTable");

   
    interact(table).draggable({
        listeners: {
            move: function (event) {
                var target = event.target;
                var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
        },
    });

   
    interact(table).resizable({
        edges: { left: true, right: true, top: true, bottom: true },
        listeners: {
            move: function (event) {
                var target = event.target;
                var x = (parseFloat(target.getAttribute('data-x')) || 0);
                var y = (parseFloat(target.getAttribute('data-y')) || 0);
                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
        },
    });
}

