## ToolPoll Frontend Developer Log

### Day 1: 15 Jan 2018
___
#### The Stack

*View Library* -
   * So we've already agreed that React is probably the best front-end library for this project - I already know it reasonably well, Edgy wants to learn it and it's probably the best supported and documented library out there alongside angular.

*Data Fetching* -

   * As Edgy says, you could just use `request` or `fetch` or another http client to start with.  However, having done a bit of reading, I think that a fully-featured GraphQL client would give us the most options for the future.  There seems to be 2 of these that are the most popular - **Relay**, by Facebook, and **Apollo Client**, which is part of the wider [Apollo](www.apollographql.com) system.

   * The former seems to have undergone some rapid change recently and is also widely considered the hardest to learn, so I have gone with **Apollo**.  At the start, we would just use the http client part of the library to keep things simple, but it gives us the option to add caching really easily.  It also takes care of internal UI store, like **Redux** but with using GraphQL queries

*Routing* -

   * Neither Apollo nor React come with routing as standard.  The most popular router with **React** is [**React Router**](https://reacttraining.com/react-router/).  I've used previous versions, but not the new **v4**, which is a full rewrite, so I'll do some of the tutorials on this today.

*Server Side Rendering* -

  * Unless anyone else has any other views, I think this will be ultimately best served as HTML, rendered on the server.  This should speed it up noticeably.  However, I think that this can probably wait, so initially we should write it as a client-rendered app.  There's a dit on how to SSR with **Apollo Client** [here](https://github.com/apollographql/apollo-client/blob/master/docs/source/recipes/server-side-rendering.md) so I don't think this bit requires any further libraries.

*Website* -

  * Apart from the application iteself (which will probably be at app.toolpoolapp.com or a similar domain), the rest of the website will include the landing page, contact page, about page, and support/documentation.  This will all be static content, and is probably best served as static HTML.  I have been using [**Gatsby.js**](https://www.gatsbyjs.org/) to build Imogen's website, and it's really good (and actually not that complicated to use).  Basically, it takes all of your pages and content (which can be written as Markdown files) and builds it into static files, which can then be served quickly and for free on **Netlify**, **Github Pages** or **Firebase Hosting** or similar.


Right, off to do some React Router tutorials!




