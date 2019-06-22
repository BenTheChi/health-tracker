A health tracking single page application using Angular 7 and Bootstrap.  Original design and creation by Ben Chi.

Features:
- 5 dimensions of health to track progress
- Activities can be completed, incompleted, or deleted
- Activity menus list activities alphabetically, by value, and by completion status
- Front page has a suggested activity generator.  Pick new activities based on type or by random.
- Aggregates score and shows overall summary of health
- Add new activities with custom names, values, types, and descriptions
- Validates new added activities and highlights invalid fields

Bugs/Design Flaws:
- All the code is stored on the front end so it’s very heavy weight. Takes several seconds to fully load the app.
- Dynamic layout does not work properly for smaller screen sizes.
- The UI/UX is not the aesthetically nicest. I was unsure about a lot of design choices like color scheme and component layout.
- No CRUD operations available because there is no back end. Current data displayed is for demo purposes only.
