import React from "react";
import styled from "@emotion/styled";
import { Select, Button, InputNumber } from "antd";
import {
  CopyFilled,
  CopyOutlined,
  CopyTwoTone,
  DeleteOutlined,
} from "@ant-design/icons";
import { FACE_ANCHORS, TYPES } from "~/constants";

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
const Row = styled.div<{ active?: boolean; isNew?: boolean }>`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  background-color: ${({ active }) =>
    active ? hexToRgba("#1677ff", 0.2) : "transparent"};

  padding: 4px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: ${({ active }) =>
      active ? hexToRgba("#1677ff", 0.25) : hexToRgba("#1677ff", 0.05)};
  }
`;
const Box = styled.div`
  flex: 0 0 100px;
`;

interface Props {
  [key: string]: any;
}

const DistortionItem: React.FC<Props> = ({
  data,
  onClick,
  onDelete,
  onChange,
  onCopy,
  index,
  lastUpdated,
}) => {
  const handleChange = React.useCallback(
    (name: string) => (e: any) => {
      onChange(name, e);
    },
    [onChange]
  );

  const handleClick = React.useCallback(
    (e: any) => {
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );

  return (
    <>
      <Row active={lastUpdated} onClick={handleClick}>
        <Box
          style={{
            flexBasis: "40px",
            textAlign: "left",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: "28px",
            fontSize: "0.9em",
          }}
        >
          {index + 1}
        </Box>
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
            step={10}
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
            step={0.1}
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
            step={0.1}
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
            step={0.1}
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
        <div>
          <Button onClick={onCopy} icon={<CopyOutlined />} />
        </div>
      </Row>
    </>
  );
};

export default DistortionItem;
