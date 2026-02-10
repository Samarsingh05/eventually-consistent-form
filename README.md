# Eventually Consistent Form

## Overview

This is a simple single page React app with a form that collects an email and an amount. It demonstrates handling API delays, temporary failures, retries, and duplicate prevention while clearly showing the current state to the user.

## Features

* Instant "pending" state on submit
* Mock API with random success, failure, or delayed response
* Automatic retry on temporary failures (limited attempts)
* Prevents duplicate submissions and duplicate records
* Displays clear status: idle, pending, retrying, success, failed

## How It Works

After submission, the app sends data to a mock API. If the API fails temporarily, it retries automatically. If the response is delayed, the UI continues showing the correct state. Each submission is tracked using a unique key to avoid duplicates.

## Tech Stack

React, Vite, JavaScript, CSS

## Run Locally

```
npm install
npm run dev
```

## Build

```
npm run build
```
