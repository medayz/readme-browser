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

function store() {
  var params = {
    filters: [],
    sort: "stars",
    order: "desc",
    perPage: 10,
    page: 1
  };

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

function githubQueryBuilder(category) {
  const { getAll, getParam, setParams } = store();

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
  const setter = (field) => compose(returnBuilder, setParams, objOf(field));
  const returnBuilder = () => builder;

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

const formatReposList = pipe(
  prop("items"),
  map(pick(["id", "owner", "name", "description", "stargazers_count"])),
  map(over(lensProp("owner"), prop("login")))
);

export { githubQueryBuilder, formatReposList };
