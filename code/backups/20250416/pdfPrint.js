// PDF Print function

async function generatePDF(formData, additionalPdfPaths) {
    
    window.generatePDF = generatePDF;

    const chipManufacturer = formData.chipManufacturer.replace(/\s+/g, ''); 
    const sinkOrSource = formData.sinkOrSource || 'Unknown';
    const dynamicPdfPath = `./files/print/Checklist_${chipManufacturer}_${sinkOrSource}_UUT.pdf`;

    const dynamicPdfResponse = await fetch(dynamicPdfPath);
    if (!dynamicPdfResponse.ok) {
        console.error(`Failed to load the dynamic PDF from ${dynamicPdfPath}`);
        return;
    }
    const dynamicPdfData = await dynamicPdfResponse.arrayBuffer();
    const dynamicPdfDoc = await PDFLib.PDFDocument.load(dynamicPdfData);

    // Define pdfDoc for the dynamically loaded PDF
    const pdfDoc = dynamicPdfDoc;

    // Always add the first page from Checklist_firstPage.pdf
    const firstPagePath = './files/print/Checklist_firstPage.pdf';
    const firstPageResponse = await fetch(firstPagePath);
    if (!firstPageResponse.ok) {
        console.error(`Failed to load the first page from ${firstPagePath}`);
        return;
    }
    const firstPageData = await firstPageResponse.arrayBuffer();
    const firstPageDoc = await PDFLib.PDFDocument.load(firstPageData);
    const firstPageToAdd = await pdfDoc.copyPages(firstPageDoc, [0]);
    pdfDoc.insertPage(0, firstPageToAdd[0]);

    // Embed font
    pdfDoc.registerFontkit(window.fontkit);
    const fontUrl = './fonts/SourceSansPro-Regular.otf';
    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
    const sourceSansProFont = await pdfDoc.embedFont(fontBytes);

    // Fill in customer details on the first page
    const firstPage = pdfDoc.getPages()[0];
    const fontSize = 10;
    const fontColor = PDFLib.rgb(0, 0, 0);

    const customerName = document.getElementById('customerName')?.value || 'Customer Name Not Provided';
    firstPage.drawText(customerName, {
        x: 324,
        y: 639,
        size: fontSize,
        font: sourceSansProFont,
        color: fontColor,
    });

    const contactPerson = document.getElementById('contactPerson')?.value || 'Contact Person Not Provided';
    firstPage.drawText(`${contactPerson}`, {
        x: 324,
        y: 608,
        size: fontSize,
        font: sourceSansProFont,
        color: fontColor,
    });

    const projectTitle = document.getElementById('projectTitle')?.value || 'Project Title Not Provided';
    firstPage.drawText(`${projectTitle}`, {
        x: 324,
        y: 576,
        size: fontSize,
        font: sourceSansProFont,
        color: fontColor,
    });

    const useCase = document.getElementById('useCase')?.value || 'Use Case Not Provided';
    firstPage.drawText(`${useCase}`, {
        x: 324,
        y: 544,
        size: fontSize,
        font: sourceSansProFont,
        color: fontColor,
    });

    const plannedQuantity = document.getElementById('plannedQuantity')?.value || 'Planned Quantity Not Provided';
    firstPage.drawText(`${plannedQuantity}`, {
        x: 324,
        y: 495,
        size: fontSize,
        font: sourceSansProFont,
        color: fontColor,
    });

    const testHardwareFormat = document.querySelector('input[name="testHardwareFormat[]"]:checked')?.value || '';
    const hardwareFormatPositions = {
        'Box (GigE)': { x: 328, y: 477 },
        'PCIe Card': { x: 412, y: 477 },
        'PXIe Card': { x: 498, y: 477 },
    };
    if (testHardwareFormat in hardwareFormatPositions) {
        firstPage.drawText('X', {
            ...hardwareFormatPositions[testHardwareFormat],
            size: 12,
            font: sourceSansProFont,
            color: fontColor,
        });
    }

    const numberInputs = document.getElementById('numberInputsEditable')?.value || '1';
    firstPage.drawText(`${numberInputs}`, {
        x: 324,
        y: 460,
        size: fontSize,
        font: sourceSansProFont,
        color: fontColor,
    });

    const numberOutputs = document.getElementById('numberOutputsEditable')?.value || '1';
    firstPage.drawText(`${numberOutputs}`, {
        x: 324,
        y: 443,
        size: fontSize,
        font: sourceSansProFont,
        color: fontColor,
    });

    // Initialize the pages array to store PDF pages
    const pages = pdfDoc.getPages();

    // Dynamic Sections
    const videoSections = document.querySelectorAll('.dynamic-input-output');
    videoSections.forEach((section, index) => {
        let currentPage;
        if (index < pages.length) {
            currentPage = pages[index + 1]; // Use existing pages starting from the second page
        } else {
            currentPage = pdfDoc.addPage(); // Add a new page if needed
        }

        if (!currentPage) {
            console.error(`Failed to initialize page for section ${index + 1}`);
            return;
        }

        const inputOrOutput = section.querySelector('input[name="inputOrOutput[]"]:checked')?.value || '';
        const icType = section.querySelector('select[name="icType[]"]')?.value || '';
        const videoConnectorType = section.querySelector('.video-connector-type .btn.option.active')?.dataset.value || '';
        const otherText = section.querySelector('textarea[name="otherVideoConnectorType"]')?.value || '';
        const pinningConnector = section.querySelector('textarea[name="pinningConnector"]')?.value || '';
        const powerSupply = section.querySelector('.power-supply-buttons .btn-option.active')?.dataset.value || '';
        const voltageCurrent = section.querySelector('.power-supply-details input[name="voltageCurrentConsumption[]"]')?.value || '';
        const pixelClock = section.querySelector('input[name="pixelClock[]"]')?.value || '';
        const imageWidth = section.querySelector('input[name="imageWidth[]"]')?.value || '';
        const imageHeight = section.querySelector('input[name="imageHeight[]"]')?.value || '';
        const frameRate = section.querySelector('input[name="frameRate[]"]')?.value || '';
        const horizontalSync = section.querySelector('input[name="horizontalSyncPolarity[]"]:checked')?.value || '';
        const verticalSync = section.querySelector('input[name="verticalSyncPolarity[]"]:checked')?.value || '';
        const dataEnable = section.querySelector('input[name="dataEnablePolarity[]"]:checked')?.value || '';
        const pixelClockPolarity = section.querySelector('input[name="pixelClockPolarity[]"]:checked')?.value || '';
        const lockOutputEnable = section.querySelector('input[name="lockOutputEnable[]"]:checked')?.value || '';
        const lockPolarity = section.querySelector('input[name="lockPolarity[]"]:checked')?.value || '';
        const videoFormat = section.querySelector('input[name="videoFormat[]"]')?.value || '';

        // Title for each section
        const sectionTitle = `UUT Video IN/OUT ${index + 1}`;
        const yPosition = 710;
        currentPage.drawText(sectionTitle, {
            x: 90,
            y: yPosition,
            size: 14,
            font: sourceSansProFont,
            color: fontColor,
        });

        // input/output
        if (inputOrOutput === 'Input') {
            currentPage.drawText('X', {
                x: 90,
                y: 693,
                size: 12,
                color: fontColor,
                font: sourceSansProFont,
            });
        } else if (inputOrOutput === 'Output') {
            currentPage.drawText('X', {
                x: 324,
                y: 691,
                size: 12,
                color: fontColor,
                font: sourceSansProFont,
            });
        }

        // IC Type
        if (icType === 'Source') {
            currentPage.drawText('Source (Serializer)', {
                x: 324,
                y: 676,
                size: fontSize,
                font: sourceSansProFont,
                color: fontColor,
            });

            // Video Connector Type
            const connectorText = videoConnectorType === 'Other' ? otherText : videoConnectorType;
            currentPage.drawText(`${connectorText}`, {
                x: 324,
                y: 659,
                size: fontSize,
                font: sourceSansProFont,
                color: fontColor,
            });

            // Pinning of video connector
            if (pinningConnector) {
                currentPage.drawText(`${pinningConnector}`, {
                    x: 324,
                    y: 631,
                    size: fontSize,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            }

            // Power Supply
            if (powerSupply === 'Yes') {
                currentPage.drawText('X', {
                    x: 324,
                    y: 555,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
                currentPage.drawText(`Voltage/Current: ${voltageCurrent}`, {
                    x: 353,
                    y: 556,
                    size: 7,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            } else if (powerSupply === 'No') {
                currentPage.drawText('X', {
                    x: 450,
                    y: 555,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            }

            /* Video Parameters*/
            // Pixel Clock
            currentPage.drawText(`${pixelClock}`, {
                x: 324,
                y: 540,
                size: fontSize,
                font: sourceSansProFont,
                color: fontColor,
            });

            // Image Width
            currentPage.drawText(`${imageWidth}`, {
                x: 324,
                y: 523,
                size: fontSize,
                font: sourceSansProFont,
                color: fontColor,
            });

            // Image Height
            currentPage.drawText(`${imageHeight}`, {
                x: 324,
                y: 506,
                size: fontSize,
                font: sourceSansProFont,
                color: fontColor,
            });

            // Frame Rate
            currentPage.drawText(`${frameRate}`, {
                x: 324,
                y: 489,
                size: fontSize,
                font: sourceSansProFont,
                color: fontColor,
            });

            // Horizontal Sync Polarity
            if (horizontalSync === 'High') {
                currentPage.drawText('X', {
                    x: 324,
                    y: 470,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            } else if (horizontalSync === 'Low') {
                currentPage.drawText('X', {
                    x: 446,
                    y: 470,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            }

            // Vertical Sync Polarity
            if (verticalSync === 'High') {
                currentPage.drawText('X', {
                    x: 324,
                    y: 453,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            } else if (verticalSync === 'Low') {
                currentPage.drawText('X', {
                    x: 446,
                    y: 453,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            }

            // Data Enable Polarity
            if (dataEnable === 'High') {
                currentPage.drawText('X', {
                    x: 324,
                    y: 436,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            } else if (dataEnable === 'Low') {
                currentPage.drawText('X', {
                    x: 446,
                    y: 436,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            }

            // Pixel Clock Polarity
            if (pixelClockPolarity === 'High') {
                currentPage.drawText('X', {
                    x: 324,
                    y: 419,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            } else if (pixelClockPolarity === 'Low') {
                currentPage.drawText('X', {
                    x: 446,
                    y: 419,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            }

            // Lock Output Enable
            if (lockOutputEnable === 'High') {
                currentPage.drawText('X', {
                    x: 324,
                    y: 402,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            } else if (lockOutputEnable === 'Low') {
                currentPage.drawText('X', {
                    x: 446,
                    y: 402,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            }

            // Lock Polarity
            if (lockPolarity === 'High') {
                currentPage.drawText('X', {
                    x: 324,
                    y: 385,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            } else if (lockPolarity === 'Low') {
                currentPage.drawText('X', {
                    x: 446,
                    y: 385,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            }

            // Video Format
            currentPage.drawText(`${videoFormat}`, {
                x: 324,
                y: 370,
                size: fontSize,
                font: sourceSansProFont,
                color: fontColor,
            });

            const numberVideoChannels = document.getElementById('numberVideoChannelsEditable')?.value || 'Not Provided';
            currentPage.drawText(`${numberVideoChannels}`, {
                x: 324,
                y: 352,
                size: fontSize,
                font: sourceSansProFont,
                color: fontColor,
            });

            const hdcpUsed = document.querySelector('input[name="hdcpUsed[]"]:checked')?.value || '';
            if (hdcpUsed === 'Yes') {
                currentPage.drawText('X', {
                    x: 324,
                    y: 334,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            } else if (hdcpUsed === 'No') {
                currentPage.drawText('X', {
                    x: 446,
                    y: 334,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            }

            // Sideband
            const sidebandOptions = ['I2C', 'UART', 'SPI', 'MII', 'CAN'];
            const sidebandPositions = {
                'I2C': { yes: { x: 324, y: 317 }, no: { x: 446, y: 317 } },
                'UART': { yes: { x: 324, y: 301 }, no: { x: 446, y: 301 } },
                'SPI': { yes: { x: 324, y: 284 }, no: { x: 446, y: 284 } },
                'MII': { yes: { x: 324, y: 267 }, no: { x: 446, y: 267 } },
                'CAN': { yes: { x: 324, y: 250 }, no: { x: 446, y: 250 } },
            };

            sidebandOptions.forEach((option) => {
                const isSelected = document.querySelector(`input[name="sideband"][value="${option}"]:checked`) !== null;

                if (isSelected) {
                    currentPage.drawText('X', {
                        ...sidebandPositions[option].yes,
                        size: 12,
                        font: sourceSansProFont,
                        color: fontColor,
                    });
                } else {
                    // Print 'X' for "No" position
                    currentPage.drawText('X', {
                        ...sidebandPositions[option].no,
                        size: 12,
                        font: sourceSansProFont,
                        color: fontColor,
                    });
                }
            });

            // Chip Manufacturer
            const chipManufacturer = document.querySelector('select[name="chipManufacturer[]"]')?.value;
            if (chipManufacturer) {
                const chipOptions = {
                    /* Texas Instruments */
                    'Texas Instruments': () => {
                        const fpdOptions = document.querySelectorAll('.fpd-options .btn.option.active');
                        if (fpdOptions.length === 0) {
                            console.error('No active FPD options found.');
                        } else {
                            fpdOptions.forEach((option) => {
                                const fpdValue = option.dataset.value;
                                const fdpPositions = {
                                    'FPD Link II': { x: 324, y: 216 },
                                    'FPD Link III': { x: 409, y: 216 },
                                    'FPD Link IV': { x: 495, y: 216 },
                                };

                                if (fdpPositions[fpdValue]) {
                                    currentPage.drawText('X', {
                                        ...fdpPositions[fpdValue],
                                        size: 12,
                                        font: sourceSansProFont,
                                        color: fontColor,
                                    });
                                } else {
                                }
                            });
                        }

                        // Backward Compatible Mode
                        const backwardCompatibleMode = document.querySelector('.fpd-options .btn.option.active[data-value="Yes"]') ? 'Yes' :
                            document.querySelector('.fpd-options .btn.option.active[data-value="No"]') ? 'No' : 'Not Provided';
                        const backwardCompatiblePositions = {
                            'Yes': { x: 324, y: 198 },
                            'No': { x: 446, y: 198 },
                        };
                        if (backwardCompatibleMode in backwardCompatiblePositions) {
                            currentPage.drawText('X', {
                                ...backwardCompatiblePositions[backwardCompatibleMode],
                                size: 12,
                                font: sourceSansProFont,
                                color: fontColor,
                            });
                        }

                        // Low Frequency Mode
                        const lowFrequencyMode = document.querySelector('.fpd-options .btn.option.active[data-value="Yes"]') ? 'Yes' :
                            document.querySelector('.fpd-options .btn.option.active[data-value="No"]') ? 'No' : 'Not Provided';
                        const lowFrequencyPositions = {
                            'Yes': { x: 324, y: 181 },
                            'No': { x: 446, y: 181 },
                        };
                        if (lowFrequencyMode in lowFrequencyPositions) {
                            currentPage.drawText('X', {
                                ...lowFrequencyPositions[lowFrequencyMode],
                                size: 12,
                                font: sourceSansProFont,
                                color: fontColor,
                            });
                        }

                        // Transfer Mode
                        const transferMode = document.querySelector('.fpd-options .btn.option.active[data-value="Single Lane"]') ? 'Single Lane' :
                            document.querySelector('.fpd-options .btn.option.active[data-value="Dual Lane"]') ? 'Dual Lane' : 'Not Provided';
                        const transferModePositions = {
                            'Single Lane': { x: 324, y: 164 },
                            'Dual Lane': { x: 446, y: 164 },
                        };
                        if (transferMode in transferModePositions) {
                            currentPage.drawText('X', {
                                ...transferModePositions[transferMode],
                                size: 12,
                                font: sourceSansProFont,
                                color: fontColor,
                            });
                        }
                    },

                    /* APIX */
                    'APIX': () => {
                        const apixOptions = document.querySelectorAll('.apix-options .btn.option.active');

                        if (apixOptions.length === 0) {
                            console.error('No active APIX options found.');
                            return;
                        }

                        const apixPositions = {
                            'APIX I': { x: 324, y: 216 },
                            'APIX II': { x: 409, y: 216 },
                            'APIX III': { x: 495, y: 216 },
                        };

                        apixOptions.forEach((option) => {
                            const apixValue = option.dataset.value;
                            if (apixPositions[apixValue]) {
                                currentPage.drawText('X', {
                                    ...apixPositions[apixValue],
                                    size: 12,
                                    font: sourceSansProFont,
                                    color: fontColor,
                                });
                            } else {
                                console.error(`APIX value "${apixValue}" is not recognized.`);
                            }
                        });
                    },

                    /* Maxim */
                    'Maxim': () => {
                        const gmslOptions = document.querySelectorAll('.gmsl-options .btn.option.active');
                        if (gmslOptions.length === 0) {
                            console.error('No active GMSL options found.');
                        } else {
                            gmslOptions.forEach((option) => {
                                const gmslValue = option.dataset.value;
                                const gmslPositions = {
                                    'GMSL I': { x: 324, y: 216 },
                                    'GMSL II': { x: 409, y: 216 },
                                    'GMSL III': { x: 495, y: 216 },
                                };

                                if (gmslValue in gmslPositions) {
                                    currentPage.drawText('X', {
                                        ...gmslPositions[gmslValue],
                                        size: 12,
                                        font: sourceSansProFont,
                                        color: fontColor,
                                    });
                                } else {
                                    console.error(`GMSL value "${gmslValue}" is not in gmslPositions.`);
                                }
                            });
                        }

                        // Bus Width
                        const busWidth = document.querySelector('.gmsl-options .btn.option.active[data-value="24 bit"]') ? '24 bit' :
                            document.querySelector('.gmsl-options .btn.option.active[data-value="32 bit"]') ? '32 bit' :
                                document.querySelector('.gmsl-options .btn.option.active[data-value="64 bit"]') ? '64 bit' : 'Not Provided';
                        const busWidthPositions = {
                            '24 bit': { x: 324, y: 199 },
                            '32 bit': { x: 409, y: 199 },
                            '64 bit': { x: 495, y: 199 },
                        };
                        if (busWidth in busWidthPositions) {
                            currentPage.drawText('X', {
                                ...busWidthPositions[busWidth],
                                size: 12,
                                font: sourceSansProFont,
                                color: fontColor,
                            });
                        }
                    },
                };

                if (chipManufacturer in chipOptions) {
                    chipOptions[chipManufacturer]();
                } else {
                    console.error(`Chip manufacturer "${chipManufacturer}" is not recognized.`);
                }
            } else {
                console.error('No chip manufacturer selected.');
            }

            // Additional Information
            const additionalInformation = document.getElementById('useCase')?.value || 'Additional Information Not Provided';
            const additionalInfoPositions = {
                'Texas Instruments': { x: 324, y: 148 },
                'APIX': { x: 324, y: 197 },
                'Maxim': { x: 324, y: 180 },
            };

            if (chipManufacturer in additionalInfoPositions) {
                currentPage.drawText(`${additionalInformation}`, {
                    ...additionalInfoPositions[chipManufacturer],
                    size: 10,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            } else {
                console.error(`Chip manufacturer "${chipManufacturer}" is not recognized.`);
            }
        } else {
            currentPage.drawText('Sink IC (Deserializer)', {
                x: 324,
                y: 676,
                size: fontSize,
                font: sourceSansProFont,
                color: fontColor,
            });

            const numberVideoChannels = document.getElementById('numberVideoChannelsEditable')?.value || 'Not Provided';
            currentPage.drawText(`${numberVideoChannels}`, {
                x: 324,
                y: 659,
                size: fontSize,
                font: sourceSansProFont,
                color: fontColor,
            });

            const hdcpUsed = document.querySelector('input[name="hdcpUsed[]"]:checked')?.value || '';
            if (hdcpUsed === 'Yes') {
                currentPage.drawText('X', {
                    x: 324,
                    y: 641,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            } else if (hdcpUsed === 'No') {
                currentPage.drawText('X', {
                    x: 446,
                    y: 641,
                    size: 12,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            }

            // Sideband
            const sidebandOptions = ['I2C', 'UART', 'SPI', 'MII', 'CAN'];
            const sidebandPositions = {
                'I2C': { yes: { x: 324, y: 624 }, no: { x: 446, y: 624 } },
                'UART': { yes: { x: 324, y: 608 }, no: { x: 446, y: 608 } },
                'SPI': { yes: { x: 324, y: 591 }, no: { x: 446, y: 591 } },
                'MII': { yes: { x: 324, y: 574 }, no: { x: 446, y: 574 } },
                'CAN': { yes: { x: 324, y: 557 }, no: { x: 446, y: 557 } },
            };

            sidebandOptions.forEach((option) => {
                const isSelected = document.querySelector(`input[name="sideband"][value="${option}"]:checked`) !== null;

                if (isSelected) {
                    currentPage.drawText('X', {
                        ...sidebandPositions[option].yes,
                        size: 12,
                        font: sourceSansProFont,
                        color: fontColor,
                    });
                } else {
                    // Print 'X' for "No" position
                    currentPage.drawText('X', {
                        ...sidebandPositions[option].no,
                        size: 12,
                        font: sourceSansProFont,
                        color: fontColor,
                    });
                }
            });

            // Chip Manufacturer
            const chipManufacturer = document.querySelector('select[name="chipManufacturer[]"]')?.value;
            if (chipManufacturer) {
                const chipOptions = {
                    /* Texas Instruments */
                    'Texas Instruments': () => {
                        const fpdOptions = document.querySelectorAll('.fpd-options .btn.option.active');
                        if (fpdOptions.length === 0) {
                            console.error('No active FPD options found.');
                        } else {
                            fpdOptions.forEach((option) => {
                                const fpdValue = option.dataset.value;
                                const fdpPositions = {
                                    'FPD Link II': { x: 324, y: 523 },
                                    'FPD Link III': { x: 409, y: 523 },
                                    'FPD Link IV': { x: 495, y: 523 },
                                };

                                if (fdpPositions[fpdValue]) {
                                    currentPage.drawText('X', {
                                        ...fdpPositions[fpdValue],
                                        size: 12,
                                        font: sourceSansProFont,
                                        color: fontColor,
                                    });
                                } else {
                                    // Removed console.error for undefined FPD values
                                }
                            });
                        }

                        // Backward Compatible Mode
                        const backwardCompatibleMode = document.querySelector('.fpd-options .btn.option.active[data-value="Yes"]') ? 'Yes' :
                            document.querySelector('.fpd-options .btn.option.active[data-value="No"]') ? 'No' : 'Not Provided';
                        const backwardCompatiblePositions = {
                            'Yes': { x: 324, y: 505 },
                            'No': { x: 446, y: 505 },
                        };
                        if (backwardCompatibleMode in backwardCompatiblePositions) {
                            currentPage.drawText('X', {
                                ...backwardCompatiblePositions[backwardCompatibleMode],
                                size: 12,
                                font: sourceSansProFont,
                                color: fontColor,
                            });
                        }

                        // Low Frequency Mode
                        const lowFrequencyMode = document.querySelector('.fpd-options .btn.option.active[data-value="Yes"]') ? 'Yes' :
                            document.querySelector('.fpd-options .btn.option.active[data-value="No"]') ? 'No' : 'Not Provided';
                        const lowFrequencyPositions = {
                            'Yes': { x: 324, y: 488 },
                            'No': { x: 446, y: 488 },
                        };
                        if (lowFrequencyMode in lowFrequencyPositions) {
                            currentPage.drawText('X', {
                                ...lowFrequencyPositions[lowFrequencyMode],
                                size: 12,
                                font: sourceSansProFont,
                                color: fontColor,
                            });
                        }

                        // Transfer Mode
                        const transferMode = document.querySelector('.fpd-options .btn.option.active[data-value="Single Lane"]') ? 'Single Lane' :
                            document.querySelector('.fpd-options .btn.option.active[data-value="Dual Lane"]') ? 'Dual Lane' : 'Not Provided';
                        const transferModePositions = {
                            'Single Lane': { x: 324, y: 471 },
                            'Dual Lane': { x: 446, y: 471 },
                        };
                        if (transferMode in transferModePositions) {
                            currentPage.drawText('X', {
                                ...transferModePositions[transferMode],
                                size: 12,
                                font: sourceSansProFont,
                                color: fontColor,
                            });
                        }
                    },

                    /* APIX */
                    'APIX': () => {
                        const apixOptions = document.querySelectorAll('.apix-options .btn.option.active');

                        if (apixOptions.length === 0) {
                            console.error('No active APIX options found.');
                            return;
                        }

                        const apixPositions = {
                            'APIX I': { x: 324, y: 523 },
                            'APIX II': { x: 409, y: 523 },
                            'APIX III': { x: 495, y: 523 },
                        };

                        apixOptions.forEach((option) => {
                            const apixValue = option.dataset.value;
                            if (apixPositions[apixValue]) {
                                currentPage.drawText('X', {
                                    ...apixPositions[apixValue],
                                    size: 12,
                                    font: sourceSansProFont,
                                    color: fontColor,
                                });
                            } else {
                                console.error(`APIX value "${apixValue}" is not recognized.`);
                            }
                        });
                    },

                    /* Maxim */
                    'Maxim': () => {
                        const gmslOptions = document.querySelectorAll('.gmsl-options .btn.option.active');
                        if (gmslOptions.length === 0) {
                            console.error('No active GMSL options found.');
                        } else {
                            gmslOptions.forEach((option) => {
                                const gmslValue = option.dataset.value;
                                const gmslPositions = {
                                    'GMSL I': { x: 324, y: 522 },
                                    'GMSL II': { x: 409, y: 522 },
                                    'GMSL III': { x: 495, y: 522 },
                                };

                                if (gmslValue in gmslPositions) {
                                    currentPage.drawText('X', {
                                        ...gmslPositions[gmslValue],
                                        size: 12,
                                        font: sourceSansProFont,
                                        color: fontColor,
                                    });
                                } else {
                                    // Removed console.error for undefined FPD values
                                }
                            });
                        }

                        // Bus Width
                        const busWidth = document.querySelector('.gmsl-options .btn.option.active[data-value="24 bit"]') ? '24 bit' :
                            document.querySelector('.gmsl-options .btn.option.active[data-value="32 bit"]') ? '32 bit' :
                                document.querySelector('.gmsl-options .btn.option.active[data-value="64 bit"]') ? '64 bit' : 'Not Provided';
                        const busWidthPositions = {
                            '24 bit': { x: 324, y: 505 },
                            '32 bit': { x: 409, y: 505 },
                            '64 bit': { x: 495, y: 505 },
                        };
                        if (busWidth in busWidthPositions) {
                            currentPage.drawText('X', {
                                ...busWidthPositions[busWidth],
                                size: 12,
                                font: sourceSansProFont,
                                color: fontColor,
                            });
                        }
                    },
                };

                if (chipManufacturer in chipOptions) {
                    chipOptions[chipManufacturer]();
                } else {
                    console.error(`Chip manufacturer "${chipManufacturer}" is not recognized.`);
                }
            } else {
                console.error('No chip manufacturer selected.');
            }

            // Additional Information
            const additionalInformation = document.getElementById('useCase')?.value || 'Additional Information Not Provided';
            const additionalInfoPositions = {
                'Texas Instruments': { x: 324, y: 455 },
                'APIX': { x: 324, y: 504 },
                'Maxim': { x: 324, y: 489 },
            };

            if (chipManufacturer in additionalInfoPositions) {
                currentPage.drawText(`${additionalInformation}`, {
                    ...additionalInfoPositions[chipManufacturer],
                    size: 10,
                    font: sourceSansProFont,
                    color: fontColor,
                });
            } else {
                console.error(`Chip manufacturer "${chipManufacturer}" is not recognized.`);
            }
        }
    });

    // Add additional PDFs
    for (const pdfPath of additionalPdfPaths) {
        const additionalPdfResponse = await fetch(pdfPath);
        const additionalPdfData = await additionalPdfResponse.arrayBuffer();
        const additionalPdfDoc = await PDFLib.PDFDocument.load(additionalPdfData);

        const copiedPages = await pdfDoc.copyPages(additionalPdfDoc, additionalPdfDoc.getPageIndices());
        copiedPages.forEach((page) => pdfDoc.addPage(page));
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ASW_Parameter_Checklist.pdf';
    link.click();
}