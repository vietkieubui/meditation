// Format sort options from query
export function formatSortQuery(sortOptions) {
  const formattedOptions = {};
  if (!!sortOptions) {
    sortOptions?.forEach((option) => {
      formattedOptions[option.field] = option.direction.toLowerCase();
    });
  }
  return formattedOptions;
}
