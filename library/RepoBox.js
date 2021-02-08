import { Heading, Text, Link, Box } from "@chakra-ui/react";
import NextLink from "next/link";

export default function RepoBox({ name, description, stars, owner }) {
  return (
    <Box
      m={1}
      px={8}
      py={4}
      maxW={64}
      bg="gray.100"
      borderRadius={3}
      _hover={{
        cursor: "pointer",
        background: "gray.200"
      }}
    >
      <Link
        as={NextLink}
        href={`/repos/${owner}/${name}`}
        alt={`${owner}/name github repository readme`}
      >
        <Box>
          <Heading as="h4" size="sm" mb={1}>
            {name}: {stars}
          </Heading>
          <Text fontSize="sm">{description}</Text>
        </Box>
      </Link>
    </Box>
  );
}
