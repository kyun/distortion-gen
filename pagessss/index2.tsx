import type { GetStaticProps, NextPage } from "next";
import React from "react";
import styled from "@emotion/styled";
import DistortionRow from "~/components/DistortionRow";
import { DistortionItem, INIT_DATA } from "~/constants";

const Textarea = styled.textarea`
  flex: 0 0 100%;
  height: 100px;
`;
const Home2: NextPage = ({ now }: any) => {
  const [jsonData, setJsonData] = React.useState("{}");
  const [isEditing, setIsEditing] = React.useState(false);
  const [distortions, setDistortions] = React.useState<DistortionItem[]>([]);

  const isValid = React.useMemo(() => {
    return distortions.length > 0;
  }, [distortions]);

  const isDisabledGenerate = React.useMemo(() => {
    return isEditing && isValid;
  }, [isEditing, isValid]);

  const outputStr = React.useMemo(() => {
    const copied = JSON.parse(jsonData);
    if (copied?.result?.items) {
      const index = copied?.result?.items?.findIndex(
        (item: any) => item.drawType === "FACE_DISTORTION"
      );
      copied.result.items[index].customData = `"${JSON.stringify({
        distortions,
      })}"`;
    }

    return JSON.stringify(copied);
  }, [distortions, jsonData]);

  const inputJsonData = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setJsonData(e.target.value);
    },
    []
  );

  const toggleDisabled = React.useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const appendRow = React.useCallback(() => {
    setDistortions((prev) => [...prev, INIT_DATA]);
  }, []);

  const deleteRow = React.useCallback(
    (index: number) => () => {
      setDistortions((prev) => prev.filter((_, i) => i !== index));
    },
    []
  );

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(outputStr);
    alert("Copy Success");
  }, [outputStr]);

  const handleChange = React.useCallback(
    (index: number) => (name: string, value: number | string) => {
      setDistortions((prev) => {
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
  const handleRevert = React.useCallback(() => {
    const parsed = JSON.parse(jsonData);
    if (parsed?.result?.items) {
      const item = parsed.result.items.find(
        (item: any) => item.drawType === "FACE_DISTORTION"
      );
      const { distortions }: { distortions: DistortionItem[] } = JSON.parse(
        item?.customData
      );
      setDistortions(distortions);
    }
  }, [jsonData]);
  const handleGenerate = React.useCallback(() => {
    try {
      toggleDisabled();
      if (isEditing) {
        return;
      }
      const parsed = JSON.parse(jsonData);
      if (parsed?.result?.items) {
        const item = parsed.result.items.find(
          (item: any) => item.drawType === "FACE_DISTORTION"
        );
        const { distortions }: { distortions: DistortionItem[] } = JSON.parse(
          item?.customData
        );
        console.log(distortions);
        setDistortions(distortions);
        const outputStr = `"${JSON.stringify({
          distortions,
        }).replaceAll('"', '\\"')}"`;
        // console.log(outputStr);
        // navigator.clipboard.writeText(outputStr);
      }
    } catch (err) {
      console.log(err);
    }
  }, [jsonData, isEditing]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Textarea
          value={isEditing ? outputStr : jsonData}
          disabled={isDisabledGenerate}
          onChange={inputJsonData}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <button onClick={handleGenerate}>Generate Table</button>

        <button onClick={handleCopy}>Copy</button>
        <button onClick={handleRevert}>원복</button>
      </div>
      <div>
        <div style={{ width: "100vw" }}>
          <button
            disabled={!isDisabledGenerate}
            onClick={appendRow}
            style={{ width: "100vw" }}
          >
            Add Row
          </button>
        </div>
        {distortions.map((row, index) => (
          <DistortionRow
            key={index}
            data={row}
            onDelete={deleteRow(index)}
            onChange={handleChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home2;

export const getStaticProps: GetStaticProps = async () => {
  const now = Date.now();
  return {
    props: {
      now,
    },
  };
};
