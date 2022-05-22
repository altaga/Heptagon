import React, { Component } from 'react';
import { Row, Col } from "reactstrap"
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MoneyIcon from '@material-ui/icons/Money';

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
}

class Transactions extends Component {

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div style={{
                maxHeight: '57.4vh',
                overflowY: 'scroll',
                overflowX: 'hidden',
                paddingTop: '5px',
            }}>
                {
                    this.props.transactions.map((elements, index) => (
                        <Row md="3" key={index + "kk"}>
                            <Col xs="4">
                                <div>
                                    {
                                        elements.type === "p2p_transfer" ?
                                            <PeopleOutlineIcon htmlColor="#2461fb" fontSize="large" />
                                            :
                                            <MoneyIcon htmlColor="#2461fb" fontSize="large" />
                                    }
                                </div>
                                <div style={{ fontSize: ".7rem" }}>{elements.type}</div>
                            </Col>
                            <Col xs="4">
                                Status:
                                {
                                    elements.status === "CLOSED" &&
                                    <div style={{ color: "#00FF00" }}>CLOSED</div>
                                }
                                {
                                    elements.status === "CAN" &&
                                    <div style={{ color: "#FF9000" }}>CAN</div>
                                }
                                {
                                    elements.status === "DEC" &&
                                    <div style={{ color: "#00A1FF" }}>DEC</div>
                                }
                                {
                                    elements.status === "PEN" &&
                                    <div style={{ color: "#FFFF00" }}>PENDING</div>
                                }
                                {
                                    elements.status === "CLO" &&
                                    <div style={{ color: "#00FF00" }}>CLOSED</div>
                                }
                            </Col>
                            <Col xs="4">
                                {
                                    parseFloat(elements.amount) >= 0 ?
                                        <>
                                            <h3 style={{
                                                color: "#00FF00"
                                            }}>+${elements.amount}</h3>
                                        </>
                                        :
                                        <>
                                            <h3 style={{
                                                color: "#FF0000"
                                            }}>-${(elements.amount.toString()).substring(1, elements.amount.toString().length)}</h3>
                                        </>
                                }
                                <div style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
                                    {timeConverter(elements.created_at)}
                                </div>
                            </Col>
                            <div style={{ fontSize: "0.7rem" }}> Id: {elements.id}</div>
                            <hr></hr>
                        </Row>
                    ))
                }
            </div>
        );
    }
}

export default Transactions;