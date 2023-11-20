export async function load({ cookies }) {
  const completed_tests = cookies.get("completed_tests");
  return {
    completed_tests: completed_tests,
  };
}
