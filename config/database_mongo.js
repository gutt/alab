module.exports = 
  { "development":
  { "driver":   "mongodb"
    , "url": "mongodb://localhost/dev"
      }
      , "test":
        { "driver":   "mongodb"
          , "url": "mongodb://localhost/dev"
            }
            , "production":
              { "driver":   "mongodb"
                , "url": "mongodb://localhost/prod"
                  }  
};
