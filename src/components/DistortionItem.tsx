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

interface Props {
  [key: string]: any;
}

const DistortionItem: React.FC<Props> = ({ data, onDelete, onChange }) => {
  const handleChange = React.useCallback(
    (name: string) => (e: any) => {
      onChange(name, e);
    },
    [onChange]
  );
  return (
    <>
      <Row>
        <Box>
          <Select
            value={data.type}
            style={{ width: "100%" }}
            options={TYPES.map((t) => ({
              label: t,
              value: t,
            }))}
            onChange={handleChange("type")}
          />
        </Box>
        <Box style={{ flexBasis: "128px" }}>
          <Select
            value={data.faceAnchor}
            style={{ width: "100%" }}
            options={FACE_ANCHORS.map((t) => ({
              label: t,
              value: t,
            }))}
            onChange={handleChange("faceAnchor")}
          />
        </Box>
        <Box>
          <InputNumber
            value={data.angle}
            style={{ width: "100%" }}
            min={0}
            max={360}
            placeholder="Angle"
            onChange={handleChange("angle")}
          />
        </Box>
        <Box>
          <InputNumber
            value={data.radiusX}
            style={{ width: "100%" }}
            min={0}
            max={10}
            placeholder="Radius X"
            onChange={handleChange("radiusX")}
          />
        </Box>
        <Box>
          <InputNumber
            value={data.radiusY}
            style={{ width: "100%" }}
            min={0}
            max={10}
            placeholder="Radius Y"
            onChange={handleChange("radiusY")}
          />
        </Box>
        <Box>
          <InputNumber
            value={data.scale}
            style={{ width: "100%" }}
            min={-15}
            max={15}
            placeholder="Scale"
            onChange={handleChange("scale")}
          />
        </Box>
        <Box>
          <InputNumber
            value={data.offsetX}
            style={{ width: "100%" }}
            min={-1}
            max={1}
            step={0.1}
            placeholder="Offset X"
            onChange={handleChange("offsetX")}
          />
        </Box>
        <Box>
          <InputNumber
            value={data.offsetY}
            style={{ width: "100%" }}
            min={-1}
            max={1}
            step={0.1}
            placeholder="Offset Y"
            onChange={handleChange("offsetY")}
          />
        </Box>
        <Box>
          <InputNumber
            value={data.min}
            style={{ width: "100%" }}
            min={0}
            max={2}
            step={0.1}
            placeholder="Min"
            onChange={handleChange("min")}
          />
        </Box>
        <Box>
          <InputNumber
            value={data.max}
            style={{ width: "100%" }}
            min={0}
            max={2}
            step={0.1}
            placeholder="Max"
            onChange={handleChange("max")}
          />
        </Box>
        <div>
          <Button onClick={onDelete} icon={<DeleteOutlined />} />
        </div>
      </Row>
    </>
  );
};

export default DistortionItem;
