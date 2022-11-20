import React, { useMemo } from "react";
import type { NextPage } from "next";
import Layout from "~/components/Layout";
import { Select, Input, InputNumber, Button } from "antd";
import DistortionItem from "~/components/DistortionItem";
import DistortionItemHead from "~/components/DistortionItemHead";
import { INIT_DATA } from "~/constants";

type Mode = "input" | "edit";
const AntdPage: NextPage = () => {
  const [jsonData, setJsonData] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("input");
  const [rows, setRows] = React.useState<any[]>([]);

  const outData = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonData);
      const index = parsed.result.items.findIndex(
        (i: any) => i.drawType === "FACE_DISTORTION"
      );
      parsed.result.items[index].customData = JSON.stringify({
        distortions: rows,
      });
      return JSON.stringify(parsed);
    } catch {
      return "";
    }
  }, [jsonData, rows]);
  const customData = useMemo(() => {
    try {
      const { customData } = JSON.parse(jsonData)?.result?.items.find(
        (i: any) => i.drawType === "FACE_DISTORTION"
      );
      return JSON.parse(customData);
    } catch (e) {
      return [];
    }
  }, [jsonData]);

  const toggleMode = React.useCallback(() => {
    if (outData.length === 0) return;

    setMode((prev) => (prev === "input" ? "edit" : "input"));
  }, [outData]);

  const appendRow = React.useCallback(() => {
    if (outData.length === 0) return;

    setRows((prev) => [...prev, INIT_DATA]);
  }, [outData]);

  const deleteRow = React.useCallback(
    (index: number) => () => {
      setRows((prev) => prev.filter((_, i) => i !== index));
    },
    []
  );
  const updateRow = React.useCallback(
    (index: number) => (name: string, value: any) => {
      setRows((prev) => {
        const newData = [...prev];
        newData[index] = {
          ...newData[index],
          [name]: value,
        };
        return newData;
      });
    },
    []
  );

  const copyJson = React.useCallback(() => {
    // clipboard copy
    navigator.clipboard.writeText(outData);
  }, [outData]);

  const resetData = React.useCallback(() => {
    setMode("input");
    setJsonData("");
    setRows([]);
  }, []);

  React.useEffect(() => {
    if (mode === "edit") {
      setRows(customData.distortions);
    }
  }, [mode, customData]);

  return (
    <Layout>
      <div>
        <Input.TextArea
          disabled={mode === "edit"}
          style={{
            fontSize: "0.8rem",
            lineHeight: "0.9rem",
          }}
          size="small"
          rows={8}
          value={mode === "input" ? jsonData : outData}
          onChange={(e) => setJsonData(e.target.value)}
        />
      </div>
      <div
        style={{ display: "flex", gap: 16, marginTop: 16, marginBottom: 32 }}
      >
        <Button onClick={toggleMode}>Generate Table</Button>
        <Button onClick={appendRow}>Add Row</Button>
        <Button onClick={copyJson}>Copy </Button>
        <Button onClick={resetData}>Reset</Button>
      </div>
      <DistortionItemHead />
      {rows?.map((r: any, index: number) => {
        return (
          <DistortionItem
            data={r}
            key={index}
            onChange={updateRow(index)}
            onDelete={deleteRow(index)}
          />
        );
      })}
    </Layout>
  );
};

export default AntdPage;
