import React from 'react'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      country: [],
      name: null
    }
    this.uri = 'https://restcountries.eu/rest/v2/all'
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    const countries = []
    const names = []
    window
      .fetch(this.uri)
      .then(res => res.json())
      .then(json => json.map(v => {
        if (v.translations.ja) {
          names.push(v.translations.ja)
          countries.push({ population: v.population, capital: v.capital, currencies: v.currencies, area: v.area, region: v.region, flag: v.flag })
        }
      }))
    this.setState({ names: names })
    this.setState({ countries: countries })
  }

  handleClick (e) {
    const value = e.target.dataset.optionIndex
    this.setState({ country: this.state.countries[value] })
    this.setState({ name: this.state.names[value] })
  }

  render () {
    console.log(this.state)
    return (
      <>
        <Title>世界の国</Title>
        <InputView onChange={this.handleClick} countries={this.state.countries} names={this.state.names} />
        <OutputView country={this.state.country} name={this.state.name} />
      </>
    )
  }
}

const Title = props => <div className='main title'><h1>{props.children}</h1></div>

const InputView = props => {
  return (
    <div className='main selecter'>
      <Autocomplete
        id='combo-box-demo'
        options={props.names}
        getOptionLabel={option => option}
        style={{ width: 300 }}
        
        onChange={props.onChange}
        renderInput={params => (
          <TextField {...params} label='国を選ぼう' variant='outlined' />
        )}
      />
    </div>
  )
}

const OutputView = props => {
  console.log(props)
  return (
    <>
      <div className='main view'>
        <ul>
        <Paper><li><strong>人口: {props.country.population}      人</strong></li></Paper>
        <Paper><li><strong>面積: {props.country.area}            km2</strong></li></Paper>
        <Paper><li><strong>首都: {props.country.capital}</strong></li></Paper>
        <Paper><li><strong>通貨: {props.country.currentcies}</strong></li></Paper>
        <Paper><li><strong>地域: {props.country.region}</strong></li></Paper>
        </ul>
        <img src={props.country.flag} alt="国旗"  />
      </div>

    </>
  )
}

export default App
