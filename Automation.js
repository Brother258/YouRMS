javascript:(function() {
    const courseIDsInput = prompt("Enter course IDs separated by commas (e.g., cse 2101, cse 2102, cse 2103):");

    if (!courseIDsInput) {
        return; // User cancel
    }

    const courseIDs = courseIDsInput.split(',').map(id => id.trim());
    const failedCourses = []; // To store courses that failed

    let i = 0;
    const actionDelay = 700; // Adjusted delay 
    const elementCheckTimeout = 15000; // Increased timeout for element appearance

    // Function to wait for an element or a specific error message
    function waitForElementOrError(selector, errorSelector, timeout) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();

            const observer = new MutationObserver((mutationsList, observerInstance) => {
                const element = document.querySelector(selector);
                const errorElement = document.querySelector(errorSelector);

                if (element) {
                    observerInstance.disconnect();
                    resolve({ type: 'success', element: element });
                } else if (errorElement && errorElement.textContent.includes('No valid data found to generate JSON.')) {
                    observerInstance.disconnect();
                    resolve({ type: 'error', message: errorElement.textContent });
                } else if (Date.now() - startTime > timeout) {
                    observerInstance.disconnect();
                    reject(new Error(`Timeout: Neither "${selector}" nor "${errorSelector}" appeared within ${timeout}ms.`));
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });

            // Initial check in case it's already there
            const initialElement = document.querySelector(selector);
            if (initialElement) {
                observer.disconnect();
                resolve({ type: 'success', element: initialElement });
            }
            const initialError = document.querySelector(errorSelector);
            if (initialError && initialError.textContent.includes('No valid data found to generate JSON.')) {
                observer.disconnect();
                resolve({ type: 'error', message: initialError.textContent });
            }
        });
    }

    async function automateCourseProcessing() {
        if (i < courseIDs.length) {
            const currentCourseID = courseIDs[i];

            const searchInput = document.getElementById('searchInput');
            const searchBtn = document.getElementById('searchBtn');
            const resetBtn = document.getElementById('resetBtn');

            if (!searchInput || !searchBtn || !resetBtn) {
                alert("One or more initial required elements (searchInput, searchBtn, resetBtn) not found on the page. Automation stopped.");
                console.error("Initial required elements not found. Automation stopped.");
                return;
            }

            console.log(`Processing: ${currentCourseID}`);

            // 1. Write course ID in search input
            searchInput.value = currentCourseID;

            // 2. Click search button
            searchBtn.click();

            // 3. Wait for the download button or the error message
            try {
                const result = await waitForElementOrError('#downloadBtn', 'p[style*="color:red"]', elementCheckTimeout);

                if (result.type === 'success') {
                    const downloadBtn = result.element;
                    console.log(`Download button found for ${currentCourseID}.`);

                    // small delay after button appears before clicking
                    await new Promise(resolve => setTimeout(resolve, actionDelay));

                    // 4. Click download button
                    downloadBtn.click();
                    console.log(`Clicked download button for ${currentCourseID}.`);

                    // Give some time for the download to initiate before resetting
                    await new Promise(resolve => setTimeout(resolve, actionDelay));

                    // 5. Click reset button
                    resetBtn.click();
                    console.log(`Clicked reset button for ${currentCourseID}.`);

                } else if (result.type === 'error') {
                    console.warn(`Skipping ${currentCourseID}: ${result.message}`);
                    failedCourses.push(currentCourseID);

                    // Click reset button if there was an error to clear the state for the next search

                    resetBtn.click();
                    await new Promise(resolve => setTimeout(resolve, actionDelay));
                }

                // Move to the next course ID after a short delay 
                i++;
                await new Promise(resolve => setTimeout(resolve, actionDelay));
                automateCourseProcessing(); // Call recursively the next course

            } catch (error) {
                alert(`Critical error during processing of ${currentCourseID}: ${error.message}. Automation stopped.`);
                console.error(error);
                failedCourses.push(currentCourseID); // Mark as failed on critical error too
            }

        } else {
            let completionMessage = "All course IDs processed!";
            if (failedCourses.length > 0) {
                completionMessage += `\n\nThe following course codes failed to download: ${failedCourses.join(', ')}`;
                alert(completionMessage);
            } else {
                alert(completionMessage);
            }
            console.log("Automation complete.");
            console.log("Failed courses:", failedCourses);
        }
    }

    automateCourseProcessing();

})();
