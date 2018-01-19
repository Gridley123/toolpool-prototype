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

  * Apart from the application itself (which will probably be at app.toolpoolapp.com or a similar domain), the rest of the website will include the landing page, contact page, about page, and support/documentation.  This will all be static content, and is probably best served as static HTML.  I have been using [**Gatsby.js**](https://www.gatsbyjs.org/) to build Imogen's website, and it's really good (and actually not that complicated to use).  Basically, it takes all of your pages and content (which can be written as Markdown files) and builds it into static files, which can then be served quickly and for free on **Netlify**, **Github Pages** or **Firebase Hosting** or similar.

*Deployment* -

   * Although I haven't used it before, Edgy is using Google Firebase for most of the server-side deployment solutions so it seems sensible to use Firebase for this.  I'll use *create-react-app* to create the front-end application and build it to static files, then `firebase deploy` to Firebase hosting. A la : [https://www.codementor.io/yurio/all-you-need-is-react-firebase-4v7g9p4kf](https://www.codementor.io/yurio/all-you-need-is-react-firebase-4v7g9p4kf) This allows up to 10 GB of transfer a month (20GB on the $25-a-month plan).  If this gets too expensive in the future, we could consider using GitHub Pages or Netlify which server static sites for free.



Right, off to do some React Router tutorials!

*Authorisation* -

   * Again, Firebase authentication seems to be what Edgy is using on the back end so its what we will use on the front end.


### 19 Jan 18

---

#### Stack cont...

*Search*

   * After some discussion, it was decided that Algolia offer a good hosted search platform.  Essentially we would use their service to index our searchable data (initially Item name, description and tags) and we can directly call their API to search from the client.  They provide a nice drop-in react component for auto-complete as well (https://community.algolia.com/react-instantsearch/Getting_started.html)

*Testing*

   * Edgy is using Mocha/Chai for the back end, so I compared that and Jest for the test runner for the back end.  I have initially selected Jest for the following reasons:
   1.   It comes with loads of useful React testing tools out of the box, such as Snapshot.  It doesn't do anything that Mocha wouldn't, but requires a lot less config.
   2.   It's produced by Facebook and it's what they use for all their testing, so can't be bad.
   3.   It comes with create-react-app, which I have used to scaffold the app.

*create-react-app*

   * I have used this really popular tool to scaffold the app.  It does loads of cool things - creates a nimber of template files, creates a dev server that can be run using `npm start`, and abstracts away a lot of the webpack config, which I don't want to be doing at the moment.  It can be `eject`ed later on so all these things can be amended, but for the moment it makes a good starting block.

### Creating the App

1.  I have used create-react-app to scaffold the application.
2.  `npm install`
3. Installed:

                  "apollo-client-preset": "^1.0.6",
                  "apollo-link-schema": "^1.0.2",
                  "graphql": "^0.12.3",
                  "graphql-tag": "^2.6.1",
                  "graphql-tools": "^2.18.0",
                  "react": "^16.2.0",
                  "react-apollo": "^2.0.4",
                  "react-dom": "^16.2.0"

4. Imported the graphql schema that Edgy has already been working on.  It required a little debugging, so I copied it into a `schema.graphql` file, which Webstorm (the IDE I use) automatically links.  However, Apollo doesn't use `.graphql` files out of the box, so I have then copied the content into an exported string in `schema.js`.  Bit annoying, but as I can't yet access the webpack config, I can't automate this.

5.  Set up Apollo client using apollo-link-schema to use the schema as a mocking schema.  This is a really useful tool- it basically looks at the schema, then automatically creates mocking resolvers and uses this as a fake graphql server so you can test out the front-end components with it.

6.  Some debugging required on the schema - Query `getAvailability` field required a return type, `type Booking` was in there twice, Date is not a default scalar type so needs defining as a custom scalar.

7.  Set up a commented-out apollo-link-http link.  This can be swapped for the mocking link when Edgy has a working server to test it on.  The mocking can also be further enhanced with more prescriptive mock resolvers so the return is more intuitive (e.g. use the `casual` library to return real names and the like instead of 'Hello World' for each string.)

8.  Set up the root component to display the stock `create-react-app` header and also a prettified JSON return from the mock graphql server.  By adjusting the query/mutation string (currently `const itemsQuery`), it will show what the return from a server using our Schema might look like.  It actually shows the 'data' prop that our root component might receive, so has some other fields in it as well.

#### It's working!

   * So, to get a working client, that displays a mock return from a server with our schema:
   1.   pull this repo
   2.   `npm install`
   3.   `npm start`
   4.   It should automatically open a browser and open `localhost:3000` but if not, do that!
   5.   Play around with the schema in schema.js and the query in App.js.
   6.   Once our server is running, replace the Apollo Link parameter in the client initialiser with the apollo-link-http one and point it at our server.







