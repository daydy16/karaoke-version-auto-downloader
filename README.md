# Karaoke Track Downloader for Tampermonkey

This is a Tampermonkey userscript designed to automate the process of downloading individual tracks from karaoke-version.de. It resets all selected tracks, confirms user intent, and downloads each track sequentially.

## Features
- Automatically deselects any pre-selected tracks before starting.
- Sequentially downloads each track by activating solo mode and initiating the download.
- Waits for the download process to confirm readiness before proceeding.
- Provides a confirmation dialog to ensure the user wants to proceed.
- Includes logging for debugging purposes.

## Installation
1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser.
2. Create a new userscript in Tampermonkey and paste the script into the editor.
3. Save the script, and it will automatically run on supported pages.

## Usage
1. Navigate to a custom backing track page, e.g., `https://www.karaoke-version.de/custombackingtrack/artist/song.html`.
2. A confirmation dialog will appear. Click **OK** to begin downloading the tracks or **Cancel** to stop the script.
3. The script will automatically:
   - Deselect any active tracks.
   - Start downloading from the first track.
   - Sequentially move through all tracks on the page.

## Requirements
- You must be logged into your karaoke-version.de account.
- Ensure the page contains tracks available for download.

## Customization
- You can adjust wait times or modify CSS selectors based on site changes.
- Debugging logs are included to monitor the process through the browser console.

## Disclaimer
This script is intended for personal use only. Please ensure that you comply with the terms and conditions of karaoke-version.de when using this script.
