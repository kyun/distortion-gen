import styled from "@emotion/styled";
import type { NextPage } from "next";
import React from "react";
import Button from "~/components/common/Button";
import Layout from "~/components/Layout";
import { TinyText, Title } from "~/components/Typography";
import { customDataParser } from "~/utils/parser";

const TwoColumnLayout = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;
const Column = styled.section`
  flex: 1;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  max-width: 100%;
  resize: none;
`;

interface Props {
  deployedAt: number;
}
type ViewMode = "original" | "aligned";
const NewPage: NextPage<Props> = ({ deployedAt }) => {
  const [jsonData, setJsonData] = React.useState("");
  const [viewMode, setViewMode] = React.useState<ViewMode>("original");

  const toggleViewMode = React.useCallback(() => {
    setViewMode((prev) => (prev === "original" ? "aligned" : "original"));
  }, []);

  const formatted = React.useMemo(() => {
    const parsed = customDataParser(jsonData);
    const customData = customDataParser(
      parsed?.result?.items?.find(
        (item: any) => item.drawType === "FACE_DISTORTION"
      ).customData
    );

    const out = {
      ...parsed,
      result: {
        ...parsed?.result,
        items: parsed?.result?.items?.map((item: any) => {
          if (item.drawType === "FACE_DISTORTION") {
            return {
              ...item,
              // JSON.stringify without \n
              customData,
              // customData: JSON.stringify(customData, null, 2),
            };
          }
          return item;
        }),
      },
    };
    // return out;
    return JSON.stringify(out, null, 2);
  }, [jsonData]);

  React.useEffect(() => {
    const out = customDataParser(jsonData);
    const cumstom = customDataParser(
      out?.result?.items?.find(
        (item: any) => item.drawType === "FACE_DISTORTION"
      ).customData
    );
    console.log(JSON.stringify(cumstom, null, 2));
  }, [jsonData]);

  return (
    <Layout>
      <Title style={{ borderBottom: "1px solid #fff" }}>
        Distortion Generator
        <TinyText style={{ fontWeight: 400, margin: "0 2.4rem", opacity: 0.8 }}>
          Last Updated At: {new Date(deployedAt).toLocaleString()}
        </TinyText>
      </Title>
      <TwoColumnLayout>
        <Column>
          <TextArea
            spellCheck={false}
            value={formatted}
            onChange={(e) => {
              setJsonData(e.target.value);
            }}
          />
          <div style={{ padding: "1rem", textAlign: "center" }}>
            <Button>Generate Table</Button>
          </div>
        </Column>
        <Column>
          <p>Hello</p>
        </Column>
      </TwoColumnLayout>
    </Layout>
  );
};

export default NewPage;

export const getStaticProps = async () => {
  return {
    props: {
      deployedAt: Date.now(),
    },
  };
};
