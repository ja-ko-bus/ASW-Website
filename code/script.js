document.addEventListener("DOMContentLoaded", function () {
    const logoContainer = document.createElement("div");
    logoContainer.className = "logo-container";

    const logoImg = document.createElement("img");
    logoImg.src = "images/GOEPELelectronic_logo.png";
    logoImg.alt = "Goepel Logo";
    logoImg.className = "logo";

    logoContainer.appendChild(logoImg);

    // Insert logo container before the <h1>
    const heading = document.querySelector("h1");
    if (heading) {
            heading.parentNode.insertBefore(logoContainer, heading);

    // Set count to the number of preloaded sections (in this case, 1)
    let inputOutputCount = document.querySelectorAll('.dynamic-input-output').length;
    const dynamicInputsContainer = document.getElementById('dynamicInputsContainer');
    const addInputOutputButton = document.getElementById('addInputOutput');
    // Removed unused function 'addInputOutput' declaration
    function addInputOutput() {
        inputOutputCount++;
        const newInputOutput = document.createElement('div');
        newInputOutput.classList.add('form-group', 'dynamic-input-output', 'video-parameter');
        newInputOutput.setAttribute('data-index', inputOutputCount);
        newInputOutput.innerHTML = `
            <h2>UUT Video IN/OUT ${inputOutputCount}</h2>
            <div class="form-group">
                    <div class="btn-group two-buttons" data-toggle="inputOrOutput-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="inputOrOutput[]" value="Input"> Input
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="inputOrOutput[]" value="Output"> Output
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label>Signal Direction:</label>
                    <div class="signal-direction-container">
                        <select name="icType[]" class="icType" required>
                            <option value="">Select</option>
                            <option value="Source">Source</option>
                            <option value="Sink">Sink IC</option>
                        </select>
                        <span class="icType-placeholder" style="display: none; margin-left: 10px;"></span>
                    </div>
                        <div class="additional-source-fields" style="display: none;"></div>
                    </div>
                    <div class="form-group video-connector-type" style="display: none;">
                    <label>Video connector type:</label>
                    <div class="buttons">
                        <button type="button" class="btn option" data-value="STP">STP</button>
                        <button type="button" class="btn option" data-value="Coax">Coax</button>
                        <button type="button" class="btn option" data-value="HMTD">HMTD</button>
                        <button type="button" class="btn option" data-value="Other">Other</button>
                    </div>
                    <div class="video-connector-images" style="margin-top: 10px;">
                        <img src="images/STP.png" alt="STP" class="video-connector-image">
                        <img src="images/Coax.png" alt="Coax" class="video-connector-image">
                        <img src="images/Hmtd.png" alt="HMTD" class="video-connector-image">
                        <textarea name="otherVideoConnectorType" placeholder="Please specify" style="margin-top: 10px;"></textarea>
                    </div>
                </div>
                <div class="form-group video-connector-pinning" style="display: none;">
                    <label for="pinningConnector">Pinning of video connector:</label>
                    <textarea id="pinningConnector" name="pinningConnector" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label>Power supply of UUT via video cable?</label>
                    <div class="power-supply-wrapper">
                        <div class="power-supply-buttons">
                            <span class="btn-option" data-value="Yes">Yes</span>
                            <span class="btn-option" data-value="No">No</span>
                        </div>
                        <div class="form-group power-supply-details" style="display: none;">
                            <input type="text" name="voltageCurrentConsumption[]" 
                            placeholder="Consumption: e.g: 12V / 495mA">
                        </div>
                    </div>
                    <!--Video Parameters-->
                <br> 
                <div class="form-group">
                    <label>Pixel Clock:</label>
                    <input type="text" name="pixelClock[]" required>
                </div>
                <div class="form-group">
                    <label>Image Width:</label>
                    <input type="number" name="imageWidth[]" required>
                </div>
                <div class="form-group">
                    <label>Image Height:</label>
                    <input type="number" name="imageHeight[]" required>
                </div>
                <div class="form-group">
                    <label>Frame Rate:</label>
                    <input type="number" name="frameRate[]" required>
                </div>
                <div class="form-group">
                    <label>Horizontal Sync Polarity:</label>
                    <div class="btn-group" data-toggle="horizontal-sync-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="horizontalSyncPolarity[]" value="High"> High
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="horizontalSyncPolarity[]" value="Low"> Low
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Vertical Sync Polarity:</label>
                    <div class="btn-group" data-toggle="vertical-sync-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="verticalSyncPolarity[]" value="High"> High
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="verticalSyncPolarity[]" value="Low"> Low
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Data Enable Polarity:</label>
                    <div class="btn-group" data-toggle="data-enable-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="dataEnablePolarity[]" value="High"> High
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="dataEnablePolarity[]" value="Low"> Low
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Pixel Clock Polarity:</label>
                    <div class="btn-group" data-toggle="pixel-clock-polarity-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="pixelClockPolarity[]" value="High"> High
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="pixelClockPolarity[]" value="Low"> Low
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Lock Output Enable:</label>
                    <div class="btn-group" data-toggle="lock-output-enable-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="lockOutputEnable[]" value="High"> High
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="lockOutputEnable[]" value="Low"> Low
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Lock Polarity:</label>
                    <div class="btn-group" data-toggle="lock-polarity-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="lockPolarity[]" value="High"> High
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="lockPolarity[]" value="Low"> Low
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Video Format:</label>
                    <input type="text" name="videoFormat[]" required>
                </div>
            </div>
            <div class="form-group">
                <label>Is HDCP used?</label>
                <div class="btn-group two-buttons" data-toggle="hdcp-buttons">
                    <label class="btn btn-option">
                        <input type="radio" name="hdcpUsed[]" value="Yes"> Yes
                    </label>
                    <label class="btn btn-option">
                        <input type="radio" name="hdcpUsed[]" value="No"> No
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label>Sideband Communication:</label>
                <div class="sideband-group">
                    <label class="sideband-option">
                        <input type="checkbox" name="sideband" value="I2C"> I2C
                    </label>
                    <label class="sideband-option">
                        <input type="checkbox" name="sideband" value="UART"> UART
                    </label>
                    <label class="sideband-option">
                        <input type="checkbox" name="sideband" value="SPI"> SPI
                    </label>
                    <label class="sideband-option">
                        <input type="checkbox" name="sideband" value="MII"> MII
                    </label>
                    <label class="sideband-option">
                        <input type="checkbox" name="sideband" value="CAN"> CAN
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label for="numberVideo">Number of Video Channels per Stream:</label>
                <div class="slider-wrapper">
                    <input type="number" id="numberVideoChannelsEditable" name="numberVideoChannelsEditable" min="1" max="10" value="1" required style="width: 60px; margin-right: 10px;">
                    <input type="range" id="numberVideoChannels" name="numberVideoChannels" min="1" max="10" value="1" data-value="1" required>
                    <span class="slider-display" id="numberVideoChannelsDisplay">1</span>
                </div>
            </div>
            <div class="form-group">
                <h3>Chip Manufacturer:</h3>
                <select name="chipManufacturer[]" class="chipManufacturer" required>
                    <option value="">Select</option>
                    <option value="Texas Instruments">Texas Instruments</option>
                    <option value="APIX">APIX</option>
                    <option value="Maxim">Maxim</option>
                </select>
            </div>
            <button type="button" class="remove-video-parameter" data-index="${inputOutputCount}">Remove UUT Video IN/OUT ${inputOutputCount}</button>
        `;
        dynamicInputsContainer.appendChild(newInputOutput);
        dynamicInputsContainer.appendChild(addInputOutputButton);
        applyEventListeners(newInputOutput);
        newInputOutput.querySelectorAll('.slider-wrapper').forEach(wrapper => {
            attachSliderSync(wrapper);
        });
    }

    function applyEventListeners(section) {
        console.log("Applying event listeners to a new section");

        // IC Type Selection
        const icTypeSelect = section.querySelector('select[name="icType[]"]');
        if (icTypeSelect) {
            icTypeSelect.addEventListener('change', function () {
                const placeholder = section.querySelector('.signal-direction-container .icType-placeholder');
                const videoConnectorSection = section.querySelector('.video-connector-type');
                const powerSupplyGroup = section.querySelector('.power-supply-wrapper');
                const pinningField = section.querySelector('.video-connector-pinning');
                const additionalSourceFields = section.querySelector('.additional-source-fields');

                if (this.value === 'Source') {
                    placeholder.textContent = 'Serializer';
                    placeholder.style.display = 'flex';
                    if (videoConnectorSection) videoConnectorSection.style.display = "block";
                    if (powerSupplyGroup && powerSupplyGroup.parentElement)
                        powerSupplyGroup.parentElement.style.display = "block";
                    if (pinningField) pinningField.style.display = "block";
                    if (additionalSourceFields) additionalSourceFields.style.display = "block";
                } else if (this.value === 'Sink') {
                    placeholder.textContent = 'Deserializer';
                    placeholder.style.display = 'flex';
                    if (videoConnectorSection) videoConnectorSection.style.display = "none";
                    if (powerSupplyGroup && powerSupplyGroup.parentElement)
                        powerSupplyGroup.parentElement.style.display = "none";
                    if (pinningField) pinningField.style.display = "none";
                    if (additionalSourceFields) additionalSourceFields.style.display = "none";
                } else {
                    placeholder.textContent = '';
                    placeholder.style.display = 'none';
                    if (videoConnectorSection) videoConnectorSection.style.display = "none";
                    if (powerSupplyGroup && powerSupplyGroup.parentElement)
                        powerSupplyGroup.parentElement.style.display = "none";
                    if (pinningField) pinningField.style.display = "none";
                    if (additionalSourceFields) additionalSourceFields.style.display = "none";
                }
            });
            icTypeSelect.dispatchEvent(new Event('change'));
        } else {
            console.log("IC Type select not found!");
        }


        // Power Supply Toggle
        const powerButtons = section.querySelectorAll(".power-supply-buttons .btn-option");
        if (powerButtons.length > 0) {
            console.log("Power supply buttons found");
            powerButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Power supply button clicked");
                    const parent = button.closest(".power-supply-buttons");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");

                    const powerSupplyDetails = section.querySelector(".power-supply-details");
                    if (button.dataset.value === "Yes") {
                        powerSupplyDetails.style.display = "block";
                    } else {
                        powerSupplyDetails.style.display = "none";
                    }
                });
            });
        } else {
            console.log("Power supply buttons NOT found!");
        }


        // Chip Manufacturer Selection
        const chipManufacturerSelect = section.querySelector('.chipManufacturer');
        if (chipManufacturerSelect) {
            chipManufacturerSelect.selectedIndex = 0; // Force first option ("Select") as default
            chipManufacturerSelect.addEventListener('change', function () {
                updateChipOptions(this);
            });

            // Run updateChipOptions immediately to hide elements on first load
            updateChipOptions(chipManufacturerSelect);
        }

        
        // Video Connector Type Selection
        const videoConnectorButtons = section.querySelectorAll(".buttons .btn.option");
        if (videoConnectorButtons.length > 0) {
            console.log("Video connector buttons found");
            videoConnectorButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const parent = button.parentElement;
                    parent.querySelectorAll(".btn.option").forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const imagesContainer = section.querySelector('.video-connector-images');
                    const otherTextbox = imagesContainer.querySelector('textarea[name="otherVideoConnectorType"]');
                    const value = button.dataset.value;
                    
                    if (value === "Other") {
                        // Hide images and display the textbox at full size
                        imagesContainer.classList.add("hide-images");
                        if (otherTextbox) {
                            otherTextbox.classList.add("visible");
                        }
                    } else {
                        // Show images and hide the textbox (layout space is preserved)
                        imagesContainer.classList.remove("hide-images");
                        if (otherTextbox) {
                            otherTextbox.classList.remove("visible");
                        }
                        // Optionally add styling for selected image if desired
                    }
                });
            });
        } else {
            console.log("Video connector buttons NOT found!                  ");
        }


        // Sideband Communication Toggle
        const sidebandOptions = section.querySelectorAll(".sideband-option");
        if (sidebandOptions.length > 0) {
            console.log("Sideband communication options found");
            sidebandOptions.forEach(option => {
                option.addEventListener("click", function () {
                    console.log("Sideband option clicked");
                    const checkbox = option.querySelector('input');
                    checkbox.checked = !checkbox.checked;
                    option.classList.toggle('active', checkbox.checked);
                });
            });
        } else {
            console.log("Sideband communication options NOT found!");
        }


        // Horizontal Sync Polarity
        const horizontalSyncButtons = section.querySelectorAll("[data-toggle='horizontal-sync-buttons'] .btn-option");
        if (horizontalSyncButtons.length > 0) {
            console.log("Horizontal sync buttons found");
            horizontalSyncButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Horizontal sync button clicked");
                    const parent = button.closest("[data-toggle='horizontal-sync-buttons']");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                });
            });
        } else {
            console.log("Horizontal sync buttons NOT found!");
        }


        // Vertical Sync Polarity
        const verticalSyncButtons = section.querySelectorAll("[data-toggle='vertical-sync-buttons'] .btn-option");
        if (verticalSyncButtons.length > 0) {
            console.log("Vertical sync buttons found");
            verticalSyncButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Vertical sync button clicked");
                    const parent = button.closest("[data-toggle='vertical-sync-buttons']");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                });
            });
        } else {
            console.log("Vertical sync buttons NOT found!");
        }

        // Data Enable Polarity
        const dataEnableButtons = section.querySelectorAll("[data-toggle='data-enable-buttons'] .btn-option");
        if (dataEnableButtons.length > 0) {
            console.log("Data enable buttons found");
            dataEnableButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Data enable button clicked");
                    const parent = button.closest("[data-toggle='data-enable-buttons']");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                });
            });
        } else {
            console.log("Data enable buttons NOT found!");
        }


        // Desired Hardware Format
        const hardwareFormatButtons = section.querySelectorAll("[data-toggle='button'] .btn-option");
        if (hardwareFormatButtons.length > 0) {
            console.log("Hardware format buttons found");
            hardwareFormatButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Hardware format button clicked");
                    const parent = button.closest("[data-toggle='button']");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add('active');
                });
            });
        } else {
            console.log("Hardware format buttons NOT found!");
        }


    // HDCP Toggle Fix
    const hdcpButtons = section.querySelectorAll("[data-toggle='hdcp-buttons'] .btn-option");
    if (hdcpButtons.length > 0) {
        console.log("HDCP buttons found");
        hdcpButtons.forEach(button => {
            button.addEventListener("click", function () {
                console.log("HDCP button clicked");
                const parent = button.closest("[data-toggle='hdcp-buttons']");
                parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            });
        });
    } else {
        console.log("HDCP buttons NOT found!");
    }

    // Pixel Clock Polarity Buttons
    const pixelClockPolarityButtons = section.querySelectorAll("[data-toggle='pixel-clock-polarity-buttons'] .btn-option");
    if (pixelClockPolarityButtons.length > 0) {
        console.log("Pixel Clock Polarity buttons found");
        pixelClockPolarityButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons in this group
                pixelClockPolarityButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                button.classList.add('active');
                // Set the underlying radio input to checked
                let radio = button.querySelector("input[type='radio']");
                if (radio) {
                    radio.checked = true;
                }
            });
        });
    } else {
        console.log("Pixel Clock Polarity buttons NOT found!");
    }

    // Lock Output Enable Buttons
    const lockOutputEnableButtons = section.querySelectorAll("[data-toggle='lock-output-enable-buttons'] .btn-option");
    if (lockOutputEnableButtons.length > 0) {
        console.log("Lock Output Enable buttons found");
        lockOutputEnableButtons.forEach(button => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                const parent = button.closest("[data-toggle='lock-output-enable-buttons']");
                parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                let radio = button.querySelector("input[type='radio']");
                if (radio) {
                    radio.checked = true;
                }
            });
        });
    } else {
        console.log("Lock Output Enable buttons NOT found!");
    }

    // Lock Polarity Buttons
    const lockPolarityButtons = section.querySelectorAll("[data-toggle='lock-polarity-buttons'] .btn-option");
    if (lockPolarityButtons.length > 0) {
        console.log("Lock Polarity buttons found");
        lockPolarityButtons.forEach(button => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                const parent = button.closest("[data-toggle='lock-polarity-buttons']");
                parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                let radio = button.querySelector("input[type='radio']");
                if (radio) {
                    radio.checked = true;
                }
            });
        });
    } else {
        console.log("Lock Polarity buttons NOT found!");
    }

    // Input/Output Toggle
    const inputOutputButtons = section.querySelectorAll("[data-toggle='inputOrOutput-buttons'] .btn-option");
    if (inputOutputButtons.length > 0) {
        console.log("Input/Output buttons found");
        inputOutputButtons.forEach(button => {
            button.addEventListener("click", function () {
                console.log("Input/Output button clicked");
                const parent = button.closest("[data-toggle='inputOrOutput-buttons']");
                parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const radio = button.querySelector("input[type='radio']");
                if (radio) {
                    radio.checked = true;
                }
            });
        });
    } else {
        console.log("Input/Output buttons NOT found!");
    }
    }

    //Update Chip Options
    function updateChipOptions(selectElement) {
        const chipManufacturer = selectElement.value;
        const parameterContainer = selectElement.closest(".video-parameter");

        parameterContainer.querySelectorAll(".chip-options").forEach(option => {
            option.style.display = "none";
        });

        if (chipManufacturer === "Texas Instruments") {
            const fpdOptions = parameterContainer.querySelector(".fpd-options");
            if (fpdOptions) fpdOptions.style.display = "block";
        } else if (chipManufacturer === "APIX") {
            const apixOptions = parameterContainer.querySelector(".apix-options");
            if (apixOptions) apixOptions.style.display = "block";
        } else if (chipManufacturer === "Maxim") {
            const gmslOptions = parameterContainer.querySelector(".gmsl-options");
            if (gmslOptions) gmslOptions.style.display = "block";
        }

        // Attach event listeners to the newly added chip-specific buttons
        const chipOptionButtons = parameterContainer.querySelectorAll(".chip-options .btn.option");
        if (chipOptionButtons.length > 0) {
            console.log("Chip option buttons found");
            chipOptionButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Chip option button clicked");
                    button.parentElement.querySelectorAll(".btn.option").forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        } else {
            console.log("Chip option buttons NOT found!");
        }

        if (chipManufacturer === "Texas Instruments") {
            const backwardCompatibilityButtons = parameterContainer.querySelectorAll('.fpd-options .btn.option[data-value="Yes"], .fpd-options .btn.option[data-value="No"]');
            if (backwardCompatibilityButtons.length > 0) {
                backwardCompatibilityButtons.forEach(button => {
                    button.addEventListener("click", function () {
                        const parent = button.closest(".buttons");
                        parent.querySelectorAll(".btn.option").forEach(btn => btn.classList.remove("active"));
                        button.classList.add("active");

                        if (button.dataset.value === "Yes") {
                            console.log("backwards compatibility mode");
                        } else if (button.dataset.value === "No") {
                            console.log(""); // Do nothing or clear the console
                        }
                    });
                });
            }
        }
    }

    addInputOutputButton.addEventListener('click', addInputOutput);


    // Attach event listeners to the initial elements
    applyEventListeners(document);


    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-video-parameter")) {
            const sectionToRemove = event.target.closest(".dynamic-input-output");
            if (sectionToRemove) {
                sectionToRemove.remove();
            }
    
            // Get all remaining sections
            const remainingSections = document.querySelectorAll(".dynamic-input-output");

            // Renumber all remaining sections
            remainingSections.forEach((section, index) => {
                const newNumber = index + 1; // Start from 1
                section.setAttribute("data-index", newNumber);
    
                // Update heading text
                const heading = section.querySelector("h2");
                if (heading) heading.textContent = `UUT Video IN/OUT ${newNumber}`;
    
                // Update remove button text & data-index
                const removeButton = section.querySelector(".remove-video-parameter");
                if (removeButton) {
                    removeButton.setAttribute("data-index", newNumber);
                    removeButton.textContent = `Remove UUT Video IN/OUT ${newNumber}`;
                }
            });
    
            // Update inputOutputCount to reflect the latest count
            inputOutputCount = remainingSections.length;
        }
    });

    document.querySelectorAll('input[type="range"]').forEach(slider => {
        slider.addEventListener('input', function() {
            const display = document.getElementById(slider.id + 'Display');
            if (display) {
                display.textContent = slider.value;
               
            }
        });
        slider.dispatchEvent(new Event('input'));
    });
  

    document.querySelectorAll('.more-button').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = button.getAttribute('data-target');
            const container = document.getElementById(targetId);
            if (container.innerHTML.trim() === "") {
                const numberInput = document.createElement('input');
                numberInput.type = 'number';
                numberInput.min = '1';
                numberInput.value = '1';
                numberInput.required = true;
                container.appendChild(numberInput);
            } else {
                container.innerHTML = "";
            }
        });
    });


    const plannedNumber = document.getElementById('plannedQuantityEditable');
    const plannedSlider = document.getElementById('plannedQuantity');
    const plannedDisplay = document.getElementById('plannedQuantityDisplay');

    plannedNumber.addEventListener('input', function() {
        plannedSlider.value = plannedNumber.value;
        plannedDisplay.textContent = plannedNumber.value;
    });
    plannedSlider.addEventListener('input', function() {
        plannedNumber.value = plannedSlider.value;
        plannedDisplay.textContent = plannedSlider.value;
    });


    document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
        attachSliderSync(wrapper);
    });

    // Toggle tooltip on click for info icon
    const infoIcons = document.querySelectorAll(".info-icon");
    infoIcons.forEach(icon => {
        icon.addEventListener("click", function (event) {
            event.stopPropagation();
            // Toggle visible class on the associated tooltip (assuming it is the next sibling)
            const tooltip = icon.nextElementSibling;
            if (tooltip && tooltip.classList.contains("tooltip") && tooltip.classList.contains("textbox")) {
                tooltip.classList.toggle("visible");
            }
        });
    });

    // Hide tooltip if clicking outside
        document.addEventListener("click", function () {
            document.querySelectorAll(".tooltip.textbox.visible").forEach(tooltip => {
                tooltip.classList.remove("visible");
            });
        });
    }
    
    // Sliders
    function attachSliderSync(wrapper) {
        const numberInput = wrapper.querySelector('input[type="number"]');
        const slider = wrapper.querySelector('input[type="range"]');
        const display = wrapper.querySelector('.slider-display');
        if (numberInput && slider && display) {
        
            display.textContent = numberInput.value;
            
            numberInput.addEventListener('input', function() {
                slider.value = numberInput.value;
                display.textContent = numberInput.value;
            });
            slider.addEventListener('input', function() {
                numberInput.value = slider.value;
                display.textContent = slider.value;
            });
        }
    };

    // Desired Hardware Format Buttons
    const hardwareFormatButtons = document.querySelectorAll(".hardware-format-options .btn-option");
    if (hardwareFormatButtons.length > 0) {
        console.log("Hardware format buttons found");
        hardwareFormatButtons.forEach(button => {
            button.addEventListener("click", function () {
                const parent = button.closest(".hardware-format-options");
                parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    } else {
        console.log("Hardware format buttons NOT found!");
    }

    document.getElementById('submitForm').addEventListener('click', async function (e) {
        e.preventDefault();
        console.log("Submit button clicked");

        const chipManufacturer = document.querySelector('select[name="chipManufacturer[]"]')?.value;
        const sinkOrSource = document.querySelector('select[name="icType[]"]')?.value;
        const customerName = document.getElementById('customerName')?.value || '';
        const contactPerson = document.getElementById('contactPerson')?.value || '';
        const projectTitle = document.getElementById('projectTitle')?.value || '';
        const useCase = document.getElementById('useCase')?.value || '';
        const plannedQuantity = document.getElementById('plannedQuantityEditable')?.value || '';

        const formData = {
            chipManufacturer,
            sinkOrSource,
            customerName,
            contactPerson,
            projectTitle,
            useCase,
            plannedQuantity
        };
    
        const additionalPdfPaths = [];
    
        await generatePDF(formData, additionalPdfPaths);
    });    
});