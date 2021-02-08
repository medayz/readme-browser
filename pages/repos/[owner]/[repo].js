import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Error from "next/error";
import { pick } from "ramda";
import { useQuery } from "react-query";

import { Readme } from "../../../components";
import { fetchJSON } from "../../../utils/fetching";

const fetcher = fetchJSON({});
const decodeBase64 = ({ encoding, content }) =>
  encoding === "base64" ? decodeURIComponent(escape(atob(content))) : content;

const LOADING = "loading";
const SUCCESS = "success";
const ERROR = "error";

export default function Index() {
  const {
    query: { owner, repo }
  } = useRouter();
  const { status, error, data: content } = useQuery(
    ["repo", `${owner}/${repo}`],
    () =>
      fetcher(`https://api.github.com/repos/${owner}/${repo}/readme`)
        .then(pick(["content", "encoding"]))
        .then(decodeBase64)
  );

  if (status === SUCCESS) {
    return (
      <Box p={8}>
        <Readme content={content} />
      </Box>
    );
  }

  if (status === LOADING) {
    return <div>loading...</div>;
  }

  if (status === ERROR) {
    return <Error statusCode={404} />;
  }

  return null;
}
