// Basic Imports
import React from 'react'
const ContextModule = React.createContext()

// Context Provider Component

class ContextProvider extends React.Component {
  // define all the values you want to use in the context
  state = {
    value: {
      balance: 0,
      cryptobalance: 0,
      ewallet: 'ewallet_c9a2044f5c939129985970a40a3e42b1',
      cryptowallet: '',
      nft:[],
    }
  }

  // Method to update manually the context state, this method isn't used in this example

  setValue = (value) => {
    this.setState({
      value: {
        ...this.state.value,
        ...value,
      }
    })
  }

  render() {
    const { children } = this.props
    const { value } = this.state
    // Fill this object with the methods you want to pass down to the context
    const { setValue } = this

    return (
      <ContextModule.Provider
        // Provide all the methods and values defined above
        value={{
          value,
          setValue
        }}
      >
        {children}
      </ContextModule.Provider>
    )
  }
}

// Dont Change anything below this line

export { ContextProvider }
export const ContextConsumer = ContextModule.Consumer
export default ContextModule