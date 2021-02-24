import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ChartWrapper from "./ChartWrapper";
import PieWrapper from "./PieWrapper";
import dataJson from "./data.json";

class App extends Component {
  state = {
    data: [dataJson],
    activeName: null,
    typeData: "Quality Score",
  };

  typeSelected = (typeData) => {
    return this.setState({ typeData });
  };

  updateName = (activeName) => this.setState({ activeName });

  updateData = (data) => this.setState({ data });

  renderChart() {
    if (this.state.data.length === 0) {
      return "No data yet";
    }
    return (
      <ChartWrapper
        data={this.state.data}
        updateName={this.updateName}
        type={this.state.typeData}
      />
    );
  }

  render() {
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand>Diagnostic Tool</Navbar.Brand>
        </Navbar>
        <Container>
          <Row></Row>
          <Row
            style={{
              marginTop: "2rem",
            }}
          >
            <Col md={6} xs={12}>
              {this.state.data[0]["gaugeData"].map((el, index) => {
                return (
                  <PieWrapper
                    key={index}
                    data={el}
                    updateName={this.updateName}
                    type={this.state.typeData}
                    switchSetHandler={this.typeSelected}
                  />
                );
              })}
            </Col>
            <Col
              md={6}
              xs={12}
              style={{
                paddingTop: "4.5rem",
              }}
            >
              {this.renderChart()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
