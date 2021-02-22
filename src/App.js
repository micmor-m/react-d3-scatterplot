import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { json } from "d3";

import ChartWrapper from "./ChartWrapper";
import Table from "./Table";

class App extends Component {
  state = {
    data: [],
  };

  componentWillMount() {
    json("https://udemy-react-d3.firebaseio.com/children.json")
      .then((data) => this.setState({ data }))
      .catch((error) => console.log(error));
  }

  renderChart() {
    if (this.state.data.length === 0) {
      return "No data yet";
    }
    return <ChartWrapper data={this.state.data} />;
  }

  render() {
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand>ScatterPlot</Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Col md={6} xs={12}>
              {this.renderChart()}
            </Col>
            <Col md={6} xs={12}>
              <Table data={this.state.data} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
