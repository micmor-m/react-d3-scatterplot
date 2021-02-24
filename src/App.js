import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { json } from "d3";

import ChartWrapper from "./ChartWrapper";
import PieWrapper from "./PieWrapper";
import Table from "./Table";
import dataJson from "./data.json";
import TypeDropdown from "./TypeDropdown";
import D3Pie from "./D3Pie";

class App extends Component {
  state = {
    data: [dataJson],
    activeName: null,
    typeData: "Quality Score",
  };

  typeSelected = (typeData) => {
    console.log("typeData", typeData);
    return this.setState({ typeData });
  };

  // componentWillMount() {
  //   json("https://udemy-react-d3.firebaseio.com/children.json")
  //     .then((data) => this.setState({ data }))
  //     .catch((error) => console.log(error));
  // }

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

  // renderPie() {
  //   if (this.state.data.length === 0) {
  //     return "No data yet";
  //   }
  //   return (
  //     <PieWrapper
  //       data={this.state.data}
  //       updateName={this.updateName}
  //       type={this.state.typeData}
  //     />
  //   );
  // }

  render() {
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand>ScatterPlot</Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Col xs={12}>
              {/* <TypeDropdown typeSelected={this.typeSelected} /> */}
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "2rem",
            }}
          >
            <Col md={6} xs={12}>
              {
                this.state.data[0]["gaugeData"].map((el) => {
                  return (
                    <PieWrapper
                      data={el}
                      updateName={this.updateName}
                      type={this.state.typeData}
                      switchSetHandler={this.typeSelected}
                    />
                  );
                })
                //   <PieWrapper
                //   data={this.state.data[0]["gaugeData"][0]}
                //   updateName={this.updateName}
                //   type={this.state.typeData}
                // />
              }
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
