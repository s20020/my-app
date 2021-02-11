import React from 'react'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: []
    }
    this.uri = 'https://restcountries.eu/rest/v2/all'
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    const countries = []
    const taiga = []
    window
      .fetch(this.uri)
      .then(res => res.json())
      .then(json => json.map(v => {
        if (v.translations.ja) {
          taiga.push(v.translations.ja)
          countries.push({ [v.translations.ja]: { population: v.population, capital: v.capital, currencies: v.currencies, area: v.area, region: v.region, flag: v.flag } })
        }
      }))
    this.setState({ name: taiga })
    this.setState({ countries: countries })
  }

  handleClick (e) {
    console.log(e)
  }

  render () {
    console.log(this.state)
    return (
      <>
        <Title>世界の国</Title>
        <InputView onChange={this.handleClick} countries={this.state.countries} name={this.state.name} />
      </>
    )
  }
}


const Title = props => <h1>{props.children}</h1>

const InputView = props => {
  return (
    <>
      <Autocomplete
        id='combo-box-demo'
        options={props.name}
        getOptionLabel={option => option}
        onChange={props.onChange}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField {...params} label='好きな国を選ぼう' variant='outlined' />
        )}
      />
    </>
  )
}
/*
const OutputView = props => {
  <>
  <p>props.population</p>  
  <p>props.area</p>  
  <p>props.capital</p>  
  <p>props.currentcies</p>  
  <p>props.Languages</p>  
  <p>props.region</p>  
  </>
} 
*/








export default App
