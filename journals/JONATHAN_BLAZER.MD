## Thursday, 2023-Jun-7
    Great day so far, our code is deployed and passing all tests! Navigation is pretty fluid, the only lingering glitch is that if User refreshes page, the Location name will disappear from state and no longer be displayed
## Wednesday, 2023-Jun-7
    Long day of trying to CICD, but things are starting to work.
    For some reason, our frontend seems to be making an HTTP: call to the backend, which should be a HTTPS: call.
    This is giving us a mixed content error in Chrome.
    Our backend (Swagger) is working well.
    Frontend can LOGIN, but not SIGNUP.
    Pins can be made and map browsed, locations searched.
    User Search does not work!
## Tuesday, 2023-Jun-6
    Made some great progress on eliminating duplicate account signups!
## Monday, 2023-Jun-5
    Got started on Continuous Integration, writing Unit Tests.
    All of our unit tests are passing.
    It was critical that we added __init__.py to the /tests folder.

## Thursday, 2023-Jun-1
    Great day
## Wednesday, 2023-May-24
    11:57 - CRD on pins seems good, need U
            U on accounts is trying to login User, is this correct?

## Tuesday, 2023-May-23
    Today was a little rough. Code was all over the place.
    My signup/login was still working, but Dara's and Andrew's could not work. We did install some cool-looking CSS though. 😋 Finally I realized that react-jwtdown was sending a post to lh:3000, it seemed the var baseUrl was erroneously set to that. I was able to pass in lh:8000 as a prop from App.js to get it to work! AHA!

## Thursday, 2023-May-18
    Yesterday we spent all day trying to get Authentication with jstdown-api working.
    We followed Curtis' video and looked at the mongo-jwtdown example and were able to create accounts but were getting a 401 when logging in. Our list view of accounts was working.
    We then c/p'd Kornabari's authentication code (Craig was driving) and we got it to work.
    Now we can signup/login/logout/view accts.
    It seems like the baked-in login function was expecting something that we just weren't passing correctly.

## Wednesday, 2023-May-17


## Monday, 2023-May-15
    Today we reviewed the project rubric and made  sure we understood the requirements.
    We continued to plot out our application, which will be the first map-based social media app geared towards the professional photographer!
## Friday, 2023-May-12
    More massaging of Google Maps API and wire-framing our app.
    We've decided we want to have a Pin model with picture url, location name, latitude, longitude, and username
## Thursday, 2023-May-11
    This week we were able to set up Google Maps accounts and get API keys, and display a Google Map in React.
    A-HA! occurred when we realized we were trying to pass a REQUIRED 'center' parameter to the GMaps-React app, but we had named it 'cenEter' 😆
    There were other struggles, like telling Google what kind of app would be requesting the info, etc.
