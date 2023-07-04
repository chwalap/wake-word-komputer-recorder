# Wake word "komputer" recorder

This repository contains the code for a web application that facilitates the collection of voice samples for voice detection projects. The application is built using JavaScript and is designed to streamline the process of gathering a large number of voice samples, which can be used for training machine learning models for voice detection and recognition.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)

## Getting Started

This web application provides an interface for users to record their voice samples through their browser. It is especially useful for researchers and developers working on voice detection, speech recognition, or any other audio analysis project that requires a dataset of voice samples.

## Prerequisites

- A modern web browser (e.g., Chrome, Firefox)
- A web server to host the application (optional for local testing)
- Basic knowledge of JavaScript if you wish to modify or contribute to the project

## Installation

1. Clone this repository.

    ```sh
    git clone https://github.com/chwalap/wake-word-komputer-recorder.git
    ```

2. Navigate to the cloned directory.

    ```sh
    cd wake-word-komputer-recorder
    ```

3. If you're running the application on a local machine, you can either open the `index.html` file directly with your browser or use a simple HTTP server to serve the application. For example, using Python's built-in HTTP server:

    ```sh
    python -m http.server
    ```

    Then, visit `http://localhost:8000` in your web browser.

4. If you're deploying this to a remote server, upload the contents of the directory to your server and configure your web server to serve the `index.html` file.

## Running the Application

1. Open the application in your web browser.
2. Allow microphone access when prompted.
3. Follow the on-screen instructions to record your voice samples.
4. After recording, you can download the voice samples.

## Features

- Record voice samples through the browser.
- Playback functionality to review the recording.
- Option to record multiple samples in one session.
- Download recorded samples as audio files.
