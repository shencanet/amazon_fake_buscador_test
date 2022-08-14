import React from 'react';
import './App.css';
import Menu from './Menu';
import List from './List';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      books:[
        
        {id:0, rating: 4, title:'Harry Potter', image:'libro01.jpg'},
        {id:1, rating: 2, title:'The Shining', image:'libro02.jpg'},
        {id:2, rating: 1, title:'Codigo Da Vinci', image:'libro03.jpg'},
        {id:3, rating: 1, title:'El Principito', image:'libro04.jpg'},
        {id:4, rating: 5, title:'Sobrenatural', image:'libro05.jpg'}
      ],
      copyBooks: []


    };

  }

  componentDidMount(){
    this.initBooks();
  }
  initBooks = () => {
    this.setState((state, props) => ({
      copyBooks: [...state.books]


    }));}
  onAdd = (item) =>{
    console.log(item);
    let temp = [...this.state.books];
    const id =  temp[temp.length -1].id++;
    item['id'] = id;
    temp.push(item);
    this.setState({books: [...temp]});
    this.initBooks();



  };
  onRemove = (id) =>{
    var temp = [...this.state.books];
    const res = temp.filter(item => item.id != id);

    this.setState({books: [...res]});
    this.initBooks();

  }

  onSearch = (query) =>{
    if(query === ''){
      this.initBooks();
    }else{
      const temp = [...this.state.books];
      let res = [];
      temp.forEach(item=>{
        if(item.title.toLowerCase().indexOf(query)> -1){
          res.push(item);
        }
      } );
      this.setState({copyBooks: [...res]});

    }
   

  }
  onUpdateRating = (item) => {
    var temp = [...this.state.books];
    const index = temp.findIndex(x => x.id === item.id);
    temp[index].title = item.title;
    temp[index].image = item.image;
    temp[index].rating = item.rating;

    this.setState({books: [...temp]});
    this.initBooks();




  };
  render(){
  return (
    <div className='App'>
    <Menu title="Amazon"onadd={this.onAdd} onsearch={this.onSearch}/>
    <List 
    items={this.state.copyBooks} 
    onupdaterating={this.onUpdateRating}
      onremove={this.onRemove}
    />
      
    </div>
  );
}
}

export default App;
