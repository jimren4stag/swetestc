export function load({ params, cookies }) {
  return {
    params,
    completed_tests:
      cookies.get("completed_tests") == null
        ? []
        : JSON.parse(cookies.get("completed_tests")),
  };
}
