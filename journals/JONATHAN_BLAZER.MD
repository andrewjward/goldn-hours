## Thursday, 2023-May-18
    Yesterday we spent all day trying to get Authentication with jstdown-api working.
    We followed Curtis' video and looked at the mongo-jwtdown example and were able to create accounts but were getting a 401 when logging in. Our list view of accounts was working.
    We then c/p'd Kornabari's authentication code (Craig was driving) and we got it to work.
    Now we can signup/login/logout/view accts.
    It seems like the baked-in login function was expecting something that we just weren't passing correctly.


## Thursday, 2023-May-11
    This week we were able to set up Google Maps accounts and get API keys, and display a Google Map in React.
    A-HA! occurred when we realized we were trying to pass a REQUIRED 'center' parameter to the GMaps-React app, but we had named it 'cenEter' 😆
    There were other struggles, like telling Google what kind of app would be requesting the info, etc.
