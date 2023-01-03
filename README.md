# MusicRatingApp

## Background
I am an enjoyer of music, and being one, I have sought out recommendations for new music, both from friends and from the Internet. Over time, hundreds of albums have been added to my “To Listen List,” and the sheer amount has led to difficulty organizing which albums I have already listened to and what my thoughts were for each. With this app, users can search and save albums to predefined playlists based on the stages of the “album familiarization” process: Listen To, Relisten, Wishlist, Owned, and Discard Pile. Additionally, users can rate albums for the purpose of providing very basic estimations of their initial album listens.

## Technologies Used
React Native, JavaScript, HTML, CSS, Axios API Client

## System Requirements To Run
* Discogs Developer API Key

  This application uses the popular music recording catalog, Discogs, as its primary database source, in the form of the service’s free API. The API requires a unique and private API key, which can be generated using the link at the bottom of this paragraph. Through the link, you will need to sign up for a Discogs account (if you do not already have one) and create an application. Once this is finished and an API key is generated, you should place the key in this application's .env file as the variable DISCOGS_APIKEY.

  Link to Discogs: https://www.discogs.com/settings/developers
* Android Studio (Only for running on Android) \
  In order to run the app through an Android emulator, you will need to download Android Studio. Once installed and opened, you will need to create an Android Virtual Device (AVD) - see link below. Once the AVD is created and launched, you can run the React Native app by running in the Terminal or Console npm run android.

  Link to Android Studio Download: https://developer.android.com/studio \
  Link to Android Virtual Device (AVD) Setup: https://developer.android.com/studio/run/emulator
* XCode (Only for running on iOS) \
  Xcode is required to run the application on an iOS emulator. XCode is only available for Apple Macintosh devices, and is free to download via the Mac App Store. Once downloaded and launched, the simulator can be accessed by going to Xcode > Open Developer Tool > Simulator. At this point, return to your Terminal or Console, and run npm run ios.
