import React from 'react'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      countries: []
    }
    this.uri = 'https://restcountries.eu/rest/v2/all'
  }

  componentDidMount () {
    window
      .fetch(this.uri)
      .then(res => res.json())
      .then(json => this.setState({ json }))
  }

  render () {
    if (!this.state.json) return <div>dummy</div>
    const countries = Object.values(this.state.json).map(v => ({
      name: v.translations.ja || v.name
    }))
    console.log(Object.values(this.state.json)[182])
    console.log(Object.values(this.state.json)[203])
    return (
      <Autocomplete
        id='combo-box-demo'
        options={countries}
        getOptionLabel={option => option.name}
        style={{ width: 300 }}
        onChange={this.handleChange.bind(this)}
        renderInput={params => (
          <TextField {...params} label='Combo box' variant='outlined' />
        )}
      />
    )
  }

  handleChange (event) {
    const index = event.target.dataset.optionIndex
    const json = Object.values(this.state.json)[index]
    console.log(json)
  }
}

export default App
