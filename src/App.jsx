import React from 'react'

const TitleView = props => <h1>{props.children}</h1>

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: null}
    this.uri = 'https://restcountries.eu/rest/v2/all'
    this.handleClick = this.handleClick.bind(this)
    this.submitClick = this.submitClick.bind(this)
  }


  componentDidMount () {
    window
      .fetch(this.uri)
      .then(res => res.json())
      .then(json => this.setState({ json }))

  }
  handleClick (e) {
    const value = e.target.value
    this.setState({value: value})
  }

  submitClick () {
    return <h2>{this.state.value}</h2>
  }

  render() {
    console.log(this.state)
    return(
      <>
      <Main  onChange={this.handleClick} value={this.state.value} submitClick={this.submitClick} />
      </> 
    )
  }

}


const Main = props => { 
  return(
    <>
      <TitleView>世界の国々</TitleView>
      <InputView onChange={props.onChange} value={props.value} submitClick={props.submitClick}/>
    </>
  )
}


const InputView = props => {
  return(
    <>
      <input type='text' onChange={props.onChange}/> 
      <button type='submit' onClick='alert' >..</button>
    
    </>
  )
}


export default App
