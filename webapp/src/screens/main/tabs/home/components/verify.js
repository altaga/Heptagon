import React, { Component } from 'react';
import reactAutobind from 'react-autobind';
import { Button } from 'reactstrap';
import ContextModule from '../../../../../utils/contextModule';

class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            contact: 'cont_6a6e001c788b6636d6a9a87d2d2d5591',
            ewallet: 'ewallet_cdfb92059981c82138b04509f0f97107',
            linkVerification: "",
            loading: false,
        };
        reactAutobind(this);
        this.axios = require('axios');
    }

    static contextType = ContextModule;

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    createVerification() {
        this.setState({
            loading: true,
        });
        this.axios({
            method: 'get',
            url: 'URL',
            headers: {
                'contact': this.state.contact,
                'ewallet': this.state.ewallet
            },
        }).then((response) => {
            this.setState({ linkVerification: response.data.data.redirect_url });
            this.setState({ loading: false });
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div style={{
                height: '100%',
                paddingTop: '10px',
            }}>
                <Button 
                 disabled={this.state.loading}
                className='roundButton' style={{
                    border: '2px solid #0d6efd',
                    borderRadius: '25px',
                    backgroundColor: '#ffffff',
                    color: 'black',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                }} onClick={() => {
                    if (this.state.linkVerification !== "") {
                        window.open(this.state.linkVerification, '_blank');
                    } else {
                        this.createVerification();
                    }
                }}>
                    {
                        this.state.linkVerification === "" ?
                            "Verify" :
                            "Click to Verify"
                    }
                </Button>
            </div>
        );
    }
}

export default Verify;