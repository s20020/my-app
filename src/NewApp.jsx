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
    window
      .fetch(this.uri)
      .then(res => res.json())
      .then(json => this.setState({ json }))
      .then(taiga => taiga.map(v => {
        return (
          this.setState.countries([v.translations.ja] = { population: v.population, capital: v.capital, currencies: v.currencies, area: v.area, Languages: v.Languages, region: v.region, flag: v.flag })
        )
      }
      ))
  }
  handleClick (e) {
    const value = e.target.value
    this.setState({ country : this.state.countries.value })
  }

  render () {
    console.log(this.state)
    return (
      <>
        <Title>世界の国</Title>
        <InputView onChange={this.handleClick} countries={this.state.countries} />
      </>
    )
  }
}

const Title = props => <h1>{props.children}</h1>

const InputView = props => {
  console.log(props.countires)
  console.log(Object.keys(props.countires))
  return (
    <>
      <Autocomplete
        id='combo-box-demo'
        options={Object.keys(props.countries)}
        getOptionLabel={option => option}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField {...params} label='好きな国を選ぼう' variant='outlined' />
        )}
      />
    </>
  )
}
export default App
