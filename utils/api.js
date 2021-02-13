import {
  pipe,
  compose,
  objOf,
  map,
  concat,
  prop,
  pick,
  over,
  lensProp
} from "ramda";
import { fetchJSON } from "./fetching";

function store({ ...data }) {
  var params = { ...data };

  return {
    getAll() {
      return params;
    },
    getParam(param) {
      return params[param];
    },
    setParams(newParams) {
      params = Object.assign({}, params, newParams);
    }
  };
}

function githubSearch(category) {
  const { getAll, getParam, setParams } = store({
    filters: [],
    sort: "stars",
    order: "desc",
    perPage: 10,
    page: 1
  });
  const returnBuilder = () => builder;
  const setter = (field) => compose(returnBuilder, setParams, objOf(field));

  const getGithubSearch = pipe(
    () =>
      `?q=${getParam("filters").join("+")}&sort=${getParam(
        "sort"
      )}&order=${getParam("order")}&per_page=${getParam(
        "perPage"
      )}&page=${getParam("page")}`,
    concat(`https://api.github.com/search/${category}`),
    fetchJSON({ items: [] })
  );

  const setFilters = pipe(
    (newParams) => getParam("filters").concat(newParams),
    objOf("filters"),
    setParams
  );

  const updateQuery = compose(returnBuilder, setFilters);

  var builder = {
    search: getGithubSearch,
    topics: compose(updateQuery, map(concat("topic:"))),
    langs: compose(updateQuery, map(concat("language:"))),
    sort: setter("sort"),
    order: setter("order"),
    page: setter("page"),
    perPage: setter("perPage"),
    read: compose(returnBuilder, (fn) => fn(getAll()))
  };

  return builder;
}

function githubRepository() {
  const { getAll, getParam, setParams } = store({
    owner: null,
    repo: null,
    type: "readme"
  });
  const returnBuilder = () => builder;
  const setter = (field) => compose(returnBuilder, setParams, objOf(field));

  const getRepoFetcher = pipe(
    () => `${getParam("owner")}/${getParam("repo")}/${getParam("type")}`,
    concat(`https://api.github.com/repos/`),
    fetchJSON({})
  );

  var builder = {
    fetch: getRepoFetcher,
    owner: setter("owner"),
    repo: setter("repo"),
    read: compose(returnBuilder, (fn) => fn(getAll()))
  };

  return builder;
}

const formatReposList = pipe(
  prop("items"),
  map(pick(["id", "owner", "name", "description", "stargazers_count"])),
  map(over(lensProp("owner"), prop("login")))
);

export { githubSearch, githubRepository, formatReposList };
