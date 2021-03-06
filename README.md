# Orchestra Baobab

## Usage
Install: `npm i`
Build:   `npm run build`
Test:    `npm start`; open `localhost:8000` in a browser

## The Problem

A client side search page often has 3 representations of state to keep in-sync. 

    1. the url (eg. query parameters)
    2. the visual form elements (eg. the display value in a search input)
    3. the search query being run (eg. the params to an AJAX call)

When any of these three change, we want the other two to be updated to match. We also want to allow for somewhat arbitrary business logic controlling when state is updated under different conditions. 

In a traditional "jQuery" approach where each element handles its own state and synchronization is done essentially through brute force - the code inevitable becomes spaghetti-like.

## Planting a Tree

Inspired by [this](http://www.christianalfoni.com/articles/2015_02_06_Plant-a-Baobab-tree-in-your-flux-application) article, lets try solving the problem by centralizing ALL state in a single data structure. For this example we'll try out the [Baobab](https://github.com/Yomguithereal/baobab) library.

The idea is we can simplify our app by maintaining state in a single component. This component is then responsible for syncing all representations of this state in turn. All UI components can simply push data to our main tree or listen to changes in the tree to respond. The goal is to centralize state concerns while decoupling UI controls from the underlying search mechanism and from the various representations of this core state.

### Design Decisions
- have a concept of the canonical state, results and url are driven off of this
- each component is indepdent and ignores central state, controller determines when to glue
  component state with central state, components have no direct knowledge of eachother
- use delegated events, since each component has a static shell element, bind all events to this
and not to the contained elements which get re-rendered, this way we avoid leaking DOM handlers
- parameterize all `window` depedencies, for testing purposes don't directly reference global things
in your components, pass them in from the controller
- all components should have a uniform interface with at least `render` and also `get`, `set` when applicable

#### Side Notes
- use browserify to write as much of this project as possible as if it was all NodeJS scripts; because browsers are scary runtimes while node is safe and warm. 
- [Orchestra Baobab](https://www.youtube.com/watch?v=47_j5hoeIws)

#### ToDo
- basic pagination
- sorting
- add gulp build (minification, linting)
- no results screen
- basic styling
- make template loader instead of in-lined component templates
- consider adding ES6 support
