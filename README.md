In this project, we use Zustand
 as our state management solution.

Zustand is a lightweight, simple, and highly performant state management library for React. It allows us to manage global state without the boilerplate and complexity of alternatives like Redux. Here’s why it’s particularly useful in this project:

Centralized State Management:
Zustand allows us to store global data like users and products in a single store. This makes it easy to access and update.

Simplified API:
We can create stores with just a few lines of code make the project easier to maintain.


No Boilerplate:
Unlike Redux Zustand requires no actions, reducers, or dispatch methods. This keeps the code clean and focused on functionality.

Performance-Friendly:
This avoids unnecessary re-renders and keeps the app fast even with large data like user lists or product list.

Ease of Integration with API:
For data fetched from APIs (like dummyjson.com), Zustand allows us to store and manage the fetched results carefully and also we perist the data.

Caching helps reduce unnecessary API calls, improves performance, and provides a faster, smoother UI experience by storing previously fetched data locally.I don't use this in this website because this website is simple with less complexity.And I already use pagination , limit and skip in backend api .

Caching strategy implemented:
We use Zustand to store fetched users and products in a central store. Once data is loaded, components read from the store instead of repeatedly calling the API, effectively caching the data in memory.But I use localstorage for only storing the needed data and its not a good idea to store userlist or products list kind of data in localstorage it is only good for small data otherwise we also use redis or indexDb but i personal recommend don't use sensitive data in any localstorage prefer storing boolean kind of value because it's not safe.