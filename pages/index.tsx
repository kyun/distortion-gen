import React, { useMemo } from "react";
import type { NextPage } from "next";
import Layout from "~/components/Layout";
import { Input, Button, message } from "antd";
import DistortionItem from "~/components/DistortionItem";
import DistortionItemHead from "~/components/DistortionItemHead";
import { INIT_DATA } from "~/constants";
import { myCustomData } from "~/utils/object";

type Mode = "input" | "edit";
const AntdPage: NextPage = () => {
  const [jsonData, setJsonData] = React.useState("");
  const [mode, setMode] = React.useState<Mode>("input");
  const [rows, setRows] = React.useState<any[]>([]);
  const [lastIndex, setLastIndex] = React.useState(-1);
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
    message.success("Row added!");

    setRows((prev) => [...prev, INIT_DATA]);
  }, [outData]);

  const deleteRow = React.useCallback(
    (index: number) => () => {
      message.warning("Row removed!");

      setRows((prev) => prev.filter((_, i) => i !== index));
      setLastIndex(index);
    },
    []
  );

  const copyRow = React.useCallback(
    (index: number) => () => {
      message.info("Row copied & added!");

      setLastIndex(index);
      setRows((prev) => {
        const copied = [...prev];
        copied.splice(index, 0, prev[index]);
        return [...copied];
      });
    },
    []
  );
  const updateRow = React.useCallback(
    (index: number) => (name: string, value: any) => {
      setLastIndex(index);
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

  const setIndex = React.useCallback(
    (index: number) => () => {
      setLastIndex(index);
    },
    []
  );

  const copyJson = React.useCallback(() => {
    // clipboard copy
    navigator.clipboard.writeText(outData);
    message.success("Copied!");
  }, [outData]);

  const resetData = React.useCallback(() => {
    const sure = confirm("Are you sure?");
    if (sure) {
      setMode("input");
      setJsonData("");
      setRows([]);
    }
  }, []);

  React.useEffect(() => {
    if (mode === "edit") {
      setRows(customData.distortions);
    }
  }, [mode, customData]);

  React.useEffect(() => {
    myCustomData(jsonData);
  }, [jsonData]);

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
        <Button type="primary" onClick={toggleMode}>
          JSON to Table
        </Button>

        <Button onClick={copyJson}>Copy JSON </Button>
        <Button danger onClick={resetData}>
          Reset
        </Button>
        <Button disabled>Undo (Soon)</Button>
      </div>
      <hr style={{ borderColor: "#e0e0e0", borderTop: 0, marginBottom: 32 }} />
      <div style={{ marginBottom: 32 }}>
        <Button onClick={appendRow}>Add Row</Button>
      </div>
      <div style={{ paddingLeft: 6 }}>
        <DistortionItemHead />
        {rows?.map((r: any, index: number) => {
          return (
            <DistortionItem
              onClick={setIndex(index)}
              lastUpdated={lastIndex === index}
              data={r}
              index={index}
              key={index}
              onChange={updateRow(index)}
              onDelete={deleteRow(index)}
              onCopy={copyRow(index)}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default AntdPage;
