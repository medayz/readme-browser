import { invoker, pipe, apply, otherwise, always, andThen } from "ramda";

const toJSON = invoker(0, "json");

const fetchJSON = (defaultValue) =>
  pipe(
    Array.of,
    apply(fetch),
    otherwise(always(defaultValue)),
    andThen(toJSON)
  );

export { fetchJSON };
