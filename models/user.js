// USERNAME MUST BE
// STRING,UNIQUE,REQUIRED,TRIMMED

// EMAIL MUST BE
// STRING, REQUIRED, UNIQUE, MATCH A VALID EMAIL ADDRESS(LOOK INTO MONGOOES'S MATCHING VALIDATION)

// THOUGHTS MUST BE
// array of `_id` values referencing the thought model

// FRIENDS MUST BE
// array of `_id` values referencing the user model(self-reference)

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.