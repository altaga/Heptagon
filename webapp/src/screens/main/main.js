import React, { Component } from 'react';
import reactAutobind from 'react-autobind';
import { Card, CardBody, CardHeader, Col, Row, Button, ButtonGroup } from 'reactstrap';
import Cash from './tabs/cash/cash';
import Home from './tabs/home/home';
import Swap from './tabs/swap/swap';
import ContextModule from '../../utils/contextModule';
import logo from '../../assets/img/logo.png';
import MyModal from './modal/myModal';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selector: 1,
        };
        reactAutobind(this);
    }

    static contextType = ContextModule;

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    nftCallback(value) {
        this.context.setValue({
            nft: value
        })
    }

    render() {
        const style1 ={
            borderRadius: '25px 25px 0px 0px',
            backgroundColor: '#0d6efd',
            fontSize: '20px',
            fontWeight: 'bold',
        }
        const style2 ={
            border: '2px solid #0d6efd',
            borderRadius: '25px 25px 0px 0px',
            backgroundColor: '#ffffff',
            color: 'black',
            fontSize: '20px',
            fontWeight: 'bold',
        }
        return (
            <div>
                <div className='header' style={{
                    borderBottom: '2px solid #0d6efd',
                }}>
                    <Row md="3" style={{ paddingTop: "2vh" }}>
                        <Col xs="4">
                            <img src={logo} alt="logo" style={{ height: "6vh" }} />
                        </Col>
                        <Col xs="4" style={{ paddingTop: "0.5vh" }}>
                            <MyModal nftCallback={this.nftCallback} />
                        </Col>
                        <Col xs="4" style={{ paddingTop: "0.5vh" }}>
                            <Button color="primary" className='roundButton' style={{ width: "90%", fontWeight: "bolder" }} onClick={() => this.props.changeScreen(1)}>
                                Logout
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div className='body'>
                    {
                        this.state.selector === 1 &&
                        <Home nft={this.context.value.nft} />
                    }
                    {
                        this.state.selector === 2 &&
                        <Swap ewallet={this.context.value.ewallet}/>
                    }
                    {
                        this.state.selector === 3 &&
                        <Cash ewallet={this.context.value.ewallet}/>
                    }
                </div>
                <div className='footer'>
                    <ButtonGroup style={{
                        width: '100%',
                        height: '8vh',
                    }}>
                        <Button style={
                            this.state.selector !== 1 ? style1:style2
                        }
                        onClick={() => this.setState({ selector: 1 })}
                        >
                            Home
                        </Button>
                        <Button style={
                            this.state.selector !== 2 ? style1:style2
                        } onClick={() => this.setState({ selector: 2 })}>
                            Swap
                        </Button>
                        <Button style={
                            this.state.selector !== 3 ? style1:style2
                        } onClick={() => this.setState({ selector: 3 })}>
                            Cash Out
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default Main;