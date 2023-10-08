# PAG
## Poli di Aule Gestite

### Description
This project aims to be an alternative to the official University Planner provided by the University of Pisa.
It is a web application that allows students to view the availability of the classrooms of the Polo Fibonacci with a GUI that is at least usable on mobile devices.

### Motivation
This project was a personal challenge to see if I could create a web application with a semi-decent GUI; in fact this is the first time I use a web framework (Vue.js) (and the first time I try to build a web application in general).
My goal was to create a web application that was at least usable on mobile devices and possibly a bit faster than the official one (which is only partially solved since the fetched data is huge and full of useless / redundant information).
As such, the code is ~~probably~~ surely ~~not the best~~ the worst you will ever see.

### TODOs
- [x] View the availability of the classrooms of the Polo Fibonacci
- [x] Change the date of the view
- [ ] Load data from different calendars
- [ ] Keep the header of the table always visible when scrolling

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
