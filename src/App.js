import React, { Component } from 'react';
import './App.sass';

class App extends Component {
  render() {
    return (
      <div>
        <Header value={this.props.header} />
        <ToDo
          todoheader={this.props.todoheader}
          addbtn={this.props.addbtn}
          savebtn={this.props.savebtn}
          deletebtn={this.props.deletebtn}
        />
      </div>
    )
  };
};

class Header extends Component {
  render() {
    return (
      <div className='Header'>
        <div className='Wrapper'>
          <h1>
            {this.props.value}
          </h1>
        </div>
      </div>
    )
  };
};

class ToDo extends Component {
  render() {
    return (
      <div className="ToDo">
        <div className="Wrapper">
          <ToDoHeader value={this.props.todoheader} />
          <ToDoInner
            addbtn={this.props.addbtn}
            savebtn={this.props.savebtn}
            deletebtn={this.props.deletebtn}
          />
        </div>
      </div>
    )
  };
};

class ToDoHeader extends Component {
  render() {
    return (
      <div className='ToDo-Header'>
        <h2>
          {this.props.value}
        </h2>
      </div>
    )
  };
};

class ToDoInner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      inputValue: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.onBtnDownload = this.onBtnDownload.bind(this);
    this.onDeleteSpanClick = this.onDeleteSpanClick.bind(this);
  };

  onBtnClick(e) {
    e.preventDefault();

    if (!this.state.inputValue.length) return;

    const newItem = {
      text: this.state.inputValue,
      id: (new Date().getTime())
    };
    console.log(newItem)

    this.setState(state => ({
      items: state.items.concat(newItem),
      inputValue: ''
    }));
  };

  onDeleteSpanClick(e) {
    this.state.items.forEach((item, i) => {

      if (item.text === e.target.parentNode.firstChild.data) {
        this.setState(state => {
          state.items.splice(i,1);
          return {items: state.items}
        })
      };

    });
  };

  onBtnDownload(e) {
    e.preventDefault();

    createFile(this.state.items);
  };

  onInputChange(e) {
    this.setState({inputValue: e.target.value});
  };

  render() {
    return (
      <div className='ToDo-Inner'>
        <ToDoForm
          inputValue={this.state.inputValue}
          addbtn={this.props.addbtn}
          savebtn={this.props.savebtn}
          onChange={this.onInputChange}
          onClick={this.onBtnClick}
          onDownload={this.onBtnDownload}
        />
        <ToDoList
          items={this.state.items}
          deletebtn={this.props.deletebtn}
          onDelete={this.onDeleteSpanClick}
        />
      </div>
    )
  };
};

class ToDoForm extends Component {
  render() {
    return (
      <form className='ToDo-Form'>
        <input type='text' name='item'
          value={this.props.inputValue}
          onChange={this.props.onChange}
        />
        <ToDoBtn
          value={this.props.addbtn}
          onClick={this.props.onClick}
        />
        <ToDoBtn
          value={this.props.savebtn}
          onClick={this.props.onDownload}
        />
      </form>
    )
  };
};

class ToDoBtn extends Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    )
  };
};

class ToDoList extends Component {
  render() {
    return (
      <ul className='ToDo-List'>
        {this.props.items.map(item => (
          <li key={item.id}>
            {item.text}

            <span
              onClick={this.props.onDelete}
            >
              {this.props.deletebtn}
            </span>
          </li>
        ))}
      </ul>
    )
  };
};

// Styles for file
const styles = {
  html: [
    'margin: 0;',
    'padding: 0;',
  ],
  body: [
    'background-image: url(\'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940\');',
    'background-size: cover;',
    'background-repeat: no-repeat;',
    'background-attachment: fixed;',
    'background-position: 0% 25%;',
  ],
  darken: [
    'position: fixed;',
    'top: 0;',
    'left: 0;',
    'right: 0;',
    'bottom: 0;',
    'background: #1c1c1c;',
    'opacity: 0.1;',
  ],
  div: [
    'position: relative;',
    'margin: 5% auto;',
    'padding: 15px; border-radius: 10px;',
    'width: 90%;',
    'height: auto;',
    'color: #fcfaf9;',
    'text-shadow: 2.5px 1.5px 4px #1c1c1c;',
    'box-shadow: 1px 1px 4px #1c1c1c;',
    'background: #1c1c1c66;',
    'z-index: 11;',
  ],
  h1: [
    'margin: 15px auto 35px;',
    'font-size: 4rem;',
    'text-align: center;',
  ],
  li: [
    'margin: 5px 0;',
    'font-size: 2rem;',
  ],
  liEven: [
    'color: #e3d5c1;',
  ],
}

// Create file for download
const createFile = (arr) => {
  if (!arr.length) return;

  // Create filename
  const title = prompt('Type in ToDo List title, please. Or just tap OK', '');

  // TodoList
  const todoList = [];
  arr.forEach((item, i) => {
    if ((i % 2) !== 0) {
      todoList.push(`<li style="${styles.li} ${styles.liEven}"> ${item.text} </li>`)
    } else {
      todoList.push(`<li style="${styles.li}"> ${item.text} </li>`)
    }
  });

  // File
  const file = {};
  const fileInner =
  `<!DOCTYPE html>\
  <html style="${styles.html}">\
  <head>\
    <meta charset="utf-8" />\
    <title>${title || 'My ToDo List'}</title>\
  </head>\
  <body style="${styles.html} ${styles.body}">\
    <div style="${styles.darken}"></div>\
    <div style="${styles.div}">\
     <h1 style="${styles.h1}">\
       ${title || 'My ToDo List:'}\
     </h1>\
     <ul> ${todoList} </ul>\
    </div>\
  <body>\
  </html>`;

  // Remove commas
  const reg = /,/gi;
  const fileDownload = fileInner.replace(reg, '');

  // To String method of File
  file.toString = () => {
    return fileDownload
  };

  downloadFile(title, file)
};

// Create downloading element
const downloadFile = (filename, file) => {
  let elem = document.createElement('a');
  elem.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(file);
  elem.download = `${filename || 'file'}.html`;
  elem.style.display = 'none';
  document.body.appendChild(elem);

  elem.click();

  document.body.removeChild(elem);
};

export default App;
