import {
  Heading,
  Flex,
  Text,
  List,
  ListItem,
  Image,
  Link,
  Code
} from "@chakra-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";

export default Readme;

function Readme({ content }) {
  return (
    <ReactMarkdown
      source={content}
      allowDangerousHtml={true}
      renderers={{
        link: CustomLink,
        heading: CustomHeading,
        strong: CustomStrong,
        list: CustomList,
        listItem: CustomListItem,
        image: CustomImage,
        code: CustomCode,
        inlineCode: CustomInlineCode
      }}
    />
  );
}

/*
 ** Custom Components for rendering the Markdown
 */

function CustomLink({ href, children }) {
  return (
    <Link color="blue.600" href={href}>
      {children}
    </Link>
  );
}

function CustomHeading({ children, level }) {
  return (
    <Heading
      as={`h${level}`}
      fontSize={["", "3xl", "2xl", "xl", "lg", "md", "sm"][level]}
      mt={4}
      mb={2}
      py={1}
      borderBottomWidth={1}
    >
      <Flex wrap="wrap" align="center">
        {children}
      </Flex>
    </Heading>
  );
}

function CustomStrong({ children }) {
  return (
    <Text as="strong" fontWeight="bold">
      {children}
    </Text>
  );
}

function CustomList({ children }) {
  return (
    <List pl={8} styleType="disk">
      {children}
    </List>
  );
}

function CustomListItem({ children }) {
  return <ListItem>{children}</ListItem>;
}

function CustomImage({ src, alt, children }) {
  return <Image src={src} alt={alt} p={1} d="inline" />;
}

function CustomCode({ language, value }) {
  return (
    <SyntaxHighlighter
      customStyle={{ padding: "1rem", borderRadius: 4, margin: "1rem 0" }}
      language={language}
    >
      {value}
    </SyntaxHighlighter>
  );
}

function CustomInlineCode({ children }) {
  return (
    <Code px={1} py={0.5} borderRadius={6}>
      {children}
    </Code>
  );
}
