# MusicRatingApp

## Live Demo

## Background
I am an enjoyer of music, and being one, I have sought out recommendations for new music, both from friends and from the Internet. Over time, hundreds of albums have been added to my “To Listen List,” and the sheer amount has led to difficulty organizing which albums I have already listened to and what my thoughts were for each. With this app, users can search and save albums to predefined playlists based on the stages of the “album familiarization” process: Listen To, Relisten, Wishlist, Owned, and Discard Pile. Additionally, users can rate albums for the purpose of providing very basic estimations of their initial album listens.

## Technologies Used
React Native, JavaScript, HTML, CSS, Axios API Client

## Requirements To Run
* Node.JS & NPM
  React Native relies on Node.JS and its package manager, npm, in order to function. If not already installed, download Node.JS and npm using the link at the end of this paragraph. Once completed, run the following commands in your command prompt to verify its installation:
  
   ```
    node -v 
    npm -v
  ```  
   
  Link to Node.JS Installer: https://nodejs.org/en/download/

* Discogs Developer API Key

  This application uses the popular music recording catalog, Discogs, as its primary database source, in the form of the service’s free API. The API requires a unique and private API key, which can be generated using the link at the bottom of this paragraph. Through the link, you will need to sign up for a Discogs account (if you do not already have one) and create an application. Once this is finished and an API key is generated, you should place the key in this application's .env file as the variable DISCOGS_APIKEY.

  Link to Discogs: https://www.discogs.com/settings/developers
* Android Studio (Only for running on Android) 

  In order to run the app through an Android emulator, you will need to download Android Studio. Once installed and opened, you will need to create an Android Virtual Device (AVD) - see link below. Once the AVD is created and launched, you will be able to run the application on Android.

  Link to Android Studio Download: https://developer.android.com/studio \
  Link to Android Virtual Device (AVD) Setup: https://developer.android.com/studio/run/emulator
* XCode (Only for running on iOS) 

  Xcode is required to run the application on an iOS emulator. XCode is only available for Apple Macintosh devices, and is free to download via the Mac App Store. Once downloaded and launched, the simulator can be accessed by going to Xcode > Open Developer Tool > Simulator. At this point, you will be able to run the application on iOS.
  
 ## How To Run
 To download the application, either clone the repository using git or download the .zip file. Open a Command Prompt/Terminal window to the project’s file location. Use npm to run the following command: ```npm install``` to download the npm libraries needed to run the application. Place your Discogs API key in the .env file (see Requirements to Run) before starting the application. Finally, run one of the two following commands to run the application on your platform of choice.

iOS - ```npm run ios```\
Android - ```npm run android```

## Images
<img src="https://user-images.githubusercontent.com/79879438/210457733-d0ab5576-262a-47b1-b1c2-a59e9bc3d253.png" alt="drawing" width="200"/>  <img src="https://user-images.githubusercontent.com/79879438/210458059-6d7dd9a2-0761-44ad-90e8-9c7dfa35bf89.png" alt="drawing" width="200"/>  <img src="https://user-images.githubusercontent.com/79879438/210458122-38774658-b7fa-47a4-8061-a6451065b377.png" alt="drawing" width="200"/>  <img src="https://user-images.githubusercontent.com/79879438/210458272-e1768e2a-227f-4da3-863c-5a1ab8fbf009.png" alt="drawing" width="200"/>
