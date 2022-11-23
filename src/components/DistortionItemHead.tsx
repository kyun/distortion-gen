import React from "react";
import styled from "@emotion/styled";
import { Select, Button, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FACE_ANCHORS, TYPES } from "~/constants";
const Row = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;
const Box = styled.div`
  flex: 0 0 100px;
`;
const Text = styled.span`
  font-size: 0.8rem;
  color: #888;
  padding-left: 0.5rem;
  display: block;
`;

interface Props {
  [key: string]: any;
}

const DistortionItemHead: React.FC<Props> = ({ data }) => {
  return (
    <Row>
      <Box style={{ flexBasis: "40px" }}>
        <Text style={{ paddingLeft: 0 }}>Index</Text>
      </Box>
      <Box>
        <Text>Type</Text>
      </Box>
      <Box style={{ flexBasis: "128px" }}>
        <Text>Face Anchor</Text>
      </Box>
      <Box>
        <Text>Angle</Text>
      </Box>
      <Box>
        <Text>Radius X</Text>
      </Box>
      <Box>
        <Text>Radius Y</Text>
      </Box>
      <Box>
        <Text>Scale</Text>
      </Box>
      <Box>
        <Text>Offset X</Text>
      </Box>
      <Box>
        <Text>Offset Y</Text>
      </Box>
      <Box>
        <Text>Min</Text>
      </Box>
      <Box>
        <Text>Max</Text>
      </Box>
    </Row>
  );
};

export default DistortionItemHead;
