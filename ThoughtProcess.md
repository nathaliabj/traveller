First i approched the challenge looking into the requirements
There is been a while since i last used GraphQl, so started playing around with the Apollo playground, so i can familiarize myself with the data that i have available

I started then separating files, i always like to keep my components, pages, utils, hooks, etc ordered on different folders. 

Then i made a call to get all the cities, once i fetched them all i created the function to filter them and set the found cities to display in the home page accordingly

I then went to create the grid component to display this cities as they were found.

I then went to familiarise myself with Chakra UI, as i haven't used it before, and spent some time playing with how i thought it would look better

I then added the mutation query to the "visited" and "wishlist" buttons, and once i was getting a good response from the mutate query I moved to update the visited and wishlist pages to display their relevant items

I started by making another call to the graphql query filtering the items by visited:true, but then i realised that all in all i already had all the data to perform this in one place. so i would prefer to avoid a second call. 

so I moved the query to get all cities up the scope to the app so I could access them within the whole app and work with this data without doing multiple calls.