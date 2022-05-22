import React, { Component } from 'react';
import reactAutobind from 'react-autobind';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Col, Row } from 'reactstrap';
import { Spinner } from 'reactstrap';

class NFT extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        reactAutobind(this);
        this.axios = require('axios');
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div style={{
                height: '52vh',
                paddingTop: '10px',
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
                <Row md="2">
                    {
                        this.props.nft.map((item, index) => {
                            return (
                                <Col xs="6" key={"mycol" + index}>
                                    <LazyLoadImage
                                        key={"NFTimage" + index}
                                        alt={item.name}
                                        height={"auto"}
                                        width={"100%"}
                                        src={item.image}
                                        placeholder={<Spinner color="primary" style={{ width: "5rem", height: "5rem" }} />}
                                    />
                                    <div>
                                        <h5>{item.name}</h5>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        );
    }
}

export default NFT;