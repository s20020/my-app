import React from 'react'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      countries:[]
    }
    this.uri = 'https://restcountries.eu/rest/v2/all'
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    window
      .fetch(this.uri)
      .then(res => res.json())
      .then(json => this.setState({ json }))

  }

  handleClick (e) {
    const value = e.target.value
    this.setState({value:value})
  }

  handleSubmit () {
    const value = this.state.value
    console.log(this.state.json[0].translations.ja)
    console.log(value)
    this.state.json.map(v => {
      if( v.translations.ja == value)
        console.log("ok")
        const country = 
        this.setState({countries:v.name})
    })

  }

  render() {
    console.log(this.state)
    return(
      <>
      <Title>世界の国</Title>
      <InputView onChange={this.handleClick} onaubmit={this.handleSubmit} countries={this.state.countries}/>
      </>
    )
    
  }

  
}

const Title = props => <h1>{props.children}</h1>

const InputView = props => {
  return(
    <>
      <input type='text' name='text' placeholder='調べたい国の入力' onChange={props.onChange}/>
      <button onClick={props.onaubmit}>taiga</button>
      <OutputView coutry={props.countries} />
    </>

  )
}

const OutputView = props => {
  console.log(props.countries)
  return(
    <>
    </>
  )
}



export default App
