import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { RepoBox } from "../library";
import { formatReposList, githubSearch } from "../utils/api";
import Error from "next/error";

const category = {
  REPOSITORIES: "repositories"
};

const reactRepos = githubSearch(category.REPOSITORIES)
  .topics(["react"])
  .langs(["javascript"])
  .perPage(20);

const LOADING = "loading";
const SUCCESS = "success";
const ERROR = "error";

function RepoList() {
  const { status, error, data: repos } = useQuery("repos", () =>
    reactRepos.search().then(formatReposList)
  );

  if (status === LOADING) {
    return <div>loading...</div>;
  }

  if (status === SUCCESS) {
    return (
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}>
        {repos.map((repo) => (
          <RepoBox
            key={repo.id}
            name={repo.name}
            description={repo.description}
            stars={repo.stargazers_count}
            owner={repo.owner}
          />
        ))}
      </Grid>
    );
  }

  if (status === ERROR) {
    return <Error statusCode={404} />;
  }

  return null;
}

export default RepoList;
