import type { GetStaticProps, NextPage } from "next";
import DistortionRow from "~/components/DistortionRow";
import React from "react";
import { INIT_DATA } from "~/constants";

const Home: NextPage = ({ now }: any) => {
  const [origin, setOrigin] = React.useState("{}");
  const [data, setData] = React.useState([INIT_DATA]);

  const outputStr = React.useMemo(() => {
    const obj = {
      distortions: data,
    };
    return `"${JSON.stringify(obj).replaceAll('"', '\\"')}"`;
  }, [data]);

  const appendRow = React.useCallback(() => {
    setData((prev) => [...prev, INIT_DATA]);
  }, []);

  const deleteRow = React.useCallback(
    (index: number) => () => {
      setData((prev) => prev.filter((_, i) => i !== index));
    },
    []
  );

  const handleChange = React.useCallback(
    (index: number) => (name: string, value: number | string) => {
      setData((prev) => {
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

  React.useEffect(() => {
    try {
      const parsed = JSON.parse(origin);
      if (parsed?.result?.items) {
        const item = parsed.result.items.find(
          (item: any) => item.drawType === "FACE_DISTORTION"
        );
        const { distortions } = JSON.parse(item?.customData);
        setData(distortions);
      }
    } catch (err) {
      console.log(err);
    }
  }, [origin]);

  return (
    <div>
      <h1>
        Distortion Generator
        <span style={{ fontSize: 12 }}>{new Date(now).toLocaleString()}</span>
      </h1>
      <div style={{ display: "flex" }}>
        <textarea
          style={{ flex: "0 0 100%", height: 100 }}
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        {/* <textarea style={{ flex: "0 0 50%", height: 100 }} value={outputStr} /> */}
      </div>
      <div></div>
      <div style={{ display: "flex", gap: 16, padding: "0 32px" }}>
        row: {data.length}
        <button style={{ marginLeft: 16 }} onClick={appendRow}>
          Add Row
        </button>
      </div>
      <div>
        {data.map((row, index) => (
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

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const now = Date.now();
  return {
    props: {
      now,
    },
  };
};
