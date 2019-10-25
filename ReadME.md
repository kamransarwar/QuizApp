# Welcome to Quiz Appzz 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)

> Descriptionon

## Install


---

Tasks
- [ ] a task list item
- [ ] list syntax required
- [ ] normal **formatting**
- [ ] incomplete
- [x] completed

---

Code Blocks

    4 space indention
    makes full-width
    standard code blocks

```js
var now = new Date();

var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');

var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

var date = ((now.getDate()<10) ? "0" : "") + now.getDate();

function fourdigits(number){
	return (number < 1000) ? number + 1900 : number;
}

today =  days[now.getDay()] + ", " +
         months[now.getMonth()] + " " +
         date + ", " +
         (fourdigits(now.getYear())) ;

document.write(today);
```

```css
#sc_drag_area {
  height: 100px;
  left: 150px;
  position: absolute;
  top: 100px;
  width: 250px;
  z-index: 9999;
}
```

```sh
npm install
```

## Usage


```sh
npm run start
```

## Author

👤 **kamransarwar**

* Github: [@kamransarwar](https://github.com/kamransarwar)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/kamransarwar/QuizApp/issues).

## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_