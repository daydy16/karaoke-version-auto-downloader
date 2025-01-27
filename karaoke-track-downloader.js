// ==UserScript==
// @name         Karaoke Track Downloader
// @namespace    https://karaoke-version.de/
// @version      1.1
// @description  Automates downloading individual tracks from karaoke-version.de
// @match        https://www.karaoke-version.de/custombackingtrack/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("Script started: Initializing automation...");

    // Utility function: Wait for a specific element in the DOM
    function waitForElement(selector, timeout = 30000) {
        return new Promise((resolve, reject) => {
            let elapsedTime = 0;
            const intervalTime = 500;

            const timer = setInterval(() => {
                elapsedTime += intervalTime;
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(timer);
                    resolve(element);
                } else if (elapsedTime >= timeout) {
                    clearInterval(timer);
                    reject(new Error(`Timeout: Element "${selector}" not found within ${timeout}ms.`));
                }
            }, intervalTime);
        });
    }

    // Gather all solo buttons
    const soloButtons = document.querySelectorAll('.track__solo');
    console.log(`Found solo buttons: ${soloButtons.length}`);

    // Reset function: Deselects any pre-selected tracks
    function resetAllSolos() {
        console.log("→ Resetting all solo buttons (deselecting tracks if necessary)");
        soloButtons.forEach((btn) => {
            btn.click(); // Toggle all buttons to ensure no track is selected
        });
    }

    let index = 0; // Start index

    async function downloadNextTrack() {
        if (index >= soloButtons.length) {
            console.log("All tracks have been downloaded. Exiting...");
            return;
        }

        console.log(`Starting download for track index: ${index}`);

        // 1. Enable solo mode for the current track
        console.log("→ Enabling solo mode for index: " + index);
        soloButtons[index].click();

        // 2. Wait briefly to allow the page to process the change
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 3. Find the download button
        const downloadButton = document.querySelector('a.download');
        if (!downloadButton) {
            console.error("Download button not found. Aborting!");
            return;
        }
        console.log("→ Clicking the download button");
        downloadButton.click();

        // 4. Wait for the download overlay (begin-download--ajax)
        console.log("→ Waiting for the download overlay: .begin-download.begin-download--ajax");
        try {
            await waitForElement(".begin-download.begin-download--ajax", 30000);
        } catch (err) {
            console.error(err.message);
            console.error("Download overlay did not appear in time. Aborting!");
            return;
        }

        // 5. Wait 10 seconds for the actual MP3 download to start
        console.log("→ Download overlay detected. Waiting 10 seconds...");
        await new Promise(resolve => setTimeout(resolve, 10000));

        // 6. Disable solo mode and move to the next track
        console.log("→ Disabling solo mode for track index: " + index);
        soloButtons[index].click();
        index++;

        // Start the next download
        downloadNextTrack();
    }

    // Confirmation prompt before starting the script
    const userConfirmed = confirm("Do you want to start downloading tracks?");
    if (userConfirmed) {
        console.log("User confirmed. Starting automation...");
        
        // Reset all tracks before starting
        resetAllSolos();

        // Wait a bit for the reset to complete, then start automation
        setTimeout(() => {
            console.log("Starting automation after reset...");
            downloadNextTrack();
        }, 2000);
    } else {
        console.log("User declined. Script will not proceed.");
    }
})();
