import { Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { RepoBox } from "../library";
import { githubQueryBuilder, formatReposList } from "../utils/api";
import Error from "next/error";

const category = {
  REPOSITORIES: "repositories"
};

const fetchReactRepos = githubQueryBuilder(category.REPOSITORIES)
  .topics(["react", "javascript"])
  .langs(["javascript"])
  .perPage(20);

const LOADING = "loading";
const SUCCESS = "success";
const ERROR = "error";

function RepoList() {
  const { status, error, data: repos } = useQuery("repos", () =>
    fetchReactRepos.search().then(formatReposList)
  );

  if (status === LOADING) {
    return <div>loading...</div>;
  }

  if (status === SUCCESS) {
    return (
      <Flex wrap="wrap">
        {repos.map((repo) => (
          <RepoBox
            key={repo.id}
            name={repo.name}
            description={repo.description}
            stars={repo.stargazers_count}
            owner={repo.owner}
          />
        ))}
      </Flex>
    );
  }

  if (status === ERROR) {
    return <Error statusCode={404} />;
  }

  return null;
}

export default RepoList;
