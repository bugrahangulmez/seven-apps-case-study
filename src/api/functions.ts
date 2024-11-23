import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export const fetchAllCharactersIncludingQuery = async (
  query: string,
  pageParam: number
): Promise<FetchResponse> => {
  if (query === "") {
    return {
      characters: [],
      info: {
        count: 0,
        pages: 0,
      },
    };
  }

  try {
    const response = await apiClient.get(
      `/character/?name=${query}&page=${pageParam}`
    );
    return {
      characters: response.data.results as Character[],
      info: response.data.info,
    };
  } catch (error) {
    console.error("Error fetching characters including query:", error);
    return {
      characters: [],
      info: {
        count: 0,
        pages: 0,
      },
    };
  }
};
