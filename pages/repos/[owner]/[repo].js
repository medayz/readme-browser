import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Error from "next/error";
import { pick } from "ramda";
import { useQuery } from "react-query";

import { Readme } from "../../../components";
import { githubRepository } from "../../../utils/api";

const decodeBase64 = ({ encoding, content }) =>
  encoding === "base64" ? decodeURIComponent(escape(atob(content))) : content;

const LOADING = "loading";
const SUCCESS = "success";
const ERROR = "error";

const formatRepo = pick(["content", "encoding"]);

export default function Index() {
  const {
    query: { owner, repo }
  } = useRouter();
  const repoReadme = githubRepository().owner(owner).repo(repo);

  const { status, error, data: content } = useQuery(
    ["repo", `${owner}/${repo}`],
    () =>
      repoReadme
        .fetch()
        .then(formatRepo)
        .then(decodeBase64)
        .catch(() => console.log("tnaket"))
  );

  if (status === SUCCESS) {
    return (
      <Container
        p={8}
        maxW="960px"
        sx={{
          img: {
            display: "inline"
          }
        }}
      >
        <Readme content={content} />
      </Container>
    );
  }

  if (status === LOADING) {
    return <div>loading...</div>;
  }

  if (status === ERROR) {
    console.log(error);
    return <Error statusCode={404} />;
  }

  return null;
}
