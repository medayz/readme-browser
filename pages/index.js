import { RepoList } from "../components";
import { Container } from "@chakra-ui/react";

export default function Index() {
  return (
    <Container p={8} maxW="960px" centerContent>
      <RepoList />
    </Container>
  );
}
