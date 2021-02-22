import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function TypeDropdown({ typeSelected }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Please select data
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onSelect={() => typeSelected("qualityScore")}>
          Quality Score
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => typeSelected("basic")}>
          Basics
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => typeSelected("interaction")}>
          Interaction
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => typeSelected("expertise")}>
          Expertise
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => typeSelected("process")}>
          Process
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => typeSelected("knowledge")}>
          Knowledge
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
